import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container } from "react-bootstrap";
import "./EventDetail.css";

function EventDetail() {
const { id } = useParams();
const navigate = useNavigate();
const [event, setEvent] = useState(null);
const [volunteers, setVolunteers] = useState([]);
const [error, setError] = useState(null);
const [currentUser, setCurrentUser] = useState("");
const [editMode, setEditMode] = useState(false);
const [editData, setEditData] = useState({ title: "", description: "", date: "", location: "" });

useEffect(() => {
fetchEventDetail();
fetchVolunteers();
fetchCurrentUser();
}, []);

const fetchEventDetail = async () => {
try {
const token = localStorage.getItem("access");
const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}/`, {
headers: { Authorization: `Bearer ${token}` },
});
setEvent(response.data);
setEditData({
title: response.data.title,
description: response.data.description,
date: response.data.date,
location: response.data.location,
});
} catch (err) {
setError("Failed to load event details.");
}
};

const fetchVolunteers = async () => {
try {
const token = localStorage.getItem("access");
const response = await axios.get(`http://127.0.0.1:8000/api/event-volunteers/${id}/`, {
headers: { Authorization: `Bearer ${token}` },
});
setVolunteers(response.data);
} catch (err) {
setVolunteers([]);
}
};

const fetchCurrentUser = async () => {
try {
const token = localStorage.getItem("access");
const response = await axios.get(`http://127.0.0.1:8000/api/my-profile/`, {
headers: { Authorization: `Bearer ${token}` },
});
setCurrentUser(response.data.profile.user);
} catch (err) {}
};

const handleJoin = async () => {
try {
const token = localStorage.getItem("access");
await axios.post(`http://127.0.0.1:8000/api/join-event/${id}/`, {}, {
headers: { Authorization: `Bearer ${token}` },
});
alert("You joined the event successfully!");
fetchVolunteers();
} catch (err) {
alert("Failed to join event.");
}
};

const handleDelete = async () => {
if (window.confirm("Are you sure you want to delete this event?")) {
try {
const token = localStorage.getItem("access");
await axios.delete(`http://127.0.0.1:8000/api/events/${id}/`, {
headers: { Authorization: `Bearer ${token}` },
});
alert("Event deleted successfully!");
navigate("/events");
} catch (err) {
alert("Failed to delete event.");
}
}
};

const handleEditSubmit = async (e) => {
e.preventDefault();
try {
const token = localStorage.getItem("access");
await axios.put(`http://127.0.0.1:8000/api/events/${id}/`, editData, {
headers: { Authorization: `Bearer ${token}` },
});
alert("Event updated successfully!");
setEditMode(false);
fetchEventDetail();
} catch (err) {
alert("Failed to update event.");
}
};

if (error) return <p className="text-danger p-4">{error}</p>;
if (!event) return <p className="text-secondary p-4">Loading event...</p>;

const isOwner = currentUser === event.created_by;

return (
   <Container fluid style={{ paddingTop: "80px", paddingBottom: "80px", maxWidth: "900px" }}>
  <div className="card shadow-sm rounded-4 hover-card p-4">
    {editMode ? (
      <>
        <h2 className="card-title text-primary mb-4">
          <i className="fa fa-pen"></i> Edit Event
        </h2>
        <form onSubmit={handleEditSubmit} className="d-flex flex-column gap-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="form-control"
            placeholder="Title"
            required
          />
          <textarea
            rows="4"
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="form-control"
            placeholder="Description"
            required
          />
          <input
            type="date"
            value={editData.date}
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            className="form-control"
            required
          />
          <input
            type="text"
            value={editData.location}
            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            className="form-control"
            placeholder="Location"
            required
          />
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-warning flex-fill">
              <i className="fa fa-save"></i> Save
            </button>
            <button type="button" onClick={() => setEditMode(false)} className="btn btn-secondary flex-fill">
              <i className="fa fa-times"></i> Cancel
            </button>
          </div>
        </form>
      </>
    ) : (
      <>
        <div className="row">
          {/* Left Column: Event Details */}
          <div className="col-md-6">
            <h2 className="card-title text-primary mb-3">
              <i className="fa fa-calendar"></i> {event.title}
            </h2>
            <p className="card-text">{event.description}</p>
            <p><i className="fa fa-clock"></i> {new Date(event.date).toLocaleString()}</p>
            <p><i className="fa fa-map-marker-alt"></i> {event.location}</p>
            <p><i className="fa fa-user"></i> Created by: {event.created_by || "Unknown"}</p>

            {isOwner ? (
              <div className="d-flex flex-column flex-md-row gap-2 my-3">
                <button onClick={() => setEditMode(true)} className="btn btn-warning flex-fill">
                  <i className="fa fa-pen"></i> Edit
                </button>
                <button onClick={handleDelete} className="btn btn-danger flex-fill">
                  <i className="fa fa-trash"></i> Delete
                </button>
              </div>
            ) : (
              <button onClick={handleJoin} className="btn btn-success my-3">
                <i className="fa fa-handshake"></i> Join Event
              </button>
            )}
          </div>

          {/* Right Column: Volunteers */}
          <div className="col-md-6">
            <div className="mt-md-0 mt-4">
              <h3 className="mb-2"><i className="fa fa-users"></i> Volunteers</h3>
              {volunteers.length === 0 ? (
                <p className="text-secondary">No volunteers yet.</p>
              ) : (
                <ul className="list-group">
                  {volunteers.map((vol, index) => (
                    <li key={vol.id || index} className="list-group-item d-flex align-items-center gap-2">
                      <i className="fa fa-user-circle"></i> {vol.name} 
                    </li>
                  ))}
                </ul>
              )}

              {/* Back Button below volunteers */}
              <Link to="/events" className="d-inline-flex align-items-center mt-3 text-primary text-decoration-none">
                <i className="fa fa-arrow-left me-1"></i> Back to Events List
              </Link>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
</Container>

);
}

export default EventDetail;
