import express, { NextFunction, Request, Response } from "express";
import readJsonFromFile, { IUser } from "./readJsonFromFile";
import writeJsonToFile from "./writeJsonToFile";
import { isLoginValide, isPasswordValide } from "./utils/util";

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});

router.post("/auth/signIn", async (req: Request, res: Response) => {
  const isLoginValid = isLoginValide(req.body.login);
  const isPasswordValid = isPasswordValide(req.body.password);
  if (!isLoginValid && !isPasswordValid) {
    res.status(500).send({ errorMEssage: "Login or Passport is Invalid" });
  }
  const data: string = (await readJsonFromFile("src/data/users.json")) as string;
  const users: Array<IUser> = JSON.parse(data) as Array<IUser>;
  const user = users.find((u) => u.login === req.body.login && u.password === req.body.password);
  if (!user) {
    res.status(500).send({ errorMessage: "Such user doesn't exist" });
  } else {
    res.status(201).send({ name: user.login });
  }
});

router.post("/auth/signUp", async (req: Request, res: Response) => {
  const isLoginValid = isLoginValide(req.body.login);
  const isPasswordValid = isPasswordValide(req.body.password);
  if (!isLoginValid && !isPasswordValid) {
    res.status(500).send({ errorMEssage: "Login or Passwort is Invalid" });
  }
  const data: string = (await readJsonFromFile("src/data/users.json")) as string;
  const users: Array<IUser> = JSON.parse(data) as Array<IUser>;
  const user = users.find((u) => u.login === req.body.login);
  if (!user) {
    users.push({
      id: 11,
      login: req.body.login,
      password: req.body.password,
      email: "",
      profileDescription: "Write something about yourself",
    });
    await writeJsonToFile("./src/data/users.json", users);
    res.status(202).send({ name: req.body.login });
  } else {
    res.status(400).send({ errorMessage: "This name is already in use" });
  }
});

router.get("/profile/:loggedInUser", async (req: Request, res: Response) => {
  const loggedInUser: string = req.params.loggedInUser as string;
  const data: string = (await readJsonFromFile("src/data/users.json")) as string;
  const users: IUser[] = JSON.parse(data) as IUser[];
  const profile = users.find((u: IUser) => u.login === loggedInUser);
  if (!profile) {
    res.status(500).send("There is no such user");
  } else {
    res.status(200).send(profile);
  }
});

// router.post("/saveProfile", (req: Request, res: Response) => {
//   const loggedInUser: string = req.params.loggedInUser as string;
//   const data: string = (await readJsonFromFile("src/data/users.json")) as string;
//   const users: IUser[] = JSON.parse(data) as IUser[];
//   const user = users.find((u) => u.login === req.body.login && u.password === req.body.password);

//   if (!user) {
//     res.status(500).send({ errorMessage: "Such user doesn't exist" });
//   } else {
//     res.status(201).send({ name: user.login });
//   }
// }
// });

export default router;
