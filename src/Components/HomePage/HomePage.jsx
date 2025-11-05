import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/api";
import "./HomePage.css";

function HomePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");
        if (token) {
          const res = await axios.get("/my-profile/", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const profile = res.data.profile;
          setCurrentUser(profile);

          // ✅ Check if profile is complete (has both user & postal_code)
          if (profile.user && profile.postal_code) {
            setProfileComplete(true);
          }
        }
      } catch (err) {
        setCurrentUser(null);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div
      className="hero-container"
      style={{
          backgroundImage:
      "url('https://images.pexels.com/photos/5580628/pexels-photo-5580628.jpeg')",
    backgroundSize: "cover",          
    backgroundPosition: "center",     
    backgroundRepeat: "no-repeat",   
    minHeight: "100vh",               
    width: "100%",                  
    alignItems: "center",            
    justifyContent: "center",   
      }}
    >
      <div className="overlay">
        <div className="hero-content text-center text-white">
          <h1 className="hero-title mb-3">Welcome to Your Neighborhood</h1>
          <p className="hero-subtitle mb-5">
            Connect, Explore, and Share with Your Community
          </p>

          {/* 🔹 Glass cards with links */}
          <div className="d-flex flex-column flex-md-row justify-content-center gap-4 mb-4">
            <Link to="/events" className="glass-card">
              <h3>Latest Events</h3>
              <p>Check out what’s happening in your area</p>
            </Link>

            <Link to="/posts" className="glass-card">
              <h3>Neighborhood Buzz</h3>
              <p>See what your neighbors are talking about</p>
            </Link>

            <Link to="/neighbors" className="glass-card">
              <h3>Meet Your Neighbors</h3>
              <p>Get to know people in your community</p>
            </Link>
          </div>

          {/* 🔹 If user not logged in */}
          {!currentUser && (
            <p>
              <Link to="/login" className="text-white text-decoration-underline">
                Login
              </Link>{" "}
              | Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-white text-decoration-underline"
              >
                Sign Up
              </Link>
            </p>
          )}

          {/* 🔹 If user logged in but profile incomplete */}
          {currentUser && !profileComplete && (
            <p>
              Hello, {currentUser.user}!{" "}
              <Link
                to="/profile"
                className="text-white text-decoration-underline"
              >
                Update your profile
              </Link>{" "}
              to set your location.
            </p>
          )}

          {/* 🔹 If user logged in and profile complete */}
          {currentUser && profileComplete && (
            <p>
              Welcome back, <strong>{currentUser.user}</strong> 🌟
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
