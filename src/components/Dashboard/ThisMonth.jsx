import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../../contexts/ProvideAuth";
import { ReactComponent as Plus } from "../../ressources/plus.svg";
import { ReactComponent as NorthEast } from "../../ressources/northEast.svg";
import { ReactComponent as SouthEast } from "../../ressources/southEast.svg";
import { ReactComponent as Cup } from "../../ressources/cup.svg";
import { ReactComponent as Medal } from "../../ressources/medal.svg";

const greenPlus = <Plus style={{ fill: "#64C67D" }} />;
const renderAverageScore = (score) => (
  <div>
    {score <= 1.49 ? (
      <div>
        {greenPlus}
        <Plus /> <Plus /> <Plus /> <Plus />
      </div>
    ) : (
      ""
    )}
    {score > 1.49 && score <= 2.49 ? (
      <div>
        {greenPlus} {greenPlus}
        <Plus /> <Plus /> <Plus />
      </div>
    ) : (
      ""
    )}
    {score >= 2.5 && score <= 3.49 ? (
      <div>
        {greenPlus} {greenPlus} {greenPlus}
        <Plus /> <Plus />
      </div>
    ) : (
      ""
    )}
    {score >= 3.5 && score <= 4.49 ? (
      <div>
        {greenPlus} {greenPlus} {greenPlus} {greenPlus}
        <Plus />
      </div>
    ) : (
      ""
    )}
    {score >= 4.5 ? (
      <div>
        {greenPlus} {greenPlus} {greenPlus} {greenPlus} {greenPlus}
      </div>
    ) : (
      ""
    )}
  </div>
);

export default function ThisMonth() {
  const [totalAverage, setTotalAverage] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [doctorRelation, setDoctorRelation] = useState([]);
  const [doctorRelationPast, setDoctorRelationPast] = useState([]);
  const [healthTeam, setHealthTeam] = useState([]);
  const [healthTeamPast, setHealthTeamPast] = useState([]);
  const [explanationsInformations, setExplanationsInformations] = useState([]);
  const [
    explanationsInformationsPast,
    setExplanationsInformationsPast,
  ] = useState([]);
  const [organisation, setOrganisation] = useState([]);
  const [organisationPast, setOrganisationPast] = useState([]);
  const { userLogin } = useContext(authContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/averageHospital/${userLogin.hospital}`)
      .then((res) => res.data)
      .then((data) => setTotalAverage(data[0]));
  }, []);
  let average = totalAverage.score;
  average = parseFloat(average).toFixed(2);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/countReviews/${userLogin.hospital}`)
      .then((res) => res.data)
      .then((data) => setTotalCount(data[0]));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/averageThisMonth/doctorsRelation/${userLogin.hospital}`
      )
      .then((res) => res.data)
      .then((data) => setDoctorRelation(data[0]));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/averageThisMonth/doctorsRelationPast/${userLogin.hospital}`
      )
      .then((res) => res.data)
      .then((data) => setDoctorRelationPast(data[0]));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/averageThisMonth/healthTeam/${userLogin.hospital}`
      )
      .then((res) => res.data)
      .then((data) => setHealthTeam(data[0]));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/averageThisMonth/healthTeamPast/${userLogin.hospital}`
      )
      .then((res) => res.data)
      .then((data) => setHealthTeamPast(data[0]));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/averageThisMonth/explanationsInformations/${userLogin.hospital}`
      )
      .then((res) => res.data)
      .then((data) => setExplanationsInformations(data[0]));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/averageThisMonth/explanationsInformationsPast/${userLogin.hospital}`
      )
      .then((res) => res.data)
      .then((data) => setExplanationsInformationsPast(data[0]));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/averageThisMonth/organisation/${userLogin.hospital}`
      )
      .then((res) => res.data)
      .then((data) => setOrganisation(data[0]));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/averageThisMonth/organisationPast/${userLogin.hospital}`
      )
      .then((res) => res.data)
      .then((data) => setOrganisationPast(data[0]));
  }, []);

  return (
    <div className="thisMonth">
      <h3 className="pMonth">Ce mois-ci</h3>
      <p className="review">{totalCount.count} avis</p>
      <p className="review">Note: {average}/5</p>
      <i
        class="fas fa-star"
        className={
          average >= 1
            ? "fas fa-star star-rating-yellow"
            : "fas fa-star star-rating-none"
        }
      />
      <i
        class="fas fa-star"
        className={
          average >= 1.95
            ? "fas fa-star star-rating-yellow"
            : "fas fa-star star-rating-none"
        }
      />
      <i
        class="fas fa-star"
        className={
          average >= 2.95
            ? "fas fa-star star-rating-yellow"
            : "fas fa-star star-rating-none"
        }
      />
      <i
        class="fas fa-star"
        className={
          average >= 3.95
            ? "fas fa-star star-rating-yellow"
            : "fas fa-star star-rating-none"
        }
      />
      <i
        class="fas fa-star"
        className={
          average >= 4.95
            ? "fas fa-star star-rating-yellow"
            : "fas fa-star star-rating-none"
        }
      />
      <div className="recordVolume">
        <Cup />
        <p className="pRecordVolume">Record de volume en Occitanie</p>
      </div>
      <div className="recordVolume">
        <Medal />
        <p className="pRecordVolume">N°1 en Chirugie cardiaque</p>
      </div>
      <div>
        <div className="progressionBox">
          <h2>Relation avec les médecins</h2>
          <div className="progressionItem">
            {renderAverageScore(doctorRelation.score)}
            {doctorRelationPast.score < doctorRelation.score ? (
              <NorthEast fill="#64C67D" />
            ) : (
              <SouthEast fill="red" />
            )}
          </div>
        </div>
        <div className="progressionBox">
          <h2>Relation avec le personnel soignant</h2>
          <div className="progressionItem">
            {renderAverageScore(healthTeam.score)}
            {healthTeamPast.score < doctorRelation.score ? (
              <NorthEast fill="#64C67D" />
            ) : (
              <SouthEast fill="red" />
            )}
          </div>
        </div>
        <div className="progressionBox">
          <h2>Explications, informations</h2>
          <div className="progressionItem">
            {renderAverageScore(explanationsInformations.score)}
            {explanationsInformationsPast.score <
            explanationsInformations.score ? (
              <NorthEast fill="#64C67D" />
            ) : (
              <SouthEast fill="red" />
            )}
          </div>
        </div>
        <div className="progressionBox">
          <h2>Organisation des services</h2>
          <div className="progressionItem">
            {renderAverageScore(organisation.score)}
            {organisationPast.score < organisation.score ? (
              <NorthEast fill="#64C67D" />
            ) : (
              <SouthEast fill="red" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
