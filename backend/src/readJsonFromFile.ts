import * as fs from "fs/promises";
import util = require("util");

const readJsonFromFile = (filePath: string): Promise<unknown> => fs.readFile(filePath, "utf8");

// fs.readFile(filePath, "utf8");

// fs.readFile(filePath, "utf8", (error: any, data: IGame[]) => {
//   console.log("Async reading of file");
//   if (error) {
//     reject(error); // if error occured
//   } else {
//     resolve(JSON.parse(data.toString()));
//     console.log(data); // show data
//   }
// });

export default readJsonFromFile;
