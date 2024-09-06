import React from 'react';
import { useSelector } from 'react-redux';

function Player() {
  const currentSong = useSelector((state) => state.music.currentSong);

  return (
    <div className="container-fluid fixed-bottom bg-container pt-1">
      <div className="row h-100">
        <div className="col-lg-10 offset-lg-2">
          <div className="row h-100 flex-column justify-content-center align-items-center">
            {currentSong && (
              <div className="col-6 col-md-4 playerControls">
                <p>Playing: {currentSong.title} by {currentSong.artist?.name}</p>
                <div className="d-flex">
                  <a href="#"><img src="assets/shuffle.png" alt="shuffle" /></a>
                  <a href="#"><img src="assets/prev.png" alt="prev" /></a>
                  <a href="#"><img src="assets/play.png" alt="play" /></a>
                  <a href="#"><img src="assets/next.png" alt="next" /></a>
                  <a href="#"><img src="assets/repeat.png" alt="repeat" /></a>
                </div>
                <div className="progress mt-3">
                  <div role="progressbar"></div>
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
