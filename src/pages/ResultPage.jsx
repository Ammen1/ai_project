import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResultPage = () => {
  const [response, setResponse] = useState(null);
  const [diseases, setDiseases] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/prediction/${id}/`
        );
        const data = await response.json();
        setResponse(data);

        // Fetch all diseases
        const diseasesResponse = await fetch(
          `http://127.0.0.1:8000/api/user/all_diseases/`
        );
        const diseasesData = await diseasesResponse.json();

        // Filter diseases based on names from prediction
        const diseaseNames = data.diseases.map((disease) => disease.name);
        const filteredDiseases = diseasesData.filter((disease) =>
          diseaseNames.includes(disease.name)
        );
        setDiseases(filteredDiseases);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!response || !diseases.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap mt-32 ml-12 justify-center">
      <div className="card">
        <h1>Original image</h1>
        <img src={response.image} alt="Prediction" className="card-image" />
        <div className="card-content">
          <h1 className="font-bold text-white">
            <span className=" text-black">Diseases:</span>{" "}
            {response.diseases_summary}
          </h1>

          <h1 className="font-bold text-white">
            <span className=" text-black">Severity:</span>{" "}
            {(response.severity * 100).toFixed(2)}{" "}
            <span className=" font-poppins text-red-700 font-bold">%</span>
          </h1>
          <h1 className="font-bold text-white">
            <span className=" text-black">Date:</span> {response.date}
          </h1>

          <ul>
            {diseases.map((disease) => (
              <li key={disease.id}>{disease.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
