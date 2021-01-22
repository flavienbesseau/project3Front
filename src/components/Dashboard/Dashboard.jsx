import React, { useState } from "react";
import logo from "../../assets/hospitalidee-logo.png";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="dashboard-header-menu"
        >
          <span />
          <span />
          <span />
        </div>
        <ul className={isOpen ? "routes-links-open" : "routes-links"}>
          <img src={logo} alt="" />
          <li>
            <a href="#">Paramètres</a>
          </li>
          <li>
            <a href="#">Mon profil</a>
          </li>
          <li>
            <a href="#">Déconnexion</a>
          </li>
        </ul>
        <img src={logo} alt="" />
      </div>

      <div className="dashboard-sidebar">
        <img src={logo} alt="" />
        <li>Tableau de bord</li>
        <li>Mon profil</li>
        <li>Enquêtes E-statis</li>
        <li>Avis des patients</li>
        <li>Questionnaire de sortie</li>
        <li>Demandes des patients</li>
        <li>Avis HOSTOLIB</li>
        <li>Evaluation QUALIPSO</li>
        <li>DECONNEXION</li>
      </div>
      <div className="dashboard-general-informations"></div>
      <div className="dashboard-confidence-score"></div>
      <div className="dashboard-repartition"></div>
      <div className="dashboard-this-month"></div>
    </div>
  );
}
