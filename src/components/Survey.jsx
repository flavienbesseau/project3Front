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
    const { questions } = this.state;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const url = `http://localhost:5000/api/surveys/${id}`;
    axios
      .get(url)
      .then((res) => res.data)
      .then((questionsArr) => {
        console.log(questionsArr);
        this.setState({ questions: questionsArr });
      });
  }

  componentDidMount() {
    console.log(this.props);
    this.getQuestions();
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <h1>Titre du questionnaire</h1>
        {questions.map((item) => (
          <Question
            text_rating={item.text_rating}
            text_comment={item.text_comment}
          />
        ))}
        <button type="submit">Envoyer les réponses</button>
      </div>
    );
  }
}

export default Survey;

// .map((item) => (
//   <LiDetails key={item.id}>{item.name}</LiDetails>
// ))
