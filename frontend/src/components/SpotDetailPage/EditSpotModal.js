import { useState } from "react";
import { Modal } from "../../context/Modal";
import SpotForm from "../SpotForm";

const EditSpotModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [createSpot, setCreateSpot] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Spot</button>
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

export default EditSpotModal;
