import { AppRootState } from "@/app/storetype";
import InputText from "@/elements/input/InputText";
import { fetchProfileThunkCreator } from "@/thunks/thunks";
import { UserProfileType } from "@/types/types";
import { isEmailValid, isLoginValide, lengthRange } from "backend/src/utils/util";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import main from "../../styles/main.module.css";
import { path } from "../header/HeaderContainer";

interface IProfile {
  isSignedIn: boolean;
}

type CategoryParams = {
  loggedInUser: string;
};

export default function Profile(props: IProfile): JSX.Element {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [error, setError] = useState({ userNameError: "", emailError: "", profileDescriptionError: "", error: "" });
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector<AppRootState, UserProfileType>((state) => state.profile.profile);
  const { loggedInUser } = useParams<CategoryParams>();

  const userNameError =
    "Your login is not valid. Only characters A-Z, a-z, numbers 0-9 are  acceptable. Login can be at least 2 charecters long and no more than 20 characters";
  const emailError = "Valid email formats are: mysite@ourearth.com / my.ownsite@ourearth.org / mysite@you.me.net";
  const textareaError = `Please input between 10 and 100} characters`;
  const commonError = "All the fields are required";

  const onChangeUserNameHandler = (value: string) => {
    setUsername(value);
  };

  const onBlurUserNameHandler = (value: string) => {
    const validUserName = isLoginValide(value);
    if (validUserName === null) {
      setError({
        ...error,
        userNameError,
      });
    } else {
      setError({
        ...error,
        userNameError: "",
      });
    }
  };

  const onChangeEmailHandler = (value: string) => {
    setEmail(value);
  };

  const onBlurEmailHandler = (value: string) => {
    const isValidEmail = isEmailValid(value);
    if (isValidEmail === null) {
      setError({
        ...error,
        profileDescriptionError: textareaError,
      });
    } else {
      setError({
        ...error,
        profileDescriptionError: "",
      });
    }
  };

  const onChangeProfileDescriptionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProfileDescription(e.target.value);
  };

  const onBlurProfileDescriptionHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
    const isValidProfileDescription = lengthRange(e.target.value);
    if (!isValidProfileDescription) {
      setError({
        ...error,
        emailError,
      });
    } else {
      setError({
        ...error,
        emailError: "",
      });
    }
  };

  if (!props.isSignedIn) {
    history.push(path.home);
  }

  useEffect(() => {
    dispatch(fetchProfileThunkCreator(loggedInUser));
  }, []);
  return (
    <div className={main.container}>
      <InputText
        name="username"
        type="text"
        label="Username"
        value={userName}
        onChangeValueHandler={onChangeUserNameHandler}
        onBlurHander={onBlurUserNameHandler}
        error={error.userNameError}
      />

      <InputText
        name="email"
        type="text"
        label="Email"
        value={email}
        onChangeValueHandler={onChangeEmailHandler}
        onBlurHander={onBlurEmailHandler}
        error={error.emailError}
      />
      <div>
        <label htmlFor="profileDescription">Profile Description:</label>
        <textarea
          name="profileDescription"
          id="profileDescription"
          rows={4}
          cols={50}
          value={profileDescription}
          onChange={onChangeProfileDescriptionHandler}
          onBlur={onBlurProfileDescriptionHandler}
        />
        {error.profileDescriptionError}
      </div>
      <button type="button">Save Profile</button>
      <button type="button">Change Password</button>
      {error.error}

      <div>{profile.email}</div>
      <div>{profile.login}</div>
      <div>{profile.profileDescription}</div>
    </div>
  );
}
