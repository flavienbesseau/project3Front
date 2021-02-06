import React from "react";
import logo from "../../assets/hospitalidee-logo.png";

export default function Registration({
  login,
  setUserHasAccount,
  emailToLogin,
  passwordToLogin,
  dispatch,
  loginError
}) {
  
  return (
    <div className="login-container">
      <img src={logo} alt="" className="logo" />
      <form onSubmit={login}>
        <div className="email-login">
          <label htmlFor="email-to-login">Email</label>
          <input
            type="text"
            id="email-to-login"
            value={emailToLogin}
            onChange={(e) => {
              dispatch({
                type: "login",
                field: "emailToLogin",
                value: e.target.value,
              });
            }}
          />
          { loginError === 500 && <span className='email-incorrect'>Email invalide</span>}
        </div>
        <div className="password-login">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={passwordToLogin}
            onChange={(e) => {
              dispatch({
                type: "login",
                field: "passwordToLogin",
                value: e.target.value,
              });
            }}
          />
          { loginError === 403 && <span className='password-incorrect'>Mot de passe incorrect</span>}
        </div>
        <div
          className={
            passwordToLogin.length === 0 || emailToLogin.length === 0
              ? "button-login-error"
              : "button-login"
          }
        >
          <button type="submit">Se connecter</button>
        </div>
      </form>
      <div className="login-register">
        <button onClick={() => setUserHasAccount(false)}>
          Créer un compte
        </button>
      </div>
    </div>
  );
}
