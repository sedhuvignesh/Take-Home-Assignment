import React from "react";
import MovieList from "../components/MovieList/MovieList";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>🎬 Movies List</h2>
      <MovieList />
    </div>
  );
}

export default Home;
