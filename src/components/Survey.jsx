import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";
import backPort from "../const";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Formik, Field } from "formik";
import { formatResponses } from "../utils";
import { connect } from "react-redux";

function Survey(props) {
  const [questions, setQuestions] = useState([]);
  const history = useHistory();
  const getQuestions = () => {
    const url = `http://localhost:${backPort}/api/survey?experienceId=${props.experienceId}`;
    axios
      .get(url)
      .then((res) => res.data)

      .then((questionsArr) => {
        setQuestions(questionsArr);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []); //pas de re render avec les crochets

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          const results = formatResponses(
            values,
            props.hospitalId,
            props.experienceId,
            props.specialtyId
          );
          const url = `http://localhost:${backPort}/api/surveys/responses`;
          axios({
            method: "post",
            url: url,
            data: Object.values(results),
          })
            .then(() => setSubmitting(false))
            .then(() => history.push("/"));
        }, 500);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className="survey-container">
          <h1>Questionnaire</h1>
          {questions.map((item) => (
            <Question
              id={item.id}
              text_rating={item.text_rating}
              text_comment={item.text_comment}
            />
          ))}
          <div className="sending-form">
            <div className="identification-form">
              <h3>Pseudonyme</h3>
              <Field
                type="text"
                name="pseudo"
                placeholder="Jean Drenod"
                className="pseudo"
              ></Field>
              <h3>Adresse e-mail</h3>
              <Field
                type="input"
                name="email"
                placeholder="jean.drenod@gmail.com"
                className="email"
              ></Field>
            </div>
            <div className="send-button">
              <button
                type="submit"
                disabled={isSubmitting}
                className="survey-button"
              >
                Envoyer les réponses
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

const mapStateToProps = (state) => {
  return {
    experienceId: state.experienceId,
    specialtyId: state.specialtyId,
    hospitalId: state.hospitalId,
  };
};

export default connect(mapStateToProps)(Survey);
