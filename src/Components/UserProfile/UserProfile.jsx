import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import "./UserProfile.css";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    posts: false,
    createdEvents: false,
    joinedEvents: false,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [formData, setFormData] = useState({
    house_number: "",
    street: "",
    postal_code: "",
    phone: "",
    bio: "",
  });

  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("my-profile/");
        const data = res.data;
        setProfile(data.profile);
        setPosts(data.posts);
        setCreatedEvents(data.created_events);
        setJoinedEvents(data.joined_events);
        setFormData({
          house_number: data.profile.house_number || "",
          street: data.profile.street || "",
          postal_code: data.profile.postal_code || "",
          phone: data.profile.phone || "",
          bio: data.profile.bio || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSaveProfile = async () => {
    try {
      const res = await api.put("my-profile/", formData);
      setProfile(res.data);
      setEditMode(false);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await api.delete("delete-account/");
      localStorage.removeItem("token");
      window.location.href = "/signup";
    } catch (err) {
      console.error(err);
      alert("Failed to delete account.");
    }
  };

  const toggleSection = (section) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const openModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    setEditFields(
      type === "post"
        ? { title: item.title, content: item.content }
        : {
            title: item.title,
            description: item.description,
            date: item.date,
            location: item.location,
          }
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    setModalType("");
    setEditFields({});
  };

  const updateItem = async () => {
    try {
      if (modalType === "post") {
        const res = await api.put(`posts/${selectedItem.id}/`, editFields);
        setPosts(posts.map((p) => (p.id === selectedItem.id ? res.data : p)));
      } else {
        const res = await api.put(`events/${selectedItem.id}/`, editFields);
        setCreatedEvents(
          createdEvents.map((e) =>
            e.id === selectedItem.id ? res.data : e
          )
        );
      }
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  const deleteItem = async () => {
    try {
      if (modalType === "post") {
        await api.delete(`posts/${selectedItem.id}/`);
        setPosts(posts.filter((p) => p.id !== selectedItem.id));
      } else {
        await api.delete(`events/${selectedItem.id}/`);
        setCreatedEvents(
          createdEvents.filter((e) => e.id !== selectedItem.id)
        );
      }
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  if (loading) return <p className="loading">Loading profile...</p>;
  if (!profile) return <p className="loading">No profile found.</p>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2 className="page-title">My Profile</h2>
        <div className="menu-container" ref={menuRef}>
          <i
            className="fa fa-cog menu-icon"
            onClick={() => setMenuOpen(!menuOpen)}
          ></i>

          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => setEditMode(true)}>
                <i className="fa fa-edit"></i> Edit Profile
              </button>
              <button onClick={handleLogout}>
                <i className="fa fa-sign-out"></i> Logout
              </button>
              <button onClick={handleDeleteAccount} className="danger">
                <i className="fa fa-trash"></i> Delete Account
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-card">
        {editMode ? (
          <form className="edit-profile-form">
            {["house_number", "street", "postal_code", "phone", "bio"].map(
              (field) => (
                <div key={field} className="form-group">
                  <label>{field.replace("_", " ").toUpperCase()}</label>
                  {field === "bio" ? (
                    <textarea
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              )
            )}
            <div className="profile-buttons">
              <button className="save-btn" onClick={handleSaveProfile} type="button">
                Save
              </button>
              <button className="cancel-btn" onClick={() => setEditMode(false)} type="button">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <p><strong>Username:</strong> {profile.user}</p>
            <p><strong>House Number:</strong> {profile.house_number || "Not set"}</p>
            <p><strong>Street:</strong> {profile.street || "Not set"}</p>
            <p><strong>Postal Code:</strong> {profile.postal_code || "Not set"}</p>
            <p><strong>Phone:</strong> {profile.phone || "Not set"}</p>
            <p><strong>Bio:</strong> {profile.bio || "No bio yet"}</p>
          </>
        )}
      </div>

      {["posts", "createdEvents", "joinedEvents"].map((section) => (
        <div key={section} className="section">
          <h3 onClick={() => toggleSection(section)} className="section-title">
            <i
              className={`fa ${
                openSections[section] ? "fa-chevron-down" : "fa-chevron-right"
              }`}
            ></i>{" "}
            {section === "posts"
              ? "My Posts 📝"
              : section === "createdEvents"
              ? "Created Events 🎉"
              : "Joined Events 🤝"}
          </h3>

          {openSections[section] &&
            (section === "posts" ? posts : section === "createdEvents" ? createdEvents : joinedEvents).map(
              (item) => (
                <div key={item.id} className="item-card">
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.content || item.description}</p>
                  </div>
                  {(section === "posts" || section === "createdEvents") && (
                    <button
                      className="edit-small-btn"
                      onClick={() =>
                        openModal(item, section === "posts" ? "post" : "event")
                      }
                    >
                      Edit 
                    </button>
                  )}
                </div>
              )
            )}
        </div>
      ))}

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button className="close-modal" onClick={closeModal}>
              ×
            </button>
            <h3>{modalType === "post" ? "Edit Post" : "Edit Event"}</h3>
            <input
              type="text"
              value={editFields.title}
              onChange={(e) =>
                setEditFields({ ...editFields, title: e.target.value })
              }
              placeholder="Title"
            />
            <textarea
              value={
                modalType === "post"
                  ? editFields.content
                  : editFields.description
              }
              onChange={(e) =>
                setEditFields({
                  ...editFields,
                  [modalType === "post" ? "content" : "description"]:
                    e.target.value,
                })
              }
              placeholder="Description"
            />
            {modalType === "event" && (
              <>
                <input
                  type="datetime-local"
                  value={editFields.date}
                  onChange={(e) =>
                    setEditFields({ ...editFields, date: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editFields.location}
                  onChange={(e) =>
                    setEditFields({ ...editFields, location: e.target.value })
                  }
                  placeholder="Location"
                />
              </>
            )}
            <div className="modal-buttons">
              <button className="save-btn" onClick={updateItem}>Save</button>
              <button className="delete-btn" onClick={deleteItem}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
