// eslint-disable-next-line no-use-before-define
import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { commonError, errorLogin, errorPassword, errorRepeatPassword } from "../../constants/constants";
import { isLoginValide, isPasswordValide } from "../../utils/util";
import { signUpThunkCreator } from "../../thunks/thunks";
import InputText from "../../elements/input/InputText";
import { AppRootState } from "../../app/storetype";
import { setErrorAC } from "../../actions/actions";
import modalStyle from "../modal/css/modal.module.css";
import main from "../../styles/main.module.css";

interface ISignUp {
  toggleSignUp: () => void;
}

const SignUp = React.memo((props: ISignUp): JSX.Element => {
  const dispatch = useDispatch();
  const [signUpLoginValue, setSignUpLoginValue] = useState("");
  const [signUpPasswordValue, setSignUpPasswordValue] = useState("");
  const [signUnRepeatPasswordValue, setSignUpRepeatPasswordValue] = useState("");
  const history = useHistory();
  const [error, setError] = useState({ loginError: "", passwordError: "", repeatPasswordError: "", error: "" });
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

  const onBlurRepeatPasswordHandler = useCallback(
    (value: string) => {
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
    },
    [signUpPasswordValue]
  );

  const changeLoginHandler = useCallback((value: string) => {
    setSignUpLoginValue(value);
  }, []);

  const changePasswordHandler = useCallback((value: string) => {
    setSignUpPasswordValue(value);
  }, []);

  const changeRepeatPasswordHandler = useCallback((value: string) => {
    setSignUpRepeatPasswordValue(value);
  }, []);

  const signUpHandler = useCallback(
    (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    },
    [dispatch, signUpLoginValue, signUpPasswordValue]
  );

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
});

export default SignUp;
