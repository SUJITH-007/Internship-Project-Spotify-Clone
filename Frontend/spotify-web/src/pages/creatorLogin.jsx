import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/creatorLogin.css";
import spotifyLogo from "../Images/spotify-Logo.png";

const CreatorLogin = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/contentCreator");
  };
  return (
    <div className="creator-login-wrapper">
      <img src={spotifyLogo} alt="Spotify" className="login-logo" />
      <h1 className="login-title">Creator Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label >Email or username</label>
        <input type="email" required placeholder="name@domain.com" />
        <label>Password</label>
        <input type="password" required />
        <button type="submit" onClick={() => navigate("/contentCreator")}>Log in</button>
      </form>
      <p className="back-link" onClick={() => navigate("/login")}>Log in as regular user</p>
      <div className="terms-container">
        <p>This site is protected by reCAPTCHA and the Google{" "}
          <a className="terms" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>
          <br />and{" "}
          <a className="terms" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Terms of Service</a>{" "}apply.
        </p>
      </div>
    </div>
  );
};

export default CreatorLogin;