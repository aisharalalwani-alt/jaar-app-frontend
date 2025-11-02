import React, { useEffect, useState } from "react";
import axios from "axios";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get("http://127.0.0.1:8000/api/events/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleJoin = async (eventId) => {
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        `http://127.0.0.1:8000/api/join-event/${eventId}/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("You joined the event successfully!");
      fetchEvents();
    } catch (error) {
      console.error("Error joining event:", error);
      alert("Failed to join event.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Events</h2>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="border rounded-xl p-4 shadow-md bg-white"
            >
              <h3 className="text-xl font-bold text-blue-600">{event.title}</h3>
              <p className="text-gray-700">{event.description}</p>
              <p className="text-sm text-gray-500">
                📅 Date: {new Date(event.date).toLocaleString()} | 📍 Location:{" "}
                {event.location}
              </p>

              <button
                onClick={() => handleJoin(event.id)}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Join Event
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;
