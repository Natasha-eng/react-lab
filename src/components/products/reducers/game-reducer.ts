import { ActionsType } from "@/actions/actions";
import Types from "@/thunks/actiontTypes";
import { GameType } from "app/interfcaces/interfaces";

const initialState: GameType = {
  id: 0,
  name: "",
  price: 0,
  description: "",
  allowedAge: "",
  data: "",
  img: "",
  category: "",
  genre: "",
};

export const gameReducer = (state = initialState, action: ActionsType): GameType => {
  switch (action.type) {
    case Types.SET_GAME:
      return action.game;
    default:
      return state;
  }
};

export default gameReducer;
