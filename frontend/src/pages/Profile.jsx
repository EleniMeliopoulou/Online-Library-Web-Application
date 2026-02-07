import React, { useState, useEffect } from "react";

const Profile = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email");
        setUsername(storedUsername);
        setEmail(storedEmail);
      }, []);

      const handleUpdates = async () => {
        try {
          const response = await fetch("http://localhost:8080/updateuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email }),
          });
      
          if (!response.ok) {
            throw new Error("User not found");
          }
      
          const user = await response.json(); 
          localStorage.setItem("email", user.email);
          localStorage.setItem("username", user.username);
          setMessage("Changes saved successfully!");
        } catch (error) {
          setMessage("User not found");
        }
      };

  return (
    <>
      <div className="container">
        <div className="headerL">
          <i className="bi bi-person"></i>
          <div className="text">Profile</div>
          <hr style={{width:"587px"}}/>
        </div>
        <div className="inputs">
          <div className="input">
            <label style={{marginLeft:"20px",fontStyle:"oblique",fontSize:"17px"}}>Username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px", marginLeft:"200px" }}>
          <button onClick={handleUpdates} className="submit">
            Save Changes
          </button>
        </div>

        {message && (
          <p style={{ fontSize: "18px", color: "orange", textAlign: "center" }}>
            {message}
          </p>
        )}
      </div>
    </>
  );
};

export default Profile;