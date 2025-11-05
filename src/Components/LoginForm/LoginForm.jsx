import { useState } from "react";
import axios from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
try {
const response = await axios.post("/token/", { username, password });
localStorage.setItem("access", response.data.access);
localStorage.setItem("refresh", response.data.refresh);
navigate("/");
} catch (err) {
console.error(err);
alert("Login failed");
}
};

return (  <div className="login-page">
   <div className="login-container"> <h2>Login</h2> <form onSubmit={handleSubmit}>


<input
type="text"
placeholder="Username"
value={username}
onChange={(e) => setUsername(e.target.value)}
required
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/> <button type="submit">Login</button> </form> <p className="signup-link">
Don't have an account? <Link to="/signup">Click here to sign up</Link> </p> </div> </div>
);
}

export default LoginForm;
