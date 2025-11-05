import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EventDetail.css";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    fetchEventDetail();
    fetchVolunteers();
    fetchCurrentUser();
  }, []);


  const fetchEventDetail = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/events/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvent(response.data);
      setEditData({
        title: response.data.title,
        description: response.data.description,
        date: response.data.date,
        location: response.data.location,
      });
    } catch (error) {
      console.error("Error fetching event detail:", error);
      setError("Failed to load event details.");
    }
  };

  const fetchVolunteers = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/event-volunteers/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVolunteers(response.data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      setVolunteers([]);
    }
  };


  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(`http://127.0.0.1:8000/api/my-profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(response.data.profile.user); // ← username
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        `http://127.0.0.1:8000/api/join-event/${id}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("You joined the event successfully!");
      fetchVolunteers();
    } catch (error) {
      console.error("Error joining event:", error);
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
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event.");
      }
    }
  };


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      await axios.put(
        `http://127.0.0.1:8000/api/events/${id}/`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Event updated successfully!");
      setEditMode(false);
      fetchEventDetail();
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event.");
    }
  };

  if (error) return <p className="text-red-600 p-4">{error}</p>;
  if (!event) return <p className="p-4 text-gray-600">Loading event...</p>;

  const isOwner = currentUser === event.created_by;

  return (
    <div className="event-detail-container">
      {editMode ? (
        <>
          <h2 className="event-title">
            <i className="fa fa-pen"></i> Edit Event
          </h2>
          <form onSubmit={handleEditSubmit} className="space-y-3">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="border p-2 w-full rounded"
              placeholder="Title"
              required
            />
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="border p-2 w-full rounded"
              placeholder="Description"
              required
            />
            <input
              type="date"
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="text"
              value={editData.location}
              onChange={(e) =>
                setEditData({ ...editData, location: e.target.value })
              }
              className="border p-2 w-full rounded"
              placeholder="Location"
              required
            />
            <div className="flex gap-3">
              <button type="submit" className="btn btn-edit">
                <i className="fa fa-save"></i> Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="btn btn-delete"
              >
                <i className="fa fa-times"></i> Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2 className="event-title">
            <i className="fa fa-calendar"></i> {event.title}
          </h2>
          <p className="event-description">{event.description}</p>
          <p className="event-info">
            <i className="fa fa-clock"></i>{" "}
            {new Date(event.date).toLocaleString()}
          </p>
          <p className="event-info">
            <i className="fa fa-map-marker-alt"></i> {event.location}
          </p>
          <p className="event-info">
            <i className="fa fa-user"></i> Created by:{" "}
            {event.created_by || "Unknown"}
          </p>


          {isOwner ? (
            <div className="button-group">
              <button onClick={() => setEditMode(true)} className="btn btn-edit">
                <i className="fa fa-pen"></i> Edit
              </button>
              <button onClick={handleDelete} className="btn btn-delete">
                <i className="fa fa-trash"></i> Delete
              </button>
            </div>
          ) : (
            <button onClick={handleJoin} className="btn btn-join">
              <i className="fa fa-handshake"></i> Join Event
            </button>
          )}
         
          <div className="volunteer-section">
            <h3>
              <i className="fa fa-users"></i> Volunteers
            </h3>
            {volunteers.length === 0 ? (
              <p className="text-gray-500">No volunteers yet.</p>
            ) : (
              <ul className="volunteer-list">
                {volunteers.map((vol) => (
                  <li key={vol.id}>
                    <i className="fa fa-user-circle"></i> {vol.name} – {vol.phone}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a href="/events" className="back-link">
            <i className="fa fa-arrow-left"></i> Back to Events List
          </a>
        </>
      )}
    </div>
  );
}

export default EventDetail;
