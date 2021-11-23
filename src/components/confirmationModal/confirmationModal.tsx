// eslint-disable-next-line no-use-before-define
import React, { useCallback } from "react";
import { setMessageAC } from "@/actions/actions";
import { AppRootState } from "@/app/storetype";
import { balanceMessage } from "@/constants/constants";
import { updateCartsThunkCreator } from "@/thunks/thunks";
import { useDispatch, useSelector } from "react-redux";
import modalStyle from "./css/confirmationModal.module.css";

const constConfirmationModal = React.memo(({ closeModal, total }: { closeModal: () => void; total: number }) => {
  const balance = useSelector<AppRootState, number>((state) => state.profile.profile.balance);
  const message = useSelector<AppRootState, string>((state) => state.systemMessages.message);
  const dispatch = useDispatch();

  const buyGames = useCallback(() => {
    if (total > balance) {
      dispatch(setMessageAC(balanceMessage));
    } else {
      const login = localStorage.getItem("signInLoginValue");
      login && dispatch(updateCartsThunkCreator(login, []));
      closeModal();
      dispatch(setMessageAC(""));
    }
  }, [dispatch, total, balance, closeModal]);

  const closeModalHandler = useCallback(() => {
    closeModal();
    dispatch(setMessageAC(""));
  }, [dispatch, closeModal]);

  return (
    <div className={modalStyle.modalBackground}>
      <div className={modalStyle.modalContainer}>
        <button type="button" className={modalStyle.closeButton} onClick={closeModalHandler}>
          X
        </button>
        <div className={modalStyle.title}>
          <h1> Are You sure you want to make a purchase?</h1>
          <p className={modalStyle.message}>{message}</p>
        </div>
        <div className={modalStyle.modalFooter}>
          <button type="button" onClick={buyGames}>
            Yes
          </button>
          <button type="button" onClick={closeModalHandler} className={modalStyle.cancelButton}>
            No
          </button>
        </div>
      </div>
    </div>
  );
});
export default constConfirmationModal;
