// MyPage.js
import React, { useState } from "react";
import { useAuth } from "../../contexts/auth.context";
import LikedMoviesList from "../LikedMovieList/LikedMovieList";
import { ProfileProvider } from "../../contexts/Profile.context";
import styles from './MyPage.module.scss';

function MyPage() {
  const { nickname, updateNickname } = useAuth();
  const [newNickname, setNewNickname] = useState("");

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  // 닉네임 제출 핸들러
  const handleNicknameSubmit = (e) => {
    e.preventDefault();
    updateNickname(newNickname);
    setNewNickname(""); // 입력 필드 초기화
  };

  return (
    <ProfileProvider>
      <div className={styles.wrapper}>
      <h2>마이페이지</h2>
      <p>현재 닉네임: {nickname}</p>
      <form onSubmit={handleNicknameSubmit}>
        <label>
          새 닉네임:
          <input
            type="text"
            value={newNickname}
            onChange={handleNicknameChange}
          />
        </label>
        <button type="submit">변경</button>
      </form>
      <LikedMoviesList />
      </div>
    </ProfileProvider>
  );
}

export default MyPage;
