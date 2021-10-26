export interface IProfileData {
  userName: string;
  email: string;
  profileDescription: string;
}

export interface IGame {
  id: number;
  name: string;
  price: number;
  date: string;
  img: string;
  category: string;
  allowedAge: string;
  genre: string;
  description: string;
  amount: number;
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

export interface IUser {
  id: number;
  isAdmin: boolean;
  login: string;
  email: string;
  profileDescription: string;
  password: string;
  cart: ICart[];
  balance: number;
  photo: string;
}
