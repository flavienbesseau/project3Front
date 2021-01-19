import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../pictures/logoHospitalidee.png";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="navbar">
        <Link to="/">
          <img className="logosite" src={logo} alt="logo" />
        </Link>

        <div class="container">
          <div class="row">
            <h2 className="titlesearch">
              Cherchez un établissement ou une spécialité
            </h2>
            <div class="search">
              <input
                type="text"
                class="form-control input-sm"
                maxlength="64"
                placeholder="Hôpital, clinique, ..."
              />
              <button type="submit" class="btn btn-primary btn-sm">
                🔍
              </button>
            </div>
          </div>
        </div>
        <button className="buttonconnection">Connexion / Inscription</button>
      </div>
    );
  }
}

export default NavBar;
