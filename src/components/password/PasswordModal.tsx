import { setErrorAC } from "@/actions/actions";
import { AppRootState } from "@/app/storetype";
import { commonError, errorPassword, errorRepeatPassword } from "@/constants/constants";
import InputText from "@/elements/input/InputText";
import { changePasswordThunkCreator } from "@/thunks/thunks";
import { isPasswordValide } from "@/utils/util";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalStyle from "../modal/modal.module.css";

interface PasswordModal {
  togglePasswordModal: () => void;
}

export default function PasswordModal(props: PasswordModal): JSX.Element {
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [repeatNewPasswordValue, setRepeatNewPasswordValue] = useState("");
  const [error, setError] = useState({ passwordError: "", repeatPasswordError: "", error: "" });
  const message = useSelector<AppRootState, string>((state) => state.profile.changeDataMessage);
  const backError = useSelector<AppRootState, string>((state) => state.auth.error);
  const dispatch = useDispatch();

  const changePasswordHandler = (value: string) => {
    setNewPasswordValue(value);
  };

  const changeRepeatPasswordHandler = (value: string) => {
    setRepeatNewPasswordValue(value);
  };

  const onBlurPasswordHandler = (value: string) => {
    const validPassword = isPasswordValide(value);
    if (validPassword === null) {
      setError({
        ...error,
        passwordError: errorPassword,
      });
    } else {
      setError({
        ...error,
        passwordError: "",
      });
    }
  };

  const onBlurRepeatPasswordHandler = (value: string) => {
    const validPassword = isPasswordValide(value);
    if (validPassword === null) {
      setError({
        ...error,
        passwordError: errorPassword,
      });
      if (value !== newPasswordValue) {
        setError({
          ...error,
          repeatPasswordError: errorRepeatPassword,
        });
      }
    } else {
      setError({
        ...error,
        passwordError: "",
        repeatPasswordError: "",
      });
    }
  };

  const changePasswordаHandler = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!newPasswordValue && !repeatNewPasswordValue) {
      setError({ ...error, error: commonError });
      return;
    }
    e.preventDefault();
    setError({ ...error, error: "" });
    dispatch(setErrorAC(""));
    const login = localStorage.getItem("signInLoginValue");
    login && dispatch(changePasswordThunkCreator(login, newPasswordValue));
  };

  return (
    <form className={modalStyle.modalBackground} onClick={props.togglePasswordModal}>
      <div className={modalStyle.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={modalStyle.modalTitle}>
          <h2>Change Password</h2>
          <div>{message}</div>
          <button type="button" className={modalStyle.closeButton} onClick={props.togglePasswordModal}>
            <i>
              <FontAwesomeIcon icon={faWindowClose} />
            </i>
          </button>
        </div>
        <div className={modalStyle.inputsContainer}>
          <InputText
            name="password"
            type="password"
            label="Password"
            value={newPasswordValue}
            onBlurHander={onBlurPasswordHandler}
            error={error.passwordError}
            onChangeValueHandler={changePasswordHandler}
          />
          <InputText
            name="repeatPassword"
            type="password"
            label="Repeat Password"
            value={repeatNewPasswordValue}
            onBlurHander={onBlurRepeatPasswordHandler}
            error={error.repeatPasswordError}
            onChangeValueHandler={changeRepeatPasswordHandler}
          />
          {backError && <div>{backError}</div>}
          <button type="submit" onClick={changePasswordаHandler}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
