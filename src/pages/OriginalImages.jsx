import React, { useEffect, useState } from "react";
import Posts from "../admin/posts";
import PostLoadingComponent from "../posts/postLoading";
import axiosInstance from "../axios";
import "../index.css";
import axios from "axios";

const DetectedImage = () => {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
  });
  const [usernames, setUsernames] = useState({}); // State to store the usernames

  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/deseaseDetail/")
      .then((response) => {
        setUserCount(response.data.desease_count);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className=" text-center">
      {userCount !== null ? (
        <div>Total Deseases: {userCount}</div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetectedImage;
