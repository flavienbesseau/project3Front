import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Hospital } from "../pictures/hospital.svg";
import { ReactComponent as Private } from "../pictures/private.svg";
import { ReactComponent as Bell } from "../pictures/paper.svg";
import { ReactComponent as Paper } from "../pictures/bell.svg";

export default function Home() {
  return (
    <div className="body">
      <div className="donnetonavis">
        <Hospital />
        <p>Sur un sejour à l'hôpital ou dans une clinique</p>
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
              nous poser une question, être mise en relation près de chez vous.
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