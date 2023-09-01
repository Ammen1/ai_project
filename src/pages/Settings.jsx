import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../index.css";

const Settings = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of predictions from the API
    axios
      .get(`http://127.0.0.1:8000/api/user/all_diseases/`)
      .then((response) => {
        setPredictions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching predictions:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Sort predictions by date in descending order
  const sortedPredictions = predictions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="flex flex-wrap mt-32 ml-12 ">
      {sortedPredictions.map((prediction) => (
        <div key={prediction.id} className="card">
          <h1>Prdicted image</h1>
          <Link to={`/result/${prediction.id}`}>
            <img
              src={prediction.predictedImage}
              alt="Prediction"
              className="card-image  "
            />
          </Link>
          <div className="card-content">
            <h1 className="font-bold">
              <span className="text-red-900 text-gradient ">Severity:</span>{" "}
              {prediction.severity}
            </h1>
            <h1 className="font-bold">
              <span className="text-gray-800 text-gradient ">diseases=</span>{" "}
              {prediction.diseases_summary}
            </h1>
            <h1 className="font-bold">
              <span className="text-gray-800 text-gradient ">Date:</span>{" "}
              {prediction.date}
            </h1>
            <p>
              Diseases:{" "}
              {prediction.diseases
                ? prediction.diseases.map((disease) => disease.id).join(", ")
                : "No diseases"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Settings;
