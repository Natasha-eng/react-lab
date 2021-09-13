import { AppRootState } from "@/app/storetype";
import InputText from "@/elements/input/InputText";
import { signUpThunkCreator } from "@/thunks/thunks";
import { isLoginValide, isPasswordValide } from "@/utils/util";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import modalStyle from "../modal/modal.module.css";

interface ISignUp {
  toggleSignUp: () => void;
}

export default function SignUp(props: ISignUp): JSX.Element {
  const dispatch = useDispatch();
  const [signUpLoginValue, setSignUpLoginValue] = useState("");
  const [signUnPasswordValue, setSignUpPasswordValue] = useState("");
  const [signUnRepeatPasswordValue, setSignUpRepeatPasswordValue] = useState("");
  const history = useHistory();
  const [error, setError] = useState({ loginError: "", passwordError: "", repeatPasswordError: "", error: "" });
  const backError = useSelector<AppRootState, string>((state) => state.auth.error);

  const errorLogin =
    "Your login is not valid. Only characters A-Z, a-z, numbers 0-9 are  acceptable. Login can be at least 2 charecters long and no more than 20 characters";
  const errorPassword =
    "Password must be a minimum of 5 characters including at least one number and at least one special character and not more than 10 characters";
  const errorRepeatPassword = "Passwords don't match";

  const onBlurLoginHandler = (value: string) => {
    const validLoginName = isLoginValide(value);
    if (validLoginName === null) {
      setError({
        ...error,
        loginError: errorLogin,
      });
    } else {
      setError({
        ...error,
        loginError: "",
      });
    }
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
      if (value !== signUnPasswordValue) {
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

  const changeLoginHandler = (value: string) => {
    setSignUpLoginValue(value);
  };

  const changePasswordHandler = (value: string) => {
    setSignUpPasswordValue(value);
  };

  const changeRepeatPasswordHandler = (value: string) => {
    setSignUpRepeatPasswordValue(value);
  };

  const signUpHandler = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (signUpLoginValue === "" && signUnPasswordValue === "") {
      setError({ ...error, error: "Fields are required" });
      return;
    }
    if (backError !== "") {
      setError({ ...error, error: backError });
    }
    setError({ ...error, error: "" });
    dispatch(signUpThunkCreator(signUpLoginValue, signUnPasswordValue));
    history.push("/profile");
  };
  return (
    <>
      <form className={modalStyle.modalBackground} onClick={props.toggleSignUp}>
        <div className={modalStyle.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={modalStyle.modalTitle}>
            <h2>Registration</h2>
            <button type="button" className={modalStyle.closeButton} onClick={props.toggleSignUp}>
              <i>
                <FontAwesomeIcon icon={faWindowClose} />
              </i>
            </button>
          </div>
          <div className={modalStyle.inputsContainer}>
            <InputText
              name="login"
              type="text"
              label="Login"
              value={signUpLoginValue}
              onBlurHander={onBlurLoginHandler}
              error={error.loginError}
              onChangeValueHandler={changeLoginHandler}
            />
            <InputText
              name="password"
              type="password"
              label="Password"
              value={signUnPasswordValue}
              onBlurHander={onBlurPasswordHandler}
              error={error.passwordError}
              onChangeValueHandler={changePasswordHandler}
            />
            <InputText
              name="repeatPassword"
              type="password"
              label="Repeat Password"
              value={signUnRepeatPasswordValue}
              onBlurHander={onBlurRepeatPasswordHandler}
              error={error.repeatPasswordError}
              onChangeValueHandler={changeRepeatPasswordHandler}
            />
            <button type="submit" onClick={signUpHandler}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
