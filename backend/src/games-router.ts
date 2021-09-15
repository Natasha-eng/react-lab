import express, { NextFunction, Request, Response } from "express";
import readJsonFromFile from "./readJsonFromFile";
import { IGame } from "./writeJsonToFile";

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/products", async (req: Request, res: Response) => {
  const games = await readJsonFromFile("src/data/games.json");
  if (!games) {
    res.status(500).send("We can't give you games");
  } else {
    res.status(200).send(games);
  }
});

router.get("/home/search", async (req: Request, res: Response) => {
  const data: string = (await readJsonFromFile("src/data/games.json")) as string;
  const games: IGame[] = JSON.parse(data) as IGame[];
  const name: string = req.query.name as string;

  // const filteredGames = games.filter((g: IGame) => g.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
  const filteredGames = games.filter((g: IGame) => g.name.toLowerCase().includes(name.toLocaleLowerCase()));

  if (!filteredGames) {
    res.status(500).send("There are no games with such category");
  } else {
    res.status(200).send(filteredGames);
  }
});

router.get("/products/:category", async (req: Request, res: Response) => {
  const category: string = req.params.category as string;
  const data: string = (await readJsonFromFile("src/data/games.json")) as string;
  const games: IGame[] = JSON.parse(data) as IGame[];
  const filteredGames = games.filter((g: IGame) => g.category === category);
  if (!games) {
    res.status(500).send("We can't give you games");
  } else {
    res.status(200).send(filteredGames);
  }
});

router.get("/home/getTopProducts", async (req: Request, res: Response) => {
  const data: string = (await readJsonFromFile("src/data/games.json")) as string;
  const games: IGame[] = JSON.parse(data) as IGame[];
  const byDate = (a: IGame, b: IGame) => new Date(b.date).valueOf() - new Date(a.date).valueOf();
  const sortedGames: IGame[] = games.sort(byDate);
  const firstThreeeGames = sortedGames.slice(0, 3);
  if (!games) {
    res.send(500).send("We can't give you games");
  } else {
    res.status(200).send(firstThreeeGames);
  }
});

export default router;
