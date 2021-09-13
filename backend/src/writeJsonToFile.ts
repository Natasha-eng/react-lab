import * as fs from "fs/promises";
import { IUser } from "./readJsonFromFile";

export interface IGame {
  id: number;
  name: string;
  price: number;
  date: string;
  img: string;
  category: string;
}

const writeJsonToFile = (filePath: string, data: Array<IUser>): Promise<unknown> =>
  fs.writeFile(filePath, JSON.stringify(data), "utf-8");

// const writeJsonToFile = (filePath: string, data) =>
//   new Promise((resolve, reject) => {
//     fs.writeFile(filePath, JSON.stringify(data), (error) => {
//       console.log("Async writing of file");
//       if (error) {
//         reject(error); // if error occured
//       } else {
//         console.log("succesfully written to file"); // show data
//         resolve("Succesfully written ia a file");
//       }
//     });
//   });

export default writeJsonToFile;
