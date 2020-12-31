import React, { Component } from "react";
import axios from "axios";
import Question from "./Question";
import backPort from "../const";
import { Formik } from "formik";
import { formatResponses } from "../utils";

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  getQuestions() {
    const {
      match: {
        params: { experienceId },
      },
    } = this.props;
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
    return (
      <Formik
        initialValues={{}}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const results = formatResponses(values);
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
            <button type="submit" disabled={isSubmitting}>
              Envoyer les réponses
            </button>
          </form>
        )}
      </Formik>
    );
  }
}

export default Survey;
