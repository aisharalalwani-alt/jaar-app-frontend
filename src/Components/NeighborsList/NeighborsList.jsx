import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPhone } from "@fortawesome/free-solid-svg-icons";
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

if (loading) return <p className="text-center mt-3">Loading neighbors...</p>;

return (
<Container
fluid
style={{ paddingTop: "80px", maxWidth: "700px", height: "calc(100vh - 80px)", overflowY: "auto" }}
> <h2 className="text-center mb-4"> Neighbors Around You </h2>
{neighbors.length > 0 ? ( <Row className="g-3">
{neighbors.map((n) => ( <Col xs={12} key={n.id}> <Card className="shadow-sm">
<Card.Body>
<Card.Title>
<Link
to={`/neighbors/${n.id}`}
style={{ textDecoration: "none", color: "#0d6efd" }}
>
{n.user} </Link>
</Card.Title>
<Card.Text>
<FontAwesomeIcon icon={faHouse} style={{ color: "#717171ff", marginRight: "8px" }} />
{n.house_number}, {n.street}
</Card.Text>
</Card.Body> </Card> </Col>
))} </Row>
) : ( <p className="text-center">No neighbors found on your street.</p>
)} </Container>
);
}

export default NeighborsList;
