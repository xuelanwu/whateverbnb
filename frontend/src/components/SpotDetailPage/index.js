import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpotDetail } from "../../store/spot";
import "./index.css";
import EditSpotModal from "./EditSpotModal";
import DeleteModal from "./DeleteModal";
import ReviewContainer from "./ReviewContainer";

const SpotDetailPage = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots[spotId]);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchSpotDetail(spotId));
    console.log("spotId in spotDetail useEffect()", spotId);
  }, [dispatch, spotId]);

  if (!spot) return null;

  return (
    <div className="spot-detail-container">
      <div>{spot.name}</div>
      <div>{`${spot.city}, ${spot.country}`}</div>
      <div>{`stars ${spot.avgStarRating}`}</div>
      <div>{`${spot.numReviews} reviews`}</div>
      <div className="spot-image-container">
        {spot.SpotImage &&
          (spot.SpotImage.length > 0
            ? spot.SpotImage.map((img) => (
                <img
                  key={`img-${img.id}`}
                  src={img.url}
                  alt={spot.name}
                  style={{ width: "200px", height: "200px" }}
                />
              ))
            : null)}
      </div>
      <div className="edit-spot-button-box">
        {user && user.id === spot.ownerId && (
          <div>
            <EditSpotModal />
            <DeleteModal spot={true} spotId={spotId} />
          </div>
        )}
      </div>
      <div>
        <ReviewContainer ownerId={spot.ownerId} />
      </div>
    </div>
  );
};

export default SpotDetailPage;
