import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
  }, [dispatch, spotId]);

  if (!spot) return null;

  return (
    <div className="spot-detail-container">
      <div className="spot-name-block">
        <h1>{spot.name}</h1>
      </div>
      <div className="spot-subtitle-block">
        <div className="spot-subtitle-block-left">
          <div className="review-box">
            <i className="fa-solid fa-star"></i>
            {spot.numReviews ? (
              <span>
                {console.log(spot.avgStarRating)}
                <span>{spot.avgStarRating.toFixed(1)} ·</span>
                <span>{`${spot.numReviews} reviews`}</span>
              </span>
            ) : (
              <span>New</span>
            )}
          </div>
          <div className="superhost-box">
            <span>·</span>
            <i className="fa-solid fa-medal"></i>
            <span>Superhost</span>
          </div>
          <div className="address-box">
            <span>·</span>
            <span>
              <span>{spot.city}</span>, <span>{spot.state}</span>,
              <span>{spot.country}</span>
            </span>
          </div>
        </div>
        <div className="spot-subtitle-block-right">
          <div className="share-save-box">
            <span>
              <i class="fa-solid fa-arrow-up-from-bracket"></i>
              <span>Share</span>
            </span>
          </div>
          <div className="share-save-box">
            <span>
              <i class="fa-regular fa-heart"></i>
              <span>Share</span>
            </span>
          </div>
        </div>
      </div>

      <div className="spot-image-container">
        {spot.SpotImage &&
          (spot.SpotImage.length > 0
            ? spot.SpotImage.map((img, idx) => {
                return (
                  <div className={`spot-detail-img-${idx}`}>
                    <img
                      key={`img-${img.id}`}
                      src={img.url}
                      alt={spot.name}
                      style={{ width: "200px", height: "200px" }}
                    />
                  </div>
                );
              })
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
