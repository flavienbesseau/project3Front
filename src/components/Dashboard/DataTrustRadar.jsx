import React, { useState, useContext, useEffect } from "react";
import axios from "../../services/axios-config";
import TrustRadar from "./TrustRadar";
import { authContext } from "../../contexts/ProvideAuth";

export default function DataTrustRadar() {
  const [skills, setSkills] = useState([]);
  const [skillsCompetition, setSkillsCompetition] = useState([]);
  const [reliability, setReliability] = useState([]);
  const [reliabilityCompetition, setReliabilityCompetition] = useState([]);
  const [transparency, setTransparency] = useState([]);
  const [transparencyCompetition, setTransparencyCompetition] = useState([]);
  const [relation, setRelation] = useState([]);
  const [relationCompetition, setRelationCompetition] = useState([]);

  const [myHospital, setMyHospital] = useState([0, 0, 0, 0]);
  const [myCompetition, setMyCompetition] = useState([0, 0, 0, 0]);

  const { userLogin } = useContext(authContext);

  useEffect(() => {
    axios
      .get(`/api/scoreConfiance/skills/${userLogin.hospital}`)
      .then((res) => res.data)
      .then((data) => setSkills(Number(data[0].score).toFixed(2)));
  }, [userLogin.hospital]);
  useEffect(() => {
    axios
      .get(`/api/scoreConfiance/reliability/${userLogin.hospital}`)
      .then((res) => res.data)
      .then((data) => setReliability(Number(data[0].score).toFixed(2)));
  }, [userLogin.hospital]);
  useEffect(() => {
    axios
      .get(`/api/scoreConfiance/transparency/${userLogin.hospital}`)
      .then((res) => res.data)
      .then((data) => setTransparency(Number(data[0].score).toFixed(2)));
  }, [userLogin.hospital]);
  useEffect(() => {
    axios
      .get(`/api/scoreConfiance/relation/${userLogin.hospital}`)
      .then((res) => res.data)
      .then((data) => setRelation(Number(data[0].score).toFixed(2)));
  }, [userLogin.hospital]);

  useEffect(() => {
    axios
      .get(`/api/scoreConfiance/Competitionskills/${userLogin.hospital}`)
      .then((res) => res.data)
      .then((data) => setSkillsCompetition(Number(data[0].score).toFixed(2)));
  }, [userLogin.hospital]);
  useEffect(() => {
    axios
      .get(`/api/scoreConfiance/Competitionreliability/${userLogin.hospital}`)
      .then((res) => res.data)
      .then((data) =>
        setReliabilityCompetition(Number(data[0].score).toFixed(2))
      );
  }, [userLogin.hospital]);
  useEffect(() => {
    axios
      .get(`/api/scoreConfiance/Competitiontransparency/${userLogin.hospital}`)
      .then((res) => res.data)
      .then((data) =>
        setTransparencyCompetition(Number(data[0].score).toFixed(2))
      );
  }, [userLogin.hospital]);
  useEffect(() => {
    axios
      .get(`/api/scoreConfiance/Competitionrelation/${userLogin.hospital}`)
      .then((res) => res.data)
      .then((data) => setRelationCompetition(Number(data[0].score).toFixed(2)));
  }, [userLogin.hospital]);

  useEffect(() => {
    setMyHospital([skills, reliability, transparency, relation]);
  }, [skills, reliability, transparency, relation]);

  useEffect(() => {
    setMyCompetition([
      skillsCompetition,
      reliabilityCompetition,
      transparencyCompetition,
      relationCompetition,
    ]);
  }, [
    skillsCompetition,
    reliabilityCompetition,
    transparencyCompetition,
    relationCompetition,
  ]);

  return (
    <div>
      <TrustRadar myHospital={myHospital} myCompetition={myCompetition} />
    </div>
  );
}
