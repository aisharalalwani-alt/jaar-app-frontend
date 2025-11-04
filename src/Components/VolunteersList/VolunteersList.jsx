import React, { useEffect, useState } from "react";
import api from "../../services/api"; // تأكدي إن هذا هو ملف الـ axios مع التوكن

function VolunteersList() {
  const [volunteers, setVolunteers] = useState([]);
  const [topVolunteers, setTopVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVolunteers();
    fetchTopVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await api.get("/volunteers/");
      setVolunteers(response.data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopVolunteers = async () => {
    try {
      const response = await api.get("/volunteers/?top=true");
      setTopVolunteers(response.data);
    } catch (error) {
      console.error("Error fetching top volunteers:", error);
    }
  };

  if (loading) return <p>Loading volunteers...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#2c3e50" }}>🏆 Top 10 Volunteers</h2>
      {topVolunteers.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {topVolunteers.map((v, index) => (
            <li
              key={v.id}
              style={{
                background: "#f1f1f1",
                margin: "5px 0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <strong>
                #{index + 1} {v.name}
              </strong>{" "}
              <br />
              <small>Phone: {v.phone}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No top volunteers yet.</p>
      )}

      <hr style={{ margin: "30px 0" }} />

      <h2 style={{ color: "#2c3e50" }}>📋 All Volunteers</h2>
      {volunteers.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {volunteers.map((v) => (
            <li
              key={v.id}
              style={{
                background: "#fff",
                margin: "5px 0",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <strong>{v.name}</strong>
              <br />
              <small>Phone: {v.phone}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No volunteers found.</p>
      )}
    </div>
  );
}

export default VolunteersList;
