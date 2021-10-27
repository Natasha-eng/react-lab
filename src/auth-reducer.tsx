import { ActionsType } from "@/actions/actions";
import { AuthInitialState } from "@/types/types";
import Types from "./thunks/actiontTypes";

const initialState: AuthInitialState = {
  isSignedIn: false,
  isSignedUp: false,
};

export const authReducer = (state = initialState, action: ActionsType): AuthInitialState => {
  switch (action.type) {
    case Types.IS_SIGNED_IN:
      return { ...state, isSignedIn: action.isSignedIn };

    default:
      return state;
  }
};

export default authReducer;
