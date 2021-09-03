import { GameType } from "@/types/types";

// actions
export const setGamesAC = (games: Array<GameType>) => ({ type: "SET-GAMES", games } as const);
export type SetGamesActionType = ReturnType<typeof setGamesAC>;
export const setFilteredGamesAC = (filteredGames: Array<GameType>) =>
  ({ type: "SET-FILTERED-GAMES", filteredGames } as const);
export type SetFilteredGamesActionType = ReturnType<typeof setFilteredGamesAC>;
export const clearGamesAC = () => ({ type: "CLEAR-GAMES" } as const);
export type clearGamesActionType = ReturnType<typeof clearGamesAC>;
export type ActionsType = SetGamesActionType | SetFilteredGamesActionType | clearGamesActionType;
