import modalStyle from "./../../confirmationModal/confirmationModal.module.css";

interface IDeleteGameModal {
  closeModal: () => void;
  deleteGameHandler: () => void;
  gameName: string;
}

export default function DeleteGameModal(props: IDeleteGameModal) {
  const deleteGame = () => {
    props.deleteGameHandler();
  };

  return (
    <div className={modalStyle.modalBackground}>
      <div className={modalStyle.modalContainer}>
        <button type="button" className={modalStyle.closeButton} onClick={props.closeModal}>
          X
        </button>
        <div className={modalStyle.title}>
          <h1> Are You sure you want to delete {props.gameName}?</h1>
        </div>
        <div className={modalStyle.modalFooter}>
          <button type="button" onClick={deleteGame}>
            Yes
          </button>
          <button type="button" onClick={props.closeModal} className={modalStyle.cancelButton}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
