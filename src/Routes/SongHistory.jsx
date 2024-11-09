import LeftSidebar from "../Components/LeftSidebar";
import Navbar from "../Components/Navbar";
import RightSidebar from "../Components/RightSidebar";
import HistoryIcon from '@mui/icons-material/History';
import Controls from "../Components/Controls";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { useUser } from "../Context/UserContext";

export default function SongHistory({ newName }) {

    const { user, displayName, setDisplayName } = useUser();
    const [likedSongs, setLikedSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatDuration = (durationMs) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = ((durationMs % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const [history, setHistory] = useState([]);

    const fetchSongHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/v1/users/getHistory', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data)
            return response.data.history; // Adjust according to the actual response structure
        } catch (error) {
            console.error('Error fetching song history:', error);
            return [];
        }
    };
    // Fetch liked songs when component mounts
    useEffect(() => {
        const getHistory = async () => {
            const fetchedHistory = await fetchSongHistory();
            setHistory(fetchedHistory);
            console.log(fetchedHistory)
        };
        getHistory();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="flex flex-col h-screen">
                <Navbar />
                <div className="flex flex-grow">
                    <LeftSidebar />
                    <div className="middlePart flex justify-center items-start w-[100%] h-[100%]">
                        <div className=" w-[57%] h-[100%] min-w-[57%] mim-h-[100%] flex flex-col text-white shadow-xl shadow-blue-gray-900/5
          bg-clip-border rounded-xl
          " style={{ backgroundColor: "#1B0025" }}>
                            <div className="banner flex h-[50%] w-full p-2 bg-clip-border rounded-t-xl" style={{ backgroundColor: "#3e0652" }}>

                                <div className="PicleftSide relative w-[100px] h-[70%] flex flex-col justify-center self-end bg-neutral-800 transition-all" style={{ borderRadius: "60%", minWidth: "25%" }}>

                                    <HistoryIcon className={`my-8 justify-center self-center
                  `} style={{ width: "60%", height: "60%", fill: "violet" }} />


                                </div>
                                <div className="rightSide flex w-[75%] h-[65%] self-end gap-3 p-4 flex-col">
                                    {/* <span className="no-underline text-white cursor-default" style={{textDecoration:"none"}}>{user.email}</span> */}
                                    <div className="playlists_flw">
                                        <span>Playlist</span>
                                    </div>
                                    <span className="text-5xl font-bold" style={{ textDecoration: "none" }}>History</span>
                                    <div className="playlists_flw">
                                        <span className="cursor-text" style={{ textDecoration: "none" }}>{user.username}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                            <ul>
                            {history.map((song) => (
                            <li key={song.id}>
                                <p>{song.name} by {song.artists.map(artist => artist.name).join(', ')}</p>
                                <p>Album: {song.album.name}</p>
                                <p>Duration: {Math.floor(song.duration_ms / 60000)}:{((song.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')} min</p>
                                <img src={song.album.albumCoverUrl} alt={`${song.album.name} cover`} style={{ width: '50px' }} />
                            </li>
                            ))}
                        </ul>
                                <div className="liked-songs-list px-5">
                                    <div className="song-item flex w-100 h-10 align-bottom mt-4 -mb-4">
                                        <div className="w-8 text-center ml-12 mr-4">#</div>
                                        <div className="inline w-56 mx-2 text-xs">
                                            Title
                                        </div>
                                        <div className="w-52 mx-3 text-xs">Album</div>
                                        {/* Song duration */}
                                        <span>Duration</span>
                                    </div>
                                    {likedSongs.length > 0 ? (
                                        likedSongs.map((song, index) => (

                                            <div key={index} className="song-item h-14 rounded-lg hover:bg-[#6f32978b] cursor-pointer p-2 flex w-100 h-10 align-bottom my-2">
                                                <div className="w-8 text-center ml-10 mr-5 pt-2">{index + 1}</div>
                                                <img
                                                    src={song.album?.images[0]?.url || ''}
                                                    width="40"
                                                    height="40"
                                                    className="inline w-10 rounded"
                                                />
                                                <div className="inline w-48 mx-2">
                                                    <div className="font-semibold text-md">{song.name}</div>
                                                    <div className="font-thin text-xs">
                                                        {song.artists && song.artists.length > 0
                                                            ? song.artists.map(artist => artist.name).join(', ')  // Join artists' names with a comma
                                                            : 'Unknown Artist'}
                                                    </div>
                                                </div>
                                                <div className="w-56 text-sm">{song.album?.name || 'Unknown Album'}</div>
                                                {/* Song duration */}
                                                <p>{song.duration_ms ? formatDuration(song.duration_ms) : 'N/A'}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No liked songs yet</p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                    <RightSidebar />
                </div>
            </div>

            <Controls />

        </>
    );
}