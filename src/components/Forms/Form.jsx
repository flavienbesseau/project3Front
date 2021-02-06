import React, { useState, useEffect, useContext, useReducer } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import axios from "../../services/axios-config";
import Registration from "./Registration";
import Login from "./Login";
import { authContext } from "../../contexts/ProvideAuth";
import { loginReducer } from "../../reducers/actions/loginReducer";
import { initialLoginState } from "../../reducers/store/initialLoginState";

export default function Form() {
  axios.defaults.withCredentials = true;

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
  const [hospitals, setHospitals] = useState([]);
  const { setUserLogin } = useContext(authContext);

  // useEffect(() => {
  //   const fetchUserLogin = async () => {
  //     try {
  //       const log = await axios(`/api/login`);
  //       log.data.loggedIn && setUserLogin({ connected: true });
  //     } catch (error) {
  //       console.log("fetchUserLogin: ", error);
  //     }
  //   };
  //   fetchUserLogin();
  // }, [setUserLogin]);

  useEffect(() => {
    const getHospitalsScores = async () => {
      try {
        const hospitalsScores = await axios(`/api/hospitals`);
        hospitalsScores.data && setHospitals(hospitalsScores.data);
      } catch (error) {
        console.log("hospitalsScores: ", error);
      }
    };
    getHospitalsScores();
  }, []);

  const register = (e) => {
    e.preventDefault();
    axios
      .post("/api/register", {
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
      .catch((error) => {
        dispatch({
          type: "register-errors",
          path: error.response.data.err.params.path,
          message: error.response.data.err.errors,
        })
      }
      );
  };

  const match = useRouteMatch();
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", {
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
          hospitalChoice={hospitalChoice}
        />
      )}
    </div>
  );
}
