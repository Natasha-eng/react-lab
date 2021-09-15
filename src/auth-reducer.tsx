import { ActionsType } from "@/actions/actions";
import { AuthInitialState } from "@/types/types";

const IS_SIGNED_IN = "IS-SIGNED-IN";
const SET_ERROR = "SET-ERROR";

const initialState: AuthInitialState = {
  isSignedIn: false,
  isSignedUp: false,
  error: "",
};

export const authReducer = (state = initialState, action: ActionsType): AuthInitialState => {
  switch (action.type) {
    case IS_SIGNED_IN:
      return { ...state, isSignedIn: action.isSignedIn };
    case SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default authReducer;
