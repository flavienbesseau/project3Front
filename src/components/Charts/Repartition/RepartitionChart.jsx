import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../../../contexts/ProvideAuth";
import axios from "axios";
import { Polar } from "react-chartjs-2";
import { repartitionLabels, repartitionColors } from "./RepartitionData";

export default function RepartitionChart() {
  const [repartitionFeedback, setRepartitionFeedback] = useState(null);

  const { userLogin } = useContext(authContext);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/repartition-chart/${userLogin.hospital}`)
      .then((res) =>
        setRepartitionFeedback([
          res.data.hospWithBloc,
          res.data.hospWithoutBloc,
          res.data.ambWithoutBloc,
          res.data.ambWithBloc,
          res.data.emergencies,
          res.data.maternities,
        ])
      );
  }, []);

  return (
    <div className="repartition-chart">
      <h3>Repartition</h3>
      <div className="repartition-chart-graph">
        <Polar
          data={{
            labels: repartitionLabels,
            datasets: [
              {
                data: repartitionFeedback,
                backgroundColor: repartitionColors,
              },
            ],
          }}
          width={600}
          height={400}
          options={{
            maintainAspectRatio: false,
            legend: {
              align: 'start',
              labels: {
                fontColor: '#fff',
              }
            }
          }}
        />
      </div>
    </div>
  );
}
