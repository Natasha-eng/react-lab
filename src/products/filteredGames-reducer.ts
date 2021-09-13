import { ActionsType } from "@/actions/actions";
import { GameType } from "@/types/types";

const SET_FILTERED_GAMES = "SET-FILTERED-GAMES";
const CLEAR_GAMES = "CLEAR-GAMES";
const IS_FETCHING_GAMES = "IS-FETCHING-GAMES";

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
    case SET_FILTERED_GAMES:
      return { ...state, games: action.filteredGames.map((g) => ({ ...g })) };
    case CLEAR_GAMES:
      return initialState;
    case IS_FETCHING_GAMES:
      return { ...state, isFetching: action.isFetching };

    default:
      return state;
  }
};

export default filteredGamesReducer;
