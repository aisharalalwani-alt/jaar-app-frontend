 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("signup/", { username, email, password });
      alert("Signup successful! Redirecting to your profile...");
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        textAlign: "center",
        padding: "30px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#a30000" }}>Signup</h2>

      <form onSubmit={handleSignup}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={inputStyle}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          style={inputStyle}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Loading..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  display: "block",
  margin: "10px auto",
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#5b7aa3",  
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  width: "100%",
  marginTop: "15px",
};

export default SignupForm;
