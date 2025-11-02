import { useEffect, useState } from "react";
import api from "../../services/api";

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("posts/");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts List</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: "20px" }}>
              <strong>{post.title}</strong>
              <p>{post.content}</p>
              {post.image && (
                <img
                  src={`http://127.0.0.1:8000${post.image}`}
                  alt="post"
                  width="200"
                />
              )}
              <p><em>Created at: {new Date(post.created_at).toLocaleString()}</em></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostsList;
