import { ActionsType } from "@/actions/actions";
import { Types } from "@/constants/constants";
import { ICart } from "@/types/types";

const initialState: ICart[] = [];

export const cartReducer = (state = initialState, action: ActionsType): ICart[] => {
  switch (action.type) {
    case Types.SET_CARTS:
      return action.updatedCart;

    case Types.CHANGE_GAME_STATUS:
      return state.map((cartGame) =>
        cartGame.id === action.checkedGameId ? { ...cartGame, checked: action.checked } : cartGame
      );

    case Types.CHANGE_GAME_AMOUNT:
      return state.map((cartGame) =>
        cartGame.name === action.name ? { ...cartGame, amount: action.amount } : cartGame
      );

    case Types.CLEAR_CART:
      return initialState;

    case Types.REMOVE_GAME:
      return state.filter((g) => !g.checked);

    default:
      return state;
  }
};

export default cartReducer;
