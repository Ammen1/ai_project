import React, { useEffect, useState } from "react";
import Prediction from "./Prediction"; // Make sure this import points to the correct file

const FilteredPredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { diseaseName } = match.params;

  useEffect(() => {
    const fetchFilteredPredictions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/post/}`);

        const data = await response.json();
        setPredictions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    fetchFilteredPredictions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Predictions for Disease: {}</h2>
      {predictions.map((prediction) => (
        <Prediction key={prediction.id} prediction={prediction} />
      ))}
      <div>hi guys</div>
    </div>
  );
};

export default FilteredPredictions;
