import { useState } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { fetchDeletespot } from "../../store/spot";
import { useHistory } from "react-router-dom";
import { fetchDeleteSpotReview } from "../../store/review";
import "./index.css";

const DeleteModal = ({ spot, spotId, reviewId }) => {
  const [showModal, setShowModal] = useState(false);
  // const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(
      spot ? fetchDeletespot(spotId) : fetchDeleteSpotReview(reviewId)
    )
      .then(() => setShowModal(false))
      .then(() => spot && history.push("/"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="delete-modal-container">
            <div className="delete-modal-block delete-title">
              <h2>{reviewId ? "Delete this review?" : "Delete this spot?"}</h2>
            </div>
            <div className="form-modal-error-block">
              <ul>
                {errors.map((error, idx) => (
                  <li key={`loginError-${idx + 1}`}>{error}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="delete-modal-block delete-modal-button-block">
                <button
                  onClick={handleDelete}
                  className="delete-modal-delete-button"
                >
                  Delete
                </button>
              </div>
              <div className="delete-modal-block delete-modal-button-block cancel">
                <button
                  onClick={handleCancel}
                  className="delete-modal-cancel-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DeleteModal;
