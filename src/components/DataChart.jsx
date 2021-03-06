import React, { Component } from "react";
import axios from "../services/axios-config";
import ChartJs from "./ChartJs";
import { authContext } from "../contexts/ProvideAuth";

const ALL = "all";

class DataChart extends Component {
  static contextType = authContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedExperience: "all",
      selectedSpecialty: "all",
      selectedPostDateStart: undefined,
      selectedPostDateEnd: undefined,
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
          barThickness: 20,
          padding: 100,
        },
      ],
    };
  }

  getExperiences() {
    const url = `/api/experiences`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((experiencesArray) =>
        this.setState({ experiences: experiencesArray })
      );
  }

  getSpecialties() {
    const url = `/api/specialties`;
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
      `${
        process.env.REACT_APP_BASE_URL || "http://localhost:5000"
      }/api/informationsgenerales/${userLogin.hospital}`
    );
    if (selectedExperience !== ALL) {
      url.searchParams.append("experienceId", selectedExperience); //creer le query params    ?experienceId=selectedExperience
    }
    if (selectedSpecialty !== ALL) {
      url.searchParams.append("specialtyId", selectedSpecialty);
    }
    if (selectedPostDateStart) {
      url.searchParams.append("postDateStart", selectedPostDateStart);
    }
    if (selectedPostDateEnd) {
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

  render() {
    const {
      selectedExperience,
      selectedSpecialty,
      specialties,
      experiences,
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
              <option value="all">Types d'hospitalisation</option>
              {experiences.map((xp) => (
                <option key={xp.id} value={xp.id}>
                  {xp.name}
                </option>
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
              <option value="all">Spécialités</option>
              {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
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
              // value={selectedPostDateStart}
            ></input>
          </div>
          <div className="general-information-filter-date-end">
            <input
              type="date"
              id="postDateEnd"
              name="postDateEnd"
              min="1000-01-01"
              onChange={this.onClickChangeEndDate}
              // value={selectedPostDateEnd}
            ></input>
          </div>
        </div>
        <h3 className="datachart-title">Informations générales</h3>
        <ChartJs data={this.state} />
      </div>
    );
  }
}

export default DataChart;
