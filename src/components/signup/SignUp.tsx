import { setErrorAC } from "@/actions/actions";
import { AppRootState } from "@/app/storetype";
import InputText from "@/elements/input/InputText";
import { signUpThunkCreator } from "@/thunks/thunks";
import { isLoginValide, isPasswordValide } from "@/utils/util";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { commonError, errorLogin, errorPassword, errorRepeatPassword } from "@/constants/constants";
import modalStyle from "../modal/modal.module.css";
import main from "../../styles/main.module.css";

interface ISignUp {
  toggleSignUp: () => void;
}

export default function SignUp(props: ISignUp): JSX.Element {
  const dispatch = useDispatch();
  const [signUpLoginValue, setSignUpLoginValue] = useState("");
  const [signUpPasswordValue, setSignUpPasswordValue] = useState("");
  const [signUnRepeatPasswordValue, setSignUpRepeatPasswordValue] = useState("");
  const history = useHistory();
  const [error, setError] = useState({ loginError: "", passwordError: "", repeatPasswordError: "", error: "" });
  const backError = useSelector<AppRootState, string>((state) => state.auth.error);
  const isSignedIn = useSelector<AppRootState, boolean>((state) => state.auth.isSignedIn);

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
      if (value !== signUpPasswordValue) {
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
    if (signUpLoginValue === "" && signUpPasswordValue === "") {
      setError({ ...error, error: commonError });
      return;
    }

    setError({ ...error, error: "" });
    if (backError) {
      dispatch(setErrorAC(""));
    }
    dispatch(signUpThunkCreator(signUpLoginValue, signUpPasswordValue));
  };

  useEffect(() => {
    if (isSignedIn) {
      props.toggleSignUp();
      history.push("/profile");
    }
  }, [isSignedIn]);

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
              value={signUpPasswordValue}
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

            {backError && <div className={main.error}>{backError}</div>}
            <button type="submit" onClick={signUpHandler}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
