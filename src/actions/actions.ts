import { Types } from "@/constants/constants";
import { GameType, IProfileData, UserProfileType } from "@/types/types";

// actions
export const setGamesAC = (games: Array<GameType>) => ({ type: Types.SET_GAMES, games } as const);
export type SetGamesActionType = ReturnType<typeof setGamesAC>;

export const setFilteredGamesAC = (filteredGames: Array<GameType>) =>
  ({ type: Types.SET_FILTERED_GAMES, filteredGames } as const);
export type SetFilteredGamesActionType = ReturnType<typeof setFilteredGamesAC>;

export const clearGamesAC = () => ({ type: Types.CLEAR_GAMES } as const);
export type clearGamesActionType = ReturnType<typeof clearGamesAC>;

export const isFetchingAC = (isFetching: boolean) => ({ type: Types.IS_FETCHING_GAMES, isFetching } as const);
export type isFetchingActionType = ReturnType<typeof isFetchingAC>;

export const setIsSignedInAC = (isSignedIn: boolean) => ({ type: Types.IS_SIGNED_IN, isSignedIn } as const);
export type setIsSignedInActionType = ReturnType<typeof setIsSignedInAC>;

export const setUserNameAC = (userName: string) => ({ type: Types.SET_USER_NAME, userName } as const);
export type setUserNameActionType = ReturnType<typeof setUserNameAC>;

export const setUserProfileAC = (profile: UserProfileType) => ({ type: Types.SET_USER_PROFILE, profile } as const);
export type setUserProfileActonType = ReturnType<typeof setUserProfileAC>;

export const setErrorAC = (error: string) => ({ type: Types.SET_ERROR, error } as const);
export type setErrorActionType = ReturnType<typeof setErrorAC>;

export const changePasswordAC = (message: string) => ({ type: Types.CHANGE_PASSWORD, message } as const);
export type changePasswordActionType = ReturnType<typeof changePasswordAC>;

export const saveProfileAC = (profile: IProfileData) => ({ type: Types.SAVE_PROFILE, profile } as const);
export type saveProfileActionType = ReturnType<typeof saveProfileAC>;

export const addGameAC = (gameData: { game: GameType; orderDate: string }) =>
  ({ type: Types.ADD_GAME, gameData } as const);
export type addGameActionType = ReturnType<typeof addGameAC>;

export const removeGameAC = (checked: boolean) => ({ type: Types.REMOVE_GAME, checked } as const);
export type removeGameActionType = ReturnType<typeof removeGameAC>;

export const changeGameStatusAC = (name: string, checked: boolean) =>
  ({ type: Types.CHANGE_GAME_STATUS, name, checked } as const);
export type changeGameStatusActionType = ReturnType<typeof changeGameStatusAC>;

export const changeGameAmountAC = (name: string, amount: string) =>
  ({ type: Types.CHANGE_GAME_AMOUNT, name, amount } as const);
export type changeGameAmountActionType = ReturnType<typeof changeGameAmountAC>;

export const changeGamePriceAC = (name: string, price: string) =>
  ({ type: Types.CHANGE_GAME_PRICE, name, price } as const);
export type changeGamepPriceActionType = ReturnType<typeof changeGamePriceAC>;

// saga action
export const signInSagaAC = (login: string, password: string) =>
  ({ type: Types.SIGN_IN, payload: { login, password } } as const);
export type signInSagaActionType = ReturnType<typeof signInSagaAC>;

export type ActionsType =
  | SetGamesActionType
  | SetFilteredGamesActionType
  | clearGamesActionType
  | isFetchingActionType
  | setIsSignedInActionType
  | setUserNameActionType
  | setUserProfileActonType
  | setErrorActionType
  | changePasswordActionType
  | saveProfileActionType
  | addGameActionType
  | removeGameActionType;
