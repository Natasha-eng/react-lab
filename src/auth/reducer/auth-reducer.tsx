import { ActionsType } from "@/actions/actions";
import { AuthInitialState } from "app/interfcaces/interfaces";
import Types from "app/thunks/actiontTypes";


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
