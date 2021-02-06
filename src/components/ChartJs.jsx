import React from "react";
import { HorizontalBar, defaults } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

defaults.global.tooltips.enabled = true;

const ChartJs = (props) => (
  <div>
    <HorizontalBar
      data={props.data}
      width={1000}
      height={650}
      options={{
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
              categoryPercentage: 1.0,
              barPercentage: 1,
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
