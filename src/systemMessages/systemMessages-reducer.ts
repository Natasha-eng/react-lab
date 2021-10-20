import { ActionsType } from "@/actions/actions";
import Types from "@/thunks/actiontTypes";
import { SystemMessagesState } from "@/types/types";

const initialState: SystemMessagesState = {
  message: "",
};

export const systemMessagesReducer = (state = initialState, action: ActionsType): SystemMessagesState => {
  switch (action.type) {
    case Types.SET_MESSAGE:
      return { ...state, message: action.message };
    default:
      return state;
  }
};

export default systemMessagesReducer;
