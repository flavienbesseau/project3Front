import React, { useState, useEffect, Fragment } from "react";
import axios from "../services/axios-config";
import Question from "./Question";
import Navbar from "./Header/Navbar";
import { useHistory } from "react-router-dom";

import { Formik, Field } from "formik";
import { formatResponses } from "../utils";
import { connect } from "react-redux";

const validate = (values) => {
  const errors = {};
  console.log(values);
  if (!values.pseudo) {
    errors.pseudo = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (Object.keys(values).length <= 2) {
    errors.answers = "Veuillez remplir au moins un champ";
  }
  return errors;
};

function Survey(props) {
  const [questions, setQuestions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const url = `/api/survey?experienceId=${props.experienceId}`;
    axios
      .get(url)
      .then((res) => res.data)
      .then((questionsArr) => {
        setQuestions(questionsArr);
      });
  }, [props.experienceId]); //pas de re render avec les crochets

  return (
    <Fragment>
      <Navbar />
      <Formik
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          pseudo: "",
          email: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("ON SUBMIT", values);
          setTimeout(() => {
            const results = formatResponses(
              values,
              props.hospitalId,
              props.experienceId,
              props.specialtyId
            );
            const url = `/api/surveys/responses`;
            axios({
              method: "post",
              url: url,
              data: Object.values(results),
            })
              .then(() => setSubmitting(false))
              .then(() => alert("Merci d'avoir répondu à l'enquête!"))
              .then(() => history.push("/"))
              .catch(() => setSubmitting(false));
          }, 500);
        }}
      >
        {({ handleSubmit, isSubmitting, errors, touched }) => (
          <form onSubmit={handleSubmit} className="survey-container">
            <h1>Questionnaire</h1>
            {questions.map((item) => (
              <Question
                id={item.id}
                text_rating={item.text_rating}
                text_comment={item.text_comment}
                key={item.id}
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
                />
                <p className="field_missing">
                  {errors.pseudo && <div>{errors.pseudo}</div>}
                </p>

                <h3>Adresse e-mail</h3>
                <Field
                  type="input"
                  name="email"
                  placeholder="jean.drenod@gmail.com"
                  className="email"
                />
                <p className="field_missing">
                  {errors.email && <div>{errors.email}</div>}
                </p>
              </div>
              <div className="send-button">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="survey-button"
                >
                  Envoyer les réponses
                </button>
                <p className="field_missing">
                  {errors.answers && <div>{errors.answers}</div>}
                </p>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Fragment>
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
