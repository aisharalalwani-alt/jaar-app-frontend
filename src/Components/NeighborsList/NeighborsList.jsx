import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function NeighborsList() {
  const [neighbors, setNeighbors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNeighbors = async () => {
      try {
        const res = await api.get("neighbors/");
        setNeighbors(res.data);
      } catch (err) {
        console.error("Error fetching neighbors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNeighbors();
  }, []);

  if (loading) return <p>Loading neighbors...</p>;

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🏡 Neighbors in Your Street
      </h2>

      {neighbors.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {neighbors.map((n) => (
            <li
              key={n.id}
              style={{
                background: "#f8f9fa",
                marginBottom: "10px",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Link
                to={`/neighbors/${n.id}`}
                style={{
                  textDecoration: "none",
                  color: "#007bff",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {n.user}
              </Link>
              <p style={{ margin: "5px 0", color: "#555" }}>
                🏠 {n.house_number}, {n.street}
              </p>
              <p style={{ margin: "0", color: "#777" }}>
                📞 {n.phone || "No phone available"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center" }}>No neighbors found on your street.</p>
      )}
    </div>
  );
}

export default NeighborsList;

