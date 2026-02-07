import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import './LoginSignup.css'

const LoginSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [action,setAction] = useState("Sign Up");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/getuserbyemail?email=${encodeURIComponent(email)}`
      );
      if (!response.ok) throw new Error("User not found");
      const user = await response.json();
  
      localStorage.setItem("userId", user.id);
      localStorage.setItem("email", user.email);
      localStorage.setItem("username", user.username);
      nav("/home");
    } catch (error) {
      setMessage("User not found");
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8080/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) throw new Error("Signup failed");
      const user = await response.json();
      localStorage.setItem("userId", user.id);
      localStorage.setItem("username", user.username);
      localStorage.setItem("email", user.email);
      nav("/home");
    } catch (error) {
      setMessage("Could not sign up");
    }
  };

  return (
    <>
    <div className="container">
      <div className="headerL">
        <div className="text">{action}</div>
      </div>
      <div className="inputs">
        {action==="Login"?<div></div>: <div className="input">
          <i className="bi bi-person big-icon"></i>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>}
        <div className="input">
          <i className="bi bi-at big-icon"></i>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="input">
          <i className="bi bi-lock big-icon"></i>
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <i className="bi bi-eye" style={{cursor:'pointer'}} onClick={() => setShowPassword(!showPassword)}></i>
        </div>
      </div>
      {action==="Sign Up"?<div></div>:<div className="forgot-password">
        Did you forget your password? <span>Click here!</span></div>} {/*Δεν του δώσαμε λειτουργία τελικά. Αποφασίσαμε όμως να το αφήσουμε για την αισθητική */}
      <div className="submit-container">
        <button className="submit" onClick={action === "Login" ? handleLogin : handleSignup}>
          {action}
        </button>
        <button className="submit" onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}>
          {action === "Login" ? "Sign Up" : "Login"}
        </button>
      </div>
      <div className="message">
          {message && <p style={{fontSize:"20px",justifySelf:"center", color:"orange", fontStyle:"oblique"}}><strong>{message}</strong></p>}
        </div>

    </div>   
    
    </>
    
  );
};

export default LoginSignup;