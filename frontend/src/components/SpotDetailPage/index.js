import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotDetail } from "../../store/spot";

const SpotDetailPage = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(fetchSpotDetail(spotId));
  }, [dispatch]);

  if (!spot) return null;

  console.log(spot.SpotImage);
  return (
    <div>
      <div>{spot.name}</div>
      <div>{`${spot.city}, ${spot.country}`}</div>
      <div>{`stars ${spot.avgStarRating}`}</div>
      <div>{`${spot.numReviews} reviews`}</div>
      <div>
        {spot.SpotImage &&
          spot.SpotImage.map((img) => <img src={img.url} alt={spot.name} />)}
      </div>
    </div>
  );
};

export default SpotDetailPage;
