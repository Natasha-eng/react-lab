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
