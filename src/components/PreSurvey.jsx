import React, { Component } from "react";
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
  }

  getHospitals() {
    const url = "http://localhost:5000/api/hospitals";
    axios
      .get(url)
      .then((response) => response.data)
      .then((hospitalsArray) => this.setState({ hospitals: hospitalsArray }));
  }

  getSpecialties() {
    const url = "http://localhost:5000/api/specialties";
    axios
      .get(url)
      .then((response) => response.data)
      .then((specialtiesArray) =>
        this.setState({ specialties: specialtiesArray })
      );
  }

  getExperiences() {
    const url = "http://localhost:5000/api/experiences";
    axios
      .get(url)
      .then((response) => response.data)
      .then((experiencesArray) =>
        this.setState({ experiences: experiencesArray })
      );
  }

  componentDidMount() {
    this.getHospitals();
    this.getSpecialties();
    this.getExperiences();
  }

  render() {
    const { hospitals, specialties, experiences } = this.state;
    return (
      <div>
        <h1>Pré-questionnaire</h1>

        <label for="hospital-select">Choisissez un hopital</label>
        <select name="hospital" id="hospital-select">
          {hospitals.map((hospital) => (
            <option value={hospital.id}>{hospital.name}</option>
          ))}
        </select>

        <label for="specialties-select">Choisissez une spécialité</label>
        <select name="specialties" id="specialties-select">
          {specialties.map((specialty) => (
            <option value={specialty.id}>{specialty.name}</option>
          ))}
        </select>

        <label for="experiences-select">
          Choisissez le type d'hospitalisation
        </label>
        <select name="experiences" id="experiences-select">
          {experiences.map((experience) => (
            <option value={experience.id}>{experience.name}</option>
          ))}
        </select>
        <button type="submit">Envoyer</button>
      </div>
    );
  }
}

export default PreSurvey;
