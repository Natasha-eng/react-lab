import { ActionsType } from "@/actions/actions";
import { AuthInitialState } from "@/types/types";
import { Types } from "./constants/constants";

const initialState: AuthInitialState = {
  isSignedIn: false,
  isSignedUp: false,
  error: "",
};

export const authReducer = (state = initialState, action: ActionsType): AuthInitialState => {
  switch (action.type) {
    case Types.IS_SIGNED_IN:
      return { ...state, isSignedIn: action.isSignedIn };
    case Types.SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default authReducer;
