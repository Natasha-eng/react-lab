import * as fs from "fs/promises";
import { IGame, IUser } from "./types/types";

const writeJsonToFile = (filePath: string, data: Array<IUser | IGame>): Promise<unknown> =>
  fs.writeFile(filePath, JSON.stringify(data), "utf-8");

export default writeJsonToFile;
