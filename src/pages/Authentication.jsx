import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../axios";
const Authentication = () => {
  const [userCount, setUserCount] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/api/user/userdetail/")
  //     .then((response) => {
  //       setUserCount(response.data.user_count);
  //     })
  //     .catch((error) => {
  //       console.error("this na error from ferching the data :", error);
  //     });
  // }, []);

  useEffect(() => {
    axiosInstance
      .get("user/userdetail/")
      .then((response) => {
        const allpost = response.data.user_count;
        setUserCount(allpost);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error was happen infront you:", error);
      });
  }, []);

  if (loading) {
    <dikv>Loading ...</dikv>;
  }
  // useEffect(() => {
  //   const Amen = async () => {
  //     try {
  //       const res = await fetch("http://127.0.0.1:8000/api/user/userdetail/");
  //       const data = await response.json();
  //       setUserCount(data.user_count);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error Fetching Prediction:", error);
  //     }
  //   };

  //   Amen();
  // }, []);
  return (
    <div className=" text-center animate-ping text-secondary">
      {userCount !== null ? <div> {userCount}</div> : <p>Loading...</p>}
    </div>
  );
};

export default Authentication;
