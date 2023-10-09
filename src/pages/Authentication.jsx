import React, { useEffect, useState } from "react";
import axios from "axios";
const Authentication = () => {
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/userdetail/")
      .then((response) => {
        setUserCount(response.data.user_count);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className=" text-center">
      {userCount !== null ? <div> {userCount}</div> : <p>Loading...</p>}
    </div>
  );
};

export default Authentication;
