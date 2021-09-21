import {
  changePasswordAC,
  changePasswordActionType,
  isFetchingAC,
  isFetchingActionType,
  saveProfileAC,
  saveProfileActionType,
  setErrorAC,
  setErrorActionType,
  setFilteredGamesAC,
  SetFilteredGamesActionType,
  setGamesAC,
  SetGamesActionType,
  setIsSignedInAC,
  setIsSignedInActionType,
  setUserNameAC,
  setUserNameActionType,
  setUserProfileAC,
  setUserProfileActonType,
} from "@/actions/actions";
import { api } from "@/api/games-api";
import { AppRootState } from "@/app/storetype";
import { ThunkDispatch } from "redux-thunk";

// thunks
export const fetchGamesThunkCreator =
  () =>
  async (dispatch: ThunkDispatch<AppRootState, unknown, SetGamesActionType>): Promise<void> => {
    const response = await api.getGames();

    dispatch(setGamesAC(response.data));
  };

export const fetchGamesByCategoryThunkCreator =
  (category: string) =>
  async (dispatch: ThunkDispatch<AppRootState, unknown, SetGamesActionType>): Promise<void> => {
    const response = await api.getGamesByCategory(category);
    dispatch(setGamesAC(response.data));
  };

export const fetchGamesByNameThunkCreator =
  (name: string) =>
  async (
    dispatch: ThunkDispatch<AppRootState, unknown, SetFilteredGamesActionType | isFetchingActionType>
  ): Promise<void> => {
    dispatch(isFetchingAC(true));
    const response = await api.getGamesByName(name);
    dispatch(isFetchingAC(false));
    dispatch(setFilteredGamesAC(response.data));
  };

export const fetchGamesByDateThunkCreator =
  () =>
  async (dispatch: ThunkDispatch<AppRootState, unknown, SetGamesActionType>): Promise<void> => {
    const response = await api.getGamesByDate();
    dispatch(setGamesAC(response.data));
  };

export const signInThunkCreator =
  (login: string, password: string) =>
  async (
    dispatch: ThunkDispatch<AppRootState, unknown, setIsSignedInActionType | setUserNameActionType | setErrorActionType>
  ): Promise<void> => {
    const response = await api.signIn(login, password);
    if (response.status === 201) {
      dispatch(setUserNameAC(response.data.name));
      dispatch(setIsSignedInAC(true));
    } else {
      dispatch(setErrorAC(response.data.errorMessage));
      dispatch(setIsSignedInAC(false));
    }
  };

export const signUpThunkCreator =
  (login: string, password: string) =>
  async (
    dispatch: ThunkDispatch<AppRootState, unknown, setIsSignedInActionType | setUserNameActionType | setErrorActionType>
  ): Promise<void> => {
    const response = await api.signUp(login, password);
    if (response.status === 202) {
      dispatch(setUserNameAC(response.data.name));
      dispatch(setIsSignedInAC(true));
    } else {
      dispatch(setErrorAC(response.data.errorMessage));
      dispatch(setIsSignedInAC(false));
    }
  };

export const fetchProfileThunkCreator =
  (loggedInUser: string) =>
  async (dispatch: ThunkDispatch<AppRootState, unknown, setUserProfileActonType>): Promise<void> => {
    const response = await api.getProfile(loggedInUser);
    dispatch(setUserProfileAC(response.data));
  };

export const changePasswordThunkCreator =
  (login: string, newPassword: string) =>
  async (dispatch: ThunkDispatch<AppRootState, unknown, changePasswordActionType | setErrorActionType>) => {
    const response = await api.changePassword(login, newPassword);
    if (response.status === 201) {
      dispatch(changePasswordAC(response.data.message));
    } else {
      dispatch(setErrorAC(response.data.errorMessage));
    }
  };
export const saveProfileThunkCreator =
  (photoPath: string | undefined, login: string, userName: string, email: string, profileDescription: string) =>
  async (
    dispatch: ThunkDispatch<AppRootState, unknown, saveProfileActionType | setErrorActionType | setUserNameActionType>
  ) => {
    const response = await api.saveProfile(photoPath, login, userName, email, profileDescription);
    if (response.status === 201) {
      localStorage.setItem("signInLoginValue", response.data.profile.login);
      dispatch(saveProfileAC(response.data.profile));
      dispatch(setUserNameAC(response.data.profile.login));
    } else {
      dispatch(setErrorAC(response.data.errorMessage));
    }
  };
