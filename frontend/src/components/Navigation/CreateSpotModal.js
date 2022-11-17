import { useState } from "react";
import { Modal } from "../../context/Modal";
import SpotForm from "../SpotForm";

const CreateSpotModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [createSpot, setCreateSpot] = useState(true);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="create-spot-button">
        Become A Host
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SpotForm
            setShowModal={setShowModal}
            setCreateSpot={setCreateSpot}
            createSpot={createSpot}
          />
        </Modal>
      )}
    </>
  );
};

export default CreateSpotModal;
