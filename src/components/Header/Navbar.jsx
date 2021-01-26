import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/hospitalidee-logo.png";

export default function Navbar() {
  const history = useHistory();

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <img src={logo} alt="" onClick={() => history.push('/')}/>
      </div>
      <div className="navbar-connection">
        <button onClick={() => history.push("/authentication")}>
          Se connecter / S'inscrire
        </button>
      </div>
    </div>
  );
}
