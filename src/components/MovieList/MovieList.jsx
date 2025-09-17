import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="movie-list-container">
      <h2>Popular Movies</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
              <div className="movie-poster">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div className="poster-placeholder">No Image</div>
                )}
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.tagline || 'No tagline available'}</p>
                <span>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
