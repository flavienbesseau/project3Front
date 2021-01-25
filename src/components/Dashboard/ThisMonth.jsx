import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../../contexts/ProvideAuth";

export default function ThisMonth() {
  const [totalAverage, setTotalAverage] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const { userLogin } = useContext(authContext);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/averageHospital/${userLogin.hospital}`)
      .then((res) => res.data)
      .then((data) => setTotalAverage(data[0]));
  }, []);
  let average = totalAverage.score;
  average = parseFloat(average).toFixed(2);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/countReviews/${userLogin.hospital}`)
      .then((res) => res.data)
      .then((data) => setTotalCount(data[0]));
  }, []);

  return (
    <div>
      <h1>This month</h1>
      <p>{totalCount.count} avis</p>
      <p>Note: {average}/5 ⭐</p>
    </div>
  );
}
