
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlbumCard from './AlbumCard';
import { fetchAlbums } from '../redux/slices/musicSlice';
import '../styles.css';

function MainPage() {
  const dispatch = useDispatch();
  const rockAlbums = useSelector((state) => state.music.rockAlbums);
  const popAlbums = useSelector((state) => state.music.popAlbums);
  const hipHopAlbums = useSelector((state) => state.music.hipHopAlbums);
  const searchResults = useSelector((state) => state.music.searchResults);
  const isSearching = useSelector((state) => state.music.isSearching);
  const status = useSelector((state) => state.music.status);
  const error = useSelector((state) => state.music.error);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    dispatch(fetchAlbums({ query, category: 'searchResults' }));
  };

  useEffect(() => {
    dispatch(fetchAlbums({ query: 'queen', category: 'rockAlbums' }));
    dispatch(fetchAlbums({ query: 'katyperry', category: 'popAlbums' }));
    dispatch(fetchAlbums({ query: 'eminem', category: 'hipHopAlbums' }));
  }, [dispatch]);

  // Limita a 4 album per le categorie di default
  const limitedAlbums = (albums) => albums.slice(0, 4);

  return (
    <>
      <div className="row">
        <div className="col-9 col-lg-11 mainLinks d-none d-md-flex">
          <a href="#">TRENDING</a>
          <a href="#">PODCAST</a>
          <a href="#">MOODS AND GENRES</a>
          <a href="#">NEW RELEASES</a>
          <a href="#">DISCOVER</a>
        </div>
        <div className="col-3 d-md-none">
          <div id="searchbar">
            <form onSubmit={handleSearch} className="input-group">
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary btn-sm h-100" type="submit">
                  GO
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {!isSearching && (
        <>
          <div className="row">
            <div className="col-10">
              <div id="rock">
                <h2>Rock Classics</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                  {limitedAlbums(rockAlbums).map((album) => (
                    <AlbumCard key={album.id} song={album} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-10">
              <div id="pop">
                <h2>Pop Culture</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                  {limitedAlbums(popAlbums).map((album) => (
                    <AlbumCard key={album.id} song={album} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-10">
              <div id="hiphop">
                <h2>#HipHop</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                  {limitedAlbums(hipHopAlbums).map((album) => (
                    <AlbumCard key={album.id} song={album} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {isSearching && (
        <div className="row">
          <div className="col-10">
            <div id="searchResults">
              <h2>Search Results</h2>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                {searchResults.map((album) => (
                  <AlbumCard key={album.id} song={album} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MainPage;
