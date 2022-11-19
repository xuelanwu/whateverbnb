import { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateSpotForm from "../SpotForm/CreateSpotForm";

const CreateSpotModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="create-spot-button">
        Airbnb Your Home
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default CreateSpotModal;
