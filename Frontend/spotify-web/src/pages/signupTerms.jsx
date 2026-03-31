import React, { useState } from "react";
import "../styles/signupTerms.css";
import { useNavigate, useLocation } from "react-router-dom";
import spotifyLogo from "../Images/spotify-Logo.png";
import leftArrow from "../Images/left.png";
import axios from "axios";

function SignupTerms() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "user";
  const { email, password, name, year, month, day, gender } = location.state || {};
  const [marketingOptOut, setMarketingOptOut] = useState(false);
  const [shareDataWithProviders, setShareDataWithProviders] = useState(false);
  const isFormValid = marketingOptOut && shareDataWithProviders;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    if (!email || !password || !name || !year || !month || !day || !gender) {
      console.error("Missing signup data. Restart signup process.");
      navigate("/signup");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        email,
        password,
        username: name,
        year,
        month,
        day,
        gender,
        role,
        marketingOptOut,
        shareDataWithProviders
      });
      localStorage.setItem("token", res.data.token);
      if (role === "creator") {
        navigate("/contentCreator");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Signup failed");
    }
  };
  return (
    <div className="signup-wrapper">
      <div className="logo-container">
        <img src={spotifyLogo} className="spotify-logo" alt="Spotify" />
      </div>
      <div className="signup-content">
        <button className="back-btn" onClick={() => navigate(`/signup/dob?role=${role}`, { state: location.state })}>
          <img src={leftArrow} alt="back" />
        </button>
        <div className="progress-wrapper">
          <div className="progress-bar">
            <div className="progress-fill step-three"></div>
          </div>
          <p className="step-text">Step 3 of 3</p>
        </div>
        <h3 className="title">Terms and Condition</h3>
        <form id="check-box" onSubmit={handleSubmit}>
          <div className="checkbox-1">
            <div>
              <input
                type="checkbox"
                id="check-box1"
                checked={marketingOptOut}
                onChange={(e) => setMarketingOptOut(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="check-box1">
                I would not prefer to receive marketing messages from Spotify
              </label>
            </div>
          </div>
          <div className="checkbox-2">
            <div>
              <input
                type="checkbox"
                id="check-box2"
                checked={shareDataWithProviders}
                onChange={(e) => setShareDataWithProviders(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="check-box2">
                Share my registration data with Spotify's content providers for marketing purpose
              </label>
            </div>
          </div>
          <div className="info">
            <p>Spotify is a personalised service</p>
          </div>
          <div className="TC">
            <p>
              By clicking on sign-up, you agree to Spotify's{" "}
              <a href="https://policies.google.com/terms">Terms and Conditions of Use.</a>
            </p>
          </div>
          <div className="Privacy">
            <p>
              By clicking on sign-up, you confirm that you have read how we process your personal data in our{" "}
              <a href="https://policies.google.com/privacy">Privacy Policy.</a>
            </p>
          </div>
          <button className="signup-btn" type="submit" disabled={!isFormValid}>
            Sign up
          </button>
          <div className="bottom-terms">
            This site is protected by reCAPTCHA and the Google
            <br />
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupTerms;