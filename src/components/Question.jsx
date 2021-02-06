import React from "react";
import { Field } from "formik";

const Question = ({ id, text_comment, text_rating }) => (
  <div className="questions-container">
    <div>
      <div>
        <p>{text_rating}</p>
      </div>
      <div id="my-radio-group"></div>
      <div role="group" aria-labelledby="my-radio-group" className="radio">
        <label>
          <Field type="radio" name={id + "-score"} value="1" />1
        </label>
        <label>
          <Field type="radio" name={id + "-score"} value="2" />2
        </label>
        <label>
          <Field type="radio" name={id + "-score"} value="3" />3
        </label>
        <label>
          <Field type="radio" name={id + "-score"} value="4" />4
        </label>
        <label>
          <Field type="radio" name={id + "-score"} value="5" />5
        </label>
      </div>
    </div>
    <label htmlFor="commentaires"></label>
    <Field
      id={id}
      type="input"
      name={id + "-text_answer"}
      placeholder={text_comment}
      className="comments"
    />
  </div>
);

export default Question;
