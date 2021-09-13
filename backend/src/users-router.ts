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
  const validLogin = isLoginValide(req.body.login);
  const validPassport = isPasswordValide(req.body.password);
  if (validLogin === null || validPassport === null) {
    res.send({ status: 500, errorMEssage: "Login or Passport is Invalid" });
  }
  const data: string = (await readJsonFromFile("src/data/users.json")) as string;
  const users: Array<IUser> = JSON.parse(data) as Array<IUser>;
  const user = users.find((u) => u.login === req.body.login && u.password === req.body.password);
  if (!user) {
    res.send({ status: 500, errorMessage: "Such user doesn't exist" });
  } else {
    res.send({ status: 201, name: user.login });
  }
});

router.post("/auth/signUp", async (req: Request, res: Response) => {
  const validLogin = isLoginValide(req.body.login);
  const validPassport = isPasswordValide(req.body.password);
  if (validLogin === null || validPassport === null) {
    res.send({ status: 500, errorMEssage: "Login or Passport is Invalid" });
  }
  const data: string = (await readJsonFromFile("src/data/users.json")) as string;
  const users: Array<IUser> = JSON.parse(data) as Array<IUser>;
  const user = users.find((u) => u.login === req.body.login);
  if (!user) {
    users.push({ id: 11, login: req.body.login, password: req.body.password });
    await writeJsonToFile("./data/users.json", users);
    res.send({ status: 202 });
  } else {
    res.send({ status: 400, errorMessage: "This name is already in use" });
  }
});

router.get("/profile", (req: Request, res: Response) => {
  res.send({ message: "User Profile" });
});

export default router;