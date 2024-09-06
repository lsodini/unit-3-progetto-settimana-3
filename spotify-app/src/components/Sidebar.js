import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAlbums, setSearching } from '../redux/slices/musicSlice';
import logo from '../assets/logo.png';
import '../styles.css';

function Sidebar() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearching(true)); // Indica che è in corso una ricerca
    dispatch(fetchAlbums({ query: searchQuery, category: 'searchResults' }));
    setSearchQuery(''); // Svuota la barra di ricerca
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <aside className="col col-2">
      <nav className="navbar navbar-expand-md fixed-left justify-content-between" id="sidebar">
        <div className="container flex-column align-items-start">
          <a className="navbar-brand" href="index.html">
            <img
              src={logo}
              alt="Spotify Logo"
              width="131"
              height="40"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <ul>
                <li>
                  <a className="nav-item nav-link d-flex align-items-center" href="#">
                    <i className="bi bi-house-door-fill"></i>&nbsp; Home
                  </a>
                </li>
                <li>
                  <a className="nav-item nav-link d-flex align-items-center" href="#">
                    <i className="bi bi-book-fill"></i>&nbsp; Your Library
                  </a>
                </li>
                <li>
                  <form onSubmit={handleSearch} className="input-group mt-3">
                    <input
                      type="text"
                      name="search"
                      className="form-control"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchQuery}
                      onChange={handleChange}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary btn-sm h-100" type="submit">
                        GO
                      </button>
                    </div>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="nav-btn">
          <button className="btn signup-btn" type="button">Sign Up</button>
          <button className="btn login-btn" type="button">Login</button>&nbsp;
          <a href="#">Cookie Policy</a> | 
          <a href="#"> Privacy</a>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
