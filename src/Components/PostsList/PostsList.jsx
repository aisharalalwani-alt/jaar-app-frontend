import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./PostsList.css";

function PostsList({ userPostalCode }) {
const [posts, setPosts] = useState([]);
const [visibleCount, setVisibleCount] = useState(5);

useEffect(() => {
const fetchPosts = async () => {
try {
const res = await api.get("posts/");


    // Filter posts by user's postal code  
    const filtered = res.data.filter((post) => post.postal_code === userPostalCode);  

    // Sort by creation date descending  
    const sorted = filtered.sort(  
      (a, b) => new Date(b.created_at) - new Date(a.created_at)  
    );  

    setPosts(sorted);  
  } catch (err) {  
    console.error("Error fetching posts:", err);  
  }  
};  
fetchPosts();  


}, [userPostalCode]);

const showMore = () => setVisibleCount((prev) => prev + 5);

return ( <div className="posts-container"> <div className="posts-header sticky-header"> <h2> <i className="fa fa-newspaper-o" /> All Posts </h2> <Link to="/posts/new" className="add-post-btn"> <i className="fa fa-plus" /> Add Post </Link> </div>

  {posts.length === 0 ? (  
    <p>No posts yet.</p>  
  ) : (  
    <>  
      <ul className="posts-list">  
        {posts.slice(0, visibleCount).map((post) => (  
          <li key={post.id} className="post-item animate-fadeIn">  
            <h3>  
              <i className="fa fa-file-o" /> {post.title}  
            </h3>  
            <p>{post.content}</p>  

            {/* Display image if available */}  
            {post.image && (  
              <div className="post-image-container">  
                <img  
                  src={post.image}  
                  alt={post.title}  
                  className="post-image"  
                  onError={(e) => { e.target.style.display = "none"; }}  
                />  
              </div>  
            )}  

            <p className="post-meta">  
              <i className="fa fa-user" /> {post.created_by || "Unknown"}{" "}  
              &nbsp;|&nbsp; <i className="fa fa-clock-o" />{" "}  
              {new Date(post.created_at).toLocaleString()}  
            </p>  
          </li>  
        ))}  
      </ul>  

      {visibleCount < posts.length && (  
        <button className="show-more-btn" onClick={showMore}>  
          Show More  
        </button>  
      )}  
    </>  
  )}  
</div>  

);
}

export default PostsList;
