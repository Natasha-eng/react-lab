import { ActionsType } from "@/actions/actions";
import Types from "@/thunks/actiontTypes";
import { GameType } from "app/interfcaces/interfaces";

interface IInitialGames {
  games: GameType[];
  isFetching: boolean;
}

const initialState: IInitialGames = {
  games: [],
  isFetching: false,
};

export const filteredGamesReducer = (state = initialState, action: ActionsType): IInitialGames => {
  switch (action.type) {
    case Types.SET_FILTERED_GAMES:
      return { ...state, games: action.filteredGames.map((g: GameType) => ({ ...g })) };
    case Types.CLEAR_GAMES:
      return initialState;
    case Types.IS_FETCHING_GAMES:
      return { ...state, isFetching: action.isFetching };

    default:
      return state;
  }
};

export default filteredGamesReducer;
