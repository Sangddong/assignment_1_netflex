import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { useAuth } from "../../contexts/auth.context";

function Header() {
  const { isLoggedIn, logOut, nickname } = useAuth();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        NETFLEX
      </Link>

      <nav>
        {isLoggedIn ? (
          <ul>
            <li>{nickname}</li>
            <li className={styles.menu}>
              <Link to="/my-page">마이페이지</Link>
            </li>
            <li>
              <button onClick={logOut} className={styles.menu}>로그아웃</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li className={styles.menu}>
              <Link to="/sign-in">로그인하기</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
