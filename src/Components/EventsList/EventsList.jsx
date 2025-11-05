import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faMapMarkerAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";  
import "./EventList.css";

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
    navigate("/events/new");
  };

  return (
        <Container fluid style={{ paddingTop: "80px", paddingBottom: "80px" , maxWidth: "900px" }}>
    
      <div className="events-header d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">
          <FontAwesomeIcon icon={faCalendar} /> All Events
        </h2>
        <button className="add-event-btn btn btn-primary" onClick={handleAddEvent}>
          <FontAwesomeIcon icon={faPlus} /> Add Event
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="events-list list-unstyled">
          {events.map((event) => (
            <li
              key={event.id}
              onClick={() => handleEventClick(event.id)}
              className="event-item p-3 mb-3 border rounded shadow-sm"
              style={{ cursor: "pointer", transition: "0.3s" }}
            >
              <h4>
                <FontAwesomeIcon icon={faCalendar} /> {event.title}
              </h4>
              <p>{event.description}</p>
              <p className="event-meta text-muted d-flex justify-content-between">
                <span>
                  <FontAwesomeIcon icon={faCalendar} />{" "}
                  {new Date(event.date).toLocaleString()}
                </span>
                <span>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default EventList;
