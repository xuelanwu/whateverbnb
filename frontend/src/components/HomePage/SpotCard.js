import { Redirect } from "react-router-dom";

const SpotCard = ({ spot }) => {
  const handleClick = () => {
    <Redirect to="spot/:spotId" />;
  };
  return (
    <div onClick={handleClick} className="spot-card">
      <div className="spot-card-image-box">
        <img src={spot.previewImage} alt={spot.name} />
      </div>
      <div className="spot-card-city-box">{spot.city}</div>
      <div className="spot-card-price-box">{`$${spot.price} night`}</div>
    </div>
  );
};

export default SpotCard;
