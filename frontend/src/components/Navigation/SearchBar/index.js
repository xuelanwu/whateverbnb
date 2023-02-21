import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFilteredSpots } from "../../../store/spot";

import "./index.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [errors, setErrors] = useState([]);

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      const name = e.target.name;
      if (
        name !== "minPrice" &&
        name !== "maxPrice" &&
        name !== "city" &&
        name !== "state" &&
        name !== "country"
      )
        setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleMinPrice = (e) => {
    const price = e.target.value;
    setMinPrice(price);
    if (price && isNaN(price)) setErrors(["Must be a number"]);
    else setErrors([]);
  };

  const handleMaxPrice = (e) => {
    const price = e.target.value;
    setMaxPrice(price);
    if (price && isNaN(price)) setErrors(["Must be a number"]);
    else setErrors([]);
  };

  const handleSearch = (e) => {
    if (errors.length > 0) return;
    return dispatch(
      fetchFilteredSpots({ minPrice, maxPrice, city, state, country })
    );
  };

  return (
    <div className="nav-block-filter">
      <li className="nav-items search-field">
        <div className="search-container">
          <button className="search-button" onClick={openMenu}>
            Anywhere
          </button>
          <button className="search-button" onClick={openMenu}>
            Any price
          </button>
          <button className="search-button" onClick={openMenu}>
            Search
          </button>
          <button className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </li>
      {showMenu && (
        <form className="filter-form">
          <div className="filter-form-block">
            <ul className="filter-error">
              {errors.map((error, idx) => (
                <li key={`filterError-${idx + 1}`}>{error}</li>
              ))}
            </ul>
          </div>
          <div className="filter-form-block">
            <div className="filter-keyword-box">
              <label htmlFor="city">City</label>
              <div className="filter-keyword-input-box">
                <input
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="filter-form-block">
            <div className="filter-keyword-box">
              <label htmlFor="state">State</label>
              <div className="filter-keyword-input-box">
                <input
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="filter-form-block">
            <div className="filter-keyword-box">
              <label htmlFor="country">Country</label>
              <div className="filter-keyword-input-box">
                <input
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="filter-form-block">
            <div className="filter-price-box">
              <label htmlFor="minPrice">min price</label>
              <div className="filter-price-input-box">
                <span>$</span>
                <input
                  name="minPrice"
                  value={minPrice}
                  onChange={handleMinPrice}
                />
              </div>
            </div>
            <span>-</span>
            <div className="filter-price-box">
              <label htmlFor="maxPrice">max price</label>
              <div className="filter-price-input-box">
                <span>$</span>
                <input
                  name="maxPrice"
                  value={maxPrice}
                  onChange={handleMaxPrice}
                />
              </div>
            </div>
          </div>
          <div className="filter-form-block">
            <button
              type="submit"
              onClick={handleSearch}
              className="spot-filter-search-button"
            >
              Search
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
