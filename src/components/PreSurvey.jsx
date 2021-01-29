import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import backPort from "../const";
import Navbar from "./Header/Navbar";

class PreSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    // Dispatch an action to redux, equivalent to setState presque
    this.props.updateHospitalId(event.target.value);
  }

  handleSpecialty(event) {
    // Dispatch an action to redux, equivalent to setState presque
    this.props.updateSpecialtyId(event.target.value);
  }

  handleExperience(event) {
    // Dispatch an action to redux, equivalent to setState presque
    this.props.updateExperienceId(event.target.value);
  }

  componentDidMount() {
    this.getHospitals();
    this.getSpecialties();
    this.getExperiences();
  }

  render() {
    const { hospitals, specialties, experiences } = this.state;
    return (
      <div className="prequest">
        <Navbar />
        <h1>Pré-questionnaire</h1>
        <div className="prequest-hospital-selection">
          <label for="hospital-select" />
          <select
            name="hospital"
            id="hospital-select"
            onChange={this.handleHospital}
          >
            <option>Choisissez un hopital</option>

            {hospitals.map((hospital) => (
              <option value={hospital.id}>{hospital.name}</option>
            ))}
          </select>

          <label for="specialties-select" />
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

          <label for="experiences-select" />
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
          <Link to={`/survey`} className="btn-grad">
            Donnez votre avis
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateExperienceId: (id) =>
    dispatch({ type: "UPDATE_EXPERIENCE_ID", id: id }),
  updateHospitalId: (id) => dispatch({ type: "UPDATE_HOSPITAL_ID", id: id }),
  updateSpecialtyId: (id) => dispatch({ type: "UPDATE_SPECIALTY_ID", id: id }),
});

export default connect(null, mapDispatchToProps)(PreSurvey);
