import { GameType } from "@/types/types";

// actions
export const setGamesAC = (games: Array<GameType>) => ({ type: "SET-GAMES", games } as const);
export type SetGamesActionType = ReturnType<typeof setGamesAC>;

export const setFilteredGamesAC = (filteredGames: Array<GameType>) =>
  ({ type: "SET-FILTERED-GAMES", filteredGames } as const);
export type SetFilteredGamesActionType = ReturnType<typeof setFilteredGamesAC>;

export const clearGamesAC = () => ({ type: "CLEAR-GAMES" } as const);
export type clearGamesActionType = ReturnType<typeof clearGamesAC>;

export const isFetchingAC = (isFetching: boolean) => ({ type: "IS-FETCHING-GAMES", isFetching } as const);
export type isFetchingActionType = ReturnType<typeof isFetchingAC>;

export const setIsSignedInAC = (isSignedIn: boolean) => ({ type: "IS-SIGNED-IN", isSignedIn } as const);
export type setIsSignedInActionType = ReturnType<typeof setIsSignedInAC>;

export const setUserNameAC = (userName: string) => ({ type: "SET-USER-NAME", userName } as const);
export type setUserNameActionType = ReturnType<typeof setUserNameAC>;

export const setUserProfileAC = (profile: string) => ({ type: "SET-USER-PROFILE", profile } as const);
export type setUserProfileActonType = ReturnType<typeof setUserProfileAC>;

export const setErrorAC = (error: string) => ({ type: "SET-ERROR", error } as const);
export type setErrorActionType = ReturnType<typeof setErrorAC>;

// saga action
export const signInSagaAC = (login: string, password: string) =>
  ({ type: "SIGN-IN", payload: { login, password } } as const);
export type signInSagaActionType = ReturnType<typeof signInSagaAC>;

export type ActionsType =
  | SetGamesActionType
  | SetFilteredGamesActionType
  | clearGamesActionType
  | isFetchingActionType
  | setIsSignedInActionType
  | setUserNameActionType
  | setUserProfileActonType
  | setErrorActionType;
