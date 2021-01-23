import React, { useState, useEffect, useContext, useReducer } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Registration from "./Registration";
import Login from "./Login";
import { authContext } from "../../contexts/ProvideAuth";

import { loginReducer } from "../../reducers/actions/loginReducer";
import { initialLoginState } from "../../reducers/store/initialLoginState";

export default function Form() {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);
  const {
    emailToLogin,
    passwordToLogin,
    name,
    email,
    userpassword,
    passwordConfirmation,
    hospitalChoice,
    errors,
  } = state;

  const [createdAccount, setCreatedAccount] = useState(false);
  const [userHasAccount, setUserHasAccount] = useState(true);

  const [hospitals, setHospitals] = useState(null);

  axios.defaults.withCredentials = true;

  let history = useHistory();

  const { setUserLogin } = useContext(authContext);

  useEffect(() => {
    const fetchUserLogin = async () => {
      try {
        const log = await axios(`http://localhost:5000/api/login`);
        const fetchHospitals = await axios(`http://localhost:5000/api/hospitals`)
        console.log('connected: ', log.data.loggedIn);
        console.log('hospitals: ', fetchHospitals.data);
        log.data.loggedIn && setUserLogin({ connected : true })
        fetchHospitals.data && setHospitals(fetchHospitals.data)
      }
      catch(error) {
        console.log('fetchUserLogin: ', error);
      }
    }
    fetchUserLogin();
  }, [setUserLogin])

  const register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/register", {
        name: name,
        email: email,
        password: userpassword,
        passwordConfirmation: passwordConfirmation,
        fk_hospital_id: hospitalChoice,
        fk_user_role_id: 1,
      })
      .then((res) => {
        setCreatedAccount(res.data.createdAccount);
        dispatch({ type: "validate" });
      })
      .catch((error) =>
        dispatch({
          type: "register-errors",
          path: error.response.data.err.params.path,
          message: error.response.data.err.errors,
        })
      );
  };

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/login")
  //   .then((res) => {
  //     console.log("Connected: ", res.data.loggedIn);
  //     if (res.data.loggedIn) {
  //       setUserLogin({ connected: true });
  //     }
  //   });
  // }, [setUserLogin]);x

  let match = useRouteMatch();

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", {
        email: emailToLogin,
        password: passwordToLogin,
      })
      .then((res) => {
        console.log("You are connected: ", res.data.email);
        if (res.status === 200) {
          setUserLogin({
            connected: true,
            name: res.data.name,
            hospital: res.data.fk_hospital_id,
          });
          history.push(`${match.url}/dashboard/${res.data.id}`);
        }
      });
  };

  return (
    <div className="form-container">
      {userHasAccount ? (
        <Login
          login={login}
          setUserHasAccount={setUserHasAccount}
          emailToLogin={emailToLogin}
          passwordToLogin={passwordToLogin}
          dispatch={dispatch}
        />
      ) : (
        <Registration
          name={name}
          email={email}
          userpassword={userpassword}
          passwordConfirmation={passwordConfirmation}
          errors={errors}
          dispatch={dispatch}
          register={register}
          createdAccount={createdAccount}
          setUserHasAccount={setUserHasAccount}
          hospitals={hospitals}
        />
      )}
    </div>
  );
}
