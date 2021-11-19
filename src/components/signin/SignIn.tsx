// eslint-disable-next-line no-use-before-define
import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { isLoginValide, isPasswordValide } from "../../utils/util";
import { commonError, errorLogin, errorPassword } from "../../constants/constants";
import InputText from "../../elements/input/InputText";
import { AppRootState } from "../../app/storetype";
import { setErrorAC, signInSagaAC } from "../../actions/actions";
import modalStyle from "../modal/modal.module.css";
import main from "../../styles/main.module.css";

interface ISignIn {
  toggleSignIn: () => void;
}

const SignIn = React.memo((props: ISignIn): JSX.Element => {
  const dispatch = useDispatch();
  const [signInLoginValue, setSignInLoginValue] = useState("");
  const [signInPasswordValue, setSignInPasswordValue] = useState("");
  const [error, setError] = useState({ loginError: "", passwordError: "", error: "" });
  const backError = useSelector<AppRootState, string>((state) => state.systemMessages.error);
  const isSignedIn = useSelector<AppRootState, boolean>((state) => state.auth.isSignedIn);

  const onBlurLoginHandler = useCallback((value: string) => {
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
  }, []);

  const onBlurPasswordHandler = useCallback((value: string) => {
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
  }, []);

  const changeLoginHandler = useCallback((value: string) => {
    setSignInLoginValue(value);
  }, []);

  const changePasswordHandler = useCallback((value: string) => {
    setSignInPasswordValue(value);
  }, []);

  const logInHandler = useCallback(
    (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (signInLoginValue === "" && signInPasswordValue === "") {
        setError({ ...error, error: commonError });
        return;
      }
      localStorage.setItem("signInLoginValue", signInLoginValue);
      localStorage.setItem("signInPasswordValue", signInPasswordValue);
      setError({ ...error, error: "" });
      dispatch(signInSagaAC(signInLoginValue, signInPasswordValue));
      dispatch(setErrorAC(""));
    },
    [dispatch, signInLoginValue, signInPasswordValue]
  );

  useEffect(() => {
    if (isSignedIn) {
      props.toggleSignIn();
    }
  }, [isSignedIn]);

  return (
    <>
      <form className={modalStyle.modalBackground} onClick={props.toggleSignIn}>
        <div className={modalStyle.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={modalStyle.modalTitle}>
            <h2>Authorization</h2>
            <button type="button" className={modalStyle.closeButton} onClick={props.toggleSignIn}>
              <i>
                <FontAwesomeIcon icon={faWindowClose} />
              </i>
            </button>
          </div>
          <div className={modalStyle.inputsContainer}>
            <InputText
              name="login"
              type="text"
              label="login"
              value={signInLoginValue}
              onChangeValueHandler={changeLoginHandler}
              onBlurHander={onBlurLoginHandler}
              error={error.loginError}
            />
            <InputText
              name="password"
              type="password"
              label="password"
              value={signInPasswordValue}
              onChangeValueHandler={changePasswordHandler}
              onBlurHander={onBlurPasswordHandler}
              error={error.passwordError}
            />

            {backError && <div className={main.error}>{backError}</div>}

            <button type="submit" onClick={logInHandler}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
});

export default SignIn;
