import React, { useState, useRef } from 'react';

const MusicPlayer = ({ songs }) => {
    const [songList, setSongList] = useState(songs);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [newSong, setNewSong] = useState({ artist: '', title: '', url: '' });
    const audioRef = useRef();

    const playPauseSong = (song) => {
        if (currentSong !== song) {
            setCurrentSong(song);
            audioRef.current.src = song.url;
            audioRef.current.play();
            setIsPlaying(true);
        } else if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSong((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addNewSong = (e) => {
        e.preventDefault();
        if (newSong.artist && newSong.title && newSong.url) {
            setSongList((prevSongs) => [...prevSongs, newSong]);
            setNewSong({ artist: '', title: '', url: '' });
        }
    };

    return (
        <div>
            <h2>Song List</h2>
            <form onSubmit={addNewSong} className="new-song-form">
                <input
                    type="text"
                    name="artist"
                    placeholder="Artist"
                    value={newSong.artist}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newSong.title}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="url"
                    placeholder="/music/"
                    value={newSong.url}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add new song</button>
            </form>

            <div className="song-list">
                {songList.map((song, index) => (
                    <div key={index} className="song-item">
                        <span className="song-icon">🎵</span>
                        <div className="song-details">
                            <div className="song-artist">{song.artist}</div>
                            <div className="song-title">{song.title}</div>
                        </div>
                        <button
                            className="play-button"
                            onClick={() => playPauseSong(song)}
                        >
                            {currentSong === song && isPlaying ? '||' : '▶'}
                        </button>
                    </div>
                ))}
            </div>

            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
        </div>
    );
}

export default MusicPlayer;


