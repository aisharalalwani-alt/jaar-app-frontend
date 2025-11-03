import { useEffect, useState } from "react";
import api from "../../services/api";
import "./UserProfile.css";

function UserProfile() {
const [profile, setProfile] = useState(null);
const [posts, setPosts] = useState([]);
const [createdEvents, setCreatedEvents] = useState([]);
const [joinedEvents, setJoinedEvents] = useState([]);
const [loading, setLoading] = useState(true);
const [editMode, setEditMode] = useState(false);
const [formData, setFormData] = useState({
house_number: "",
street: "",
 postal_code: "",
phone: "",
bio: "",
});

const [modalOpen, setModalOpen] = useState(false);
const [modalType, setModalType] = useState(""); // "post" or "event"
const [selectedItem, setSelectedItem] = useState(null);
const [editFields, setEditFields] = useState({});

// Fetch all data
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

// Handle profile edit
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

// Modal open/close
const openModal = (item, type) => {
setSelectedItem(item);
setModalType(type);
setEditFields(
type === "post"
? { title: item.title, content: item.content, image: item.image || "" }
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

// Update item
const updateItem = async () => {
try {
if (modalType === "post") {
const res = await api.put(`posts/${selectedItem.id}/`, editFields);
setPosts(posts.map((p) => (p.id === selectedItem.id ? res.data : p)));
} else {
const res = await api.put(`events/${selectedItem.id}/`, editFields);
setCreatedEvents(
createdEvents.map((e) => (e.id === selectedItem.id ? res.data : e))
);
setJoinedEvents(
joinedEvents.map((e) =>
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

// Delete item
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
setJoinedEvents(
joinedEvents.filter((e) => e.id !== selectedItem.id)
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

return ( <div className="user-profile"> <h2 className="page-title">My Profile</h2>

```
  {/* Profile Card */}
  <div className="profile-card">
{editMode ? (
  <form className="edit-profile-form">
    <div className="form-group">
      <label>House Number</label>
      <input
        name="house_number"
        value={formData.house_number}
        onChange={handleChange}
        placeholder="House Number"
      />
    </div>

    <div className="form-group">
      <label>Street</label>
      <input
        name="street"
        value={formData.street}
        onChange={handleChange}
        placeholder="Street"
      />
    </div>

<div className="form-group">
  <label>Postal Code</label>
  <input
    name="postal_code"
    value={formData.postal_code}
    onChange={handleChange}
    placeholder="Postal Code (5 digits)"
    maxLength="5"
    pattern="\d{5}"
    title="Please enter exactly 5 digits"
  />
</div>

    <div className="form-group">
      <label>Phone</label>
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
    </div>

    <div className="form-group">
      <label>Bio</label>
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
      />
    </div>

    <div className="profile-buttons">
      <button className="save-btn" onClick={handleSaveProfile} type="button">
        Save
      </button>
      <button
        className="cancel-btn"
        onClick={() => setEditMode(false)}
        type="button"
      >
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
    <button className="edit-btn" onClick={() => setEditMode(true)}>
      Edit Profile
    </button>
  </>
)}

  </div>

  {/* Posts */}
  <div className="section">
    <h3>My Posts 📝</h3>
    {posts.length ? posts.map((p) => (
      <div key={p.id} className="item-card">
        <div>
          <h4>{p.title}</h4>
          <p>{p.content}</p>
        </div>
        <button className="edit-small-btn" onClick={() => openModal(p, "post")}>Edit/Delete</button>
      </div>
    )) : <p>No posts yet.</p>}
  </div>

  {/* Created Events */}
  <div className="section">
    <h3>Created Events 🎉</h3>
    {createdEvents.length ? createdEvents.map((e) => (
      <div key={e.id} className="item-card">
        <div>
          <h4>{e.title}</h4>
          <p>{e.description}</p>
        </div>
        <button className="edit-small-btn" onClick={() => openModal(e, "event")}>Edit/Delete</button>
      </div>
    )) : <p>No created events yet.</p>}
  </div>

  {/* Joined Events */}
  <div className="section">
    <h3>Joined Events 🤝</h3>
    {joinedEvents.length ? joinedEvents.map((e) => (
      <div key={e.id} className="item-card">
        <div>
          <h4>{e.title}</h4>
          <p>{e.description}</p>
        </div>
      </div>
    )) : <p>No joined events yet.</p>}
  </div>

  {/* Modal */}
  {modalOpen && (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{modalType === "post" ? "Edit Post" : "Edit Event"}</h3>

        <input type="text" value={editFields.title} onChange={(e) => setEditFields({ ...editFields, title: e.target.value })} placeholder="Title" />
        <textarea
          value={modalType === "post" ? editFields.content : editFields.description}
          onChange={(e) =>
            setEditFields({
              ...editFields,
              [modalType === "post" ? "content" : "description"]: e.target.value,
            })
          }
          placeholder="Description"
        />
        {modalType === "event" && (
          <>
            <input type="datetime-local" value={editFields.date} onChange={(e) => setEditFields({ ...editFields, date: e.target.value })} />
            <input type="text" value={editFields.location} onChange={(e) => setEditFields({ ...editFields, location: e.target.value })} placeholder="Location" />
          </>
        )}

        <div className="modal-buttons">
          <button className="save-btn" onClick={updateItem}>Save</button>
          <button className="delete-btn" onClick={deleteItem}>Delete</button>
          <button className="cancel-btn" onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  )}
</div>
 )} ;
export default UserProfile;