export interface GameType {
  id: number;
  name: string;
  price: number;
  description: string;
  allowedAge: string;
  data: string;
  img: string;
  category: string;
  genre: string;
}

export interface AuthInitialState {
  isSignedIn: boolean;
  isSignedUp: boolean;
}

export interface SystemMessagesState {
  message: string;
  error: string;
}

export interface ICart {
  id: number;
  name: string;
  category: string;
  amount: number;
  orderDate: string;
  price: number;
  checked: boolean;
}

export interface UserProfileType {
  id: number;
  isAdmin: boolean;
  login: string;
  email: string;
  profileDescription: string;
  password: string;
  cart: ICart[];
  balance: number;
  photo: string;
  totalGameCost: number;
}

export interface IProfile {
  userName: string;
  changeDataMessage: string;
  profile: UserProfileType;
}
export interface IProfileData {
  userName: string;
  email: string;
  profileDescription: string;
}

export interface CartGameType {
  id: number;
  name: string;
  price: number;
  description: string;
  allowedAge: string;
  data: string;
  img: string;
  category: string;
  genre: string;
  checked: boolean;
  orderDate: string;
  amount: string;
}
