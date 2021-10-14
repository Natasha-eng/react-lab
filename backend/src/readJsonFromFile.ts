import * as fs from "fs/promises";

export interface ICart {
  gameId: number;
  count: number | null;
  orderDate: string;
  price: number;
}

export interface IUser {
  id: number;
  login: string;
  email: string;
  profileDescription: string;
  password: string;
  cart: ICart[];
  photo: string;
}

const readJsonFromFile = (filePath: string): Promise<unknown> => fs.readFile(filePath, "utf8");

export default readJsonFromFile;
