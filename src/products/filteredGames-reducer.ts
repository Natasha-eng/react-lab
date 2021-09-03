import { ActionsType } from "@/actions/actions";
import { GameType } from "@/types/types";

const initialState: GameType[] = [];

export const filteredGamesReducer = (state = initialState, action: ActionsType): GameType[] => {
  switch (action.type) {
    case "SET-FILTERED-GAMES":
      return action.filteredGames.map((g) => ({ ...g }));
    case "CLEAR-GAMES":
      return initialState;
    default:
      return state;
  }
};

export default filteredGamesReducer;
