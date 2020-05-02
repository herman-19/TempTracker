const SDModel = require("../models/sensorData");
const Subscriber = require("../models/subcriber");

const nodemailer = require("nodemailer");

// Helper function to store data to database.
async function storeDocument(document) {
  try {
    const newSensorData = new SDModel(document);
    await newSensorData.save();
  } catch (err) {
    throw new Error("Could not store document.");
  }
}

// Helper function to send email to subscriber.
async function sendEmail(subscriberEmail, tempLimit, curTemp) {
  try {
    let smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tempTrackerApp@gmail.com",
        pass: process.env.GMAIL_ACCT_PW,
      },
    });
    let mail = {
      from: "TempTracker <tempTrackerApp@gmail.com>",
      to: subscriberEmail,
      subject: "Notification: Temperature Limit Exceeded",
      text: `Temperature has exceeded ${tempLimit} °F!\n\nCurrent temperature: ${curTemp} °F`,
    };

    await smtpTransport.sendMail(mail, (err, info) => {
      if (err) {
        throw new Error("Error sending mail");
      } else {
        console.log("Emailed %s successfuly.", subscriberEmail);
      }
    });

    smtpTransport.close();
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

// Construct document of sensor data and store in the database.
exports.postSensorData = async (req, res, next) => {
  try {
    const doc = {
      temperature: parseInt(req.body.temp),
      humidity: parseInt(req.body.humidity),
    };
    await storeDocument(doc);

    // Query for subscribers with a limit less than latest temperature.
    const recipients = await Subscriber.find({
      tempLimit: { $lt: req.body.temp },
    });

    for (const rec of recipients) {
      await sendEmail(rec.email, rec.tempLimit, req.body.temp);
    }

    res.send("[Server]: Data stored!");
  } catch (err) {
    console.log("Something went wrong while sending email.");
    res.status(400).json("Error: " + err);
  }
};

// Get the latest 10 sensor data points sorted from least to most recent.
exports.getSensorData = async (req, res, next) => {
  try {
    let documents = await SDModel.find().sort({ _id: -1 }).limit(10);
    documents.reverse();

    const data = {
      tArray: [],
      hArray: [],
      timestamps: [],
      ids: [],
    };

    for (const record of documents) {
      data.tArray.push(record.temperature);
      data.hArray.push(record.humidity);
      data.timestamps.push(
        new Date(record.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      data.ids.push(record._id);
    }

    res.json(data);
  } catch (err) {
    res.status(400).json("Error " + err);
  }
};
