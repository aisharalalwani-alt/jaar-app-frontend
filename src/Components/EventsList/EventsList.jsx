import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EventList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faMapMarkerAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

function EventList() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        setError("No access token found. Please log in.");
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/api/events/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        setEvents(response.data);
        setError(null);
      } else {
        setEvents([]);
        setError("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events.");
    }
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleAddEvent = () => {
    navigate ("/events/new");
  };

  return (
    <div className="container">
      <div className="container">
  <div className="header">
    <h2>All Events</h2>
    <button className="add-button" onClick={handleAddEvent}>
      <FontAwesomeIcon icon={faPlus} /> Add Event
    </button>
  </div>

  {error && <p className="error">{error}</p>}

  {events.length === 0 ? (
    <p>No events found.</p>
  ) : (
    <ul className="event-list">
      {events.map((event) => (
        <li
          key={event.id}
          onClick={() => handleEventClick(event.id)}
          className="event-item"
        >
          <h3 className="event-title">{event.title}</h3>
          <p className="event-description">{event.description}</p>
          <p className="event-meta">
            <span>
              <FontAwesomeIcon icon={faCalendar} /> {new Date(event.date).toLocaleString()}
            </span>
            <span>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}
            </span>
          </p>
        </li>
      ))}
    </ul>
  )}
</div>
    </div>  
  );
}

export default EventList;

