import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import ProfileButton from "./ProfileButton";

const Navigation = ({ isLoaded }) => {
  const user = useSelector((state) => state.session.user);

  let sessionLinks;

  if (user) {
    sessionLinks = <ProfileButton user={user} />;
  } else {
    sessionLinks = (
      <div>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
};

export default Navigation;
