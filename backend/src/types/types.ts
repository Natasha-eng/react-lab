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
  login: string;
  email: string;
  profileDescription: string;
  password: string;
  cart: ICart[];
  balance: number;
  photo: string;
}
