import { FaPlus, FaReddit, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CreateDropdown from "./CreateDowndown";
import { useState } from "react";
import SearchBar from "./SearchBar";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo-link">
          <div className="logo-container">
            <FaReddit className="reddit-icon" />
            <span className="site-name">reddit</span>
          </div>
        </Link>
        <SearchBar />

        <div className="nav-actions">
          <div className="dropdown-container">
            <button className="icon-button" onClick={() => setShowDropdown(true)}>
              <FaPlus />
            </button>
            {showDropdown && (
              <CreateDropdown
                isOpen={showDropdown}
                onClose={() => setShowDropdown(false)}
              />
            )}
          </div>
          <button className="icon-button" onClick={() => navigate("/profile")} title="View Profile">
            <FaUser />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
