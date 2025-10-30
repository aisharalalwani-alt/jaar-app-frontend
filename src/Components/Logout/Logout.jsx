 import axios from "../../services/api";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout/", { refresh: localStorage.getItem("refresh") });
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
