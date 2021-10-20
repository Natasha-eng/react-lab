import { setMessageAC } from "@/actions/actions";
import { AppRootState } from "@/app/storetype";
import { updateCartsThunkCreator } from "@/thunks/thunks";
import { useDispatch, useSelector } from "react-redux";
import modalStyle from "./confirmationModal.module.css";

export default function ConfirmationModal({ closeModal, total }: { closeModal: () => void; total: number }) {
  const balance = useSelector<AppRootState, number>((state) => state.profile.profile.balance);
  const message = useSelector<AppRootState, string>((state) => state.systemMessages.message);
  const dispatch = useDispatch();

  const buyGames = () => {
    if (total > balance) {
      dispatch(setMessageAC("Not enough money for this purchase. You should recharge your balance."));
    } else {
      const login = localStorage.getItem("signInLoginValue");
      login && dispatch(updateCartsThunkCreator(login, []));
      closeModal();
      dispatch(setMessageAC(""));
    }
  };
  const closeModalHandler = () => {
    closeModal();
    dispatch(setMessageAC(""));
  };
  return (
    <div className={modalStyle.modalBackground}>
      <div className={modalStyle.modalContainer}>
        <button type="button" className={modalStyle.closeButton} onClick={closeModalHandler}>
          X
        </button>
        <div className={modalStyle.title}>
          <h1> Are You sure you want to buy this game?</h1>
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
}
