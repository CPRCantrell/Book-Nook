import React from "react";
import { useContext } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import homeIcon from '../../Assests/home.svg'
import searchIcon from '../../Assests/search-nav.svg'
import categoryIcon from '../../Assests/category.svg'
import libraryIcon from '../../Assests/library.svg'
import supriseIcon from '../../Assests/suprise.svg'
import profileDefault from '../../Assests/profile-default.jpg'
import auth from '../../hooks/useAuth'
import "./NavBar.css";

const Navbar = () => {

  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="nav-bar">
      {user?
      <div className="profile-space">
        <button onClick={logoutUser} className="logout">Logout</button>
        <Link to="/profile" className={"link profile"}>
          <img src={profileDefault} alt="Profile" />
          <p>{user.username}</p>
        </Link>
      </div>
      :
      <div className="log-space">
        <Link to="/login" className="link">
          <button>Log-in</button>
        </Link>
        <Link to="/register" className="link">
          <button>Sign-up</button>
        </Link>
      </div>
      }

      <NavLink activeclassname='active' to="/home" className="link">
        <button className="nav-button">
          <img src={homeIcon} alt='Home' />
          <p>Home</p>
        </button>
      </NavLink>

      <NavLink activeclassname='active' to="/search" className="link">
        <button className="nav-button">
        <img src={searchIcon} alt='Search' />
          <p>Search</p>
        </button>
      </NavLink>

      <NavLink activeclassname='active' to="/categories" className="link">
        <button className="nav-button">
        <img src={categoryIcon} alt='Categoriies' />
          <p>Categories</p>
        </button>
      </NavLink>

      <div className="separator">Personal</div>

      <NavLink activeclassname='active' to="/library" className="link">
        <button className="nav-button">
        <img src={libraryIcon} alt='Library' />
          <p>Library</p>
        </button>
      </NavLink>

      <div className="separator">Special</div>

      <NavLink activeclassname='active' to="/surprise" className="link">
        <button className="nav-button">
        <img src={supriseIcon} alt='Suprise' />
          <p>Surprise</p>
        </button>
      </NavLink>

    </div>
  );
};

export default Navbar;
