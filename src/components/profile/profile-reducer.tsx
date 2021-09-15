import { ActionsType } from "@/actions/actions";

const SET_USER_NAME = "SET-USER-NAME";
const SET_USER_PROFILE = "SET-USER-PROFILE";

interface IProfile {
  userName: string;
  profile: string;
}

const initialState: IProfile = {
  userName: "",
  profile: "",
};

export const profileReducer = (state = initialState, action: ActionsType): IProfile => {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, userName: action.userName };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };

    default:
      return state;
  }
};

export default profileReducer;
