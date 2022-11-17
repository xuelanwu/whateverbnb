import { NavLink } from "react-router-dom";

const SpotCard = ({ spot }) => {
  return (
    <NavLink to={`/spots/${spot.id}`} className="navlink-spot-card">
      <div className="spot-card">
        <div className="spot-card-image-box">
          {spot.previewImage !== "Let's add some photos!" && (
            <img src={spot.previewImage} alt={spot.name} />
          )}
        </div>
        <div className="spot-card-city-box">
          <p>{`${spot.city},${spot.state}`}</p>
        </div>
        <div className="spot-card-price-box">{`$${spot.price} night`}</div>
      </div>
    </NavLink>
  );
};

export default SpotCard;
