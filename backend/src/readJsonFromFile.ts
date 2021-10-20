import * as fs from "fs/promises";

const readJsonFromFile = (filePath: string): Promise<unknown> => fs.readFile(filePath, "utf8");

export default readJsonFromFile;
