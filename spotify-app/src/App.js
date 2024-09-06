import React from 'react';
import Sidebar from './components/Sidebar';
import MainPage from './components/MainPage';
import Player from './components/Player';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'normalize.css';
import './styles.css';



function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="col-12 col-md-9 offset-md-3 mainPage">
          <MainPage />
        </main>
      </div>
      <Player />
    </div>
  );
}

export default App;
