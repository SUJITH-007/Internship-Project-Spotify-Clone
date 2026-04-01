import "../styles/Home.css";
import { Link ,useNavigate} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import spotifyLogo from "../Images/spotify-Logo.png";
import homeLogo from "../Images/house.png";
import searchIcon from "../Images/magnifying-glass.png";
import libraryIcon from "../Images/folder.png";
import Profile from "../Images/Profile.png";
import DownloadLogo from "../Images/DownloadLogo.png";
import Notification from "../Images/Notification.png";
import Community from "../Images/Community.png";
import libraryIcons from "../Images/libraryIcon.png";
import add from "../Images/plus.png";
import Heart from "../Images/heart.png";
import save from "../Images/save.png";
import libraryOpen from "../Images/libraryOpen.png";
import SongPlayButton from "../Images/Song-play-button.png";
import NextButton from "../Images/next.png";
import PreviousButton from "../Images/previous.png";
import VolumeButton from "../Images/volume.png";
import PauseButton from "../Images/pause.png";
import ShuffleButton from "../Images/arrow.png";
import LoopButton from "../Images/loop.png";
import LoopSlected from "../Images/loopSelected.png"
import Microphone from "../Images/microphone-stand.png";
import Queue from "../Images/music.png";
import PhoneLogo from "../Images/phone-logo.png";
import FullScreen from "../Images/fullscreen.png";
import Expand from "../Images/expand.png";
import SpotifyAds from "../Images/Spotify_ads.png";
import LikePlus from "../Images/LikePlus.png";
import Checkmark from "../Images/check.png";

const Home = () => {
    const navigate = useNavigate();
    const [tracks, setTracks] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [likedSongs, setLikedSongs] = useState([]);
    const [looping, setLoop] = useState(false);
    const [view, setView] = useState("home");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        fetch("http://localhost:8000/api/tracks", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            console.error("Tracks fetch failed:", res.status, text);
            setTracks([]);
            return;
        }
        return res.json();
    })
    .then(data => {
        if (Array.isArray(data)) {
            setTracks(data);
        } else {
            console.error("Invalid tracks format:", data);
            setTracks([]);
        }
    })
    .catch(err => {
        console.error("Tracks error:", err);
        setTracks([]);
    });
        fetch("http://localhost:8000/api/likes", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Likes fetch failed");
                return res.json();
            })
            .then(data => {
                setLikedSongs(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.error("Likes error:", err);
                setLikedSongs([]);
            })
    }, []);

    const playSong = (track) => { setCurrentSong(track); setIsPlaying(true); };
    const togglePlay = () => { if (!audioRef.current) return; if (isPlaying) { audioRef.current.pause(); } else { audioRef.current.play(); } setIsPlaying(!isPlaying); }
    const updateProgress = () => { const audio = audioRef.current; if (!audio) return; setCurrentTime(audio.currentTime); setDuration(audio.duration); setProgress((audio.currentTime / audio.duration) * 100); }
    const seekSong = (e) => { const audio = audioRef.current; if (!audio) return; const width = e.target.clientWidth; const clickX = e.nativeEvent.offsetX; audio.currentTime = (clickX / width) * audio.duration; }
    const formatTime = (time) => { if (!time) return "0:00"; const minutes = Math.floor(time / 60); const seconds = Math.floor(time % 60); return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; }
    const visibleTracks = showAll
        ? tracks
        : tracks.slice(-15);
    const toggleLike = async (trackId) => {
        try {
            const res = await fetch("http://localhost:8000/api/likes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ trackId })
            });
            const data = await res.json();
            setLikedSongs(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="home-page">
            <nav className="top_navbar">
                <div className="nav_left">
                    <img src={spotifyLogo} alt="Spotify logo" className="nav_logo" />
                </div>
                <div className="nav_center">
                    <div className="home_icon" onClick={() => navigate("/home")}>
                        <img src={homeLogo} alt="Home" />
                    </div>
                    <div className="search_bar">
                        <img src={searchIcon} alt="Search" className="search_icon" />
                        <input type="text" placeholder="What do you want to play?" />
                        <div className="search-divider"></div>
                        <img src={libraryIcon} alt="Library" className="library-icon" />
                    </div>
                </div>
                <div className="nav_right">
                    <Link to="/subscriptions" className="Premimum-bttn">Explore Premium</Link>
                    <div className="Download">
                        <img src={DownloadLogo} alt="Download logo" />
                        <span className="install-text">Install App</span>
                    </div>
                    <div className="Notification">
                        <img src={Notification} className="NotificationLogo" alt="Notification" />
                    </div>
                    <div className="Community">
                        <img src={Community} className="CommunityLogo" alt="Community" />
                    </div>
                    <div className="Profile">
                        <img src={Profile} className="Profile-img" alt="Profile" />
                    </div>
                </div>
            </nav>
            <div className="home_layout">
                <aside className="home_sidebar">
                    <div className="library-icons-div">
                        <img src={libraryIcons} className="library-img" alt="Libray" />
                        <img src={libraryOpen} className="libraryOpen-icon" alt="libraryOpen-icon" />
                    </div>
                    <div className="Plus-div">
                        <img src={add} className="homeadd-icon" alt="Add" />
                    </div>
                    <div className="like-div">
                        <img src={Heart} className="like-icon" alt="like icon" />
                    </div>
                    <div className="save-div">
                        <img src={save} className="save-icon" alt="save-icon" />
                    </div>
                    <div className="playlist-div"></div>
                </aside>



                <main className="home_main">
                    {view === "home" && (
                        <>
                            <nav className="home_nav">
                                <div className="nav_buttons">
                                    <button className="all-btn"> all</button>
                                    <button className="music-btn"> Music</button>
                                    <button className="Podcast-btn">Podcasts</button>
                                </div>
                            </nav>
                            <section className="home_section">
                                <div className="playlist-row-1">
                                    <div className="playlistcard1" onClick={() => setView("liked")}><div className="playlistcard1-img"><img src={Heart} className="Play-like-icon" alt="like icon" /></div><div className="playlist-name">Liked Songs</div></div>
                                    <div className="playlistcard2"><div className="playlistcard2-img"></div><div className="playlist-name">Playlist 1</div></div>
                                    <div className="playlistcard3"><div className="playlistcard3-img"></div><div className="playlist-name">Playlist 2</div></div>
                                    <div className="playlistcard4"><div className="playlistcard4-img"></div><div className="playlist-name">Playlist 3</div></div>
                                </div>
                                <div className="playlist-row-2">
                                    <div className="playlistcard5"><div className="playlistcard5-img"></div><div className="playlist-name">Playlist 4</div></div>
                                    <div className="playlistcard6"><div className="playlistcard6-img"></div><div className="playlist-name">Playlist 5</div></div>
                                    <div className="playlistcard7"><div className="playlistcard7-img"></div><div className="playlist-name">Playlist 6</div></div>
                                    <div className="playlistcard8"><div className="playlistcard8-img"></div><div className="playlist-name">Playlist 7</div></div>
                                </div>
                            </section>
                            <section className="home_section1">
                                <div className="section_header">
                                    <h2>New Updates</h2>
                                    <span onClick={() => setShowAll(!showAll)}>
                                        {showAll ? "Show Less" : "Show All"}
                                    </span>
                                </div>
                                <div className={`section_box ${showAll ? "grid_view" : "scroll_view"}`}>
                                    {visibleTracks.map((track) => (
                                        <div key={track._id} className="track_card" onClick={() => playSong(track)}>
                                            <img src={`http://localhost:8000/${track.thumbnail}`} alt="cover" className="track_cover" />
                                            <p className="track_title">{track.title}</p>
                                            <p className="track_artist">{track.artists?.join(", ")}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <section className="home_section">
                                <h2>Recently played</h2>
                                <div className="section_box"></div>
                            </section>
                            <section className="home_section">
                                <h2>Made For You</h2>
                                <div className="section_box"></div>
                            </section>
                            <section className="home_section">
                                <h2>Albums</h2>
                                <div className="section_box"></div>
                            </section>
                            <section className="home_section">
                                <div className="main_footer">
                                    <div className="footer_columns">
                                        <div className="footer-column">
                                            <h4>Company</h4>
                                            <p>About</p>
                                            <p>Jobs</p>
                                            <p>For the Record</p>
                                        </div>
                                        <div className="footer_column">
                                            <h4>Communities</h4>
                                            <p>For Artists</p>
                                            <p>Developers</p>
                                            <p>Advertising</p>
                                            <p>Investors</p>
                                            <p>Vendors</p>
                                        </div>
                                        <div className="footer_column">
                                            <h4>Useful links</h4>
                                            <p>Support</p>
                                            <p>Free Mobile App</p>
                                            <p>Popular by Country</p>
                                            <p>Import your music</p>
                                        </div>
                                        <div className="footer_column">
                                            <h4>Spotify Plans</h4>
                                            <p>Premium Lite</p>
                                            <p>Premium Standard</p>
                                            <p>Premium Platinum</p>
                                            <p>Premium Student</p>
                                            <p>Spotify Free</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="main_footer2">
                                    <div className="Footer_terms"><p>Legal</p><p>Safety & Privacy</p><p>Privacy Policy</p><p>Cookies</p><p>About Ads</p><p>Accessibility</p></div><div className="SAB"><p>© 2026 Spotify AB</p></div>
                                </div>
                            </section>
                        </>
                    )}

                    {view === "liked" && (
                        <div className="home_section">
                            <button onClick={() => setView("home")}>Back</button>
                            <div className="liked-list">
                                <div className="Liked-section-header">
                                    <div className="Like-logo"><img src={Heart} className="liked-icon" alt="like icon" /></div>
                                    <div className="like-details"> 
                                    <p className="playlist-like">Playlist</p>
                                    <h1 className="Like-heading">Liked Songs</h1>
                                    <p className="username">Username</p>
                                    </div>
                                </div>
                                {likedSongs.map((track, index) => (
                                    <div key={track._id} className="liked-row" onClick={() => playSong(track)}>
                                        <span className="liked-index">{index + 1}</span>
                                        <img src={`http://localhost:8000/${track.thumbnail}`}className="liked-img"/>
                                        <div className="liked-info">
                                            <p className="liked-title">{track.title}</p>
                                            <p className="liked-artist">{track.artists?.join(", ")}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
                <aside className="home_rightpanel">
                    <div className="rightpanel-container">
                        {currentSong ? (
                            <>
                                <div className="rightpanel-header">
                                    {currentSong.album}
                                </div>
                                <div className="rightpanel-image">
                                    <img
                                        src={`http://localhost:8000/${currentSong.thumbnail}`}
                                        alt="cover"
                                    />
                                </div>
                                <div className="rightpanel-info">
                                    <div className="rightpanel-title">
                                        {currentSong.title}
                                    </div>
                                    <div className="rightpanel-artist">
                                        {currentSong.artists?.join(", ")}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="empty"> <img className="Ads" src={SpotifyAds} /> </div>
                        )}
                    </div>
                </aside>
            </div>
            <footer className="home_player">
                {currentSong && (
                    <div className="player-container">
                        <div className="player-left">
                            <img src={`http://localhost:8000/${currentSong.thumbnail}`} alt="cover" className="player-cover" />
                            <div className="player-song-info">
                                <div className="player-title">{currentSong.title}</div>
                                <div className="player-artist">{currentSong.artists?.join(", ")}</div>
                            </div>
                            <div className="Like_button">
                                <img
                                    src={Array.isArray(likedSongs) &&
                                        likedSongs.some(t => t._id === currentSong?._id) ? Checkmark : LikePlus}
                                    className="LikePlus"
                                    onClick={() => toggleLike(currentSong._id)}
                                />
                            </div>
                        </div>
                        <div className="player-center">
                            <div className="controlButtons">
                                <button className="shuffleButton"><img src={ShuffleButton} className="ShuffleButton" alt="Shuffle" /></button>
                                <button className="previousButton"><img src={PreviousButton} className="PreviousButton" alt="previous" /></button>
                                <button className="playButton" onClick={togglePlay}>
                                    {isPlaying ? <img src={PauseButton} className="PauseButton" /> : <img src={SongPlayButton} className="SongPlay" />}
                                </button>
                                <button className="nextButton"><img src={NextButton} className="Nextbutton" alt="Next" /></button>
                                <button className="loopButton">{looping ? <img src={LoopButton} className="LoopButton" /> : <img src={LoopSlected} className="loopSelected" onClick={() => setLoop(!looping)} />} </button>
                            </div>
                            <div className="progress-row">
                                <span className="time">{formatTime(currentTime)}</span>
                                <div className="progress-container" onClick={seekSong}>
                                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                                </div>
                                <span className="time">{formatTime(duration)}</span>
                            </div>
                            <audio ref={audioRef} className="audio-element" autoPlay onTimeUpdate={updateProgress} src={`http://localhost:8000/${currentSong.audioFile}`} />
                        </div>
                        <div className="player-right">
                            <div className="Microphone"><img src={Microphone} className="microphone" alt="mic" /></div>
                            <div className="Queue"> <img src={Queue} className="queue" alt="queue" /></div>
                            <div className="ConnectToDevice"><img src={PhoneLogo} className="connectToDevice" alt="Connect to device" /></div>
                            <div className="Volume"><img src={VolumeButton} className="volume" alt="Volume button" /></div>
                            <div className="Volume-range"></div>
                            <div className="Miniplayer"><img src={FullScreen} className="miniPlayer" alt="Mini Player" /></div>
                            <div className="EnterFullScreen"><img src={Expand} className="enterFullScreen" alt="Enter Full Screen" /></div>
                        </div>
                    </div>
                )}
            </footer>
        </div>
    );
};
export default Home;