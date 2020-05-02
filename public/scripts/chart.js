const MAX_POINTS_DISPLAYED = 10;

let myChart;
let identifierSet = new Set();
let chartTimestamps = [];

Highcharts.setOptions({
  chart: {
    backgroundColor: "cornflowerblue",
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
        text: "Temperature & Humidity",
        style: {
          color: "black",
        },
      },
      xAxis: {
        categories: chartTimestamps,
        labels: {
          style: {
            color: "black",
          },
        },
      },
      yAxis: {
        title: {
          text: "Data",
          style: {
            color: "black",
          },
        },
        labels: {
          style: {
            color: "black",
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

    setInterval(updateChart, 300000); // 5 mins = 300000 ms
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
    updateHTML(data.tArray, data.hArray);
    return data;
  } catch (err) {
    console.log("Error polling server:", err);
  }
};

const updateHTML = (tData, hData) => {
  if (tData.length > 0 && hData.length > 0) {
    const tempEl = document.getElementById("current-temp");
    const humEl = document.getElementById("current-humidity");
    const tMinMax = document.getElementById("t-min-max");
    const hMinMax = document.getElementById("h-min-max");
  
    tempEl.innerHTML = `${tData[tData.length - 1]} °F`;
    humEl.innerHTML = `${hData[hData.length - 1]}% RH`;
    tMinMax.innerHTML = `Min: ${Math.min(...tData)} °F | Max: ${Math.max(...tData)} °F`;
    hMinMax.innerHTML = `Min: ${Math.min(...hData)}% RH | Max: ${Math.max(...hData)}% RH`;
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
