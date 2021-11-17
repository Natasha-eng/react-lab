import { GameType, ICart, IProfileData, UserProfileType } from "app/types/types";
import Types from "../thunks/actiontTypes";

// actions
export const setGamesAC = (games: Array<GameType>) => ({ type: Types.SET_GAMES, games } as const);
export type SetGamesActionType = ReturnType<typeof setGamesAC>;

export const setGameAC = (game: GameType) => ({ type: Types.SET_GAME, game } as const);
export type SetGameActionType = ReturnType<typeof setGameAC>;

export const updateGameAC = (game: GameType) => ({ type: Types.UPDATE_GAME, game } as const);
export type updateGameACActionType = ReturnType<typeof updateGameAC>;

export const setFilteredGamesAC = (filteredGames: Array<GameType>) =>
  ({ type: Types.SET_FILTERED_GAMES, filteredGames } as const);
export type SetFilteredGamesActionType = ReturnType<typeof setFilteredGamesAC>;

export const clearGamesAC = () => ({ type: Types.CLEAR_GAMES } as const);
export type clearGamesActionType = ReturnType<typeof clearGamesAC>;

export const clearCartAC = () => ({ type: Types.CLEAR_CART } as const);
export type clearCartActionType = ReturnType<typeof clearCartAC>;

export const isFetchingAC = (isFetching: boolean) => ({ type: Types.IS_FETCHING_GAMES, isFetching } as const);
export type isFetchingActionType = ReturnType<typeof isFetchingAC>;

export const setIsSignedInAC = (isSignedIn: boolean) => ({ type: Types.IS_SIGNED_IN, isSignedIn } as const);
export type setIsSignedInActionType = ReturnType<typeof setIsSignedInAC>;

export const setUserNameAC = (userName: string) => ({ type: Types.SET_USER_NAME, userName } as const);
export type setUserNameActionType = ReturnType<typeof setUserNameAC>;

export const setUserBalanceAC = (balance: number) => ({ type: Types.SET_USER_BALANCE, balance } as const);
export type setUserBalanceActionType = ReturnType<typeof setUserBalanceAC>;

export const setUserStatusAC = (isAdmin: boolean) => ({ type: Types.SET_USER_STATUS, isAdmin } as const);
export type setUserStatusActionType = ReturnType<typeof setUserStatusAC>;

export const setTotalGameCostAC = (total: number) => ({ type: Types.SET_TOTAL_GAME_COST, total } as const);
export type setTotalGameCostActionType = ReturnType<typeof setTotalGameCostAC>;

export const setUserProfileAC = (profile: UserProfileType) => ({ type: Types.SET_USER_PROFILE, profile } as const);
export type setUserProfileActonType = ReturnType<typeof setUserProfileAC>;

export const setErrorAC = (error: string) => ({ type: Types.SET_ERROR, error } as const);
export type setErrorActionType = ReturnType<typeof setErrorAC>;

export const setMessageAC = (message: string) => ({ type: Types.SET_MESSAGE, message } as const);
export type setMessageActionType = ReturnType<typeof setMessageAC>;

export const changePasswordAC = (message: string) => ({ type: Types.CHANGE_PASSWORD, message } as const);
export type changePasswordActionType = ReturnType<typeof changePasswordAC>;

export const saveProfileAC = (profile: IProfileData) => ({ type: Types.SAVE_PROFILE, profile } as const);
export type saveProfileActionType = ReturnType<typeof saveProfileAC>;

export const setCartsAC = (updatedCart: ICart[]) => ({ type: Types.SET_CARTS, updatedCart } as const);
export type setCartsActionType = ReturnType<typeof setCartsAC>;

export const removeGameAC = () => ({ type: Types.REMOVE_GAME } as const);
export type removeGameActionType = ReturnType<typeof removeGameAC>;

export const changeGameStatusAC = (checkedGameId: number, checked: boolean) =>
  ({ type: Types.CHANGE_GAME_STATUS, checkedGameId, checked } as const);
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
  | SetGameActionType
  | SetFilteredGamesActionType
  | clearGamesActionType
  | isFetchingActionType
  | setIsSignedInActionType
  | setUserNameActionType
  | setUserBalanceActionType
  | setUserProfileActonType
  | setErrorActionType
  | setMessageActionType
  | changePasswordActionType
  | saveProfileActionType
  | setCartsActionType
  | setUserStatusActionType
  | removeGameActionType;
