import React from "react";
import logo from "../../assets/hospitalidee-logo.png";

export default function Registration({
  login,
  setUserHasAccount,
  loginUser,
  setLoginUser,
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
            name="emailToLogin"
            value={loginUser.emailToLogin}
            onChange={(e) => {
              setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div className="password-login">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="passwordToLogin"
            value={loginUser.passwordToLogin}
            onChange={(e) => {
              setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div
          className={
            loginUser.passwordToLogin.length === 0 ||
            loginUser.emailToLogin.length === 0
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
