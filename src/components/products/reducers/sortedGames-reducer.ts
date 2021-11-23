import { ActionsType } from "@/actions/actions";
import Types from "@/thunks/actiontTypes";
import { GameType } from "app/interfcaces/interfaces";

const initialState: GameType[] = [];

export const sortedGamesReducer = (state = initialState, action: ActionsType): GameType[] => {
  switch (action.type) {
    case Types.SET_GAMES:
      return action.games.map((g: GameType) => ({ ...g }));

    default:
      return state;
  }
};

export default sortedGamesReducer;
