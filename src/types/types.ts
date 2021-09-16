export interface GameType {
  id: number;
  name: string;
  price: number;
  description: string;
  allowedAge: string;
  data: string;
  img: string;
  category: string;
}

export interface AuthInitialState {
  isSignedIn: boolean;
  isSignedUp: boolean;
  error: string;
}

export interface UserProfileType {
  id: number;
  login: string;
  email: string;
  profileDescription: string;
  password: string;
}

export interface IProfile {
  userName: string;
  profile: UserProfileType;
}
