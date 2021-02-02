import React, { Component } from "react";

import { Field } from "formik";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ ...this.state.value, value: event.target.value });
  }

  render() {
    const { id, text_comment, text_rating } = this.props;
    return (
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
          onChange={this.handleChange}
          id={id}
          type="input"
          name={id + "-text_answer"}
          placeholder={text_comment}
          className="comments"
        ></Field>
      </div>
    );
  }
}

export default Question;
