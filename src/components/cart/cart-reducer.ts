import { ActionsType } from "@/actions/actions";
import { Types } from "@/constants/constants";
import { CartGameType } from "@/types/types";

const initialState: CartGameType[] = [];

export const cartReducer = (state = initialState, action: ActionsType): CartGameType[] => {
  switch (action.type) {
    case Types.ADD_GAME:
      return [{ ...action.gameData }, ...state];

    case Types.CHANGE_GAME_STATUS:
      return state.map((cartGame) =>
        cartGame.game.name === action.name ? { ...cartGame, checked: action.checked } : cartGame
      );

    case Types.CHANGE_GAME_AMOUNT:
      return state.map((cartGame) =>
        cartGame.name === action.name ? { ...cartGame, amount: action.amount } : cartGame
      );

    case Types.REMOVE_GAME:
      return state.filter((g: CartGameType) => !g.checked);

    default:
      return state;
  }
};

export default cartReducer;
