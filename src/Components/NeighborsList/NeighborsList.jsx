import React, { useEffect, useState } from "react";
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
    <div style={{ padding: "20px" }}>
      <h2>Neighbors in Your Street</h2>
      {neighbors.length > 0 ? (
        <ul>
          {neighbors.map((n) => (
            <li key={n.id}>
              <strong>{n.user}</strong> — {n.house_number}, {n.street}
            </li>
          ))}
        </ul>
      ) : (
        <p>No neighbors found on your street.</p>
      )}
    </div>
  );
}

export default NeighborsList;