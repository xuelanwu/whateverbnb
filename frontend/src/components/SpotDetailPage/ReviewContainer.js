import { fetchSpotReviews } from "../../store/review";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import DeleteModal from "./DeleteModal";
import CreateReviewModal from "./CreatReviewModal";

const ReviewContainer = ({ ownerId }) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const reviewList = Object.values(reviews);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchSpotReviews(spotId));
  }, [dispatch, spotId]);

  if (reviews.reviews === null) return;
  return (
    <div>
      <div>{user && user.id !== ownerId && <CreateReviewModal />}</div>
      {reviewList.length > 0 ? (
        <div>
          {reviewList.map((review) => (
            <div key={`review-${review.id}`}>
              {user && user.id === review.userId && (
                <DeleteModal spot={false} reviewId={review.id} />
              )}
              <div>{review.review}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>{"no review yet"}</div>
      )}
    </div>
  );
};

export default ReviewContainer;
