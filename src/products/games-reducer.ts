import { ActionsType } from "@/actions/actions";
import { GameType } from "@/types/types";

const initialState: GameType[] = [];

export const gamesReducer = (state = initialState, action: ActionsType): GameType[] => {
  switch (action.type) {
    case "SET-GAMES":
      return action.games.map((g) => ({ ...g }));
    default:
      return state;
  }
};

export default gamesReducer;
