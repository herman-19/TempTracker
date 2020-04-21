const MAX_POINTS_DISPLAYED = 10;

let tData = [];
let hData = [];
let myChart;

// Populate arrays with random data.
for (let i = 0; i < 10; i++) {
  tData.push(Math.random() * 100);
  hData.push(Math.random() * 100);
}

Highcharts.setOptions({
  chart: {
    backgroundColor: "rgb(96, 102, 110)",
    plotBackgroundColor: "rgba(80, 80, 112, .9)",
    plotShadow: true,
    plotBorderWidth: 1,
  },
});

document.addEventListener("DOMContentLoaded", () => {
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
      categories: [
        "12:15pm",
        "12:30pm",
        "12:45pm",
        "1:00pm",
        "1:15pm",
        "1:30pm",
        "1:45pm",
        "2:00pm",
        "2:15pm",
        "2:30pm",
      ],
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
        data: tData,
        dataLabels: {
          style: {
            color: "white",
          },
        },
      },
      {
        name: "Relative Humidity (%)",
        data: hData,
        color: "rgb(201, 125, 125)",
      },
    ],
  });
});

document.getElementById("btn").addEventListener("click", () => {
  myChart.series[0].addPoint(Math.random() * 100);
  myChart.series[1].addPoint(Math.random() * 100);

  // Get indices of last points
  var lastPointT = myChart.series[0].data.length - 1;

  // Set extremes to go from min (current index - 10) to last point (current index)
  myChart.xAxis[0].setExtremes(
    lastPointT - (MAX_POINTS_DISPLAYED - 1), // min
    lastPointT); // max
});