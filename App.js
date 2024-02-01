import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth.context";
import { ProfileProvider } from "./contexts/Profile.context"; // ProfileProvider 추가
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import MoviesDetailPage from "./pages/MoviesDetailPage";
import SignInPage from "./pages/SignInPage";
import MyPage from "./pages/MyPage/MyPage";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider> {/* ProfileProvider 추가 */}
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/movies/:movieId" element={<MoviesDetailPage />} />
            <Route path="/my-page" element={<MyPage />} />
          </Route>
        </Routes>
      </ProfileProvider> {/* ProfileProvider 닫기 */}
    </AuthProvider>
  );
}

export default App;

