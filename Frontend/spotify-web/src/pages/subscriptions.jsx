import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../styles/subscriptions.css";
import spotifyLogo from "../Images/spotify-Logo.png";
import homeLogo from "../Images/house.png";
import searchIcon from "../Images/magnifying-glass.png";
import libraryIcon from "../Images/folder.png";
import DownloadLogo from "../Images/DownloadLogo.png";
import Notification from "../Images/Notification.png";
import Community from "../Images/Community.png";
import Profile from "../Images/Profile.png";
import add from "../Images/plus.png";


const Subscriptions = () => {
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API;
    console.log("API URL:", API);
    const handlePayment = async (plan, amount) => {
        const token = localStorage.getItem("token");
        const orderRes = await fetch(`${API}/api/payment/create-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ amount })
        });
        const order = await orderRes.json();
        const options = {
            key: "rzp_test_SXnGN9aNaQwEHb",
            amount: order.amount,
            currency: "INR",
            order_id: order.id,
            handler: async function (response) {
                console.log("CALLING VERIFY API");
                try {
                    const res = await fetch(`${API}/api/payment/verify`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            ...response,
                            plan
                        })
                    });
                    const data = await res.json();
                    console.log("VERIFY RESPONSE:", data);
                    if (!res.ok) {
                        alert("Payment verification failed");
                        return;
                    }
                    await fetch(`${API}/api/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            localStorage.setItem("user", JSON.stringify(data));
                        });
                    alert("Payment successful");
                    window.location.reload();
                } catch (err) {
                    console.error("VERIFY ERROR:", err);
                    alert("Something went wrong");
                }
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };
    return (

        <div className='subscriptions-page'>
            <nav className="S-top-navbar">
                <div className="S-nav-left">
                    <img src={spotifyLogo} alt="Spotify logo" className="S-nav-logo" />
                </div>
                <div className="S-nav-center">
                    <div className="S-home-icon" onClick={() => navigate("/home")}>
                        <img src={homeLogo} alt="Home" />
                    </div>
                    <div className="S-search-bar">
                        <img src={searchIcon} alt="Search" className="S-search-icon" />
                        <input type="text" placeholder="What do you want to play?" />
                        <div className="S-search-divider"></div>
                        <img src={libraryIcon} alt="Library" className="S-library-icon" />
                    </div>
                </div>
                <div className="S-nav-right">
                    <Link to="/subscriptions" className="S-Premimum-bttn">Explore Premium</Link>
                    <div className="S-Download">
                        <img src={DownloadLogo} alt="Download logo" />
                        <span className="S-install-text">Install App</span>
                    </div>
                    <div className="S-Notification">
                        <img src={Notification} className="S-NotificationLogo" alt="Notification" />
                    </div>
                    <div className="S-Community">
                        <img src={Community} className="S-CommunityLogo" alt="Community" />
                    </div>
                    <div className="S-Profile">
                        <img src={Profile} className="S-Profile-img" alt="Profile" />
                    </div>
                </div>
            </nav>
            <div className='subscriptions-body'>
                <div className="S-main-layout">
                    <div className="S-sidebar">
                        <div className="S-sidebar">
                            <div className="S-library-header">
                                <h3>Your Library</h3>
                                <div className="S-plus">
                                    <img src={add} alt="Add" />
                                </div>
                            </div>
                            <div className="S-library-box">
                                <h4>Create your first playlist</h4>
                                <p>It's easy, we'll help you</p>
                                <button>Create playlist</button>
                            </div>
                            <div className="S-library-box">
                                <h4>Let's find some podcasts to follow</h4>
                                <p>We'll keep you updated on new episodes</p>
                                <button>Browse podcasts</button>
                            </div>
                        </div>
                    </div>
                    <div className="S-content-container">
                        <div className="S-titles">
                            <h1>Choose the Premium plan that's right for you.</h1>
                            <h1>You've got options.</h1>
                            <h4>Choose a Premium plan and listen to the podcasts and ad-free music you want,</h4>
                            <h4>when you want.</h4>
                            <h4>Pay in various ways. Cancel anytime.</h4>
                        </div>
                        <div className="S-plans">
                            <div className="S-plan-card lite">
                                <h3>Premium</h3>
                                <h2>Lite</h2>
                                <p>₹139 / month</p>
                                <ul>
                                    <li>1 account</li>
                                    <li>High audio quality</li>
                                    <li>Cancel anytime</li>
                                </ul>
                                <button onClick={() => handlePayment("lite", 139)}>Get Premium Lite</button>
                            </div>
                            <div className="S-plan-card standard">
                                <h3>Premium</h3>
                                <h2>Standard</h2>
                                <p>₹199 / month</p>
                                <ul>
                                    <li>1 account</li>
                                    <li>Download offline</li>
                                    <li>Very high quality</li>
                                </ul>
                                <button onClick={() => handlePayment("standard", 199)}>Try 2 months</button>
                            </div>
                            <div className="S-plan-card platinum">
                                <h3>Premium</h3>
                                <h2>Platinum</h2>
                                <p>₹299 / month</p>
                                <ul>
                                    <li>Multiple accounts</li>
                                    <li>Lossless audio</li>
                                    <li>AI playlists</li>
                                </ul>
                                <button onClick={() => handlePayment("platinum", 299)}>Get Premium</button>
                            </div>
                            <div className="S-plan-card student">
                                <h3>Premium</h3>
                                <h2>Student</h2>
                                <p>₹99 / month</p>
                                <ul>
                                    <li>Student discount</li>
                                    <li>Download offline</li>
                                    <li>High quality</li>
                                </ul>
                                <button onClick={() => handlePayment("student", 99)}>Try Offer</button>
                            </div>
                        </div>
                        <div className="S-comparison">
                            <h2 className="S-compare-title">Experience the difference</h2>
                            <div className="S-compare-table">
                                <div className="S-row header">
                                    <div></div>
                                    <div>Free</div>
                                    <div>Premium</div>
                                </div>
                                <div className="S-row">
                                    <div>Ad-free music listening</div>
                                    <div>-</div>
                                    <div>Yes</div>
                                </div>
                                <div className="S-row">
                                    <div>Play songs in any order</div>
                                    <div>-</div>
                                    <div>Yes</div>
                                </div>
                                <div className="S-row">
                                    <div>Very high audio quality</div>
                                    <div>-</div>
                                    <div>Yes</div>
                                </div>
                                <div className="S-row">
                                    <div>Listen with friends in real time</div>
                                    <div>-</div>
                                    <div>Yes</div>
                                </div>
                            </div>
                        </div>
                        <div className="S-footer">
                            <div className="S-footer-top">
                                <div className="S-footer-col">
                                    <h4>Company</h4>
                                    <p>About</p>
                                    <p>Jobs</p>
                                    <p>For the Record</p>
                                </div>
                                <div className="S-footer-col">
                                    <h4>Communities</h4>
                                    <p>For Artists</p>
                                    <p>Developers</p>
                                    <p>Advertising</p>
                                    <p>Investors</p>
                                    <p>Vendors</p>
                                </div>
                                <div className="S-footer-col">
                                    <h4>Useful links</h4>
                                    <p>Support</p>
                                    <p>Free Mobile App</p>
                                    <p>Popular by Country</p>
                                    <p>Import your music</p>
                                </div>
                                <div className="S-footer-col">
                                    <h4>Spotify Plans</h4>
                                    <p>Premium Lite</p>
                                    <p>Premium Standard</p>
                                    <p>Premium Platinum</p>
                                    <p>Premium Student</p>
                                    <p>Spotify Free</p>
                                </div>
                            </div>
                            <div className="S-footer-bottom">
                                <p>Legal</p>
                                <p>Safety & Privacy Center</p>
                                <p>Privacy Policy</p>
                                <p>Cookies</p>
                                <p>About Ads</p>
                                <p>Accessibility</p>
                                <span>© 2026 Spotify AB</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscriptions