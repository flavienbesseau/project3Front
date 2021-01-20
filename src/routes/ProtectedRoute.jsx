import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../contexts/ProvideAuth";

export default function ProtectedRoute({ children, ...rest }) {
  const { connected } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={() => {
        return connected === true ? (
          children
        ) : (
          <Redirect to="/authentication" />
        );
      }}
    />
  );
}
