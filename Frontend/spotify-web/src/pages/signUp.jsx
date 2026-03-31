import "../styles/signUp.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import spotifyLogo from "../Images/spotify-Logo.png";
import googleIcon from "../Images/Google-logo.png";
import appleLogo from "../Images/apple-logo.png";
import content from "../Images/content.png";

function SignUp() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const role = params.get("role") || "user";
    const [email, setEmail] = useState("");
    return (
        <div className="signup-wrapper">
            <div className="signup-body">
                <div className="logo">
                    <img src={spotifyLogo} alt="Spotify Logo" width="32" height="32" />
                </div>
                <h1 className="signup-title">
                    {role === "creator"
                        ? "Sign up to start publishing"
                        : "Sign up to start listening"}
                </h1>
                <div className="input">
                    <label className="enter-email">Email address</label>
                    <input type="email" className="email-input" placeholder="name@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Link to="/phonelogin" className="switchToPhone">
                        Use phone number instead
                    </Link>
                </div>
                <button className="next-button" disabled={!email.trim()} onClick={() => navigate(`/signup/password?role=${role}`, { state: { email, role } })}>Next</button>
                <div className="or">
                    <span>or</span>
                </div>
                <div className="buttons">
                    <button className="google">
                        <img className="icon" src={googleIcon} alt="Google" />
                        <span>Sign up with Google</span>
                    </button>
                    <button className="apple">
                        <img className="icon" src={appleLogo} alt="Apple" />
                        <span>Sign up with Apple</span>
                    </button>
                    {role === "creator" && (
                        <button className="back-switch" onClick={() => navigate("/signup")}>Switch to User Sign up</button>
                    )}
                    {role !== "creator" && (
                        <button className="content" onClick={() => navigate("/signup?role=creator")}>
                            <img className="icon" src={content} alt="Content" />
                            <span>Sign up as a Creator</span>
                        </button>
                    )}
                </div>
                <div className="login">
                    <p>Already have an account?</p>
                    <button className="login-link" onClick={() => navigate("/login")}>Log in</button>
                </div>
                <div className="terms-container">
                    <p>This site is protected by reCAPTCHA and the Google{" "}
                        <a className="terms" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>
                        <br />and{" "}
                        <a className="terms" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Terms of Service</a>{" "}apply.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;