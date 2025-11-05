import React, { useEffect, useState } from "react";
import { Card, Accordion, Button, Modal, Form, Row, Col, Dropdown, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSignOut, faChevronRight, faCog } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./UserProfile.css";

function UserProfile() {
const [profile, setProfile] = useState(null);
const [formData, setFormData] = useState({ house_number: "", street: "", postal_code: "", phone: "", bio: "" });
const [posts, setPosts] = useState([]);
const [createdEvents, setCreatedEvents] = useState([]);
const [joinedEvents, setJoinedEvents] = useState([]);
const [loading, setLoading] = useState(true);
const [editMode, setEditMode] = useState(false);
const [modalShow, setModalShow] = useState(false);
const [modalItem, setModalItem] = useState(null);
const [editFields, setEditFields] = useState({});

const navigate = useNavigate();

useEffect(() => {
const fetchData = async () => {
try {
const res = await api.get("my-profile/");
const data = res.data;
setProfile(data.profile);
setFormData({
house_number: data.profile.house_number || "",
street: data.profile.street || "",
postal_code: data.profile.postal_code || "",
phone: data.profile.phone || "",
bio: data.profile.bio || "",
});
setPosts(data.posts);
setCreatedEvents(data.created_events);
setJoinedEvents(data.joined_events);
} catch (err) {
console.error(err);
} finally {
setLoading(false);
}
};
fetchData();
}, []);

const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSaveProfile = async () => {
try {
const res = await api.put("my-profile/", formData);
setProfile(res.data);
setEditMode(false);
alert("Profile updated!");
} catch (err) {
console.error(err);
alert("Failed to update profile.");
}
};

const handleDeleteAccount = async () => {
if (!window.confirm("Are you sure you want to delete your account?")) return;
try {
await api.delete("delete-account/");
localStorage.removeItem("token");
navigate("/signup");
} catch (err) {
console.error(err);
alert("Failed to delete account.");
}
};

const handleLogout = () => {
localStorage.removeItem("token");
localStorage.removeItem("access");
localStorage.removeItem("refresh");
navigate("/login");
};

const handleEditClick = (item, type) => {
setModalItem({ ...item, type });
setEditFields({ ...item });
setModalShow(true);
};

const handleModalSave = async () => {
try {
if (modalItem.type === "post") {
const res = await api.put(`posts/${modalItem.id}/`, editFields);
setPosts(posts.map(p => (p.id === modalItem.id ? res.data : p)));
} else {
const res = await api.put(`events/${modalItem.id}/`, editFields);
setCreatedEvents(createdEvents.map(e => (e.id === modalItem.id ? res.data : e)));
}
setModalShow(false);
} catch (err) {
console.error(err);
alert("Update failed.");
}
};

const handleModalDelete = async () => {
try {
if (modalItem.type === "post") {
await api.delete(`posts/${modalItem.id}/`);
setPosts(posts.filter(p => p.id !== modalItem.id));
} else {
await api.delete(`events/${modalItem.id}/`);
setCreatedEvents(createdEvents.filter(e => e.id !== modalItem.id));
}
setModalShow(false);
} catch (err) {
console.error(err);
alert("Delete failed.");
}
};

if (loading) return <p>Loading...</p>;
if (!profile) return <p>No profile found.</p>;

return (
<Container fluid style={{ paddingTop: "80px", maxWidth: "900px" }}> <Card className="mb-4">
<Card.Header> <Row className="align-items-center"> <Col><h4>{profile.user}</h4></Col> <Col className="text-end"> <Dropdown align="end">
<Dropdown.Toggle variant="outline-secondary" bsPrefix="custom-dropdown-toggle"> <FontAwesomeIcon icon={faCog} />  
</Dropdown.Toggle>
<Dropdown.Menu>
<Dropdown.Item onClick={() => setEditMode(true)}><FontAwesomeIcon icon={faEdit} /> Edit Profile</Dropdown.Item>
<Dropdown.Item onClick={handleLogout}><FontAwesomeIcon icon={faSignOut} /> Logout</Dropdown.Item>
<Dropdown.Item onClick={handleDeleteAccount} className="text-danger"><FontAwesomeIcon icon={faTrash} /> Delete Account</Dropdown.Item>
</Dropdown.Menu> </Dropdown> </Col> </Row>
</Card.Header>


    <Card.Body>  
      {editMode ? (  
  <Form>  
    {["house_number", "street", "postal_code", "phone", "bio"].map(f => (  
      <Form.Group className="mb-3" key={f}>  
        <Form.Label>{f.replace("_", " ").toUpperCase()}</Form.Label>  
        
        {f === "bio" ? (  
          <Form.Control  
            as="textarea"  
            name={f}  
            value={formData[f]}  
            onChange={handleChange}  
          />  
        ) : (  
          <Form.Control  
            type="text"  
            name={f}  
            value={formData[f]}  
            onChange={handleChange}  
          />  
        )}  

        {/* 🔹 Hint for Postal Code field only */}
        {f === "postal_code" && (  
          <small className="form-text text-muted">  
            You can find your postal code on{" "}  
            <a  
              href="https://maps.splonline.com.sa/"  
              target="_blank"  
              rel="noopener noreferrer"  
              className="text-primary text-decoration-underline"  
            >  
              this map  
            </a>  
            .  
          </small>  
        )}  
      </Form.Group>  
    ))}  

    <Button onClick={handleSaveProfile}>Save</Button>  
    <Button  
      variant="secondary"  
      className="ms-2"  
      onClick={() => setEditMode(false)}  
    >  
      Cancel  
    </Button>  
  </Form>  
) : (  
  <>  
    <p><strong>House Number:</strong> {profile.house_number || "Not set"}</p>  
    <p><strong>Street:</strong> {profile.street || "Not set"}</p>  
    <p><strong>Postal Code:</strong> {profile.postal_code || "Not set"}</p>  
    <p><strong>Phone:</strong> {profile.phone || "Not set"}</p>  
    <p><strong>Bio:</strong> {profile.bio || "No bio yet"}</p>  
  </>  
)}  
</Card.Body>
</Card>

  <Accordion defaultActiveKey="">  
    <Accordion.Item eventKey="0">  
      <Accordion.Header><FontAwesomeIcon icon={faChevronRight} className="me-2" /> My Posts</Accordion.Header>  
      <Accordion.Body>  
        {posts.map(post => (  
          <Card key={post.id} className="mb-2 p-2">  
            <h5>{post.title}</h5>  
            <p>{post.content}</p>  
            <Button size="sm" onClick={() => handleEditClick(post, "post")}><FontAwesomeIcon icon={faEdit} /> Edit</Button>  
          </Card>  
        ))}  
      </Accordion.Body>  
    </Accordion.Item>  

    <Accordion.Item eventKey="1">  
      <Accordion.Header><FontAwesomeIcon icon={faChevronRight} className="me-2" /> Created Events</Accordion.Header>  
      <Accordion.Body>  
        {createdEvents.map(event => (  
          <Card key={event.id} className="mb-2 p-2">  
            <h5>{event.title}</h5>  
            <p>{event.description}</p>  
            <Button size="sm" onClick={() => handleEditClick(event, "event")}><FontAwesomeIcon icon={faEdit} /> Edit</Button>  
          </Card>  
        ))}  
      </Accordion.Body>  
    </Accordion.Item>  

    <Accordion.Item eventKey="2">  
      <Accordion.Header><FontAwesomeIcon icon={faChevronRight} className="me-2" /> Joined Events</Accordion.Header>  
      <Accordion.Body>  
        {joinedEvents.map(event => (  
          <Card key={event.id} className="mb-2 p-2">  
            <h5>{event.title}</h5>  
            <p>{event.description}</p>  
          </Card>  
        ))}  
      </Accordion.Body>  
    </Accordion.Item>  
  </Accordion>  

  <Modal show={modalShow} onHide={() => setModalShow(false)}>  
    <Modal.Header closeButton>  
      <Modal.Title>{modalItem?.type==="post" ? "Edit Post" : "Edit Event"}</Modal.Title>  
    </Modal.Header>  
    <Modal.Body>  
      <Form>  
        <Form.Group className="mb-2">  
          <Form.Label>Title</Form.Label>  
          <Form.Control type="text" value={editFields.title || ""} onChange={e=>setEditFields({...editFields, title:e.target.value})} />  
        </Form.Group>  
        <Form.Group className="mb-2">  
          <Form.Label>{modalItem?.type==="post"?"Content":"Description"}</Form.Label>  
          <Form.Control as="textarea" value={modalItem?.type==="post"?editFields.content:editFields.description||""} onChange={e=>setEditFields({...editFields,[modalItem?.type==="post"?"content":"description"]:e.target.value})} />  
        </Form.Group>  
        {modalItem?.type==="event" && (  
          <>  
            <Form.Group className="mb-2">  
              <Form.Label>Date</Form.Label>  
              <Form.Control type="datetime-local" value={editFields.date||""} onChange={e=>setEditFields({...editFields,date:e.target.value})} />  
            </Form.Group>  
            <Form.Group className="mb-2">  
              <Form.Label>Location</Form.Label>  
              <Form.Control type="text" value={editFields.location||""} onChange={e=>setEditFields({...editFields,location:e.target.value})} />  
            </Form.Group>  
          </>  
        )}  
      </Form>  
    </Modal.Body>  
    <Modal.Footer>  
      <Button variant="primary" onClick={handleModalSave}>Save</Button>  
      <Button variant="danger" onClick={handleModalDelete}>Delete</Button>  
    </Modal.Footer>  
  </Modal>  
</Container>  

);
}

export default UserProfile;
