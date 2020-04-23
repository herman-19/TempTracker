const MAX_POINTS_DISPLAYED = 10;

let myChart;

Highcharts.setOptions({
  chart: {
    backgroundColor: "rgb(96, 102, 110)",
    plotBackgroundColor: "rgba(80, 80, 112, .9)",
    plotShadow: true,
    plotBorderWidth: 1,
  },
});

document.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:3000/sensorData/latestData";
  const response = await fetch(url);
  const jres = await response.json();
  console.log(jres.tArray);
  console.log(jres.hArray);
  console.log(jres.timestamps);
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
      categories: [...jres.timestamps],
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
        data: [...jres.tArray],
        dataLabels: {
          style: {
            color: "white",
          },
        },
      },
      {
        name: "Relative Humidity (%)",
        data: [...jres.hArray],
        color: "rgb(201, 125, 125)",
      },
    ],
  });

  setInterval(pollServer, 5000); // 15 mins = 900000 ms
});

document.getElementById("btn").addEventListener("click", () => {
  myChart.series[0].addPoint(Math.random() * 100);
  myChart.series[1].addPoint(Math.random() * 100);

  // Get indices of last points
  var lastPointT = myChart.series[0].data.length - 1;

  // Set extremes to go from min (current index - 10) to last point (current index)
  myChart.xAxis[0].setExtremes(
    lastPointT - (MAX_POINTS_DISPLAYED - 1), // min
    lastPointT
  ); // max
});

const pollServer = () => {
  // Poll.
  console.log("polling...");
};
