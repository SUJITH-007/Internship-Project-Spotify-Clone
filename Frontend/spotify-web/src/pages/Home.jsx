import "../styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
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
import Back from "../Images/back.png";
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
import MusicNote from "../Images/musical-note.png"

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
    const [playlists, setPlaylists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [newPlaylistImage, setNewPlaylistImage] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [likedSelected, setLikedSelected] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const searchRef = useRef(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [looping, setLoop] = useState(false);
    const [view, setView] = useState("home");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showShare, setShowShare] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    const [playContext, setPlayContext] = useState("global");
    const [sessionId, setSessionId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState({
        tracks: [],
        albums: [],
        playlists: []
    });
    const [showSearch, setShowSearch] = useState(false);
    const API = import.meta.env.VITE_API;

    const [dashboard, setDashboard] = useState({
        topTracks: [],
        topArtists: []
    });
    const fetchPlaylists = useCallback(async () => {
        const token = localStorage.getItem("token");
        const data = await fetch(`${API}/api/playlists`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json());
        const list = Array.isArray(data) ? data : data.playlists || [];
        setPlaylists(list);
        if (selectedPlaylist) {
            const updated = list.find(p => p._id === selectedPlaylist._id);
            if (updated) setSelectedPlaylist(updated);
        }
    }, [API, selectedPlaylist]);
    const fetchDashboard = useCallback(async () => {
        const token = localStorage.getItem("token");
        const data = await fetch(`${API}/api/user/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json());
        setDashboard(data);
    }, [API]);
    useEffect(() => {
        if (!sessionId) return;
        let isActive = true;
        const timer = setTimeout(async () => {
            if (!isActive) return;
            await fetch(`${API}/api/play/complete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ sessionId })
            });
        }, 30000);
        return () => {
            isActive = false;
            clearTimeout(timer);
        };
    }, [sessionId]);

    const fetchAlbums = async () => {
        try {
            const res = await fetch(`${API}/api/albums`);
            const data = await res.json();
            setAlbums(data);
        } catch (err) {
            console.error(err);
            setAlbums([]);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        fetch(`${API}/api/tracks`, {
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
        fetch(`${API}/api/likes`, {
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
            });
        fetchAlbums();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchPlaylists();
        fetchDashboard();
    }, []);
    useEffect(() => {
        if (audioRef.current && currentSong) {
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [currentSong]);
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const searchTimeout = useRef(null);
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        if (!query.trim()) {
            setShowSearch(false);
            return;
        }
        searchTimeout.current = setTimeout(async () => {
            try {
                const token = localStorage.getItem("token");
                const [tracksRes, albumsRes, playlistsRes] = await Promise.all([
                    fetch(`${API}/api/tracks/search/${query}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch(`${API}/api/albums/search/${query}`),
                    fetch(`${API}/api/playlists/search/${query}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                const tracksData = await tracksRes.json();
                const albumsData = await albumsRes.json();
                const playlistsData = await playlistsRes.json();
                console.log("TRACKS:", tracksData);
                console.log("ALBUMS:", albumsData);
                console.log("PLAYLISTS:", playlistsData);
                setSearchResults({
                    tracks: Array.isArray(tracksData) ? tracksData : tracksData.tracks || [],
                    albums: Array.isArray(albumsData) ? albumsData : albumsData.albums || [],
                    playlists: Array.isArray(playlistsData) ? playlistsData : playlistsData.playlists || []
                });
                setShowSearch(true);
            } catch (err) {
                console.error("Search error", err);
            }
        }, 400);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSearch(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const playSong = async (track) => {
        const index = tracks.findIndex(t => t._id === track._id);
        setPlayContext("global");
        setCurrentIndex(index);
        setCurrentSong(track);
        setIsPlaying(true);
        try {
            await startSession(track._id);
        } catch (err) {
            console.error(err + "Play count failed");
        }
    };
    const togglePlay = () => { if (!audioRef.current) return; if (isPlaying) { audioRef.current.pause(); } else { audioRef.current.play(); } setIsPlaying(!isPlaying); }
    const updateProgress = () => { const audio = audioRef.current; if (!audio) return; setCurrentTime(audio.currentTime); setDuration(audio.duration); setProgress((audio.currentTime / audio.duration) * 100); }
    const seekSong = (e) => { const audio = audioRef.current; if (!audio) return; const width = e.target.clientWidth; const clickX = e.nativeEvent.offsetX; audio.currentTime = (clickX / width) * audio.duration; }
    const formatTime = (time) => { if (!time) return "0:00"; const minutes = Math.floor(time / 60); const seconds = Math.floor(time % 60); return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; }
    const visibleTracks = showAll
        ? tracks
        : tracks.slice(-15);
    const toggleLike = async (trackId) => {
        try {
            const res = await fetch(`${API}/api/likes`, {
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
    const playNext = () => {
        const list = playContext === "playlist"
            ? selectedPlaylist?.tracks || []
            : playContext === "liked"
                ? likedSongs
                : playContext === "album"
                    ? selectedAlbum?.tracks || []
                    : tracks;
        if (!list.length) return;
        let nextIndex;
        if (isShuffling) {
            if (list.length === 1) {
                nextIndex = 0;
            } else {
                do {
                    // eslint-disable-next-line react-hooks/purity
                    nextIndex = Math.floor(Math.random() * list.length);
                } while (nextIndex === currentIndex);
            }
        } else {
            nextIndex = (currentIndex + 1) % list.length;
        }
        const nextTrack = list[nextIndex];
        setCurrentIndex(nextIndex);
        setCurrentSong(nextTrack);
        startSession(nextTrack._id);
        setIsPlaying(true);
    };


    const playPrevious = () => {
        const list = playContext === "playlist"
            ? selectedPlaylist?.tracks || []
            : playContext === "liked"
                ? likedSongs
                : playContext === "album"
                    ? selectedAlbum?.tracks || []
                    : tracks;
        if (!list.length) return;
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = list.length - 1;
        const prevTrack = list[prevIndex];
        setCurrentIndex(prevIndex);
        setCurrentSong(prevTrack);
        startSession(prevTrack._id);
        setIsPlaying(true);
    };
    const toggleShuffle = () => {
        setIsShuffling(!isShuffling);
    };
    const [newName, setNewName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newImage, setNewImage] = useState(null);
    const updateProfile = async () => {
        setIsSaving(true);
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            if (newName) formData.append("username", newName);
            if (newPassword) formData.append("password", newPassword);
            if (newImage) formData.append("profileImage", newImage);
            const res = await fetch(`${API}/api/user/update`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            if (!res.ok) {
                console.error("Update failed");
                return;
            }
            const data = await res.json();
            if (!data.user) {
                console.error("Invalid user response");
                return;
            }
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
            setShowEdit(false);
        } catch (err) {
            console.error("Update error:", err);
            setIsSaving(false);
        }
    };
    const startSession = async (trackId) => {
        const res = await fetch(`${API}/api/play/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ trackId })
        });
        const data = await res.json();
        setSessionId(data.sessionId);
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
                    <div className="search_bar" ref={searchRef}>
                        <img src={searchIcon} alt="Search" className="search_icon" />
                        <input
                            type="text"
                            placeholder="What do you want to play?"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            onFocus={() => searchQuery && setShowSearch(true)}
                        />
                        <div className="search-divider"></div>
                        <img src={libraryIcon} alt="Library" className="library-icon" />
                        {showSearch && (
                            <div className="search_results">
                                {searchResults.tracks.map(t => (
                                    <div key={t._id} className="search_item" onClick={() => playSong(t)}>
                                        <img src={`${API}/${t.thumbnail}`} />
                                        <span>{t.title}</span>
                                    </div>
                                ))}
                                {searchResults.albums.map(a => (
                                    <div key={a._id} className="search_item" onClick={async () => {
                                        const res = await fetch(`${API}/api/albums`);
                                        const data = await res.json();
                                        const full = data.find(x => x._id === a._id);
                                        setSelectedAlbum(full);
                                        setView("album");
                                        setShowSearch(false);
                                    }}>
                                        <span>Album: {a.name}</span>
                                    </div>
                                ))}
                                {searchResults.playlists.map(p => (
                                    <div key={p._id} className="search_item" onClick={async () => {
                                        const res = await fetch(`${API}/api/playlists`, {
                                            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                                        });
                                        const data = await res.json();
                                        const full = data.find(x => x._id === p._id);
                                        setSelectedPlaylist(full);
                                        setView("playlist");
                                        setShowSearch(false);
                                    }}>
                                        <span>Playlist: {p.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
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
                    <div className="Profile" onClick={() => setView("profile")}>
                        <img src={user?.profileImage ? `${API}/${user.profileImage}` : Profile} className="Profile-img" alt="Profile" />
                    </div>
                </div>
            </nav>
            <div className="home_layout">
                <aside className="home_sidebar">
                    <div className="library-icons-div">
                        <img src={libraryIcons} className="library-img" alt="Libray" />
                        <img src={libraryOpen} className="libraryOpen-icon" alt="libraryOpen-icon" />
                    </div>
                    <div className="Plus-div" onClick={() => setShowCreateModal(true)}>
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
                                    <div className="playlist-card" onClick={() => setView("liked")}>
                                        <div className="playlist-card-img home-like">
                                            <img src={Heart} className="Play-like-icon" />
                                        </div>
                                        <div className="playlist-name">Liked Songs</div>
                                    </div>
                                    {playlists.slice(0, 7).map((p) => (
                                        <div key={p._id} className="playlist-card"
                                            onClick={async () => {
                                                const res = await fetch(`${API}/api/playlists`, {
                                                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                                                });
                                                const data = await res.json();
                                                const full = data.find(x => x._id === p._id);
                                                setSelectedPlaylist(full);
                                                setView("playlist");
                                                setShowSearch(false);
                                            }}>
                                            <div className="playlist-card-img home-playlist">
                                                {p.image ? (
                                                    <img src={p.image?.startsWith("http") ? p.image : `${API}${p.image}`} />
                                                ) : (<img src={MusicNote} />)}
                                            </div>
                                            <div className="playlist-name">{p.name}</div>
                                        </div>
                                    ))}
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
                                            <img src={`${API}/${track.thumbnail}`} alt="cover" className="track_cover" />
                                            <p className="track_title">{track.title}</p>
                                            <p className="track_artist">{track.artists?.join(", ")}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            {/* <section className="home_section">
                                <h2>Recently played</h2>
                                <div className="section_box"></div>
                            </section>
                            <section className="home_section">
                                <h2>Made For You</h2>
                                <div className="section_box"></div>
                            </section> */}
                            <section className="home_section">
                                <h2>Albums</h2>
                                <div className="section_box">
                                    {albums.map(a => (
                                        <div key={a._id} className="album_card"
                                            onClick={async () => {
                                                await fetchAlbums();
                                                const updated = albums.find(x => x._id === a._id);
                                                setSelectedAlbum(updated);
                                                setView("album");
                                            }}>
                                            <img
                                                src={a.coverImage ? `${API}/uploads/${a.coverImage}` : MusicNote}
                                                className="album_cover"
                                            />
                                            <p className="track_title">{a.name}</p>
                                        </div>
                                    ))}
                                </div>
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
                            <div className="likelist-top">
                                <button className="backbtn" onClick={() => setView("home")}>
                                    <img src={Back} alt="back" />
                                </button>
                            </div>
                            <div className="liked-list">
                                <div className="Liked-section-header">
                                    <div className="Like-logo"><img src={Heart} className="liked-icon" alt="like icon" /></div>
                                    <div className="like-details">
                                        <p className="playlist-like">Playlist</p>
                                        <h1 className="Like-heading">Liked Songs</h1>
                                        <p className="username">{user?.username}</p>
                                    </div>
                                </div>
                                <div className="playlist-controls">
                                    <button className="play-btn" onClick={() => {
                                        if (!likedSongs.length) return;
                                        setPlayContext("liked");
                                        setCurrentIndex(0);
                                        setCurrentSong(likedSongs[0]);
                                        setIsPlaying(true);
                                    }}>
                                        <img src={isPlaying ? PauseButton : SongPlayButton} />
                                    </button>
                                    <button className={`icon-btn ${isShuffling ? "active" : ""}`} onClick={toggleShuffle}>
                                        <img src={ShuffleButton} />
                                    </button>
                                    <button className="icon-btn">
                                        <img src={DownloadLogo} />
                                    </button>
                                    <button className="icon-btn" onClick={() => setShowShare(true)}>
                                        <img src={Community} />
                                    </button>
                                </div>
                                {likedSongs.map((track, index) => (
                                    <div key={track._id} className="liked-row" onClick={() => {
                                        setPlayContext("liked");
                                        setCurrentIndex(index);
                                        setCurrentSong(track);
                                        setIsPlaying(true);
                                    }}>
                                        <span className="liked-index">{index + 1}</span>
                                        <img src={`${API}/${track.thumbnail}`} className="liked-img" />
                                        <div className="liked-info">
                                            <p className="liked-title">{track.title}</p>
                                            <p className="liked-artist">{track.artists?.join(", ")}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {view === "playlist" && selectedPlaylist && (
                        <div className="home_section">
                            <div className="playlist-top">
                                <button className="backbtn" onClick={() => setView("home")}><img src={Back} /></button>
                            </div>
                            <div className="playlist-list">
                                <div className="playlist-header">
                                    <div className="playlist-image">
                                        <img src={selectedPlaylist.image ? (selectedPlaylist.image.startsWith("http") ? selectedPlaylist.image : `${API}${selectedPlaylist.image}`) : MusicNote} />
                                    </div>
                                    <div className="playlist-info">
                                        <p className="playlist-type">Playlist</p>
                                        <h1 className="playlist-title">{selectedPlaylist.name}</h1>
                                        <p className="playlist-meta">{user?.username}</p>
                                    </div>
                                </div>
                                <div className="playlist-controls">
                                    <button className="play-btn" onClick={() => {
                                        if (!selectedPlaylist.tracks?.length) return;
                                        setPlayContext("playlist");
                                        setCurrentIndex(0);
                                        setCurrentSong(selectedPlaylist.tracks[0]);
                                        setIsPlaying(true);
                                    }}>
                                        <img src={isPlaying ? PauseButton : SongPlayButton} />
                                    </button>
                                    <button className={`icon-btn ${isShuffling ? "active" : ""}`} onClick={toggleShuffle}>
                                        <img src={ShuffleButton} />
                                    </button>
                                    <button className="icon-btn">
                                        <img src={DownloadLogo} />
                                    </button>
                                    <button className="icon-btn" onClick={() => setShowShare(true)}>
                                        <img src={Community} />
                                    </button>
                                </div>
                                {selectedPlaylist.tracks?.map((track, index) => (
                                    <div key={track._id} className="liked-row" onClick={() => {
                                        setPlayContext("playlist");
                                        setCurrentIndex(index);
                                        setCurrentSong(track);
                                        setIsPlaying(true);
                                    }}>
                                        <span className="liked-index">{index + 1}</span>
                                        <img src={`${API}/${track.thumbnail}`} className="liked-img" />
                                        <div className="liked-info">
                                            <p className="liked-title">{track.title}</p>
                                            <p className="liked-artist">{track.artists?.join(", ")}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {view === "profile" && (
                        <div className="profile-page">
                            <button className="backbtn" onClick={() => setView("home")}>
                                <img src={Back} alt="back" />
                            </button>
                            <div className="profile-header-section">
                                <div className="profile-image-wrapper">
                                    <img
                                        src={user?.profileImage?.startsWith("http")
                                            ? user.profileImage
                                            : `${API}/${user?.profileImage}`}
                                        className="profile-image-large"
                                    />
                                </div>
                                <div className="profile-text">
                                    <p className="profile-label">Profile</p>
                                    <h1 className="profile-username">{user?.username}</h1>
                                    <p className="profile-meta">
                                        {user?.email} <br /> Plan: {user?.subscription?.plan}
                                    </p>
                                    <button className="edit-btn" onClick={() => setShowEdit(true)}>
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                            {showEdit && (
                                <div className="profile-edit-box">
                                    <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
                                    <input
                                        type="text"
                                        placeholder="New Name"
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button onClick={updateProfile} disabled={isSaving}>{isSaving ? "Saving..." : "Save Changes"} </button>
                                    <button onClick={() => setShowEdit(false)}>Cancel</button>
                                </div>
                            )}
                            <div className="user-dashboard">
                                <h2>Top tracks this month</h2>
                                <div className={`dashboard-list ${user?.subscription?.plan === "free" ? "blurred" : ""}`}>
                                    {dashboard.topTracks.map((track, index) => (
                                        <div key={track._id} className="dashboard-row">
                                            <div className="col_index">{index + 1}</div>
                                            <div className="col_image">
                                                <img src={`${API}/${track.thumbnail}`} />
                                            </div>
                                            <div className="col_info">
                                                <div className="t_title">{track.title}</div>
                                                <div className="t_artist">{track.artists.join(", ")}</div>
                                            </div>
                                            <div className="col_album">
                                                {track.album || "Unknown Album"}
                                            </div>
                                            <div className="col_plays">
                                                {track.plays}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {user?.subscription?.plan === "free" && (
                                    <p className="premium-msg">Upgrade to Premium to see your stats</p>
                                )}
                                <h2>Top artists</h2>
                                <div className={`dashboard-list ${user?.subscription?.plan === "free" ? "blurred" : ""}`}>
                                    {dashboard.topArtists.map((artist, index) => (
                                        <div key={index} className="dashboard-row">
                                            <span>{index + 1}</span>
                                            <p>{artist.name}</p>
                                            <span>{artist.plays} plays</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {view === "album" && selectedAlbum && (
                        <div className="album-view">
                            <div className="playlist-top">
                                <button className="backbtn" onClick={() => setView("home")}>
                                    <img src={Back} />
                                </button>
                            </div>
                            <div className="playlist-list">
                                <div className="playlist-header">
                                    <div className="playlist-image">
                                        <img
                                            src={selectedAlbum.coverImage
                                                ? `${API}/uploads/${selectedAlbum.coverImage}`
                                                : MusicNote}
                                        />
                                    </div>
                                    <div className="playlist-info">
                                        <p className="playlist-type">Album</p>
                                        <h1 className="playlist-title">{selectedAlbum.name}</h1>
                                    </div>
                                </div>
                                <div className="playlist-controls">
                                    <button className="play-btn" onClick={() => {
                                        if (!selectedAlbum.tracks?.length) return;
                                        setPlayContext("album");
                                        setCurrentIndex(0);
                                        setCurrentSong(selectedAlbum.tracks[0]);
                                        setIsPlaying(true);
                                    }}>
                                        <img src={isPlaying ? PauseButton : SongPlayButton} />
                                    </button>
                                    <button className={`icon-btn ${isShuffling ? "active" : ""}`} onClick={toggleShuffle}>
                                        <img src={ShuffleButton} />
                                    </button>
                                    <button className="icon-btn">
                                        <img src={DownloadLogo} />
                                    </button>
                                    <button className="icon-btn" onClick={() => setShowShare(true)}>
                                        <img src={Community} />
                                    </button>
                                </div>
                                {selectedAlbum.tracks?.map((track, index) => (
                                    <div key={track._id} className="liked-row" onClick={() => {
                                        setPlayContext("album");
                                        setCurrentIndex(index);
                                        setCurrentSong(track);
                                        setIsPlaying(true);
                                    }}>
                                        <span className="liked-index">{index + 1}</span>
                                        <img src={`${API}/${track.thumbnail}`} className="liked-img" />
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
                                        src={`${API}/${currentSong.thumbnail}`}
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
                            <img src={`${API}/${currentSong.thumbnail}`} alt="cover" className="player-cover" />
                            <div className="player-song-info">
                                <div className="player-title">{currentSong.title}</div>
                                <div className="player-artist">{currentSong.artists?.join(", ")}</div>
                            </div>
                            <div className="Like_button">
                                <img
                                    src={Array.isArray(likedSongs) &&
                                        likedSongs.some(t => t._id === currentSong?._id)
                                        ? Checkmark
                                        : LikePlus}
                                    className="LikePlus"
                                    onClick={() => {
                                        const isLiked =
                                            Array.isArray(likedSongs) &&
                                            likedSongs.some(t => t._id === currentSong?._id);
                                        if (!isLiked) {
                                            toggleLike(currentSong._id);
                                        } else {
                                            setLikedSelected(true);
                                            const selected = playlists
                                                .filter(p => p.tracks?.some(t => t._id === currentSong._id))
                                                .map(p => p._id);
                                            setSelectedPlaylists(selected);
                                            setShowPopup(true);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="player-center">
                            <div className="controlButtons">
                                <button className={`shuffleButton ${isShuffling ? "active" : ""}`} onClick={toggleShuffle}><img src={ShuffleButton} className="ShuffleButton" /></button>
                                <button className="previousButton" onClick={playPrevious}><img src={PreviousButton} className="PreviousButton" alt="previous" /></button>
                                <button className="playButton" onClick={togglePlay}>
                                    {isPlaying ? <img src={PauseButton} className="PauseButton" /> : <img src={SongPlayButton} className="SongPlay" />}
                                </button>
                                <button className="nextButton" onClick={playNext}><img src={NextButton} className="Nextbutton" alt="Next" /></button>
                                <button className="loopButton" onClick={() => setLoop(!looping)}><img src={looping ? LoopSlected : LoopButton} className={looping ? "loopSelected" : "LoopButton"} /></button>
                            </div>
                            <div className="progress-row">
                                <span className="time">{formatTime(currentTime)}</span>
                                <div className="progress-container" onClick={seekSong}>
                                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                                </div>
                                <span className="time">{formatTime(duration)}</span>
                            </div>
                            <audio ref={audioRef} className="audio-element" autoPlay loop={looping} onTimeUpdate={updateProgress} onEnded={!looping ? playNext : null} src={`${API}/${currentSong.audioFile}`} />
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
            {showCreateModal && (
                <div className="create-modal-overlay">
                    <div className="create-modal">
                        <h2>Edit details</h2>
                        <div className="create-content">
                            <div className="image-upload">
                                {newPlaylistImage ? (
                                    <img src={URL.createObjectURL(newPlaylistImage)} />
                                ) : (
                                    <div className="image-placeholder">
                                        <img src={MusicNote} />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    onChange={(e) => setNewPlaylistImage(e.target.files[0])}
                                />
                            </div>
                            <div className="form">
                                <input
                                    type="text"
                                    placeholder="My Playlist #1"
                                    value={newPlaylistName}
                                    onChange={(e) => setNewPlaylistName(e.target.value)}
                                />
                                <textarea placeholder="Add description" />
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button onClick={() => setShowCreateModal(false)}>Cancel</button>
                            <button
                                onClick={async () => {
                                    const formData = new FormData();
                                    formData.append("name", newPlaylistName);
                                    if (newPlaylistImage) {
                                        formData.append("image", newPlaylistImage);
                                    }
                                    const res = await fetch(`${API}/api/playlists`, {
                                        method: "POST",
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem("token")}`
                                        },
                                        body: formData
                                    });
                                    const newPlaylist = await res.json();
                                    setPlaylists(prev => [...prev, newPlaylist]);
                                    setShowCreateModal(false);
                                    setNewPlaylistName("");
                                    setNewPlaylistImage(null);
                                }}>Save</button>
                        </div>
                    </div>
                </div>
            )}
            {showPopup && (
                <div className="playlist-popup">
                    <h3>Add to playlist</h3>
                    <div
                        className="playlist-row create-new"
                        onClick={() => {
                            setShowCreateModal(true);
                            setShowPopup(false);
                        }}>
                        <div className="playlist-left">
                            <div className="playlist-icon plus">+</div>
                            <span>New playlist</span>
                        </div>
                    </div>
                    <div className="playlist-list">
                        <div
                            className={`playlist-row ${likedSelected ? "selected" : ""}`}
                            onClick={() => setLikedSelected(prev => !prev)}>
                            <div className="playlist-left">
                                <div className="playlist-icon heart">
                                    <img src={Heart} className="popup-heart" />
                                </div>
                                <span className="playlist-name">Liked Songs</span>
                            </div>
                            <div className="playlist-right">
                                <div className={`radio ${likedSelected ? "checked" : ""}`}></div>
                            </div>
                        </div>
                        {playlists.map(p => {
                            const isSelected = selectedPlaylists.includes(p._id);
                            return (
                                <div
                                    key={p._id}
                                    className={`playlist-row ${isSelected ? "selected" : ""}`}
                                    onClick={() => {
                                        setSelectedPlaylists(prev =>
                                            isSelected
                                                ? prev.filter(id => id !== p._id)
                                                : [...prev, p._id]
                                        );
                                    }}
                                >
                                    <div className="playlist-left">
                                        <div className="playlist-icon">🎵</div>
                                        <span className="playlist-name">{p.name}</span>
                                    </div>
                                    <div className="playlist-right">
                                        <div className={`radio ${isSelected ? "checked" : ""}`}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="popup-actions">
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                        <button
                            onClick={async () => {
                                const token = localStorage.getItem("token");
                                const isAlreadyLiked = likedSongs.some(t => t._id === currentSong._id);
                                if (likedSelected && !isAlreadyLiked) {
                                    await toggleLike(currentSong._id);
                                }
                                if (!likedSelected && isAlreadyLiked) {
                                    await toggleLike(currentSong._id);
                                }
                                for (let p of playlists) {
                                    const isSelected = selectedPlaylists.includes(p._id);
                                    const alreadyInPlaylist = p.tracks?.some(t => t._id === currentSong._id);
                                    if (isSelected && !alreadyInPlaylist) {
                                        await fetch(`${API}/api/playlists/${p._id}/add`, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${token}`
                                            },
                                            body: JSON.stringify({ trackId: currentSong._id })
                                        });
                                    }
                                    if (!isSelected && alreadyInPlaylist) {
                                        await fetch(`${API}/api/playlists/${p._id}/remove`, {
                                            method: "DELETE",
                                            headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${token}`
                                            },
                                            body: JSON.stringify({ trackId: currentSong._id })
                                        });
                                    }
                                }
                                const updatedLikes = await fetch(`${API}/api/likes`, {
                                    headers: { Authorization: `Bearer ${token}` }
                                }).then(res => res.json());
                                setLikedSongs(updatedLikes);
                                await fetchPlaylists();
                                setShowPopup(false);
                                setSelectedPlaylists([]);
                                setLikedSelected(false);
                            }}>Done</button>
                    </div>
                </div>
            )}
            {showShare && (
                <div className="playlist-popup">
                    <h3>Share Playlist</h3>
                    <input value={`${window.location.origin}/playlist/${selectedPlaylist._id}`} readOnly />
                    <div className="popup-actions">
                        <button onClick={() => setShowShare(false)}>Close</button>
                    </div>
                </div>
            )}

        </div>
    );
};
export default Home;