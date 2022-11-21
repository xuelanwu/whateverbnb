import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./index.css";

import ProfileButton from "../ProfileDropdown";
import CreateSpotModal from "./CreateSpotModal";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";

const Navigation = ({ isLoaded }) => {
  const user = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);

  // let sessionLinks;

  // if (user) {
  //   sessionLinks = <ProfileButton user={user} />;
  // } else {
  //   sessionLinks = (
  //     <div>
  //       <LoginFormModal />
  //       <SignupFormModal />
  //     </div>
  //   );
  // }

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

        <div className="nav-block-buttons nav-buttons">
          <li className="nav-items nav-create-spot">
            <CreateSpotModal />
          </li>
          <li className="nav-items globe-icon">
            <div className="globe-icon-box">
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
