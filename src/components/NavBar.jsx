import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
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
      </div>
    );
  }
}

export default NavBar;
