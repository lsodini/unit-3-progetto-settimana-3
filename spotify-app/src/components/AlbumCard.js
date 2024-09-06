import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, toggleLike } from '../redux/slices/musicSlice';

const AlbumCard = ({ song }) => {
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.music.likedSongs);
  const isLiked = song ? likedSongs.some((likedSong) => likedSong.id === song.id) : false;

  const handlePlay = () => {
    if (song) {
      dispatch(setCurrentSong(song));
    }
  };

  const handleLike = () => {
    if (song) {
      dispatch(toggleLike(song));
    }
  };

  if (!song) return null;

  return (
    <div className="col text-center">
      <img
        className="img-fluid"
        src={song.album?.cover_medium || '/path/to/defaultCover.jpg'}
        alt={song.title || 'track'}
        onClick={handlePlay}
        style={{ cursor: 'pointer' }}
      />
      <p>
        Track: "{song.title || 'Unknown Title'}"<br />
        Artist: {song.artist?.name || 'Unknown Artist'}
      </p>
      <button onClick={handleLike} className="like-button">
        {isLiked ? (
          <i className="bi bi-heart-fill"></i>
        ) : (
          <i className="bi bi-heart"></i>
        )}
      </button>
    </div>
  );
};

AlbumCard.defaultProps = {
  song: {
    album: {
      cover_medium: '/path/to/defaultCover.jpg',
    },
    title: 'Unknown Title',
    artist: {
      name: 'Unknown Artist',
    },
  },
};

export default AlbumCard;
