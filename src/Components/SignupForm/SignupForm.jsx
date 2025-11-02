import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("signup/", {
        username,
        email,
        password,
      });

      alert("Signup successful! Redirecting to your profile...");
      // Save tokens (optional if login happens separately)
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={{ display: "block", margin: "10px auto", width: "100%" }}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          style={{ display: "block", margin: "10px auto", width: "100%" }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ display: "block", margin: "10px auto", width: "100%" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
