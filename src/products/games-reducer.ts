import { ActionsType } from "@/actions/actions";
import Types from "@/thunks/actiontTypes";
import { GameType } from "@/types/types";

const initialState: GameType[] = [];

export const gamesReducer = (state = initialState, action: ActionsType): GameType[] => {
  switch (action.type) {
    case Types.SET_GAMES:
      return action.games.map((g: GameType) => ({ ...g }));

    case Types.UPDATE_GAME:
      return state.map((g: GameType) => (g.id === action.game.id ? { ...g } : g));

    default:
      return state;
  }
};

export default gamesReducer;
