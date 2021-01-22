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
      essai: [],
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
              backgroundColor: responsesArray.map((data) => {
                if (0 < data.meanScore && data.meanScore < 2) {
                  return "#e85050";
                } else if (2 <= data.meanScore && data.meanScore < 3) {
                  return "#fa8938";
                } else if (3 <= data.meanScore && data.meanScore < 4) {
                  return "#fdc500";
                } else {
                  return "#2fb750";
                }
              }),
              borderColor: responsesArray.map((data) => {
                if (0 < data.meanScore && data.meanScore < 2) {
                  return "#e85050";
                } else if (2 <= data.meanScore && data.meanScore < 3) {
                  return "#fa8938";
                } else if (3 <= data.meanScore && data.meanScore < 4) {
                  return "#fdc500";
                } else {
                  return "#2fb750";
                }
              }),
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
