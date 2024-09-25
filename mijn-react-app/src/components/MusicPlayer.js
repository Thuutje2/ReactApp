import React, { useState, useRef } from 'react';

const MusicPlayer = ({ songs }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef();

    const playSong = (song) => {
        if (currentSong !== song) {
            setCurrentSong(song);
            audioRef.current.src = song.url;
            audioRef.current.play();
            setIsPlaying(true);
        } else if (!isPlaying) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const pauseSong = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div>
            <h2>Song List</h2>
            <ul>
                {songs.map((song, index) => (
                    <li key={index}>
                        {song.title + ' '}
                        <button onClick={() => playSong(song)}>
                            {currentSong === song && isPlaying ? 'Playing' : 'Play'}
                        </button>
                    </li>
                ))}
            </ul>

            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
            {isPlaying && (
                <button onClick={pauseSong}>Pause</button>
            )}
        </div>
    );
}

export default MusicPlayer;