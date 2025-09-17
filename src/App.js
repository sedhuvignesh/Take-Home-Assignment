import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './components/MovieDetails/MovieDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Movie Database</h1>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
