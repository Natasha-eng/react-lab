import { Response } from "express";
import readJsonFromFile from "./readJsonFromFile";

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

const gamesController = async (req: Request, res: Response) => {
  switch (req.method) {
    case GET: {
      await readJsonFromFile("data/games.json");
      break;
    }
    default:
  }
};

const getGames = () => readJsonFromFile("data/games.json");

exports.gamesController = gamesController;
