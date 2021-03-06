import axios from "../../services/axios-config";
import React, { useEffect, useState } from "react";
import CommentsByQuestions from "./CommentsByQuestions";
import useCloseModal from "../../hooks/useCloseModal";

export default function Feedbacks({ feedback, setFeedback }) {
  const [listOfQuestions, setListOfQuestions] = useState(null);
  const [getFeedbacks, setGetFeedbacks] = useState(null);

  let refModal = useCloseModal(() => {
    setFeedback(false);
  });

  useEffect(() => {
    const getQuestionsFeedbacks = async () => {
      try {
        const getQuestions = await axios(`/api/questions`);
        setListOfQuestions(getQuestions.data);
      } catch (error) {
        console.log("getQuestionsFeedbacks: ", error);
      }
    };

    getQuestionsFeedbacks();
  }, []);

  return (
    <div className="feedback-background">
      <div className="feedback-container" ref={refModal}>
        <i
          className="fas fa-times-circle"
          id="esc-modal"
          onClick={() => {
            setFeedback(!feedback);
          }}
        />
        <h2>Choississez la question pour acceder aux verbatims</h2>
        {listOfQuestions &&
          listOfQuestions.map((question) => (
            <div key={question.id}>
              <li
                onClick={() => {
                  setGetFeedbacks({ status: true, id: question.id });
                }}
                className={
                  getFeedbacks
                    ? "feedbacks-questions-disappear"
                    : "feedbacks-questions"
                }
              >
                <p>{question.text_rating}</p>
              </li>
            </div>
          ))}
        {getFeedbacks && (
          <CommentsByQuestions
            setGetFeedbacks={setGetFeedbacks}
            id={getFeedbacks.id}
            setListOfQuestions={setListOfQuestions}
          />
        )}
      </div>
    </div>
  );
}
