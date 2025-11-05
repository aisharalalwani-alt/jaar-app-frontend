 import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Table, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

function TopVolunteers() {
  const [topVolunteers, setTopVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopVolunteers();
  }, []);

  const fetchTopVolunteers = async () => {
    try {
      const response = await api.get("/volunteers/?top=true");
      setTopVolunteers(response.data);
    } catch (error) {
      console.error("Error fetching top volunteers:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading top volunteers...</p>;

  return (
     <Container fluid style={{ paddingTop: "80px", paddingBottom: "80px" , maxWidth: "900px" }}>
      <h2 className="mb-3">🏆 Top 10 Volunteers</h2>
      {topVolunteers.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Events </th>
            </tr>
          </thead>
          <tbody>
            {topVolunteers.map((v, index) => (
              <tr key={v.id}>
                <td>{index + 1}</td>
                <td>{v.name}</td>
                <td>
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                  {v.total_events}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No top volunteers yet.</p>
      )}
    </Container>
  );
}

export default TopVolunteers;
