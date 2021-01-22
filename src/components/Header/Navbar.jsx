import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/logoHospitalidee.png";

export default function Navbar() {
  const history = useHistory();

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <img src={logo} alt="" />
      </div>
      <div className="navbar-connection">
        <button onClick={() => history.push("/authentication")}>
          Se connecter
        </button>
      </div>
    </div>
  );
}
