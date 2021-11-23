import { ActionsType } from "@/actions/actions";
import Types from "@/thunks/actiontTypes";
import { SystemMessagesState } from "app/interfcaces/interfaces";

const initialState: SystemMessagesState = {
  message: "",
  error: "",
};

export const systemMessagesReducer = (state = initialState, action: ActionsType): SystemMessagesState => {
  switch (action.type) {
    case Types.SET_MESSAGE:
      return { ...state, message: action.message };
    case Types.SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default systemMessagesReducer;
