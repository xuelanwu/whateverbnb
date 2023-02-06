import { useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import "./index.css";

import ProfileButton from "../ProfileDropdown";
import CreateSpotModal from "./CreateSpotModal";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";
import SearchBar from "./SearchBar";

const Navigation = ({ isLoaded }) => {
  const user = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  const handleClick = () => {
    history.push("/page-not-found");
  };

  return (
    <div className="nav-container">
      <ul className="nav-bar">
        <div className="nav-block-logo">
          <li className="nav-items logo">
            <NavLink exact to="/">
              <i className="fa-solid fa-wave-square fa-2xl"></i>
            </NavLink>
          </li>
        </div>
        {path === "/" && <SearchBar />}
        <div className="nav-block-buttons nav-buttons">
          <li className="nav-items nav-create-spot">
            <CreateSpotModal />
          </li>
          <li className="nav-items globe-icon">
            <div className="globe-icon-box" onClick={handleClick}>
              <i className="fa-solid fa-globe"></i>
            </div>
          </li>
          <li className="nav-items dropdown">
            {isLoaded && (
              <ProfileButton
                user={user}
                setLogin={setLogin}
                setShowModal={setShowModal}
              />
            )}
          </li>

          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              {login ? (
                <LoginForm setShowModal={setShowModal} />
              ) : (
                <SignupForm setShowModal={setShowModal} />
              )}
            </Modal>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
