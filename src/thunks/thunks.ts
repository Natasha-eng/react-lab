import {
  isFetchingAC,
  isFetchingActionType,
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
