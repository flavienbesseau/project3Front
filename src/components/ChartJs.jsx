import React from "react";
import { HorizontalBar, defaults } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

defaults.global.tooltips.enabled = true;

const tickShortener = (tick) => {
  const characterLimit = 25;
  if (tick.length >= characterLimit) {
    return (
      tick
        .slice(0, tick.length)
        .substring(0, characterLimit - 1)
        .trim() + "..."
    );
  }
  return tick;
};

const ChartJs = (props) => (
  <div>
    <HorizontalBar
      data={props.data}
      width={1000}
      height={650}
      options={{
        plugins: {
          datalabels: {
            align: "center",
            font: {
              weight: "bold",
              size: 12,
            },
            color: "#283583",
          },
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
          callbacks: {
            title: function (tooltipItems, data) {
              return data.labels[tooltipItems[0].index];
            },
          },
        },
        title: {
          display: false,
        },
        legend: {
          display: false,
          position: "bottom",
          backgroundColor: "blue",
          labels: {
            fontColor: "#dadfe6",
          },
        },
        layout: {
          padding: 15,
        },
        animation: {
          duration: 3000,
        },
        scales: {
          yAxes: [
            {
              afterBuildTicks: (axis, ticks) => ticks.map(tickShortener),
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: "#dadfe6",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                min: 0,
                max: 5,
                fontColor: "#dadfe6",
                userCallback: function (label) {
                  // when the floored value is the same as the value we have a whole number
                  if (Math.floor(label) === label) {
                    return label;
                  }
                },
              },
            },
          ],
        },
      }}
    />
  </div>
);

export default ChartJs;
