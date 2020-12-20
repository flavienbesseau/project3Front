import React from "react";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  }

  if (!values.fullName) {
    errors.fullName = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      {formik.errors.username ? <div>{formik.errors.username}</div> : null}
      <label htmlFor="fullName">FullName</label>
      <input
        id="fullName"
        name="fullName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.fullName}
      />
      {formik.errors.fullName ? <div>{formik.errors.fullName}</div> : null}
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
