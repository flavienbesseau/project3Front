import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Feedbacks() {
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
    <div className="feedback-container">
      {listOfQuestions &&
        listOfQuestions.map((question) => (
          <li key={question.id}>{question.text_rating}</li>
        ))}
    </div>
  );
}
