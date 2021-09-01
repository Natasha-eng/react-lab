// import api from "@/api/api";
// import { AppRootState } from "@/app/storetype";

// import { GameType } from "@/types/types";
// import { ThunkDispatch } from "redux-thunk";

// // types

// // actions
// const setGamesAC = (games: Array<GameType>) => ({ type: "SET-GAMES", games } as const);
// export type SetGamesActionType = ReturnType<typeof setGamesAC>;
// type ActionsType = SetGamesActionType;

// // thunks
// export const fetchGamesThunkCreator =
//   () =>
//   async (dispatch: ThunkDispatch<AppRootState, unknown, SetGamesActionType>): Promise<void> => {
//     const response = await api.getGames();
//     // const response = await fetch("/api/home");
//     dispatch(setGamesAC(response.data));
//   };

// export const fetchGamesByCategoryThunkCreator =
//   (category: string) =>
//   async (dispatch: ThunkDispatch<AppRootState, unknown, SetGamesActionType>): Promise<void> => {
//     const response = await api.getGamesByCategory(category);
//     dispatch(setGamesAC(response.data));
//   };

// const initialState: GameType[] = [];

// const gamesReducer = (state = initialState, action: ActionsType): GameType[] => {
//   switch (action.type) {
//     case "SET-GAMES":
//       return action.games.map((g) => ({ ...g }));
//     default:
//       return state;
//   }
// };

// export default gamesReducer;
