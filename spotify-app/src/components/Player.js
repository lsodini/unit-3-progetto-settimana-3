import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import next from '../assets/next.png';
import play from '../assets/play.png';
import prev from '../assets/prev.png';
import repeat from '../assets/repeat.png';
import shuffle from '../assets/shuffle.png';

function Player() {
  const currentSong = useSelector((state) => state.music.currentSong);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSong) {
      const newAudio = new Audio(currentSong.preview);
      setAudio(newAudio);
      setIsPlaying(true);

      newAudio.play();
      newAudio.ontimeupdate = () => {
        setProgress((newAudio.currentTime / newAudio.duration) * 100);
      };

      return () => {
        newAudio.pause();
        newAudio.ontimeupdate = null;
        setAudio(null);
      };
    }
  }, [currentSong]);

  useEffect(() => {
    if (audio) {
      audioRef.current = audio;
      return () => {
        audioRef.current = null;
      };
    }
  }, [audio]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    // Implement logic to go to the previous song
    console.log("Previous song");
  };

  const handleNext = () => {
    // Implement logic to go to the next song
    console.log("Next song");
  };

  const handleRepeat = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={`container-fluid fixed-bottom bg-container ${currentSong ? 'visible' : ''} pt-1`}>
      <div className="row h-100">
        <div className="col-12">
          <div className="row h-100 flex-column justify-content-center align-items-center">
            {currentSong && (
              <div className="col-12 playerControls">
                <div className="d-flex align-items-center song-info">
                  <img src={currentSong.album.cover} alt="Album Cover" />
                  <div>
                    <p>{currentSong.title}</p>
                    <p>{currentSong.artist?.name}</p>
                  </div>
                </div>
                <div className="controls">
                  <a href="#" onClick={handlePrev}><img src={prev} alt="prev" /></a>
                  <a href="#" onClick={handlePlayPause}>
                    <img src={isPlaying ? play : play} alt={isPlaying ? "pause" : "play"} />
                  </a>
                  <a href="#" onClick={handleNext}><img src={next} alt="next" /></a>
                  <a href="#" onClick={handleRepeat}><img src={repeat} alt="repeat" /></a>
                  <a href="#"><img src={shuffle} alt="shuffle" /></a>
                </div>
                <div className="progress mt-3">
                  <div role="progressbar" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
