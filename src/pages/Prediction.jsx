import React from "react";

const Prediction = ({ prediction }) => {
  const { id, imageName, severity, diseases } = prediction;

  return (
    <div className="prediction">
      <h3>Prediction ID: {id}</h3>
      <p>Image Name: {imageName}</p>
      <p>Severity: {severity}</p>
      <p>Diseases:</p>
      <ul>
        {diseases.map((disease) => (
          <li key={disease.id}>{disease.name}</li>
        ))}
      </ul>
      <div>hi</div>
    </div>
  );
};

export default Prediction;
