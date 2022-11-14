import { Redirect } from "react-router-dom";

const SpotCard = ({ spot }) => {
  const handleClick = () => {
    <Redirect to="spot/:spotId" />;
  };
  return (
    <div onClick={handleClick}>
      <div>
        <img src={spot.previewImage} alt={spot.name} />
      </div>
      <div>{spot.name}</div>
      <div>{spot.city}</div>
    </div>
  );
};

export default SpotCard;
