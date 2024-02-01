import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import getTMDBImgSrc from "../../utils/getTMDBImgSrc";
import styles from "./MoviesDetailPage.module.scss";
import { useAuth } from "../../contexts/auth.context";
import { useProfile } from "../../contexts/Profile.context";

function MoviesDetailPage() {
  const { isLoggedIn } = useAuth();
  const { movieId } = useParams();
  const { likedMovies, setLikedMovies } = useProfile(); // 좋아요한 영화 목록과 상태 업데이트 함수 가져오기
  const [movie, setMovie] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // 영화 정보 가져오기
    api.movies.getMovie(movieId).then((movie) => {
      setMovie(movie);
      // 영화 좋아요 상태 가져오기
      // 여기서는 임시로 false로 설정
      setLiked(false);
    });
  }, [movieId]);

  // 좋아요 버튼 클릭 시 호출되는 함수
  const handleLike = () => {
    // 좋아요 상태를 토글
    setLiked((prevLiked) => !prevLiked);
    // 좋아요한 영화 목록 업데이트
    if (!liked) {
      setLikedMovies([...likedMovies, movie.id]);
    } else {
      setLikedMovies(likedMovies.filter((id) => id !== movie.id));
    }
  };

  if (movie === null) return null;

  return (
    <div className={styles.wrapper}>
      <section className={styles.mainInfo}>
        <img
          className={styles.posterImg}
          src={getTMDBImgSrc(movie.poster_path)}
          alt={movie.title}
        />

        <div className={styles.mainInfoRight}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.overview}>{movie.overview}</p>

          <ul className={styles.genres}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <strong>{movie.vote_average}</strong>

          {isLoggedIn && (
            <button onClick={handleLike}>
              {liked ? "좋아요 취소" : "좋아요"}
            </button>
          )}
        </div>
      </section>

      <section>
        <img src={getTMDBImgSrc(movie.backdrop_path)} alt={movie.title} />
      </section>
    </div>
  );
}

export default MoviesDetailPage;
