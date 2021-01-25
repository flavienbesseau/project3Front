import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Feedbacks({ feedback, setFeedback }) {
  const [listOfQuestions, setListOfQuestions] = useState(null);

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const getQuestions = await axios(`http://localhost:5000/api/questions`);
        setListOfQuestions(getQuestions.data);
      } catch (error) {
        console.log("getFeedbacks: ", error);
      }
    };
    getFeedbacks();
  }, []);

  return (
    <div className="feedback-background">
      <div className="feedback-container">
        <i className="fas fa-times-circle" onClick={() => setFeedback(!feedback)} />
        <h2>Listes des questions</h2>
        {listOfQuestions &&
          listOfQuestions.map((question) => (
            <li key={question.id}>{question.text_rating}</li>
          ))}
      </div>
    </div>
  );
}
