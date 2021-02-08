import React from "react";
import { Radar, defaults } from "react-chartjs-2";

defaults.global.defaultFontColor = "#fff";

const config = {
  labels: ["Compétence", "Fiabilité", "Transparence", "Relation"],
  datasets: [
    {
      label: "Mon établissement",
      backgroundColor: "rgba(250, 137, 56,0)",
      borderColor: "rgba(250, 137, 56,1)",
      pointBackgroundColor: "rgba(250, 137, 56,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(250, 137, 56,1)",
      data: [65, 59, 90, 81],
    },
    {
      label: "Ma concurrence",
      backgroundColor: "rgba(6, 214, 160,0)",
      borderColor: "rgba(6, 214, 160,1)",
      pointBackgroundColor: "rgba(6, 214, 160,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(6, 214, 160,1)",
      data: [28, 48, 40, 19],
    },
  ],
};

let options = {
  plugins: {
    datalabels: {
      display: false,
    },
  },
  scale: {
    pointLabels: {
      fontStyle: "bold",
      fontSize: 14,
    },
    ticks: {
      max: 5,
      min: 0,
      stepSize: 1,
      showLabelBackdrop: false,
    },
    gridLines: {
      color: ["white", "white", "white", "white"],
    },
    legend: {
      align: "start",
      labels: {
        fontColor: "#fff",
      },
    },
  },
};

export default function TrustRadar(props) {
  const { myHospital, myCompetition } = props;
  config.datasets[0].data = myHospital;
  config.datasets[1].data = myCompetition;
  return (
    <div className="trust-chart">
      <h3>Score confiance</h3>
      <Radar
        data={config}
        options={options}
        width={600}
        height={400}
        className="graphRadar"
      />
    </div>
  );
}
