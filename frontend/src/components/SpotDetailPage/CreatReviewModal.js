import { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "../ReviewForm";

const CreateReviewModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="create-review-button"
      >
        Write A Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default CreateReviewModal;
