import "../styles/loginPassword.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LoginPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const API =import.meta.env.VITE_API;
    useEffect(() => {
        if (!email) {
            navigate("/login");
        }
    }, [email, navigate]);
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!password.trim()) {
            alert("Enter password");
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`${API}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                setLoading(false);
                return;
            }
            localStorage.setItem("token", data.token);
            navigate("/home");
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="password-wrapper">
            <div className="password-content">
                <button className="back-btn" onClick={() => navigate(-1)}>←</button>
                <h1 className="title">Log in with a password</h1>
                <form className="password-form" onSubmit={handleLogin}>
                    <label>Email or username</label>
                    <div className="email-display">{email}</div>
                    <label>Password</label>
                    <input
                        type="password"
                        className="password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-btn">
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </form>
                <p className="without-password">Log in without password</p>
            </div>
            <div className="bottom-terms">
                This site is protected by reCAPTCHA and the Google{" "}<a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                    Privacy Policy</a>{" "}and{" "}<br />
                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a>{" "}apply.
            </div>
        </div>
    );
}

export default LoginPassword;
