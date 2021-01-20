import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const ChartJs = (data) => ({
  displayName: "BarExample",
  render() {
    return (
      <div
        style={{ backgroundColor: "white", width: "50%", textAlign: "center" }}
      >
        {/* <h2>Informations générales</h2> */}
        <HorizontalBar
          data={data}
          width={300}
          height={400}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "Informations générales",
              fontSize: 15,
            },
            legend: {
              display: true,
              position: "bottom",
              backgroundColor: "blue",
            },
            layout: {
              padding: 15,
            },
            animation: {
              duration: 1000,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    beginAtZero: true,
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
  },
});

export default ChartJs;
