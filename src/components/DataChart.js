import React, { Component } from "react";
import axios from "axios";
import ChartJs from "./ChartJs";
import backPort from "../const";
import { Chart } from "react-chartjs-2";

class DataChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "Note sur 5",
          data: [1.9, 3.2, 2.6, 4.33],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    };
  }

  getResponses() {
    axios
      .get(
        `http://localhost:${backPort}/api/informationsgenerales/${this.props.match.params.hospitalId}`
      )
      .then((response) => response.data)
      .then((responsesArray) =>
        this.setState({
          labels: responsesArray.map((response) => response.textRating),
          datasets: [
            {
              label: "Note sur 5",
              data: responsesArray.map((donnees) => donnees.meanScore),
              backgroundColor: [
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(50,205,50, 0.9)",
              ],
              borderWidth: 1,
            },
          ],
        })
      );
  }

  componentDidMount() {
    this.getResponses();
  }

  componentWillMount() {
    // Limit the size of the labels on the x axis
    Chart.scaleService.updateScaleDefaults("category", {
      ticks: {
        callback: function (tick) {
          var characterLimit = 30;
          if (tick.length >= characterLimit) {
            return (
              tick
                .slice(0, tick.length)
                .substring(0, characterLimit - 1)
                .trim() + "..."
            );
          }
          return tick;
        },
      },
    });
  }

  render() {
    return <ChartJs data={this.state} />;
  }
}

export default DataChart;
