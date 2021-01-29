import React, { Component } from "react";
import axios from "axios";
import ChartJs from "./ChartJs";
import backPort from "../const";
import { Chart } from "react-chartjs-2";
import { authContext } from "../contexts/ProvideAuth";

const ALL = "all";

class DataChart extends Component {
  static contextType = authContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedExperience: "all",
      selectedSpecialty: "all",
      selectedPostDateStart: "all",
      selectedPostDateEnd: "all",
      experiences: [],
      specialties: [],
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

  getExperiences() {
    const url = `http://localhost:${backPort}/api/experiences`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((experiencesArray) =>
        this.setState({ experiences: experiencesArray })
      );
  }

  getSpecialties() {
    const url = `http://localhost:${backPort}/api/specialties`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((specialtiesArray) =>
        this.setState({ specialties: specialtiesArray })
      );
  }

  getResponses() {
    const { userLogin } = this.context;
    const {
      selectedExperience,
      selectedSpecialty,
      selectedPostDateStart,
      selectedPostDateEnd,
    } = this.state;
    const url = new URL(
      `http://localhost:${backPort}/api/informationsgenerales/${userLogin.hospital}`
    );
    if (selectedExperience !== ALL) {
      url.searchParams.append("experienceId", selectedExperience); //creer le query params    ?experienceId=selectedExperience
    }
    if (selectedSpecialty !== ALL) {
      url.searchParams.append("specialtyId", selectedSpecialty);
    }
    if (selectedPostDateStart !== ALL) {
      url.searchParams.append("postDateStart", selectedPostDateStart);
    }
    if (selectedPostDateEnd !== ALL) {
      url.searchParams.append("postDateEnd", selectedPostDateEnd);
    }

    axios
      .get(url.href)
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

  onClickChangeExperience = (e) => {
    const newExperience = e.target.value;
    this.setState({
      selectedExperience: newExperience,
    });
  };

  onClickChangeSpecialties = (e) => {
    const newSpecialty = e.target.value;
    this.setState({
      selectedSpecialty: newSpecialty,
    });
  };

  onClickChangeStartDate = (e) => {
    const newStartDate = e.target.value;
    this.setState({
      selectedPostDateStart: newStartDate,
    });
  };

  onClickChangeEndDate = (e) => {
    const newEndDate = e.target.value;
    this.setState({
      selectedPostDateEnd: newEndDate,
    });
  };

  componentDidMount() {
    this.getResponses();
    this.getExperiences();
    this.getSpecialties();
  }

  componentDidUpdate(prevProps, prevState) {
    // Utilisation classique (pensez bien à comparer les props) :
    if (this.state.selectedExperience !== prevState.selectedExperience) {
      this.getResponses();
    } else if (this.state.selectedSpecialty !== prevState.selectedSpecialty) {
      this.getResponses();
    } else if (
      this.state.selectedPostDateStart !== prevState.selectedPostDateStart
    ) {
      this.getResponses();
    } else if (
      this.state.selectedPostDateEnd !== prevState.selectedPostDateEnd
    ) {
      this.getResponses();
    }
  }

  componentWillMount() {
    // Limit the size of the labels on the x axis
    Chart.scaleService.updateScaleDefaults("category", {
      ticks: {
        callback: function (tick) {
          var characterLimit = 25;
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
    const {
      selectedExperience,
      selectedSpecialty,
      specialties,
      experiences,
      selectedPostDateStart,
      selectedPostDateEnd,
    } = this.state;
    return (
      <div className="general-information">
        <div
          className={
            this.props.openFilter
              ? "general-information-filter"
              : "general-information-filter-none"
          }
        >
          <div className="general-information-filter-experiences">
            <select
              name="experience"
              id="experience"
              onChange={this.onClickChangeExperience}
              value={selectedExperience}
            >
              <option value="all">Tous</option>
              {experiences.map((xp) => (
                <option value={xp.id}>{xp.name}</option>
              ))}
            </select>
          </div>
          <div className="general-information-filter-specialties">
            <select
              name="specialties"
              id="specialties"
              onChange={this.onClickChangeSpecialties}
              value={selectedSpecialty}
            >
              <option value="all">Tous</option>
              {specialties.map((specialty) => (
                <option value={specialty.id}>{specialty.name}</option>
              ))}
            </select>
          </div>
          <div className="general-information-filter-date-start">
            <input
              type="date"
              id="postDateStart"
              name="postDateStart"
              min="1000-01-01"
              onChange={this.onClickChangeStartDate}
              value={selectedPostDateStart}
            ></input>
          </div>
          <div className="general-information-filter-date-end">
            <input
              type="date"
              id="postDateEnd"
              name="postDateEnd"
              min="1000-01-01"
              onChange={this.onClickChangeEndDate}
              value={selectedPostDateEnd}
            ></input>
          </div>
        </div>
        <ChartJs data={this.state} />
      </div>
    );
  }
}

export default DataChart;
