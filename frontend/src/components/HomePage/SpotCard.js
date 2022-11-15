import { NavLink } from "react-router-dom";

const SpotCard = ({ spot }) => {
  return (
    <NavLink to={`/spots/${spot.id}`}>
      <div>
        {spot.previewImage !== "Let's add some photos!" && (
          <img src={spot.previewImage} alt={spot.name} />
        )}
      </div>
      <div>{spot.name}</div>
      <div>{spot.city}</div>
    </NavLink>
  );
};

export default SpotCard;
