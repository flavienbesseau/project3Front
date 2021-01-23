import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Polar } from 'react-chartjs-2';
import { repartitionLabels, repartitionColors } from './RepartitionData';

export default function RepartitionChart() {
  const [repartitionFeedback, setRepartitionFeedback] = useState(null);

  const { hospitalid } = useParams();
  console.log(hospitalid)
  useEffect(() => {
    axios.get(`http://localhost:5000/api/repartition-chart/${hospitalid}`)
      .then(res => setRepartitionFeedback([
        res.data.hospWithBloc,
        res.data.hospWithoutBloc,
        res.data.ambWithoutBloc, 
        res.data.ambWithBloc, 
        res.data.emergencies,
        res.data.maternities 
      ]))
  }, [])

  return(
    <div className="repartition-chart">
      <Polar
        data= {{
          labels: repartitionLabels,
          datasets: [
            {
              data: repartitionFeedback,
              backgroundColor: repartitionColors,              
            },
          ]
        }}
        width={600}
        height={400}
        options={{ 
          maintainAspectRatio: false, 
        }}
      />
    </div>
  );
}