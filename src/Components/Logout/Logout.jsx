import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Get the refresh token from local storage
        const refresh = localStorage.getItem("refresh");
        if (!refresh) {
          alert("No refresh token found!");
          navigate("/login");
          return;
        }

        // Send the refresh token to the backend for blacklisting
        await api.post("logout/", { refresh });

        // Remove tokens from local storage
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        alert("Logged out successfully!");
        navigate("/login");
      } catch (err) {
        console.error("Logout failed:", err);
        alert("Logout failed");
        navigate("/login");
      }
    };

    handleLogout();
  }, [navigate]);

  return null; // No UI element — logout runs automatically
}

export default Logout;
