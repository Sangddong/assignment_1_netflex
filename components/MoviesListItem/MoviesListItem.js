import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { useProfile } from "../../contexts/Profile.context";
import getTMDBImgSrc from "../../utils/getTMDBImgSrc";
import styles from "./MoviesListItem.module.scss";

function MoviesListItem({ movie }) {
  const { isLoggedIn } = useAuth();
  const { likedMovies, setLikedMovies } = useProfile(); // 좋아요한 영화 목록과 상태 업데이트 함수 가져오기
  const [liked, setLiked] = useState(false); // 좋아요 상태를 관리하는 상태 변수

  // 좋아요 버튼을 클릭할 때 호출되는 함수
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

  return (
    <div>
      <Link to={`/movies/${movie.id}`} className={styles.wrapper}>
        <img src={getTMDBImgSrc(movie.backdrop_path)} alt={movie.title} />
        <h6>{movie.title}</h6>
      </Link>
      {isLoggedIn && ( // 로그인된 상태에서만 좋아요 버튼을 보여줌
        <button onClick={handleLike}>{liked ? "좋아요 취소" : "좋아요"}</button>
      )}
    </div>
  );
}

export default MoviesListItem;
