import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import games from "./games-router";
import users from "./users-router";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/", games);
app.use("/", users);

app.listen(5000, () => console.log("Server running "));
