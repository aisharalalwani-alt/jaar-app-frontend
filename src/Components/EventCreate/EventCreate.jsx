import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EventCreate.css";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [popup, setPopup] = useState({ show: false, success: true });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      await axios.post("http://127.0.0.1:8000/api/events/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPopup({ show: true, success: true });
    } catch (error) {
      console.error("Error creating event:", error);
      setPopup({ show: true, success: false });
    }
  };

  return (
    <div className="container">
      <h2>Create New Event</h2>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <button type="submit" className="create-btn">
          <FontAwesomeIcon icon={faCalendarPlus} /> Create Event
        </button>
      </form>

      {popup.show && (
        <div className="popup-overlay">
          <div className="popup-box">
            {popup.success ? (
              <>
                <h3 className="popup-success">
                  <FontAwesomeIcon icon={faCheckCircle} /> Event Created Successfully!
                </h3>
                <p>Your event has been added successfully.</p>
                <button
                  className="popup-btn"
                  onClick={() => navigate("/events")}
                >
                  Go to Events List
                </button>
              </>
            ) : (
              <>
                <h3 className="popup-error">
                  <FontAwesomeIcon icon={faTimesCircle} /> Failed to Create Event
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

export default CreateEvent;
