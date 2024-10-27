import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { registerUser } from "../../services/auth";

export default function LoginPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await registerUser({
        firstName,
        lastName,
        email,
        password,
      });
      setMessage(result.message);
      navigate("/otp-verify", { state: { email } });
    } catch (error) {
      setError("Registration failed");
    }
  };


  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p>{message}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
