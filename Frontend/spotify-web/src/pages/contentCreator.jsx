import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contentCreator.css";
import Select from "react-select";
import spotifyLogo from "../Images/spotify-Logo.png";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";


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
    { value: "Shreya Ghoshal", label: "Shreya Ghoshal" },
    { value: "vyravl", label: "vyravl" },
    {value: "Kailash Kher", label: "Kailash Kher"},
    {value: "Naresh Kamath", label: "Naresh Kamath"},
    {value: "Nakama", label: "Nakama"},
    {value: "Billie Eilish", label: "Billie Eilish"}

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
    { value: " Electro House", label: " Electro House" },
    { value: " Sufi music", label: " Sufi Music" },
    { value: " Romantic Hindi", label: " Romantic Hindi" }
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
    const [bulkFile, setBulkFile] = useState(null);
    const [title, setTitle] = useState("");
    const [album, setAlbum] = useState("");
    const [publishStatus, setPublishStatus] = useState(false);
    const [isPremium, setIsPremium] = useState("false");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [editTrack, setEditTrack] = useState(null);
    const [topArtists, setTopArtists] = useState([]);
    const [songStats, setSongStats] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [newAlbumName, setNewAlbumName] = useState("");
    const [selectedAlbumMap, setSelectedAlbumMap] = useState({});
    const [albumThumbnail, setAlbumThumbnail] = useState(null);
    const [editingAlbumId, setEditingAlbumId] = useState(null);
    const [editAlbumName, setEditAlbumName] = useState("");
    const [editAlbumImage, setEditAlbumImage] = useState(null);
    const API = import.meta.env.VITE_API;

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
    const handleBulkFileChange = (e) => {
        const file = e.target.files[0];
        console.log("FILE SELECTED:", file);
        setBulkFile(file);
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
                const map = {};
                data.forEach(t => {
                    if (t.albumId) map[t._id] = t.albumId;
                });
                setSelectedAlbumMap(map);
            } catch (error) {
                console.error("Error fetching tracks:", error);
            }
        };
        fetchTracks();
    }, []);
    React.useEffect(() => {
        const fetchAlbums = async () => {
            const res = await fetch(`${API}/api/albums`);
            const data = await res.json();
            setAlbums(data);
        };
        fetchAlbums();
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

    const handleBulkUpload = async () => {
        console.log("BUTTON CLICKED");
        if (!bulkFile) {
            console.log("NO FILE SELECTED");
            alert("Please select a file");
            return;
        }
        console.log("FILE:", bulkFile);

        try {
            const formData = new FormData();
            formData.append("file", bulkFile);
            const token = localStorage.getItem("token");
            console.log("SENDING REQUEST...");
            const res = await fetch(`${API}/api/tracks/bulk`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            console.log("RESPONSE STATUS:", res.status);
            const data = await res.json();
            console.log("RESPONSE DATA:", data);
        } catch (err) {
            console.error("ERROR:", err);
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

    const pieColors = ["#22c55e", "#ef4444", "#f59e0b"];
    const [dashboard, setDashboard] = useState(null);
    const fetchDashboard = async () => {
        try {
            // const token =localStorage.getItem("token");
            const res = await axios.get(`${API}/api/dashboard`);
            setDashboard(res.data);
            const sorted = (res.data.topSongs || [])
                .sort((a, b) => b.playCount - a.playCount)
                .slice(0, 5);
            setTopSongs(sorted);
            setTopArtists(
                (res.data.topArtists || [])
                    .sort((a, b) => b.totalPlays - a.totalPlays)
                    .slice(0, 5)
            );
            setSongStats([
                { name: "Free Songs", value: res.data.freeSongs || 0 },
                { name: "Premium Songs", value: res.data.premiumSongs || 0 }
            ]);
        } catch (error) {
            console.log(error);
        }
    };
    React.useEffect(() => {
        fetchDashboard();
        const interval = setInterval(fetchDashboard, 5000);
        return () => clearInterval(interval);
    }, []);

    const createAlbum = async () => {
        if (!newAlbumName.trim()) {
            alert("Album name required");
            return;
        }
        const formData = new FormData();
        formData.append("name", newAlbumName);
        if (albumThumbnail) formData.append("thumbnail", albumThumbnail);
        const res = await fetch(`${API}/api/albums/create`, {
            method: "POST",
            body: formData
        });
        if (!res.ok) {
            const text = await res.text();
            console.log(text);
            alert("Server error");
            return;
        }

        const data = await res.json();
        setAlbums(prev => [...prev, data]);
        setNewAlbumName("");
        setAlbumThumbnail(null);
        document.querySelector('input[type="file"]').value = "";
    };

    const addToAlbum = async (trackId) => {
        const albumId = selectedAlbumMap[trackId];
        if (!albumId) return;
        await fetch(`${API}/api/albums/add-track`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ albumId, trackId })
        });
        alert("Moved to album");
    };

    const removeFromAlbum = async (trackId) => {
        await fetch(`${API}/api/albums/remove-track`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trackId })
        });
        setSelectedAlbumMap(prev => ({
            ...prev,
            [trackId]: ""
        }));
        alert("Removed from album");
    };

    const deleteAlbum = async (id) => {
        await fetch(`${API}/api/albums/${id}`, {
            method: "DELETE"
        });
        setAlbums(prev => prev.filter(a => a._id !== id));
    };

    const updateAlbum = async (id, name, image) => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("thumbnail", image);
    const res = await fetch(`${API}/api/albums/${id}`, {
        method: "PUT",
        body: formData
    });
    const updated = await res.json();
    setAlbums(prev =>
        prev.map(a =>
            a._id === id ? updated : a
        )
    );
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
                    <li onClick={() => setActiveTab("bulk")}>Bulk Upload</li>
                    <li onClick={() => setActiveTab("tracks")}>All Tracks</li>
                    <li onClick={() => setActiveTab("analytics")}>Analytics</li>
                    <li onClick={() => setActiveTab("albums")}>Manage Albums</li>
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
                {activeTab === "bulk" && (
                    <section className="add-music-section">
                        <h2>Bulk Upload Tracks</h2>
                        <div className="music-form">
                            <label className="file-upload">
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleBulkFileChange}
                                />
                                <span>Select CSV File</span>
                            </label>
                            {bulkFile && (
                                <p className="file-name">{bulkFile.name}</p>
                            )}
                            <button onClick={handleBulkUpload}>
                                Upload in Bulk
                            </button>
                        </div>
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
                                            <select
                                                value={selectedAlbumMap[track._id] || ""}
                                                onChange={(e) =>
                                                    setSelectedAlbumMap(prev => ({
                                                        ...prev,
                                                        [track._id]: e.target.value
                                                    }))
                                                }>
                                                <option value="">Select Album</option>
                                                {albums.map(a => (
                                                    <option key={a._id} value={a._id}>
                                                        {a.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button className="move-bttn" onClick={() => addToAlbum(track._id)}>
                                                Move
                                            </button>
                                            <button className="remove-bttn" onClick={() => removeFromAlbum(track._id)}>
                                                Remove
                                            </button>
                                            <button className="edit_btn" onClick={() => setEditTrack(track)}>
                                                Edit
                                            </button>
                                            <button className="delete-btn" onClick={() => handleDelete(track._id)}>
                                                Delete
                                            </button>
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
                {activeTab === "analytics" && (<>
                    <h1 className="analytics-title">Analytics</h1>
                    <div className="analytics-container1">
                        <section className="music-analytics1">
                            <h5>Top 5 Most listened songs</h5>
                            {topSongs.length > 0 && (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={topSongs}
                                        margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
                                        barCategoryGap="30%">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="title"
                                            interval={0}
                                            angle={-15}
                                            textAnchor="end"
                                            height={60}
                                            tickFormatter={(value) => value.length > 10 ? value.slice(0, 10) + "..." : value} />
                                        <YAxis
                                            domain={[0, (dataMax) => Math.ceil(dataMax / 50) * 50]}
                                            tickCount={6} />
                                        <Tooltip />
                                        <Bar
                                            dataKey="playCount"
                                            fill="#1ed760"
                                            barSize={18}
                                            radius={[5, 5, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </section>
                        <section className="music-analytics2">
                            <h5>Top 5 most popular artist</h5>
                            {topArtists.length > 0 && (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={topArtists}
                                        margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
                                        barCategoryGap="30%"
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="name"
                                            interval={0}
                                            angle={-15}
                                            textAnchor="end"
                                            height={60}
                                            tickFormatter={(v) =>
                                                v.length > 10 ? v.slice(0, 10) + "..." : v
                                            } />
                                        <YAxis
                                            domain={[0, (dataMax) => Math.ceil(dataMax / 50) * 50]}
                                            tickCount={6} />
                                        <Tooltip />
                                        <Bar
                                            dataKey="totalPlays"
                                            fill="#ff4d4f"
                                            barSize={15}
                                            radius={[5, 5, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </section>
                    </div>
                    <div className="analytics-container2">
                        <section className="music-analytics3">
                            <h5>Song Distribution</h5>
                            {songStats.length > 0 && (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={songStats}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={100}
                                            label>
                                            {songStats.map((entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={index === 0 ? "#22c55e" : "#ff4d4f"}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </section>
                        <section className="music-analytics4">
                            <h5>User Distribution</h5>
                            {dashboard && (
                                <ResponsiveContainer width="100%" height={320}>
                                    <PieChart>
                                        <Pie
                                            data={dashboard.statusChart}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={110}
                                            label>
                                            {dashboard.statusChart.map((entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={pieColors[index % pieColors.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </section>
                    </div>
                    <div className="analytics-container3">
                        <section className="music-analytics5">
                        </section>
                        <section className="music-analytics6">
                        </section>
                    </div>
                    <div className="analytics-container4">
                        <section className="music-analytics7">
                        </section>
                        <section className="music-analytics8">
                        </section>
                    </div>
                </>
                )}
                {activeTab === "albums" && (
                    <section className="add-music-section">
                        <h2>Manage Albums</h2>
                        <div className="album-create">
                            <input
                                type="text"
                                placeholder="Album Name"
                                value={newAlbumName}
                                onChange={(e) => setNewAlbumName(e.target.value)}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                value=""
                                onChange={(e) => setAlbumThumbnail(e.target.files[0])}
                            />
                            <button onClick={createAlbum}>Create</button>
                        </div>
                        <div className="album-grid">
                            {albums.map(a => (
                                <div key={a._id} className="album-card">
                                    {editingAlbumId === a._id ? (
                                        <>
                                            <input
                                                className="album-input"
                                                value={editAlbumName}
                                                onChange={(e) => setEditAlbumName(e.target.value)}
                                            />
                                            <input
                                                type="file"
                                                onChange={(e) => setEditAlbumImage(e.target.files[0])}
                                            />
                                            <div className="album-actions">
                                                <button
                                                    className="edit_btn"
                                                    onClick={() => {
                                                        updateAlbum(a._id, editAlbumName, editAlbumImage);
                                                        setEditingAlbumId(null);
                                                    }}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="remove-btn"
                                                    onClick={() => setEditingAlbumId(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <img
                                                src={a.coverImage ? `${API}/uploads/${a.coverImage}` : "/placeholder.png"}
                                                className="album-cover"
                                            />
                                            <p className="album-title">{a.name}</p>
                                            <div className="album-actions">
                                                <button
                                                    className="edit_btn"
                                                    onClick={() => {
                                                        setEditingAlbumId(a._id);
                                                        setEditAlbumName(a.name);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => deleteAlbum(a._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}

                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default ContentCreator;