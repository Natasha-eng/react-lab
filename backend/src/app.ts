import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import games from "./games-router";
import users from "./users-router";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", games);
app.use("/", users);

// https.createServer(
//   {
//     key: fs.readFileSync("server.key"),
//     cert: fs.readFileSync("server.cert"),
//   },
//   app
// );

app.listen(5000, () => console.log("Server running "));
