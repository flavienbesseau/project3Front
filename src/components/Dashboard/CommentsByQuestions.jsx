import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { authContext } from '../../contexts/ProvideAuth';

export default function CommentsByQuestions({ id, setGetFeedbacks }) {
  const [listOfFeedbacks, setListOfFeedbacks] = useState(null);
  const { userLogin } = useContext(authContext);

  useEffect(() => {
    axios.post(`http://localhost:5000/api/feedbacks`, {
      hospitalid: userLogin.hospital,
      questionid: id,
    })
      .then(res => setListOfFeedbacks(res.data))
      .catch(error => console.log('CommentsByQuestions: ', error));
  }, [])


  return(
    <div className="comments-by-questions-container">
       <i class="fas fa-arrow-left" id='return' onClick={() => setGetFeedbacks(false)} />
       <h2>Commentaires</h2>
      { 
        listOfFeedbacks &&
        listOfFeedbacks.map(feedback => (
          <div key={feedback.id} className="comments-by-questions">
            <div className="comments-by-questions-user">
              <i className="fas fa-user-circle" />
              <h3>{feedback.pseudo}</h3>
            </div>
            <div className="comments-by-questions-answer">
              <div className="comments-by-questions-answer-rating">
                <span>{feedback.score}/5</span>
                <i class="fas fa-star" />
                <i class="fas fa-star" />
                <i class="fas fa-star" />
                <i class="fas fa-star" />
                <i class="fas fa-star" />
              </div>
              <div className="comments-by-questions-answer-feedback">
                <p>{feedback.text_answer}</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}