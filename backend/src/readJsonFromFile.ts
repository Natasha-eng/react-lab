import * as fs from "fs/promises";

export interface IUser {
  id: number;
  login: string;
  email: string;
  profileDescription: string;
  password: string;
  photo: string;
}

const readJsonFromFile = (filePath: string): Promise<unknown> => fs.readFile(filePath, "utf8");

export default readJsonFromFile;
