// src/store/musicSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  likedSongs: JSON.parse(localStorage.getItem('likedSongs')) || [],
  currentSong: null,
  rockAlbums: [],
  popAlbums: [],
  hipHopAlbums: [],
  searchResults: [],
  status: 'idle',
  error: null,
  isSearching: false
};

export const fetchAlbums = createAsyncThunk(
  'music/fetchAlbums',
  async ({ query, category }) => {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    return { data: data.data, category };
  }
);

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setCurrentSong(state, action) {
      state.currentSong = action.payload;
    },
    toggleLike(state, action) {
      const song = action.payload;
      const index = state.likedSongs.findIndex((likedSong) => likedSong.id === song.id);
      if (index === -1) {
        state.likedSongs.push(song);
        console.log('Added to likedSongs:', song); // Log per aggiunta ai mi piace
      } else {
        state.likedSongs.splice(index, 1);
        console.log('Removed from likedSongs:', song); // Log per rimozione dai mi piace
      }
      localStorage.setItem('likedSongs', JSON.stringify(state.likedSongs));
    },
    setSearching(state, action) {
      state.isSearching = action.payload;
      console.log('Search state changed:', state.isSearching); // Log per stato ricerca
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
      console.log('Search results updated:', state.searchResults); // Log per risultati ricerca
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'loading';
        console.log('Fetching albums: loading'); // Log per stato di caricamento
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { data, category } = action.payload;
        if (category === 'searchResults') {
          state.searchResults = data;
          state.isSearching = true;
          console.log('Search results fetched:', state.searchResults); // Log per risultati ricerca
        } else if (category === 'rockAlbums') {
          state.rockAlbums = data;
          state.isSearching = false;
        } else if (category === 'popAlbums') {
          state.popAlbums = data;
          state.isSearching = false;
        } else if (category === 'hipHopAlbums') {
          state.hipHopAlbums = data;
          state.isSearching = false;
        }
        // Log per array degli album
        console.log('Rock Albums:', state.rockAlbums);
        console.log('Pop Albums:', state.popAlbums);
        console.log('Hip Hop Albums:', state.hipHopAlbums);
        console.log('Search Results:', state.searchResults);
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.error('Failed to fetch albums:', action.error.message); // Log per errore fetch
      });
  }
});

export const { setCurrentSong, toggleLike, setSearching, setSearchResults } = musicSlice.actions;
export default musicSlice.reducer;
