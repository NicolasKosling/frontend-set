// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isDocent, setIsDocent] = useState(false);
  const [naam, setNaam] = useState("");
  const [voornaam, setVoornaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoonnummer, setTelefoonnummer] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isDocent,
          naam,
          voornaam,
          email,
          telefoonnummer,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
      console.error("Registration error:", err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Is Docent?</label>
          <br />
          <select
            value={isDocent}
            onChange={(e) => setIsDocent(e.target.value === "true")}
          >
            <option value="false">Student</option>
            <option value="true">Docent</option>
          </select>
        </div>
        <div>
          <label>Naam:</label>
          <br />
          <input
            type="text"
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Voornaam:</label>
          <br />
          <input
            type="text"
            value={voornaam}
            onChange={(e) => setVoornaam(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefoonnummer:</label>
          <br />
          <input
            type="text"
            value={telefoonnummer}
            onChange={(e) => setTelefoonnummer(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
