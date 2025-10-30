// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar.jsx";

 
import HomePage from "./Components/HomePage/HomePage.jsx";
import PostsList from "./Components/PostsList/PostsList.jsx";
import PostCreate from "./Components/PostCreate/PostCreate.jsx";
import EventsList from "./Components/EventsList/EventsList.jsx";
import EventCreate from "./Components/EventCreate/EventCreate.jsx";
import VolunteersList from "./Components/VolunteersList/VolunteersList.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import NeighborsList from "./Components/NeighborsList/NeighborsList.jsx";
import SignupForm from "./Components/SignupForm/SignupForm.jsx";
import LoginForm from "./Components/LoginForm/LoginForm.jsx";
import Logout from "./Components/Logout/Logout.jsx";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/new" element={<PostCreate />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/new" element={<EventCreate />} />
        <Route path="/volunteers" element={<VolunteersList />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/neighbors" element={<NeighborsList />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
