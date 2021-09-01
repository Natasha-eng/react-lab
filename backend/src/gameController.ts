import readJsonFromFile from "./readJsonFromFile";

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

const gamesController = async (req, res) => {
  switch (req.method) {
    case GET: {
      await readJsonFromFile("data/games.json");
      // await fs.readFile("data/games.json", (error, data) => {
      //   console.log("Async reading of file");
      //   if (error) {
      //     console.log(error); // if error occured
      //   } else {
      //     res.send(JSON.parse(data, toString));
      //     console.log(data); // show data
      //   }
      // });
      break;
    }
    default:
  }
};

const getGames = () => readJsonFromFile("data/games.json");

exports.gamesController = gamesController;
