import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import games from "./games-router";
import users from "./users-router";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  compression({
    level: 6,
    threshold: 0,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);
app.use("/", games);
app.use("/", users);

app.get("/", (req, res) => {
  res.send("App is running.");
});

app.listen(5000, () => console.log("Server running "));
