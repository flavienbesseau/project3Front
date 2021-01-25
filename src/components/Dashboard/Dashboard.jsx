import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/hospitalidee-logo.png";
import RepartitionChart from "../Charts/Repartition/RepartitionChart";
import sidebarData from "./Sidebar";
import Feedbacks from "./Feedbacks";
import DataChart from "../DataChart";

export default function Dashboard() {
  const [isTheMenuOpen, setIsTheMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState(false);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div
          onClick={() => setIsTheMenuOpen(!isTheMenuOpen)}
          className="dashboard-header-menu"
        >
          <span />
          <span />
          <span />
        </div>
        <ul className={isTheMenuOpen ? "routes-links-open" : "routes-links"}>
          <img src={logo} alt="" />
          <li>
            <a href="/nowhere">Paramètres</a>
          </li>
          <li>
            <a href="nowhere">Mon profil</a>
          </li>
          <li>
            <a href="/nowhere">Déconnexion</a>
          </li>
        </ul>
        <img src={logo} alt="" />
      </div>
      <div className="dashboard-sidebar">
        <img src={logo} alt="" />
        {sidebarData.map((link, index) => (
          <Link to={link.path}>
            <li key={index} className={link.style}>
              {link.title}
            </li>
          </Link>
        ))}
      </div>

      <div className="dashboard-general-informations">
        <DataChart />
        <button type="button" onClick={() => setFeedback(!feedback)}>
          Commentaires
        </button>
        {feedback && (
          <Feedbacks feedback={feedback} setFeedback={setFeedback} />
        )}
      </div>

      <div className="dashboard-confidence-score"></div>
      <div className="dashboard-repartition">
        <RepartitionChart />
      </div>
      <div className="dashboard-this-month"></div>
    </div>
  );
}
