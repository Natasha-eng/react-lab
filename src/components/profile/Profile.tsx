import { AppRootState } from "@/app/storetype";
import InputText from "@/elements/input/InputText";
import { fetchProfileThunkCreator, saveProfileThunkCreator } from "@/thunks/thunks";
import { UserProfileType } from "@/types/types";
import { isEmailValid, isLoginValide, lengthRange } from "backend/src/utils/util";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import main from "../../styles/main.module.css";
import { path } from "../header/HeaderContainer";
import PasswordModalContainer from "../password/PasswordModaContainerl";
import userPhoto from "../../assets/images/avatar_square_blue_120dp.png";

interface IProfile {
  isSignedIn: boolean;
}

type CategoryParams = {
  loggedInUser: string;
};

export default function Profile(props: IProfile): JSX.Element {
  const [photoPath, setPhotoPath] = useState("");
  const [passwordModal, setPasswordModal] = useState(false);
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

  const togglePasswordModal = () => {
    setPasswordModal(!passwordModal);
  };

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
  const saveProfileHandler = () => {
    if (!userName && !email && !profileDescription) {
      setError({ ...error, error: commonError });
      return;
    }
    setError({ ...error, error: "" });
    setUsername("");
    setEmail("");
    setProfileDescription("");
    const password = localStorage.getItem("signInPasswordValue");
    password && dispatch(saveProfileThunkCreator(password, userName, email, profileDescription));
  };
  const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      // setPhotoPath(e.target.files[0]);
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
      <div>
        <img src={profile.photo || userPhoto} alt="MainPhoto" />
        <input type="file" name="Change Profile Image" onChange={onPhotoSelected} />
      </div>
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
      <button type="button" onClick={saveProfileHandler}>
        Save Profile
      </button>
      <button type="button" onClick={togglePasswordModal}>
        Change Password
      </button>
      {error.error}
      {passwordModal && <PasswordModalContainer togglePasswordModal={togglePasswordModal} />}
      <div>{profile.email}</div>
      <div>{profile.login}</div>
      <div>{profile.profileDescription}</div>
    </div>
  );
}
