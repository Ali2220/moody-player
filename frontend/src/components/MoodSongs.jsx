import React, { useRef, useState } from "react";
import "./MoodSongs.css";

const Moodsongs = ({ Songs, mood }) => {
  const [currentSong, setCurrentSong] = useState(null); // abhi konsa song play ho raha hai
  const audioRefs = useRef([]); // sare audio tags ka ref store hoga

  const handlePlay = (index) => {
    // agar pehle se koi aur song chal raha hai to use stop karo
    if (currentSong !== null && currentSong !== index) {
      audioRefs.current[currentSong].pause();
      audioRefs.current[currentSong].currentTime = 0;
    }

    // new song play karo
    audioRefs.current[index].play();
    setCurrentSong(index);
  };

  const handlePause = (index) => {
    audioRefs.current[index].pause();
    setCurrentSong(null);
  };

  return (
    <div className="mood-songs">
      <h2 style={{ color: "white", padding: "3px", margin: "3px" }}>
        🎶 Recommended Surahs
      </h2>

      {mood && ( 
        <p style={{ color: "lightgreen", fontWeight: "bold" }}>
          Detected Mood: {mood.charAt(0).toUpperCase() + mood.slice(1)}
        </p>
      )}

      {Songs.length === 0 ? (
        <p style={{ color: "white" }}>No songs available for this mood</p>
      ) : (
        Songs.map((song, index) => (
          <div className="song-card" key={index}>
            <div className="title">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>

            <div className="controls">
              {currentSong === index ? (
                <button onClick={() => handlePause(index)}>⏸ Pause</button>
              ) : (
                <button onClick={() => handlePlay(index)}>▶️ Play</button>
              )}
            </div>

            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={song.audio}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Moodsongs;
