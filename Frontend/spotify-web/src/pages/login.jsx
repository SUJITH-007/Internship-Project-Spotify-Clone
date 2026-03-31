import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import spotifyLogo from "../Images/spotify-Logo.png";
import phoneLogo from "../Images/phone-logo.png";
import googleLogo from "../Images/Google-logo.png";
import facebookLogo from "../Images/facebook-Logo.png";
import appleLogo from "../Images/apple-logo.png";
import content from "../Images/content.png";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const handleContinue = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            alert("Enter your email");
            return;
        }
        navigate("/login/password", { state: { email } });
    };
    return (
        <div className="login-wrapper">
            <div className="login-page">
                <header>
                    <img src={spotifyLogo} alt="Spotify logo" width="32" height="32" />
                </header>
                <main className="login-main">
                    <h1 id="Welcome">Welcome back</h1>
                    <form id="login-form" onSubmit={handleContinue}>
                        <div className="input-container">
                            <label className="username">Email or username</label>
                            <input type="text"value={email}onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <input type="submit" value="Continue" />
                    </form>
                    <p id="or">or</p>
                    <div id="buttons">
                        <button className="button" onClick={() => navigate("/PhoneLogin")}><img className="image" src={phoneLogo} alt="phone" />
                            Continue with phone number</button>
                        <button className="button" onClick={()=> navigate("/creatorLogin")}><img className="image" src={content} alt="Content creator"/>Continue as a Creator</button>
                        <button className="button"><img className="image" src={googleLogo} alt="google" />Continue with Google</button>
                        <button className="button"><img className="image" src={facebookLogo} alt="facebook" />Continue with Facebook</button>
                        <button className="button"><img className="image" src={appleLogo} alt="apple" />Continue with Apple</button>
                    </div>
                    <p id="dhac">Don't have an account?</p>
                    <Link to="/SignUp" className="signup">Sign up</Link>
                    <div id="terms">
                        <p>
                            This site is protected by reCAPTCHA and the Google{" "}
                            <a className="terms" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>
                            <br />and{" "}<a className="terms" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                                Terms of Service</a>{" "}apply.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Login;
