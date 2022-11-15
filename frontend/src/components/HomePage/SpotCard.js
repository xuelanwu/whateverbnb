import { NavLink } from "react-router-dom";

const SpotCard = ({ spot }) => {
  return (
    <NavLink to={`/spots/${spot.id}`}>
      <div>
        <img src={spot.previewImage} alt={spot.name} />
      </div>
      <div>{spot.name}</div>
      <div>{spot.city}</div>
    </NavLink>
  );
};

export default SpotCard;
