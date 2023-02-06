import { useState, useEffect } from "react";

import "./index.css";

const SearchBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className="nav-block-filter">
      <li className="nav-items search-field">
        <div className="search-container">
          <button className="search-button" onClick={openMenu}>
            Anywhere
          </button>
          <button className="search-button" onClick={openMenu}>
            Any week
          </button>
          <button className="search-button" onClick={openMenu}>
            Add guests
          </button>
          <button className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </li>
      {showMenu && <form className="filter-form">filter form</form>}
    </div>
  );
};

export default SearchBar;
