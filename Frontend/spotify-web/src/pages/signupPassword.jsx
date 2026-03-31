import "../styles/signupPassword.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import leftArrow from "../Images/left.png";
import spotifyLogo from "../Images/spotify-Logo.png";
import PassView from "../Images/PassView.png";
import PassHide from "../Images/PassHide.png";

function SignupPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "user";
  const { email } = location.state || {};
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumberOrSpecial = /[0-9!@#$%^&*]/.test(password);
  const hasMinLength = password.length >= 10;
  const isValid = hasLetter && hasNumberOrSpecial && hasMinLength;
  const handleNext = (e) => {
    e.preventDefault();
    if (!isValid) return;
    navigate(`/signup/dob?role=${role}`, {
      state: { email, password, role }
    });
  };
  return (
    <div className="signup-wrapper">
      <div className="logo-container">
        <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo" />
      </div>
      <div className="signup-content">
        <button className="back-btn" onClick={() => navigate(`/signup?role=${role}`)}>
          <img src={leftArrow} alt="Back" />
        </button>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <p className="step-text">Step 1 of 3</p>
        <h1>Create a password</h1>
        <form onSubmit={handleNext}>
          <label>Password</label>
          <div className="password-input-wrapper">
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
            <img src={showPassword ? PassHide : PassView} alt="Toggle Password" className="toggle-icon" onClick={() => setShowPassword(!showPassword)} />
          </div>
          <p className="rules-title">Your password must contain at least</p>
          <div className="rule">
            <span className={hasLetter ? "valid" : ""}>●</span> 1 letter
          </div>
          <div className="rule">
            <span className={hasNumberOrSpecial ? "valid" : ""}>●</span>
            1 number or special character (example: #?!&)
          </div>
          <div className="rule">
            <span className={hasMinLength ? "valid" : ""}>●</span>
            10 characters
          </div>
          <button type="submit" className={`next-btn ${!isValid ? "disabled" : ""}`} disabled={!isValid}>Next</button>
        </form>
      </div>
      <div className="bottom-terms">
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer"><br />Privacy Policy</a>{" "}and{" "}
        <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a>{" "}apply.
      </div>
    </div>
  );
}

export default SignupPassword;