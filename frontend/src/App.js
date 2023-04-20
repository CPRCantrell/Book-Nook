// General Imports
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import BookDetailPage from "./pages/BookDetailPage/BookDetailPage"
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="app-background">
      <Navbar/>
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="profile" element={
          <PrivateRoute>
          <ProfilePage />
          </PrivateRoute>
        } />
        <Route path='detail/:bookId' element={<BookDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/*' element={<Navigate to='/home' replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
