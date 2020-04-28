const MAX_POINTS_DISPLAYED = 10;

let myChart;
let identifierSet = new Set();
let chartTimestamps = [];

Highcharts.setOptions({
  chart: {
    backgroundColor: "rgb(96, 102, 110)",
    plotBackgroundColor: "rgba(80, 80, 112, .9)",
    plotShadow: true,
    plotBorderWidth: 1,
  },
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const sensorData = await pollServer();
    chartTimestamps = [...sensorData.timestamps];

    for (const uid of sensorData.ids) {
      identifierSet.add(uid);
    }

    myChart = Highcharts.chart("chart-container", {
      chart: {
        type: "line",
      },
      title: {
        text: "Temperature Over Time",
        style: {
          color: "rgb(181, 183, 186)",
        },
      },
      xAxis: {
        categories: chartTimestamps,
        labels: {
          style: {
            color: "rgb(181, 183, 186)",
          },
        },
      },
      yAxis: {
        title: {
          text: "Reported Data",
          style: {
            color: "rgb(181, 183, 186)",
          },
        },
        labels: {
          style: {
            color: "rgb(181, 183, 186)",
          },
        },
      },
      series: [
        {
          name: "Temperature ( °F )",
          data: [...sensorData.tArray],
          dataLabels: {
            style: {
              color: "white",
            },
          },
        },
        {
          name: "Relative Humidity (%)",
          data: [...sensorData.hArray],
          color: "rgb(201, 125, 125)",
        },
      ],
    });

    setInterval(updateChart, 900000); // 15 mins = 900000 ms
  } catch (err) {
    console.log(err);
  }
});

const pollServer = async () => {
  try {
    // Poll server for latest data.
    console.log("Fetching latest data...");
    const url = "http://localhost:3000/sensorData/latestData";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error polling server:", err);
  }
};

const updateChart = async () => {
  try {
    const data = await pollServer();

    let i = 0;
    for (let newId of data.ids) {
      if (identifierSet.has(newId) == false) {
        // Add point to chart.
        identifierSet.add(newId);
        myChart.series[0].addPoint(data.tArray[i]); // temp
        myChart.series[1].addPoint(data.hArray[i]); // humidity
        myChart.xAxis.categories = chartTimestamps.push(data.timestamps[i]); // timestamp

        // Get indices of last points.
        const lastPointT = myChart.series[0].data.length - 1;

        // Set extremes to go from min (current index - 10) to last point (current index)
        myChart.xAxis[0].setExtremes(
          lastPointT - (MAX_POINTS_DISPLAYED - 1),
          lastPointT
        );
      }
      i++;
    }
  } catch (err) {
    console.log("Error updating chart: ", err);
  }
};
