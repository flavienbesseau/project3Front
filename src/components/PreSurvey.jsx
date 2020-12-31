import React, { Component } from "react";
import { Link } from "react-router-dom";
import backPort from "../const";

import axios from "axios";

class PreSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitalId: undefined,
      specialtyId: undefined,
      experienceId: undefined,
      hospitals: [],
      specialties: [],
      experiences: [],
    };
    this.handleHospital = this.handleHospital.bind(this);
    this.handleSpecialty = this.handleSpecialty.bind(this);
    this.handleExperience = this.handleExperience.bind(this);
  }

  getHospitals() {
    const url = `http://localhost:${backPort}/api/hospitals`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((hospitalsArray) => this.setState({ hospitals: hospitalsArray }));
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

  getExperiences() {
    const url = `http://localhost:${backPort}/api/experiences`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((experiencesArray) =>
        this.setState({ experiences: experiencesArray })
      );
  }

  handleHospital(event) {
    this.setState({ hospitalId: event.target.value });
  }

  handleSpecialty(event) {
    this.setState({ specialtyId: event.target.value });
  }

  handleExperience(event) {
    this.setState({ experienceId: event.target.value });
  }

  componentDidMount() {
    this.getHospitals();
    this.getSpecialties();
    this.getExperiences();
  }

  render() {
    const { hospitals, specialties, experiences, experienceId } = this.state;
    return (
      <div>
        <h1>Pré-questionnaire</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20rem",
            textAlign: "center",
          }}
        >
          <label for="hospital-select">Hopital</label>
          <select
            name="hospital"
            id="hospital-select"
            onChange={this.handleHospital}
          >
            <option value="hospital">Choisissez un hopital</option>

            {hospitals.map((hospital) => (
              <option value={hospital.id}>{hospital.name}</option>
            ))}
          </select>

          <label for="specialties-select">Spécialité</label>
          <select
            name="specialties"
            id="specialties-select"
            onChange={this.handleSpecialty}
          >
            <option value="specialty">Choisissez une spécialité</option>
            {specialties.map((specialty) => (
              <option value={specialty.id}>{specialty.name}</option>
            ))}
          </select>

          <label for="experiences-select">Type d'hospitalisation</label>
          <select
            name="experiences"
            id="experiences-select"
            onChange={this.handleExperience}
          >
            <option value="experience">
              Choisissez votre type d'hospitalisation
            </option>
            {experiences.map((experience) => (
              <option value={experience.id}>{experience.name}</option>
            ))}
          </select>
          <Link to={`/survey/${experienceId}`}>Remplir le questionnaire</Link>
        </div>
      </div>
    );
  }
}

export default PreSurvey;
