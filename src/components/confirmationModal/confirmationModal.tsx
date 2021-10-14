import modalStyle from "./confirmationModal.module.css";

export default function ConfirmationModal({ closeModal }: { closeModal: () => void }) {
  return (
    <div className={modalStyle.modalBackground}>
      <div className={modalStyle.modalContainer}>
        <button type="button" className={modalStyle.closeButton} onClick={closeModal}>
          X
        </button>
        <div className={modalStyle.title}>
          <h1> Are You syre you want to buy this game?</h1>
        </div>
        <div className={modalStyle.modalFooter}>
          <button type="button">Yes</button>
          <button type="button" onClick={closeModal} className={modalStyle.cancelButton}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
