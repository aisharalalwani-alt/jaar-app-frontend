import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function NeighborDetail() {
  const { id } = useParams();
  const [neighborData, setNeighborData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNeighbor = async () => {
      try {
        const res = await api.get(`/neighbors/${id}/`);
        setNeighborData(res.data);
      } catch (err) {
        console.error("Error fetching neighbor:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNeighbor();
  }, [id]);

  if (loading) return <p>Loading neighbor details...</p>;
  if (!neighborData) return <p>No neighbor found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Neighbor Profile</h2>
      <div style={{ marginBottom: "20px" }}>
        <p><strong>Name:</strong> {neighborData.profile?.user || "N/A"}</p>
        <p><strong>Street:</strong> {neighborData.profile?.street || "N/A"}</p>
        <p><strong>House:</strong> {neighborData.profile?.house_number || "N/A"}</p>
        <p><strong>Phone:</strong> {neighborData.profile?.phone || "N/A"}</p>
      </div>

      <div>
        <h3>📝 Posts</h3>
        {neighborData.posts?.length > 0 ? (
          <ul>
            {neighborData.posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        ) : (
          <p>No posts yet.</p>
        )}
      </div>

      <div>
        <h3>🎉 Events</h3>
        {neighborData.created_events?.length > 0 ? (
          <ul>
            {neighborData.created_events.map((event) => (
              <li key={event.id}>{event.title}</li>
            ))}
          </ul>
        ) : (
          <p>No created events yet.</p>
        )}
      </div>

      <div>
        <h3>🤝 Joined Events</h3>
        {neighborData.joined_events?.length > 0 ? (
          <ul>
            {neighborData.joined_events.map((event) => (
              <li key={event.id}>{event.title}</li>
            ))}
          </ul>
        ) : (
          <p>No joined events yet.</p>
        )}
      </div>
    </div>
  );
}

export default NeighborDetail;


