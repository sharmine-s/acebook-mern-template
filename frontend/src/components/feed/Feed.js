import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostCreateForm from "../post/PostCreateForm";
import BarLoader from "react-spinners/BarLoader";
import Navbar from "../navbar/Navbar";
import "./Feed.css";
import jwt_decode from "jwt-decode";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token")); // Retrieves a token from the browser storage
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Will send a fetch request if a valid token is found
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        // This .json() turns a json response into a JS object
        .then(response => response.json())
        .then(data => {
          if (data.posts) {
            console.log("data.posts");
            window.localStorage.setItem("token", data.token);
            setToken(window.localStorage.getItem("token"));
            setPosts(data.posts);
            setLoading(false);
          } else {
            // navigate to login if token but not valid (timed-out)
            navigate("/login");
          }
        });
    } else {
      // navigate to login if no token
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <>
      {!loading ? (
        <>
          <Navbar navigate={navigate} />
          <div className="posts">
            <h2>Posts</h2>
            <PostCreateForm />
            <div id="feed" role="feed">
              { 
                if (posts.length === 0) { 
                  <p>There are no posts yet.</p> 
                } else {
                  posts.map(post => <Post post={post} key={post._id} userId={ userId } />)
                }
              }
            </div>
          </div>
        </>
      ) : (
        <BarLoader color="#1877f2" />
      )}
    </>
  );
};

export default Feed;
