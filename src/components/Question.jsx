import React from "react";

import { Field } from "formik";

const Question = (props) => (
  <div>
    <div>
      <p>{props.text_rating}</p>
      <div id="my-radio-group"></div>
      <div role="group" aria-labelledby="my-radio-group">
        <label>
          <Field type="radio" name={props.id + "-score"} value="1" />1
        </label>
        <label>
          <Field type="radio" name={props.id + "-score"} value="2" />2
        </label>
        <label>
          <Field type="radio" name={props.id + "-score"} value="3" />3
        </label>
        <label>
          <Field type="radio" name={props.id + "-score"} value="4" />4
        </label>
        <label>
          <Field type="radio" name={props.id + "-score"} value="5" />5
        </label>
      </div>
    </div>

    <label htmlFor="commentaires"></label>
    <Field
      id={props.id}
      type="input"
      name={props.id + "-text_answer"}
      placeholder={props.text_comment}
      // onChange={props.handleChange}
      // onBlur={props.handleBlur}
    ></Field>
  </div>
);

export default Question;
