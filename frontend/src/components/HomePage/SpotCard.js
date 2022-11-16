import { NavLink } from "react-router-dom";

const SpotCard = ({ spot }) => {
  return (
    <NavLink to={`/spots/${spot.id}`}>
      <div className="spot-card">
        <div className="spot-card-image-box">
          {spot.previewImage !== "Let's add some photos!" && (
            <img src={spot.previewImage} alt={spot.name} />
          )}
        </div>
        <div className="spot-card-city-box">{spot.city}</div>
        <div className="spot-card-price-box">{`$${spot.price} night`}</div>
      </div>
    </NavLink>
  );
};

export default SpotCard;
