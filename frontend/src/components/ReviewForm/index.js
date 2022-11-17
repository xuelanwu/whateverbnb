import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchCreateSpotReview } from "../../store/review";
import { useHistory, useParams } from "react-router-dom";

const ReviewForm = ({ setShowModal }) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [stars, setStars] = useState("");
  const [review, setReview] = useState("");

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(fetchCreateSpotReview(spotId, { stars, review }))
      .then(() => setShowModal(false))
      .then(() => {
        history.push(`/spots/${spotId}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={`signupError-${idx + 1}`}>{error}</li>
        ))}
      </ul>
      <label>
        Stars
        <input
          type="text"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        />
      </label>
      <label>
        Review
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;
