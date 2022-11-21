import "./index.css";

const SpotDescriptionContainer = ({ spot }) => {
  console.log(spot);
  return (
    <div className="spot-description-container">
      <p>{spot.description}</p>
    </div>
  );
};

export default SpotDescriptionContainer;
