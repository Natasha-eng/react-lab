import express from "express";
import cors from "cors";
import games from "./games-router";

const app = express();

app.use(cors());
app.use("/", games);

// https.createServer(
//   {
//     key: fs.readFileSync("server.key"),
//     cert: fs.readFileSync("server.cert"),
//   },
//   app
// );

app.listen(5000, () => console.log("Server running "));
