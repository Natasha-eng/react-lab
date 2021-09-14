import { setErrorAC } from "@/actions/actions";
import { api } from "@/api/games-api";
import { AppRootState } from "@/app/storetype";
import InputText from "@/elements/input/InputText";
import { SignInContext } from "@/signInContex/SignInContex";
import { isLoginValide, isPasswordValide } from "@/utils/util";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalStyle from "../modal/modal.module.css";

interface ISignIn {
  toggleSignIn: () => void;
}

export default function SignInWithContext(props: ISignIn): JSX.Element {
  const dispatch = useDispatch();
  const [signInLoginValue, setSignInLoginValue] = useState("");
  const [signInPasswordValue, setSignInPasswordValue] = useState("");
  const [error, setError] = useState({ loginError: "", passwordError: "", error: "" });
  const backError = useSelector<AppRootState, string>((state) => state.auth.error);

  const { signedIn, signInHandler } = useContext(SignInContext);

  const errorLogin =
    "Your login is not valid. Only characters A-Z, a-z, numbers 0-9 are  acceptable. Login can be at least 2 charecters long and no more than 20 characters";
  const errorPassword =
    "Password must be a minimum of 5 characters including at least one number and at least one special character and not more than 10 characters";
  const commonError = "Fields are required";

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

  const changeLoginHandler = (value: string) => {
    setSignInLoginValue(value);
  };

  const changePasswordHandler = (value: string) => {
    setSignInPasswordValue(value);
  };

  const logInHandler = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (signInLoginValue === "" && signInPasswordValue === "") {
      setError({ ...error, error: commonError });
      return;
    }
    setError({ ...error, error: "" });
    // dispatch(signInThunkCreator(signInLoginValue, signInPasswordValue));

    const response = await api.signIn(signInLoginValue, signInPasswordValue);
    if (response.status === 201) {
      signInHandler({ signedIn: true, loginName: response.data.name });
      // dispatch(setUserNameAC(response.data.name));
      // dispatch(setIsSignedInAC(true));
    } else {
      signInHandler({ signedIn: false, loginName: "" });
      dispatch(setErrorAC(response.data.errorMessage));
      // dispatch(setIsSignedInAC(false));
    }
    dispatch(setErrorAC(""));
  };
  useEffect(() => {
    if (signedIn) {
      props.toggleSignIn();
    }
  }, [signedIn]);

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

            {backError && <div>{backError}</div>}

            <button type="submit" onClick={logInHandler}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
