import React, { Component } from "react";
import axios from "axios";
import Question from "./Question";
import backPort from "../const";
import { Formik, Field } from "formik";
import { formatResponses } from "../utils";
import { connect } from "react-redux";

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  getQuestions() {
    const { experienceId } = this.props;
    const url = `http://localhost:${backPort}/api/survey?experienceId=${experienceId}`;
    axios
      .get(url)
      .then((res) => res.data)
      .then((questionsArr) => {
        this.setState({ questions: questionsArr });
      });
  }

  submitResponses() {
    // const url = "/api/surveys/responses";
    // axios({
    //   method: "post",
    //   url: url,
    //   data: {
    //     fdfdfd: undefined,
    //   },
    // });
  }

  componentDidMount() {
    this.getQuestions();
  }

  render() {
    const { questions } = this.state;
    const { experienceId, hospitalId, specialtyId } = this.props;
    return (
      <Formik
        initialValues={{}}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const results = formatResponses(
              values,
              hospitalId,
              experienceId,
              specialtyId
            );
            console.log(results);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <h1>Titre du questionnaire</h1>
            {questions.map((item) => (
              <Question
                id={item.id}
                text_rating={item.text_rating}
                text_comment={item.text_comment}
                // handleChange={handleChange}
                // handleBlur={handleBlur}
              />
            ))}
            <label htmlFor="commentaires"></label>
            <Field
              id="pseudo"
              type="text"
              name="pseudo"
              placeholder="Votre pseudo"
            />
            <button type="submit" disabled={isSubmitting}>
              Envoyer les réponses
            </button>
          </form>
        )}
      </Formik>
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

export default connect(mapStateToProps)(Survey);
