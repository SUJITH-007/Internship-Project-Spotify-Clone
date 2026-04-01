import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contentCreator.css";
import Select from "react-select";
import spotifyLogo from "../Images/spotify-Logo.png";

const artists = [
    { value: "bxkq", label: "bxkq" },
    { value: "Sayfalse", label: "Sayfalse" },
    { value: "Aerosmith", label: "Aerosmith" },
    { value: "Shiro Sagisu", label: "Shiro Sagisu" },
    { value: "Dr. Corpse", label: "Dr. Corpse" },
    { value: "Warriyo", label: "Warriyo" },
    { value: "Faheem Abdullah", label: "Faheem Abdullah" },
    { value: "The Weekend", label: "The Weekend" },
    { value: "Anitta", label: "Anitta" },
    { value: "The Stranglers", label: "The Stranglers" },
    { value: "Sam C.S", label: "Sam C.S" },
    { value: "Arijit Singh", label: "Arijit Singh" },
    { value: "Adele", label: "Adele" },
    { value: "AVA MAX", label: "AVA MAX" },
    { value: "Chris Grey", label: "Chris Grey" },
    { value: "Codplay", label: "Codplay" },
    { value: "Lady Gaga", label: "Lady Gaga" },
    { value: "Marshmello", label: "Marshmello" },
    { value: "MIIA", label: "MIIA" },
    { value: "NCTS", label: "NCTS" },
    { value: "Shreya Ghoshal", label: "Shreya Ghoshal" }
];

const genres = [
    { value: "Pop", label: "Pop" },
    { value: "Hip-Hop", label: "Hip-Hop" },
    { value: "Rock", label: "Rock" },
    { value: "Classical", label: "Classical" },
    { value: "Funk", label: "Funk" },
    { value: "Phonk", label: "Phonk" },
    { value: "J-Pop", label: "J-Pop" },
    { value: "Rhythm and blues", label: "Rhythm and blues" },
    { value: "Soul music ", label: "Soul music" },
    { value: "Reggae", label: "Reggae" },
    { value: "Country", label: "Country" },
    { value: "Folk Music", label: "Folk Music" },
    { value: "Jazz", label: "Jazz" },
    { value: "Disco", label: "Disco" },
    { value: "Traditional Music", label: "Traditional Music" },
    { value: "Motivational", label: "Motivational" },
    { value: " Electro House", label: " Electro House" }
];

const ContentCreator = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [tracks, setTracks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [audioFileName, setAudioFileName] = useState("");
    const [audioFile, setAudioFile] = useState(null);
    const [title, setTitle] = useState("");
    const [album, setAlbum] = useState("");
    const [publishStatus, setPublishStatus] = useState(false);
    const [isPremium, setIsPremium] = useState("false");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [editTrack, setEditTrack] = useState(null);
    const API=import.meta.env.VITE_API;

    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "#121212",
            borderColor: state.isFocused ? "#1ed760" : "#282828",
            borderRadius: "6px",
            minHeight: "50px",
            height: "50px",
            padding: "0 14px",
            boxShadow: "none",
            "&:hover": { borderColor: "#1ed760" }
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: "0",
            height: "50px",
            display: "flex",
            alignItems: "center"
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            height: "50px"
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#181818",
            borderRadius: "6px"
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#1f1f1f" : "#181818",
            color: "white",
            cursor: "pointer"
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#1ed760",
            borderRadius: "20px",
            padding: "2px 6px"
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: "black",
            fontWeight: "600"
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: "black",
            ":hover": {
                backgroundColor: "#17c653",
                color: "white"
            }
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "white"
        }),
        input: (provided) => ({
            ...provided,
            color: "white",
            margin: "0",
            padding: "0"
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#737373",
            margin: "0"
        }),
    };
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(URL.createObjectURL(file));
            setThumbnailFile(file);
        }
    };

    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAudioFileName(file.name);
            setAudioFile(file);
        }
    };
    React.useEffect(() => {
        const fetchTracks = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API}/api/tracks`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!res.ok) {
                    console.error("Fetch failed:", res.status);
                    setTracks([]);
                    return;
                }
                const data = await res.json();
                if (!Array.isArray(data)) {
                    console.error("Invalid response:", data);
                    setTracks([]);
                    return;
                }
                setTracks(data);
            } catch (error) {
                console.error("Error fetching tracks:", error);
            }
        };
        fetchTracks();
    }, []);
    const filteredTracks = Array.isArray(tracks) ? tracks.filter(track => {
        const query = searchQuery.toLowerCase();
        return (
            track.title?.toLowerCase().includes(query) ||
            track.album?.toLowerCase().includes(query) ||
            track.artists?.join(" ").toLowerCase().includes(query) ||
            track.genres?.join(" ").toLowerCase().includes(query)
        );
    }) : [];

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("artists", JSON.stringify(selectedOptions.map(a => a.value)));
            formData.append("genres", JSON.stringify(selectedGenres.map(g => g.value)));
            formData.append("album", album);
            formData.append("published", publishStatus);
            formData.append("isPremium", isPremium);
            formData.append("thumbnail", thumbnailFile);
            formData.append("audio", audioFile);
            const token = localStorage.getItem("token");
            const response = await fetch(`${API}/api/tracks/add`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                alert("Track uploaded successfully!");
                setTitle("");
                setAlbum("");
                setSelectedOptions([]);
                setSelectedGenres([]);
                setThumbnail(null);
                setThumbnailFile(null);
                setAudioFile(null);
                setAudioFileName("");
                setPublishStatus(false);
                setActiveTab("dashboard");
            } else {
                alert(data.message || "Upload failed");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API}/api/tracks/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                setTracks(prev => prev.filter(track => track._id !== id));
            } else {
                alert("Failed to delete track");
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("title", editTrack.title);
            formData.append("album", editTrack.album);
            if (editTrack.newThumbnail) {
                formData.append("thumbnail", editTrack.newThumbnail);
            }
            const res = await fetch(
                `${API}/api/tracks/${editTrack._id}`,
                {
                    method: "PUT",
                    body: formData
                }
            );
            if (res.ok) {
                alert("Updated successfully");
                setTracks(prev =>
                    prev.map(t => t._id === editTrack._id ? { ...t, ...editTrack } : t)
                );
                setEditTrack(null);
            } else {
                alert("Update failed");
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="creator-wrapper">
            <aside className="creator-sidebar">
                <div className="creator-sidebar-header">
                    <img src={spotifyLogo} alt="Spotify" className="sidebar-logo" />
                    <h2 className="sidebar-title">Spotify Creator</h2>
                </div>
                <ul>
                    <li onClick={() => setActiveTab("dashboard")}>Dashboard</li>
                    <li onClick={() => setActiveTab("add")}>Add Music</li>
                    <li onClick={() => setActiveTab("tracks")}>All Tracks</li>
                    <li onClick={() => setActiveTab("analytics")}>Analytics</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </aside>
            <main className="creator-main">
                {activeTab === "dashboard" && (
                    <section className="dashboard-section">
                        <h1>Dashboard</h1>
                        <input
                            type="text"
                            placeholder="Search tracks..."
                            className="dashboard-search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {tracks.length === 0 ? (
                            <p>No tracks uploaded yet.</p>
                        ) : (
                            <div className="dashboard-track-table">
                                <div className="dashboard-header">
                                    <div></div>
                                    <div>Title</div>
                                    <div>Artists</div>
                                    <div>Album</div>
                                    <div>Genres</div>
                                </div>
                                {filteredTracks.map(track => (
                                    <div key={track._id} className="dashboard-track-row">
                                        <img src={`${API}/${track.thumbnail}`} alt={track.title} className="dashboard-thumb" />
                                        <div className="dashboard-col">
                                            {track.title}
                                        </div>
                                        <div className="dashboard-col">
                                            {track.artists?.join(", ")}
                                        </div>
                                        <div className="dashboard-col">
                                            {track.album || "N/A"}
                                        </div>
                                        <div className="dashboard-col">
                                            {track.genres?.join(", ")}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}
                {activeTab === "add" && (
                    <section className="add-music-section">
                        <h2>Add New Track</h2>
                        <form className="music-form" onSubmit={handleSubmit}>
                            <div className="thumbnail-upload">
                                <label className="file-upload">
                                    <input type="file" accept="image/*" onChange={handleThumbnailChange} />
                                    <span>Upload Thumbnail</span>
                                </label>
                                <select value={isPremium} onChange={(e) => setIsPremium(e.target.value)}>
                                    <option value="false">Free Song</option>
                                    <option value="true">Premium Song</option>
                                </select>
                                {thumbnail && (
                                    <img src={thumbnail} alt="preview" className="thumbnail-preview" />
                                )}
                            </div>
                            <input
                                type="text"
                                placeholder="Song Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Select
                                styles={customSelectStyles}
                                options={artists}
                                value={selectedOptions}
                                onChange={setSelectedOptions}
                                isMulti
                                placeholder="Select Artists"
                            />
                            <input
                                type="text"
                                placeholder="Album Name"
                                value={album}
                                onChange={(e) => setAlbum(e.target.value)}
                            />
                            <Select
                                styles={customSelectStyles}
                                options={genres}
                                value={selectedGenres}
                                onChange={setSelectedGenres}
                                isMulti
                                placeholder="Select Genres"
                            />
                            <label className="file-upload">
                                <input type="file" accept="audio/*" onChange={handleAudioChange} />
                                <span>Upload Audio File</span>
                            </label>
                            {audioFileName && (
                                <p className="file-name">{audioFileName}</p>
                            )}
                            <div className="status-toggle">
                                <label className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={publishStatus}
                                        onChange={(e) => setPublishStatus(e.target.checked)}
                                    />
                                    <span className="checkmark"></span>
                                    Publish immediately
                                </label>
                            </div>
                            <button type="submit">Add Track</button>
                        </form>
                    </section>
                )}
                {activeTab === "tracks" && (
                    <section className="music-list-section">
                        <h2>All Tracks</h2>
                        {tracks.length === 0 ? (
                            <p>No tracks uploaded yet.</p>
                        ) : (
                            <>
                                {tracks.map(track => (
                                    <div key={track._id} className="track-card">
                                        <img src={`${API}/${track.thumbnail}`} alt={track.title} className="track-thumb" />
                                        <div className="track-info">
                                            <h4>{track.title}</h4>
                                            <p>{track.artists?.join(", ")}</p>
                                        </div>
                                        <div className="track-actions">
                                            <button className="edit_btn" onClick={() => setEditTrack(track)}>Edit</button>
                                            <button className="delete-btn" onClick={() => handleDelete(track._id)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                                {editTrack && (
                                    <div className="edit-modal">
                                        <div className="edit-box">
                                            <h3>Edit Track</h3>
                                            <input type="text" value={editTrack.title} onChange={(e) => setEditTrack({ ...editTrack, title: e.target.value })} />
                                            <input type="text" value={editTrack.album} onChange={(e) => setEditTrack({ ...editTrack, album: e.target.value })} />
                                            <label className="file-upload">
                                                <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (file) { setEditTrack({ ...editTrack, newThumbnail: file }); } }} />
                                                Change Thumbnail
                                            </label>
                                            <div className="edit-actions">
                                                <button onClick={handleUpdate}>Save</button>
                                                <button onClick={() => setEditTrack(null)}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
};

export default ContentCreator;