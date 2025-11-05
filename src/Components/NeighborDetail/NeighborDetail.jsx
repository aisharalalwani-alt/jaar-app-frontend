 import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse, faPhone, faEnvelopeOpenText, faCalendarAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";

function NeighborDetail() {
  const { id } = useParams();
  const [neighborData, setNeighborData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPhone, setShowPhone] = useState(false);

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

  if (loading) return <p className="text-center mt-3">Loading neighbor details...</p>;
  if (!neighborData) return <p className="text-center mt-3">No neighbor found.</p>;

  const maroon = "#717171ff";

  return (
    <Container fluid style={{ paddingTop: "80px", paddingBottom: "80px" , maxWidth: "900px" }}>
      <h2 className="text-center mb-4">
        <FontAwesomeIcon icon={faUser} style={{ color: maroon, marginRight: "8px" }} />
        {neighborData.profile?.user || "Neighbor Profile"}
      </h2>

      <Row className="g-3">
        {/* Basic Info */}
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Text>
                <FontAwesomeIcon icon={faHouse} style={{ color: maroon, marginRight: "8px" }} />
                {neighborData.profile?.house_number || "N/A"}, {neighborData.profile?.street || "N/A"}
              </Card.Text>
              <Card.Text>
                <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ color: maroon, marginRight: "8px" }} />
                Bio: {neighborData.profile?.bio || "No bio provided"}
              </Card.Text>
              <div className="d-flex align-items-center">   
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPhone(!showPhone)}
                  style={{ borderColor: maroon, color: maroon }}
                >
                  <FontAwesomeIcon icon={faPhone} style={{ marginRight: "8px" }} />
                  {showPhone ? neighborData.profile?.phone || "No phone" : "Contact"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Posts */}
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ color: maroon, marginRight: "8px" }} />
                Posts
              </Card.Title>
              {neighborData.posts?.length > 0 ? (
                <ul>
                  {neighborData.posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                  ))}
                </ul>
              ) : (
                <p>No posts yet.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Created Events */}
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faCalendarAlt} style={{ color: maroon, marginRight: "8px" }} />
                Created Events
              </Card.Title>
              {neighborData.created_events?.length > 0 ? (
                <ul>
                  {neighborData.created_events.map((event) => (
                    <li key={event.id}>{event.title}</li>
                  ))}
                </ul>
              ) : (
                <p>No created events yet.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Joined Events */}
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faUsers} style={{ color: maroon, marginRight: "8px" }} />
                Joined Events
              </Card.Title>
              {neighborData.joined_events?.length > 0 ? (
                <ul>
                  {neighborData.joined_events.map((event) => (
                    <li key={event.id}>{event.title}</li>
                  ))}
                </ul>
              ) : (
                <p>No joined events yet.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NeighborDetail;
  {/*  Reference for Navbar styling
    https://react-bootstrap.netlify.app/docs/components/navbar/
    */}