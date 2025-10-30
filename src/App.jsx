import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import PostsList from "./components/PostsList";
import PostCreate from "./components/PostCreate";
import EventsList from "./components/EventsList";
import EventCreate from "./components/EventCreate";
import VolunteersList from "./components/VolunteersList";
import UserProfile from "./components/UserProfile";
import NeighborsList from "./components/NeighborsList";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";

function App() {
  return (
    <Router>
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
