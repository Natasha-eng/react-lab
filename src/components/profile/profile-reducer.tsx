import { ActionsType } from "@/actions/actions";
import { IProfile, UserProfileType } from "@/types/types";

const SET_USER_NAME = "SET-USER-NAME";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const CHANGE_PASSWORD = "CHANGE-PASSWORD";
const SAVE_PROFILE = "SAVE-PROFILE";

const initialState: IProfile = {
  userName: "",
  changeDataMessage: "",
  profile: {} as UserProfileType,
};

export const profileReducer = (state = initialState, action: ActionsType): IProfile => {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, userName: action.userName };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case CHANGE_PASSWORD:
      return { ...state, changeDataMessage: action.message };

    case SAVE_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          email: action.profile.email,
          login: action.profile.userName,
          profileDescription: action.profile.profileDescription,
        },
      };

    default:
      return state;
  }
};

export default profileReducer;
