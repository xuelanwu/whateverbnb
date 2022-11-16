import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotDetail } from "../../store/spot";
import "./index.css";

const SpotDetailPage = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(fetchSpotDetail(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;

  console.log(spot.SpotImage);
  return (
    <div className="spot-detail-container">
      <div>{spot.name}</div>
      <div>{`${spot.city}, ${spot.country}`}</div>
      <div>{`stars ${spot.avgStarRating}`}</div>
      <div>{`${spot.numReviews} reviews`}</div>
      <div className="spot-image-container">
        {spot.SpotImage &&
          spot.SpotImage.map((img) => (
            <img
              src={img.url}
              alt={spot.name}
              style={{ width: "200px", height: "200px" }}
            />
          ))}
      </div>
    </div>
  );
};

export default SpotDetailPage;
