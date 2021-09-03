import { setFilteredGamesAC, SetFilteredGamesActionType, setGamesAC, SetGamesActionType } from "@/actions/actions";
import { api } from "@/api/games-api";
import { AppRootState } from "@/app/storetype";
import { ThunkDispatch } from "redux-thunk";

// thunks
export const fetchGamesThunkCreator =
  () =>
  async (dispatch: ThunkDispatch<AppRootState, unknown, SetGamesActionType>): Promise<void> => {
    const response = await api.getGames();
    // const response = await fetch("/api/home");
    dispatch(setGamesAC(response.data));
  };

export const fetchGamesByCategoryThunkCreator =
  (category: string) =>
  async (dispatch: ThunkDispatch<AppRootState, unknown, SetGamesActionType>): Promise<void> => {
    const response = await api.getGamesByCategory(category);
    dispatch(setGamesAC(response.data));
  };

export const fetchGamesByNameThunkCreator =
  (name: string) => async (dispatch: ThunkDispatch<AppRootState, unknown, SetFilteredGamesActionType>) => {
    const response = await api.getGamesByName(name);
    dispatch(setFilteredGamesAC(response.data));
  };

export const fetchGamesByDateThunkCreator =
  () =>
  async (dispatch: ThunkDispatch<AppRootState, unknown, SetGamesActionType>): Promise<void> => {
    const response = await api.getGamesByDate();
    dispatch(setGamesAC(response.data));
  };
