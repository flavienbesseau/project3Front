import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../contexts/ProvideAuth";

export default function ProtectedRoute({ children, ...rest }) {
  const { userLogin } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={() => {
        return userLogin.connected === true ? (
          children
        ) : (
          <Redirect to="/authentication" />
        );
      }}
    />
  );
}
