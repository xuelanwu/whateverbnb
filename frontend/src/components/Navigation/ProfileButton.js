import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { logout } from "../../store/session";

const ProfileButton = ({ user, setLogin, setShowModal }) => {
  const dispatch = useDispatch();
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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="profile-dropdown-container">
      <button className="profile-dropdown-menu-button" onClick={openMenu}>
        <div className="profile-menu-icon">
          <i className="fa-solid fa-bars fa-lg"></i>
        </div>
        <div className="profile-avatar-icon">
          <i className="fa-solid fa-user fa-lg"></i>
        </div>
      </button>
      {showMenu &&
        (user ? (
          <ul className="profile-dropdown">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button
                onClick={handleLogout}
                className="profile-dropdown-button"
              >
                Log Out
              </button>
            </li>
          </ul>
        ) : (
          <ul className="profile-dropdown">
            <li>
              <button
                className="profile-dropdown-button signup"
                onClick={() => {
                  setLogin(false);
                  setShowModal(true);
                }}
              >
                Sign Up
              </button>
            </li>
            <li>
              <button
                className="profile-dropdown-button login"
                onClick={() => {
                  setLogin(true);
                  setShowModal(true);
                }}
              >
                Log In
              </button>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default ProfileButton;
