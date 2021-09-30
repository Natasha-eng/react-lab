import * as fs from "fs/promises";
import { IUser } from "./readJsonFromFile";

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

const writeJsonToFile = (filePath: string, data: Array<IUser>): Promise<unknown> =>
  fs.writeFile(filePath, JSON.stringify(data), "utf-8");

export default writeJsonToFile;
