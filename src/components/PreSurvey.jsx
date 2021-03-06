import axios from "../services/axios-config";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Header/Navbar";

class PreSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitals: [],
      specialties: [],
      experiences: [],
      errorMessage: false,
    };
    this.handleHospital = this.handleHospital.bind(this);
    this.handleSpecialty = this.handleSpecialty.bind(this);
    this.handleExperience = this.handleExperience.bind(this);
  }

  getHospitals() {
    const url = `/api/hospitals`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((hospitalsArray) => this.setState({ hospitals: hospitalsArray }));
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

  getExperiences() {
    const url = `/api/experiences`;
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
    const { hospitalId, specialtyId, experienceId } = this.props;
    return (
      <div className="prequest">
        <Navbar />
        <h1>Pré-questionnaire</h1>
        <div className="prequest-hospital-selection">
          <label htmlFor="hospital-select" />
          <select
            name="hospital"
            id="hospital-select"
            onChange={this.handleHospital}
          >
            <option>Choisissez un hôpital</option>

            {hospitals.map((hospital) => (
              <option key={hospital.id} value={hospital.id}>
                {hospital.name}
              </option>
            ))}
          </select>

          <label htmlFor="specialties-select" />
          <select
            name="specialties"
            id="specialties-select"
            onChange={this.handleSpecialty}
          >
            <option value="specialty">Choisissez une spécialité</option>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name}
              </option>
            ))}
          </select>

          <label htmlFor="experiences-select" />
          <select
            name="experiences"
            id="experiences-select"
            onChange={this.handleExperience}
          >
            <option value="experience">
              Choisissez votre type d'hospitalisation
            </option>
            {experiences.map((experience) => (
              <option key={experience.id} value={experience.id}>
                {experience.name}
              </option>
            ))}
          </select>
          {hospitalId && specialtyId && experienceId ? (
            <Link to={`/survey`} className="btn-grad">
              Donnez votre avis
            </Link>
          ) : (
            <div className="errorHandler">
              <button
                className="btn-grad"
                onClick={() => this.setState({ errorMessage: true })}
              >
                Donnez votre avis
              </button>
              {this.state.errorMessage === true ? (
                <p>Remplissez les 3 champs</p>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    experienceId: state.experienceId,
    specialtyId: state.specialtyId,
    hospitalId: state.hospitalId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateExperienceId: (id) =>
    dispatch({ type: "UPDATE_EXPERIENCE_ID", id: id }),
  updateHospitalId: (id) => dispatch({ type: "UPDATE_HOSPITAL_ID", id: id }),
  updateSpecialtyId: (id) => dispatch({ type: "UPDATE_SPECIALTY_ID", id: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreSurvey);
