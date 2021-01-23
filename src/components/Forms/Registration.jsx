import React, { Fragment } from "react";
import logo from "../../assets/hospitalidee-logo.png";

export default function Registration({
  name,
  email,
  userpassword,
  passwordConfirmation,
  errors,
  dispatch,
  register,
  createdAccount,
  setUserHasAccount,
  hospitals,
  hospitalChoice
}) {

  return (
    <div className="registration-container">
      <img src={logo} alt="" className="logo" />
      <form onSubmit={register}>
        <select
          className='select-register'
          value={hospitalChoice}
          onChange={(e) =>
            dispatch({
              type: "register",
              registerField: "hospitalChoice",
              registerValue: e.target.value,
            })
          }
        >
          {hospitals.map((hospital) => (
            <Fragment key={hospital.id}>
              <option value={hospital.id}>{hospital.name}</option>
            </Fragment>
          ))}
        </select>
        <div className="name-register">
          <label htmlFor="name-register">Prénom et Nom</label>
          <input
            type="text"
            id="name-register"
            value={name}
            onChange={(e) =>
              dispatch({
                type: "register",
                registerField: "name",
                registerValue: e.target.value,
              })
            }
          />
          {errors
            ? errors.path.includes("name") && (
                <span className="errors-input">{errors.message}</span>
              )
            : null}
        </div>
        <div className="username-register">
          <label htmlFor="username-register">Email</label>
          <input
            type="text"
            id="username-register"
            value={email}
            onChange={(e) =>
              dispatch({
                type: "register",
                registerField: "email",
                registerValue: e.target.value,
              })
            }
          />
          {errors
            ? errors.path.includes("email") && (
                <span className="errors-input">{errors.message}</span>
              )
            : null}
        </div>
        <div className="password-register">
          <label htmlFor="password-register">Mot de passe</label>
          <input
            type="password"
            id="password-register"
            value={userpassword}
            onChange={(e) =>
              dispatch({
                type: "register",
                registerField: "userpassword",
                registerValue: e.target.value,
              })
            }
          />
          {errors
            ? errors.path.includes("password") && (
                <span className="errors-input">{errors.message}</span>
              )
            : null}
        </div>
        <div className="password-register">
          <label htmlFor="password-validation">
            Confirmation du mot de passe
          </label>
          <input
            type="password"
            id="password-validation"
            value={passwordConfirmation}
            onChange={(e) =>
              dispatch({
                type: "register",
                registerField: "passwordConfirmation",
                registerValue: e.target.value,
              })
            }
          />
          {errors
            ? errors.path.includes("passwordConfirmation") && (
                <span className="errors-input">{errors.message}</span>
              )
            : null}
        </div>
        <div className={errors ? "button-register-error" : "button-register"}>
          <button type="submit">Créer un compte</button>
        </div>
      </form>

      <div className="login-register">
        <button onClick={() => setUserHasAccount(true)}>Se connecter</button>
      </div>
      <div className="account-container">
        {createdAccount ? (
          <span>Votre compte a bien été enregistré.</span>
        ) : null}
      </div>
    </div>
  );
}
