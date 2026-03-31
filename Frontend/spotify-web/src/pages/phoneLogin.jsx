import "../styles/phoneLogin.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import spotifyLogo from "../Images/spotify-Logo.png";
import googleLogo from "../Images/Google-logo.png";
import facebookLogo from "../Images/facebook-Logo.png";
import appleLogo from "../Images/apple-logo.png";
import emailLogo from "../Images/email.png";

function Login() {
    const navigate = useNavigate();
    return (
        <div className="login-wrapper">
            <div className="login-page">
                <header>
                    <img src={spotifyLogo} alt="Spotify logo" width="32" height="32" />
                </header>
                <main className="login-main">
                    <h1 id="Welcome">Welcome back</h1>
                    <form id="login-form">
                        <div className="input-container">
                            <label className="username">Phone number</label>
                            <div className="phone-input-group">
                                <select className="country-code">
                                    <option>+20</option>
                                    <option>+27</option>
                                    <option>+51</option>
                                    <option selected>+91</option>
                                </select>
                                <input type="text" className="phone-input" />
                            </div>
                        </div>
                        <input type="submit" value="Continue" />
                    </form>
                    <p id="or">or</p>
                    <div id="buttons">
                        <button className="button" onClick={() => navigate("/login")}><img className="image" src={emailLogo} alt="email" />Continue with email</button>
                        <button className="button"><img className="image" src={googleLogo} alt="google" />Continue with Google</button>
                        <button className="button"><img className="image" src={facebookLogo} alt="facebook" />Continue with Facebook</button>
                        <button className="button"><img className="image" src={appleLogo} alt="apple" />Continue with Apple</button>
                    </div>
                    <p id="dhac">Don't have an account?</p>
                    <Link to="/SignUp" className="signup">Sign up</Link>
                    <div id="terms">
                        <p> This site is protected by reCAPTCHA and the Google{" "}
                            <a className="terms" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                                Privacy Policy</a><br />and{" "}
                            <a className="terms" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                                Terms of Service</a>{" "}apply.</p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Login;
