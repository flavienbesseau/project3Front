import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Hospital } from "../assets/hospital.svg";
import { ReactComponent as Private } from "../assets/private.svg";
import { ReactComponent as Bell } from "../assets/paper.svg";
import { ReactComponent as Paper } from "../assets/bell.svg";
import Navbar from "./Header/Navbar";

export default function Home() {
  return (
    <div className="body">
      <Navbar />
      <div className="donnetonavis">
        <Hospital />
        <p>Sur un séjour à l'hôpital ou dans une clinique</p>
        <Link to={"/PreSurvey"} className="btn-grad">
          Donnez votre avis
        </Link>
      </div>
      <div className="nombreavis">
        <p>1000 avis par jour</p>
        <p>1 millions d'avis</p>
      </div>
      <div>
        <div className="bigbox">
          <div className="box">
            <Private />
            <p>
              Votre participation est 100 % anonyme. Nous ne collectons ni votre
              nom, ni votre ville ...
            </p>
          </div>
          <div className="box">
            <Bell />
            <p>
              Vous pouvez visualiser vos résultats par rapport à une moyenne,
              nous poser une question, être mis en relation près de chez vous.
            </p>
          </div>
          <div className="box">
            <Paper />
            <p>
              Vous continuez à faire changer les pratiques et les adapter aux
              besoins réels des patients. Vous aidez également les autres grâce
              au partage de votre parcours de vie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
