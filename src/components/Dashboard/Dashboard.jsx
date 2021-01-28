import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/hospitalidee-logo.png";
import hospitalideeLogo from "../../assets/hospitalidee-transparent.png";
import RepartitionChart from "../Charts/Repartition/RepartitionChart";
import sidebarData from "./Sidebar";
import Feedbacks from "./Feedbacks";
import DataChart from "../DataChart";
import ThisMonth from "./ThisMonth";

export default function Dashboard() {
  const [isTheMenuOpen, setIsTheMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const escModal = (e) => {
    e.key === "Escape" && setFeedback(false);
  };

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
          <img src={hospitalideeLogo} alt="" />
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
        <img src={hospitalideeLogo} alt="" />
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
        <div className="feedbacks-button">
          <div
            className="feedbacks-button-filter"
            onClick={() => setOpenFilter(!openFilter)}
          >
            <i className="fas fa-filter" />
            <span>Filtres</span>
          </div>
          <button
            type="button"
            onClick={(e) => setFeedback(!feedback)}
            onKeyDown={escModal}
          >
            Avis
          </button>
        </div>
        {feedback && (
          <Feedbacks feedback={feedback} setFeedback={setFeedback} />
        )}
        <DataChart openFilter={openFilter} />
      </div>

      <div className="dashboard-confidence-score"></div>
      <div className="dashboard-repartition">
        <RepartitionChart />
      </div>
      <div className="dashboard-this-month">
        <ThisMonth />
      </div>
    </div>
  );
}
