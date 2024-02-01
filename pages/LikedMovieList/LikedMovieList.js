// LikedMoviesList.js

import React from "react";
import { useProfile } from "../../contexts/Profile.context";

const LikedMoviesList = () => {
  const { likedMovies } = useProfile();

  return (
    <div>
      <h2>좋아요한 영화 리스트</h2>
      <ul>
        {likedMovies.map((movieId) => (
          <li key={movieId}>{movieId}</li>
        ))}
      </ul>
    </div>
  );
};

export default LikedMoviesList;
