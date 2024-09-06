import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  likedSongs: [],
  currentSong: null,
  rockAlbums: [],
  popAlbums: [],
  hipHopAlbums: [],
  searchResults: [],
  status: 'idle',
  error: null,
  isSearching: false,
};

export const fetchAlbums = createAsyncThunk(
  'music/fetchAlbums',
  async ({ query, category }) => {
    const url = category === 'searchResults'
      ? `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
      : `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    // Condizione per restituire tutti i risultati se è una ricerca
    return {
      data: category === 'searchResults' ? data.data : data.data.slice(0, 4),
      category
    };
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
      } else {
        state.likedSongs.splice(index, 1);
      }
    },
    setSearching(state, action) {
      state.isSearching = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { data, category } = action.payload;
        if (category === 'rockAlbums') {
          state.rockAlbums = data;
        } else if (category === 'popAlbums') {
          state.popAlbums = data;
        } else if (category === 'hipHopAlbums') {
          state.hipHopAlbums = data;
        } else if (category === 'searchResults') {
          state.searchResults = data;
        }
        state.isSearching = category === 'searchResults';
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentSong, toggleLike, setSearching } = musicSlice.actions;
export default musicSlice.reducer;
