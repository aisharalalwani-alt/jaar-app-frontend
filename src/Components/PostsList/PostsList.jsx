 import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faPlus, faUser, faClock } from "@fortawesome/free-solid-svg-icons";
import { Container, Button } from "react-bootstrap";
import api from "../../services/api";
import "./PostsList.css";

function PostsList({ userPostalCode }) {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("posts/");
        // ✅ Filter posts by user's postal code
        const filtered = res.data.filter(
          (post) => post.postal_code === userPostalCode
        );

        // ✅ Sort by creation date (descending)
        const sorted = filtered.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setPosts(sorted);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
      }
    };
    fetchPosts();
  }, [userPostalCode]);

  const handleAddPost = () => {
    navigate("/posts/new");
  };

  const showMore = () => setVisibleCount((prev) => prev + 5);

  return (
    <Container
      fluid
      style={{ paddingTop: "80px", paddingBottom: "80px", maxWidth: "900px" }}
    >
      {/* 🔹 Header */}
      <div className="posts-header d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">
          <FontAwesomeIcon icon={faNewspaper} /> All Posts
        </h2>
     <button className="add-event-btn btn btn-primary" onClick={handleAddPost}>
          <FontAwesomeIcon icon={faPlus} /> Add Post
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {/* 🔹 No posts */}
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <>
          <ul className="list-unstyled">
            {posts.slice(0, visibleCount).map((post) => (
              <li
                key={post.id}
                className="p-3 mb-3 border rounded shadow-sm post-item"
                style={{
                  cursor: "pointer",
                  transition: "0.3s",
                  backgroundColor: "white",
                }}
              >
                <h4>
                  <FontAwesomeIcon icon={faNewspaper} /> {post.title}
                </h4>
                <p>{post.content}</p>

                {/* 🔹 Display image if available */}
                {post.image && (
                  <div className="text-center mb-3">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="img-fluid rounded"
                      style={{ maxHeight: "250px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}

                {/* 🔹 Meta info */}
                <p className="text-muted d-flex justify-content-between small">
                  <span>
                    <FontAwesomeIcon icon={faUser} /> {post.created_by || "Unknown"}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faClock} />{" "}
                    {new Date(post.created_at).toLocaleString()}
                  </span>
                </p>
              </li>
            ))}
          </ul>

          {/* 🔹 Show More button */}
          {visibleCount < posts.length && (
            <div className="text-center">
              <Button variant="outline-primary" onClick={showMore}>
                Show More
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default PostsList;
