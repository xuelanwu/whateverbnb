import { useState } from "react";
import { Modal } from "../../context/Modal";
import EditSpotForm from "../SpotForm/EditSpotForm";

const EditSpotModal = ({ spot }) => {
  const [showModal, setShowModal] = useState(false);
  const [createSpot, setCreateSpot] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm setShowModal={setShowModal} spot={spot} />
        </Modal>
      )}
    </>
  );
};

export default EditSpotModal;
