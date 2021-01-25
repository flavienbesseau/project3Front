import React from "react";
import { HorizontalBar, defaults } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

defaults.global.tooltips.enabled = true;

const ChartJs = (props) => (
  <div
    style={{
      backgroundColor: "#265f87",
      fontColor: "#dadfe6",
      width: "60%",
      border: "2px black solid",
      margin: "10px",
    }}
  >
    <HorizontalBar
      data={props.data}
      width={1000}
      height={400}
      options={{
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            title: function (tooltipItems, data) {
              return data.labels[tooltipItems[0].index];
            },
          },
        },
        title: {
          display: true,
          text: "Informations générales",
          fontSize: 15,
          fontColor: "#dadfe6",
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
                userCallback: function (label, index, labels) {
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
