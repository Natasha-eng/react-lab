// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, FocusEvent, useCallback, useEffect, useState } from "react";
import { AppRootState } from "@/app/storetype";
import InputText from "@/elements/input/InputText";
import { fetchProfileThunkCreator, saveProfileThunkCreator } from "@/thunks/thunks";
import { UserProfileType } from "@/types/types";
import { isEmailValid, isLoginValide, lengthRange } from "backend/src/utils/util";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setErrorAC } from "@/actions/actions";
import main from "../../styles/main.module.css";
import { path } from "../header/HeaderContainer";
import PasswordModalContainer from "../password/PasswordModalContainer";
import userPhoto from "../../assets/images/avatar_square_blue_120dp.png";
import profileStyle from "./profile.module.css";
import { userNameError, emailError, textareaError, commonError } from "../../constants/constants";

interface IProfile {
  isSignedIn: boolean;
}

type CategoryParams = {
  loggedInUser: string;
};

const Profile = React.memo((props: IProfile): JSX.Element => {
  const [passwordModal, setPasswordModal] = useState(false);
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [error, setError] = useState({ userNameError: "", emailError: "", profileDescriptionError: "", error: "" });
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector<AppRootState, UserProfileType>((state) => state.profile.profile);
  const [photoFile, setPhotoFile] = useState<string | undefined>(profile.photo);
  const { loggedInUser } = useParams<CategoryParams>();
  const backError = useSelector<AppRootState, string>((state) => state.systemMessages.error);

  const togglePasswordModal = useCallback(() => {
    setPasswordModal(!passwordModal);
  }, [passwordModal]);

  const onChangeUserNameHandler = useCallback((value: string) => {
    setUsername(value);
  }, []);

  const onBlurUserNameHandler = useCallback((value: string) => {
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
  }, []);

  const onChangeEmailHandler = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const onBlurEmailHandler = useCallback((value: string) => {
    const isValidEmail = isEmailValid(value);
    if (isValidEmail === null) {
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
  }, []);

  const onChangeProfileDescriptionHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setProfileDescription(e.target.value);
  }, []);

  const onBlurProfileDescriptionHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
    const isValidProfileDescription = lengthRange(e.target.value);
    if (!isValidProfileDescription) {
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

  const saveProfileHandler = useCallback(() => {
    if (!userName && !email && !profileDescription) {
      setError({ ...error, error: commonError });
      return;
    }
    setError({ ...error, error: "" });
    setUsername("");
    setEmail("");
    setProfileDescription("");
    const login = localStorage.getItem("signInLoginValue");
    photoFile && login && dispatch(saveProfileThunkCreator(photoFile, login, userName, email, profileDescription));
    dispatch(setErrorAC(""));
  }, [dispatch, photoFile, userName, email, profileDescription]);

  const convertToBase64 = (file: File) =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        res(reader.result);
      };
      reader.onerror = () => {
        rej(console.log("file loading error "));
      };
    });

  const onPhotoSelected = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const base64: string = (await convertToBase64(file)) as string;

      setPhotoFile(base64);
    }
  }, []);

  useEffect(() => {
    setPhotoFile(profile.photo);
  }, [profile.photo]);

  if (!props.isSignedIn) {
    history.push(path.home);
  }

  useEffect(() => {
    dispatch(fetchProfileThunkCreator(loggedInUser));
  }, []);

  return (
    <div className={main.contentProfile}>
      <div className={profileStyle.mainPhotoWrapper}>
        <img src={photoFile || userPhoto} alt="MainPhoto" />

        <label htmlFor="profileImg" className={profileStyle.changePhotoButton}>
          Change Profile Image
          <input type="file" name="profileImg" id="profileImg" onChange={onPhotoSelected} />
        </label>
      </div>
      <div className={profileStyle.profileDataContainer}>
        <div className={profileStyle.profileData}>
          <div className={profileStyle.profileInputWrapper}>
            <InputText
              name="username"
              type="text"
              label="Username"
              value={userName}
              onChangeValueHandler={onChangeUserNameHandler}
              onBlurHander={onBlurUserNameHandler}
              error={error.userNameError}
            />
          </div>
          <div className={profileStyle.profileContent}>{profile.login}</div>
        </div>
        <div className={profileStyle.profileData}>
          <div className={profileStyle.profileInputWrapper}>
            <InputText
              name="email"
              type="text"
              label="Email"
              value={email}
              onChangeValueHandler={onChangeEmailHandler}
              onBlurHander={onBlurEmailHandler}
              error={error.emailError}
            />
          </div>
          <div className={profileStyle.profileContent}>{profile.email}</div>
        </div>
        <div className={profileStyle.profileData}>
          <div className={profileStyle.profileTextareaWrapper}>
            <div>
              <label htmlFor="profileDescription">Profile Description:</label>
              <textarea
                name="profileDescription"
                id="profileDescription"
                rows={4}
                cols={70}
                value={profileDescription}
                onChange={onChangeProfileDescriptionHandler}
                onBlur={onBlurProfileDescriptionHandler}
              />
            </div>
            <div className={main.error}>{error.profileDescriptionError}</div>
          </div>
          <div className={profileStyle.profileContent}>{profile.profileDescription}</div>
        </div>
        <div className={profileStyle.profileButtonsWrapper}>
          <button type="button" onClick={saveProfileHandler}>
            Save Profile
          </button>
          <button type="button" onClick={togglePasswordModal}>
            Change Password
          </button>
        </div>
      </div>
      <div className={main.error}> {error.error}</div>
      {backError && <div className={main.error}>{backError}</div>}
      {passwordModal && <PasswordModalContainer togglePasswordModal={togglePasswordModal} />}
    </div>
  );
});

export default Profile;
