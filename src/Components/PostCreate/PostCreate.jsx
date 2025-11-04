import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./PostCreate.css";

function PostCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [popup, setPopup] = useState({ show: false, success: true });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("access");
      await api.post("posts/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setPopup({ show: true, success: true });
    } catch (err) {
      console.error("Error creating post:", err);
      setPopup({ show: true, success: false });
    }
  };

  return (
    <div className="post-create-container">
      <h2>
        <i className="fa fa-comments"></i> Would you like to tell your neighbors something?
      </h2>

      <form onSubmit={handleSubmit} className="post-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content..."
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
          }}
        />

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="preview" />
          </div>
        )}

        <button type="submit" className="submit-btn">
          <i className="fa fa-paper-plane"></i> Publish
        </button>
      </form>

      {popup.show && (
        <div className="popup-overlay">
          <div className="popup-box">
            {popup.success ? (
              <>
                <h3 className="popup-success">
                  <i className="fa fa-check-circle"></i> Post Published Successfully!
                </h3>
                <p>Your post has been added successfully.</p>
                <button
                  className="popup-btn"
                  onClick={() => navigate("/posts")}
                >
                  Go to Posts List
                </button>
              </>
            ) : (
              <>
                <h3 className="popup-error">
                  <i className="fa fa-times-circle"></i> Failed to Create Post
                </h3>
                <p>Please check your connection or try again.</p>
                <button
                  className="popup-btn"
                  onClick={() => setPopup({ show: false, success: true })}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostCreate;
