import React, { Component } from "react";
import axios from "axios";
import Question from "./Question";

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
    const url = `http://localhost:5002/api/survey?experienceId=${experienceId}`;
    axios
      .get(url)
      .then((res) => res.data)
      .then((questionsArr) => {
        console.log(questionsArr);
        this.setState({ questions: questionsArr });
      });
  }

  submitResponses() {
    const url = "/api/surveys/responses";
    axios({
      method: "post",
      url: url,
      data: {
        fdfdfd: undefined,
      },
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  componentDidMount() {
    console.log(this.props);
    this.getQuestions();
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <form onSubmit={this.submitResponses}>
          <h1>Titre du questionnaire</h1>
          {questions.map((item) => (
            <Question
              text_rating={item.text_rating}
              text_comment={item.text_comment}
            />
          ))}
          <button type="submit">Envoyer les réponses</button>
        </form>
      </div>
    );
  }
}

export default Survey;

// .map((item) => (
//   <LiDetails key={item.id}>{item.name}</LiDetails>
// ))
