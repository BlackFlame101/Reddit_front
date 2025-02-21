import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subredditMatch = location.pathname.match(/^\/r\/([^/]+)/);
  const currentSubreddit = subredditMatch ? subredditMatch[1] : null;

  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsActive(false), 200);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleResultClick = (result: { _id: string; type: string; name: string }) => {
    if (result.type === "post") {
      navigate(`/post/${result._id}`);
    } else {
      navigate(`/r/${result.name}`);
    }
    setIsActive(false);
    setSearchQuery("");
  };

  return (
    <div className="search-wrapper">
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={
            currentSubreddit
              ? `Search r/${currentSubreddit}`
              : "Search for a community"
          }
          value={searchQuery}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {currentSubreddit && (
          <div className="search-scope">
            <span>in r/{currentSubreddit}</span>
          </div>
        )}
      </div>
      {isActive && (
        <div className="search-results">
          <div className="empty-state">
            <p>Try searching for posts or communities.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
