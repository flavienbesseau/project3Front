import React, { useEffect, useState, useContext } from "react";
import axios from "../../services/axios-config";
import { authContext } from "../../contexts/ProvideAuth";

export default function CommentsByQuestions({ id, setGetFeedbacks }) {
  const [listOfFeedbacks, setListOfFeedbacks] = useState([]);
  const { userLogin } = useContext(authContext);

  useEffect(() => {
    axios
      .post(`/api/feedbacks`, {
        hospitalid: userLogin.hospital,
        questionid: id,
      })
      .then((res) => setListOfFeedbacks(res.data))
      .catch((error) => console.log("CommentsByQuestions: ", error));
  }, [id, userLogin.hospital]);

  return (
    <div className="comments-by-questions-container">
      <i
        class="fas fa-arrow-left"
        id="return"
        onClick={() => {
          setGetFeedbacks(false);
        }}
      />
      <h2>Verbatims</h2>
      {listOfFeedbacks &&
        listOfFeedbacks.map((feedback) => (
          <div key={feedback.id} className="comments-by-questions">
            <div className="comments-by-questions-user">
              <i className="fas fa-user-circle" />
              <h3>{feedback.pseudo}</h3>
            </div>
            <div className="comments-by-questions-answer">
              <div className="comments-by-questions-answer-rating">
                <span>{feedback.score}/5</span>
                <i
                  class="fas fa-star"
                  className={
                    feedback.score >= 1
                      ? "fas fa-star star-rating-yellow"
                      : "fas fa-star star-rating-none"
                  }
                />
                <i
                  class="fas fa-star"
                  className={
                    feedback.score >= 2
                      ? "fas fa-star star-rating-yellow"
                      : "fas fa-star star-rating-none"
                  }
                />
                <i
                  class="fas fa-star"
                  className={
                    feedback.score >= 3
                      ? "fas fa-star star-rating-yellow"
                      : "fas fa-star star-rating-none"
                  }
                />
                <i
                  class="fas fa-star"
                  className={
                    feedback.score >= 4
                      ? "fas fa-star star-rating-yellow"
                      : "fas fa-star star-rating-none"
                  }
                />
                <i
                  class="fas fa-star"
                  className={
                    feedback.score >= 5
                      ? "fas fa-star star-rating-yellow"
                      : "fas fa-star star-rating-none"
                  }
                />
              </div>
              <div className="comments-by-questions-answer-feedback">
                <p>{feedback.text_answer}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
