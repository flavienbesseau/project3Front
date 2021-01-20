import React, { useState, useEffect, useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Registration from "./Registration";
import Login from "./Login";
import { authContext } from "../../contexts/ProvideAuth";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState("");

  const [loginUser, setLoginUser] = useState({
    emailToLogin: "",
    passwordToLogin: "",
  });

  const [createdAccount, setCreatedAccount] = useState(false);
  const [userHasAccount, setUserHasAccount] = useState(true);

  axios.defaults.withCredentials = true;

  let history = useHistory();

  const { setConnected } = useContext(authContext);

  const register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/register", {
        name: name,
        email: email,
        password: userpassword,
        passwordConfirmation: passwordConfirmation,
        fk_user_role_id: 1,
        fk_hospital_id: 1,
      })
      .then((res) => {
        setCreatedAccount(res.data.createdAccount)
        setName("");
        setEmail("");
        setUserpassword("");
        setPasswordConfirmation("");
        setErrors('');
      })
      .catch((error) =>
        setErrors({
          path: error.response.data.err.params.path,
          message: error.response.data.err.errors,
        })
      );
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/login").then((res) => {
      console.log("Connected: ", res.data.loggedIn);
      if (res.data.loggedIn === true) {
        setConnected(true);
      }
    });
  }, []);

  let match = useRouteMatch();

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", {
        email: loginUser.emailToLogin,
        password: loginUser.passwordToLogin,
      })
      .then((res) => {
        console.log("You are connected: ", res.data.email);
        if (res.status === 200) {
          setConnected(true);
          history.push(`${match.url}/dashboard/${res.data.id}`);
        }
      });
  };

  return (
    <div className="form-container">
      {userHasAccount ? (
        <Login
          login={login}
          loginUser={loginUser}
          setUserHasAccount={setUserHasAccount}
          setLoginUser={setLoginUser}
        />
      ) : (
        <Registration
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          userpassword={userpassword}
          setUserpassword={setUserpassword}
          register={register}
          createdAccount={createdAccount}
          setUserHasAccount={setUserHasAccount}
          passwordConfirmation={passwordConfirmation}
          setPasswordConfirmation={setPasswordConfirmation}
          errors={errors}
        />
      )}
    </div>
  );
}
