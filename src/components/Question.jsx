import React, { Component } from "react";

import { Formik, Field, Form } from "formik";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div>
          <p>{this.props.text_rating}</p>
          <Formik
            initialValues={{
              picked: "",
            }}
            // onSubmit={async (values) => {
            //   await new Promise((r) => setTimeout(r, 500));
            //   alert(JSON.stringify(values, null, 2));
            // }}
          >
            {({ values }) => (
              <Form>
                <div id="my-radio-group"></div>
                <div role="group" aria-labelledby="my-radio-group">
                  <label>
                    <Field type="radio" name="picked" value="One" />1
                  </label>
                  <label>
                    <Field type="radio" name="picked" value="Two" />2
                  </label>
                  <label>
                    <Field type="radio" name="picked" value="Three" />3
                  </label>
                  <label>
                    <Field type="radio" name="picked" value="Four" />4
                  </label>
                  <label>
                    <Field type="radio" name="picked" value="Five" />5
                  </label>
                  {/* <div>Picked: {values.picked}</div> */}
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <input placeholder={this.props.text_comment}></input>
      </div>
    );
  }
}

export default Question;
