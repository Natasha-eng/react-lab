import express, { NextFunction, Request, Response } from "express";
import readJsonFromFile from "./readJsonFromFile";
import { sortedGames } from "./utils/util";
import { IGame } from "./writeJsonToFile";

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/products", async (req: Request, res: Response) => {
  const games: IGame[] = (await readJsonFromFile("src/data/games.json")) as IGame[];
  if (!games) {
    res.status(500).send("We can't give you games");
  } else {
    res.status(200).send(games);
  }
});

router.post("/products", async (req: Request, res: Response) => {
  const data: string = (await readJsonFromFile("src/data/games.json")) as string;
  const games: IGame[] = JSON.parse(data) as IGame[];
  const { sortCriteria } = req.body;
  const { sortType } = req.body;
  const { selectedAge } = req.body;
  const { selectedGenre } = req.body;

  if (!games) {
    res.status(500).send({ errorMessage: "There are no games with such parameters" });
  } else {
    sortedGames(selectedAge, selectedGenre, sortCriteria, sortType, games, res);
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
  const filteredByCategoryGames = games.filter((g: IGame) => g.category === category);
  if (!games) {
    res.status(500).send("We can't give you games");
  } else {
    res.status(200).send(filteredByCategoryGames);
  }
});

router.post("/products/:category", async (req: Request, res: Response) => {
  const category: string = req.params.category as string;
  const data: string = (await readJsonFromFile("src/data/games.json")) as string;
  const games: IGame[] = JSON.parse(data) as IGame[];

  const { sortCriteria } = req.body;
  const { sortType } = req.body;
  const { selectedAge } = req.body;
  const { selectedGenre } = req.body;

  const filteredByCategoryGames = games.filter((g: IGame) => g.category === category);
  if (!games) {
    res.status(500).send("There are no games with such parameters");
  } else {
    sortedGames(selectedAge, selectedGenre, sortCriteria, sortType, filteredByCategoryGames, res);
  }
});

router.get("/home/getTopProducts", async (req: Request, res: Response) => {
  const data: string = (await readJsonFromFile("src/data/games.json")) as string;
  const games: IGame[] = JSON.parse(data) as IGame[];
  const byDate = (a: IGame, b: IGame) => new Date(b.date).valueOf() - new Date(a.date).valueOf();
  const sortGames: IGame[] = games.sort(byDate);
  const firstThreeeGames = sortGames.slice(0, 3);
  if (!games) {
    res.send(500).send("We can't give you games");
  } else {
    res.status(200).send(firstThreeeGames);
  }
});

export default router;
