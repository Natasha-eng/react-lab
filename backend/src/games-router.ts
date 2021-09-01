import express, { NextFunction, Request, Response } from "express";
import readJsonFromFile from "./readJsonFromFile";
import { IGame } from "./writeJsonToFile";

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/home", async (req: Request, res: Response) => {
  const games = await readJsonFromFile("src/data/games.json");
  if (!games) {
    res.send(404);
  } else {
    res.send(games);
  }
});

router.get("products/:category", async (req: Request, res: Response) => {
  const category: string = req.params.category as string;
  const data: string = (await readJsonFromFile("src/data/games.json")) as string;
  const games: IGame[] = JSON.parse(data) as IGame[];
  const filteredGames = games.filter((g: IGame) => g.category === category);
  if (!games) {
    res.send(500);
  } else {
    res.send(filteredGames);
  }
});

export default router;
