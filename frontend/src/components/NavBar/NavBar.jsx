import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {

  const { logoutUser , user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="nav-bar">
      {user?
      <div className="profile-space">
        <Link to="/profile" className="link">
          <button>profile</button>
        </Link>
        <button onClick={logoutUser}>log-out</button>
      </div>
      :
      <div className="profile-space">
        <Link to="/login" className="link">
          <button>Log-in</button>
        </Link>
        <Link to="/register" className="link">
          <button>Sign-up</button>
        </Link>
      </div>
      }

      <Link to="/home" className="link">
        <button className="nav-button">
          <div></div>
          <p>Home</p>
        </button>
      </Link>

      <Link to="/search" className="link">
        <button className="nav-button">
          <div></div>
          <p>Search</p>
        </button>
      </Link>

      <Link to="/categories" className="link">
        <button className="nav-button">
          <div></div>
          <p>Categories</p>
        </button>
      </Link>

      <div className="separator">Personal</div>

      <Link to="/library" className="link">
        <button className="nav-button">
          <div></div>
          <p>Library</p>
        </button>
      </Link>

      <div className="separator">Special</div>

      <Link to="/surprise" className="link">
        <button className="nav-button">
          <div></div>
          <p>Surprise</p>
        </button>
      </Link>

      {/* <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>React/Flask JWT</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul> */}
    </div>
  );
};

export default Navbar;
