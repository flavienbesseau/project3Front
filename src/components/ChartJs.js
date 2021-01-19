import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const data = {
  labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11"],
  datasets: [
    {
      label: "Note sur 5",
      data: [1, 3, 1, 5, 4, 2, 3, 1, 5, 3, 4],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const ChartJs = () => ({
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
