import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/hospitalidee-logo.png";
import hospitalideeLogo from "../../assets/hospitalidee-transparent.png";
import RepartitionChart from "../Charts/Repartition/RepartitionChart";
import DataTrustRadar from "./DataTrustRadar";
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
          {sidebarData.map((link, index) => (
            <Link key={index} to={link.path}>
              <li className={link.style}>{link.title}</li>
            </Link>
          ))}
        </ul>
        <img src={hospitalideeLogo} alt="" />
      </div>
      <div className="dashboard-sidebar">
        <img src={logo} alt="" />
        {sidebarData.map((link, index) => (
          <Link key={index} to={link.path}>
            <li className={link.style}>{link.title}</li>
            <i className={link.logo} />
          </Link>
        ))}
      </div>
      <div
        className={
          isTheMenuOpen
            ? "dashboard-general-informations-disable"
            : "dashboard-general-informations"
        }
      >
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

      <div
        className={
          isTheMenuOpen
            ? "dashboard-confidence-score-disable"
            : "dashboard-confidence-score"
        }
      >
        <DataTrustRadar />
      </div>
      <div
        className={
          isTheMenuOpen
            ? "dashboard-repartition-disable"
            : "dashboard-repartition"
        }
      >
        <RepartitionChart />
      </div>
      <div
        className={
          isTheMenuOpen
            ? "dashboard-this-month-disable"
            : "dashboard-this-month"
        }
      >
        <ThisMonth />
      </div>
    </div>
  );
}
