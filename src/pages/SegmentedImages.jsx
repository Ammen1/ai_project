import React, { useEffect, useState } from "react";
import Posts from "../admin/posts";
import PostLoadingComponent from "../posts/postLoading";
import axiosInstance from "../axios";
import "../index.css";

const DetectedImage = () => {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
  });

  useEffect(() => {
    axiosInstance.get().then((res) => {
      const allPosts = res.data;
      setAppState({ loading: false, posts: allPosts });
      console.log(res.data);
    });
  }, []);

  const { loading, posts } = appState; // Destructure posts from appState

  if (loading) {
    return <PostLoading />;
  }

  if (!posts || posts.length === 0) {
    return <p>Can not find any posts, sorry</p>;
  }

  return (
    <div className="flex flex-wrap ">
      {posts.map((post) => (
        <div key={post.id} className="card">
          <img
            src={post.segmented_image}
            alt={post.disease}
            className="card-image"
          />
          <div className="card-content">
            <h1 className="font-bold">
              <span className="text-red-900">Disease:</span> {post.disease}
            </h1>
            <h1 className="font-bold">
              <span className="text-gray-800">Location:</span> {post.locations}
            </h1>
          </div>
          <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        </div>
      ))}
    </div>
  );
};

export default DetectedImage;
