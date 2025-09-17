import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieDetails.css';


const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok) throw new Error('Failed to fetch movie');
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div className="movie-details-container">
      <Link to="/">← Back to Movies</Link>
      <h2>{movie.title}</h2>
      <p><strong>Tagline:</strong> {movie.tagline || 'N/A'}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
      <p><strong>Runtime:</strong> {movie.runtime} mins</p>
      <p><strong>Rating:</strong> ⭐ {movie.vote_average}/10 ({movie.vote_count} votes)</p>
      <p><strong>Status:</strong> {movie.status}</p>
    </div>
  );
};

export default MovieDetails;
