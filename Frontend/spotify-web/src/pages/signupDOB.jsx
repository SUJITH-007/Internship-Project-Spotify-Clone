import "../styles/signupDOB.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import spotifyLogo from "../Images/spotify-Logo.png";
import leftArrow from "../Images/left.png";

function SignupDOB() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "user";
  const { email, password } = location.state || {};
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    month: "",
    day: "",
    gender: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleNext = (e) => {
    e.preventDefault();
    navigate(`/signup/terms?role=${role}`, {
      state: { email, password, role, ...formData }
    });
  };
  return (
    <div className="signup-wrapper">
      <div className="logo-container">
        <img src={spotifyLogo} className="spotify-logo" alt="Spotify" />
      </div>
      <div className="signup-content">
        <button className="back-btn" onClick={() => navigate(`/signup/password?role=${role}`, { state: { email, role } })}>
          <img src={leftArrow} alt="back" />
        </button>
        <div className="progress-wrapper">
          <div className="progress-bar">
            <div className="progress-fill step-two"></div>
          </div>
          <p className="step-text">Step 2 of 3</p>
        </div>
        <h1 className="title">Tell us about yourself</h1>
        <form onSubmit={handleNext}>
          <label>Name</label>
          <p className="sub-text">This name will appear on your profile</p>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          <label>Date of birth</label>
          <p className="sub-text">Why do we need your date of birth?<span className="learn-more"> Learn more.</span></p>
          <div className="dob-row">
            <input type="text" placeholder="yyyy" name="year" value={formData.year} onChange={handleChange} />
            <select name="month" value={formData.month} onChange={handleChange}>
              <option value="">Month</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
            <input type="text" placeholder="dd" name="day" value={formData.day} onChange={handleChange} />
          </div>
          <label>Gender</label>
          <p className="sub-text">We use your gender to help personalize our content recommendations.</p>
          <div className="gender-options">
            {[
              "Man",
              "Woman",
              "Non-binary",
              "Something else",
              "Prefer not to say",
            ].map((option) => (
              <label key={option} className="radio-label">
                <input type="radio" name="gender" value={option} checked={formData.gender === option} onChange={handleChange} />{option}</label>
            ))}
          </div>
          <button className="next-btn" type="submit">Next</button>
        </form>
      </div>
      <div className="bottom-terms">
        This site is protected by reCAPTCHA and the Google<br />
        <a href="https://policies.google.com/privacy">Privacy Policy</a>
        {" "}and{" "}<a href="https://policies.google.com/terms">Terms of Service</a>{" "}apply.
      </div>
    </div>
  );
}

export default SignupDOB;