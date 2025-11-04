import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Events</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {events.length === 0 ? (
        <p className="text-gray-600">No events found.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              onClick={() => handleEventClick(event.id)}
              className="border rounded-xl p-4 shadow-md bg-white hover:shadow-lg hover:bg-gray-50 transition cursor-pointer"
            >
              <h3 className="text-xl font-bold text-blue-600">{event.title}</h3>
              <p className="text-gray-700">{event.description}</p>
              <p className="text-sm text-gray-500">
                📅 {new Date(event.date).toLocaleString()} | 📍{" "}
                {event.location}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;

