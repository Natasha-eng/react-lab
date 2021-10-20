import { ActionsType } from "@/actions/actions";
import { Types } from "@/constants/constants";
import { IProfile, UserProfileType } from "@/types/types";

const initialState: IProfile = {
  userName: "",
  changeDataMessage: "",
  profile: {} as UserProfileType,
};

export const profileReducer = (state = initialState, action: ActionsType): IProfile => {
  switch (action.type) {
    case Types.SET_USER_NAME:
      return { ...state, userName: action.userName };

    case Types.SET_TOTAL_GAME_COST:
      return { ...state, profile: { ...state.profile, totalGameCost: action.total } };

    case Types.SET_USER_BALANCE:
      return { ...state, profile: { ...state.profile, balance: action.balance } };

    case Types.SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case Types.CHANGE_PASSWORD:
      return { ...state, changeDataMessage: action.message };

    case Types.SAVE_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          photo: action.profile.photo,
          email: action.profile.email,
          login: action.profile.login,
          profileDescription: action.profile.profileDescription,
        },
      };

    default:
      return state;
  }
};

export default profileReducer;
