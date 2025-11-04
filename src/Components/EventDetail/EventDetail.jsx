import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEventDetail();
    fetchVolunteers();
  }, []);

  const fetchEventDetail = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/events/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvent(response.data);
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

  if (error) return <p className="text-red-600 p-4">{error}</p>;
  if (!event) return <p className="p-4 text-gray-600">Loading event...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-blue-700 mb-3">{event.title}</h2>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-sm text-gray-600 mb-2">
        📅 {new Date(event.date).toLocaleString()}
      </p>
      <p className="text-sm text-gray-600 mb-2">📍 {event.location}</p>
      <p className="text-sm text-gray-600 mb-4">
    👤 Created by: {event.created_by || "Unknown"}

      </p>

      <button
        onClick={handleJoin}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Join Event
      </button>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Volunteers
        </h3>
        {volunteers.length === 0 ? (
          <p className="text-gray-500">No volunteers yet.</p>
        ) : (
          <ul className="list-disc list-inside text-gray-700 bg-gray-50 p-3 rounded-lg">
            {volunteers.map((vol) => (
              <li key={vol.id}>
                {vol.name} - {vol.phone}
              </li>
            ))}
          </ul>
        )}  

      </div>
        <div className="mt-4">
        <a href="/events" className="text-blue-600 hover:underline">
          ← Back to Events List
        </a>  
        </div>
    </div>
    
   
  );
}

export default EventDetail;
