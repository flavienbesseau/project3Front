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
            const url = `http://localhost:${backPort}/api/surveys/responses`;
            axios({
              method: "post",
              url: url,
              data: Object.values(results),
            }).then(() => setSubmitting(false));
          }, 500);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className='survey-container'>
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
                <Field type="text" name="pseudo" placeholder="Jean Drenod" className='pseudo'></Field>
                <h3>Adresse e-mail</h3>
                <Field type="input" name="email" placeholder="jean.drenod@gmail.com" className='email'></Field>
              </div>
              <div className="send-button">
                <button type="submit" disabled={isSubmitting} className='survey-button'>
                Envoyer les réponses
                </button>
              </div>
            </div>
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
