import React from "react";

const Posts = (props) => {
  const { posts } = props;

  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div align="left">
            <a href={"/post/" + post.id} color="textPrimary">
              {post.disease}
              <img src={post.original_image} alt={post.disease} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
