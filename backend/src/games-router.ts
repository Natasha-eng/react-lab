import express, { NextFunction, Request, Response } from "express";
import readJsonFromFile from "./readJsonFromFile";
import { ICart, IGame, IUser } from "./types/types";
import { sortedGames } from "./utils/util";
import writeJsonToFile from "./writeJsonToFile";

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/products", async (req: Request, res: Response) => {
  const games: IGame[] = (await readJsonFromFile("src/data/games.json")) as IGame[];
  if (!games) {
    res.status(500).send("Error occured. Try later.");
  } else {
    res.status(200).send(games);
  }
});

router.post("/products", async (req: Request, res: Response) => {
  const data: string = (await readJsonFromFile("src/data/games.json")) as string;
  const games: IGame[] = JSON.parse(data) as IGame[];
  if (!games) {
    res.status(500).send({ errorMessage: "There are no games with such parameters" });
  } else {
    const { sortCriteria } = req.body;
    const { sortType } = req.body;
    const { selectedAge } = req.body;
    const { selectedGenre } = req.body;
    sortedGames(selectedAge, selectedGenre, sortCriteria, sortType, games, res);
  }
});

router.get("/home/search", async (req: Request, res: Response) => {
  const data: string = (await readJsonFromFile("src/data/games.json")) as string;
  const games: IGame[] = JSON.parse(data) as IGame[];
  const name: string = req.query.name as string;

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

  if (!games) {
    res.status(500).send("No games with such category.");
  } else {
    const filteredByCategoryGames = games.filter((g: IGame) => g.category === category);
    res.status(200).send(filteredByCategoryGames);
  }
});

router.get("/game/:id", async (req: Request, res: Response) => {
  const gameId: number = +req.params.id as number;
  const data: string = (await readJsonFromFile("src/data/games.json")) as string;
  const games: IGame[] = JSON.parse(data) as IGame[];

  if (!games) {
    res.status(500).send("Some error occured.");
  } else {
    const fetchedGame = games.find((g: IGame) => g.id === gameId);
    res.status(200).send(fetchedGame);
  }
});

router.post("/products/:category", async (req: Request, res: Response) => {
  const category: string = req.params.category as string;
  const data: string = (await readJsonFromFile("src/data/games.json")) as string;
  const games: IGame[] = JSON.parse(data) as IGame[];

  if (!games) {
    res.status(500).send("There are no games with such parameters");
  } else {
    const { sortCriteria } = req.body;
    const { sortType } = req.body;
    const { selectedAge } = req.body;
    const { selectedGenre } = req.body;

    const filteredByCategoryGames = games.filter((g: IGame) => g.category === category);
    sortedGames(selectedAge, selectedGenre, sortCriteria, sortType, filteredByCategoryGames, res);
  }
});

router.get("/home/getTopProducts", async (req: Request, res: Response) => {
  const data: string = (await readJsonFromFile("src/data/games.json")) as string;
  const games: IGame[] = JSON.parse(data) as IGame[];

  if (!games) {
    res.send(500).send("Some error occured.Try later.");
  } else {
    const byDate = (a: IGame, b: IGame) => new Date(b.date).valueOf() - new Date(a.date).valueOf();
    const sortGames: IGame[] = games.sort(byDate);
    const firstThreeGames = sortGames.slice(0, 3);
    res.status(200).send(firstThreeGames);
  }
});

router.post("/addGame", async (req: Request, res: Response) => {
  const data: string = (await readJsonFromFile("src/data/games.json")) as string;
  const userData: string = (await readJsonFromFile("src/data/users.json")) as string;
  const games: IGame[] = JSON.parse(data) as IGame[];
  const users: IUser[] = JSON.parse(userData) as IUser[];
  const { userName } = req.body;
  const user: IUser = users.find((u) => u.login === userName) as IUser;
  const gameId: number = req.body.id;
  const cartGame = user.cart.find((c) => c.id === gameId);
  const game = games.find((g: IGame) => g.id === gameId);
  if (!game) {
    res.status(500).send("Some error occured.Try later.");
  }
  if (cartGame) {
    cartGame.amount = ++cartGame.amount;
    await writeJsonToFile("./src/data/users.json", users);
    const updatedCart = user.cart;
    res.status(200).send({ updatedCart });
  } else if (game) {
    const cart: ICart = {
      id: game.id,
      name: game.name,
      category: game.category,
      amount: 1,
      orderDate: new Date().toLocaleDateString(),
      price: game.price,
      checked: false,
    };
    user.cart.push(cart);
    const updatedCart = user.cart;
    await writeJsonToFile("./src/data/users.json", users);
    res.status(200).send({ updatedCart });
  }
});

router.get("/fetchCart", async (req: Request, res: Response) => {
  const userData: string = (await readJsonFromFile("src/data/users.json")) as string;
  const users: IUser[] = JSON.parse(userData) as IUser[];
  const userName: string = req.query.userName as string;
  const user: IUser = users.find((u) => u.login === userName) as IUser;
  const updatedCart = user.cart;
  if (updatedCart === []) {
    res.status(201).send({ answere: "Your cart is empty." });
  } else {
    res.status(200).send({ updatedCart, balance: user.balance });
  }
});

router.post("/updateCart", async (req: Request, res: Response) => {
  const userData: string = (await readJsonFromFile("src/data/users.json")) as string;
  const users: IUser[] = JSON.parse(userData) as IUser[];
  const newCarts: ICart[] = req.body.updatedCarts as ICart[];
  const userName: string = req.body.userName as string;
  const user: IUser = users.find((u) => u.login === userName) as IUser;
  const { cart } = user;
  if (cart === []) {
    res.status(201).send({ answere: "Your cart is empty." });
  } else {
    user.cart = newCarts;
    await writeJsonToFile("./src/data/users.json", users);
    res.status(200).send();
  }
});

router.post("/updateGame", async (req: Request, res: Response) => {
  const newGame: IGame = req.body.updatedGame as IGame;

  if (!newGame) {
    res.status(500).send({ errorMessage: "This game can't be updated.Try later." });
  } else {
    const data: string = (await readJsonFromFile("src/data/games.json")) as string;
    const games: IGame[] = JSON.parse(data) as IGame[];
    const updatedGames = games.map((g) => (g.id === newGame.id ? { ...newGame, date: g.date } : g));
    await writeJsonToFile("./src/data/games.json", updatedGames);
    res.status(200).send({ updatedGames });
  }
});

router.post("/createGame", async (req: Request, res: Response) => {
  const newGame: IGame = req.body.newGame as IGame;

  if (!newGame) {
    res.status(500).send({ errorMessage: "New game is not created. Try later." });
  } else {
    const data: string = (await readJsonFromFile("src/data/games.json")) as string;
    const games: IGame[] = JSON.parse(data) as IGame[];
    const lastGameId = games[games.length - 1].id;
    const createdGame = {
      id: lastGameId + 1,
      name: newGame.name,
      price: newGame.price,
      date: new Date().toLocaleDateString(),
      img: newGame.img,
      category: newGame.category,
      allowedAge: newGame.allowedAge,
      genre: newGame.genre,
      description: newGame.description,
      amount: 1,
    };
    games.push(createdGame);
    await writeJsonToFile("./src/data/games.json", games);
    res.status(200).send({ games });
  }
});

router.delete("/deleteGame", async (req: Request, res: Response) => {
  const { gameId } = req.query;

  if (!gameId) {
    res.status(500).send({ errorMessage: "This game can't be deleted.Try later." });
  } else {
    const data: string = (await readJsonFromFile("src/data/games.json")) as string;
    const games: IGame[] = JSON.parse(data) as IGame[];
    const updatedGames = games.filter((g) => g.id !== +gameId);

    await writeJsonToFile("./src/data/games.json", updatedGames);
    res.status(200).send({ updatedGames });
  }
});

export default router;
