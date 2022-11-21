import "./index.css";

const SearchBar = () => {
  return (
    <div className="nav-block-filter">
      <li className="nav-items search-field">
        <div className="search-container">
          <button className="search-button">Anywhere</button>
          <button className="search-button">Any week</button>
          <button className="search-button">Add guests</button>
          <button className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </li>
    </div>
  );
};
