// Profile.context.js
import React, { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [nickname, setNickname] = useState(""); // 닉네임 상태
  const [likedMovies, setLikedMovies] = useState([]); // 좋아요한 영화 목록 상태

  // 로컬 스토리지에서 좋아요한 영화 목록을 가져와 상태로 설정
  useEffect(() => {
    const storedLikedMovies = localStorage.getItem("likedMovies");
    if (storedLikedMovies) {
      setLikedMovies(JSON.parse(storedLikedMovies));
    }
  }, []);

  // 좋아요한 영화 목록이 업데이트될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
  }, [likedMovies]);

  return (
    <ProfileContext.Provider value={{ nickname, setNickname, likedMovies, setLikedMovies }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

export default ProfileContext;
