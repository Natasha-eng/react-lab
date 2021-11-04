// eslint-disable-next-line no-use-before-define
import React, { useCallback } from "react";
import modalStyle from "../../confirmationModal/confirmationModal.module.css";

interface IDeleteGameModal {
  closeModal: () => void;
  deleteGameHandler: () => void;
  gameName: string;
}

const DeleteGameModal = React.memo((props: IDeleteGameModal): JSX.Element => {
  const deleteGame = useCallback(() => {
    props.deleteGameHandler();
  }, [props.deleteGameHandler]);

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
});

export default DeleteGameModal;
