// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Posters from "./services/poster-svc";
import Movies from "./services/movie-svc";


connect("movie_royal"); // use your own db name here

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";



app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/poster/:title", (req: Request, res: Response) => {
  let { title } = req.params;
  Posters.get(title).then((data) => {
    if (data) res
      .set("Content-Type", "application/json")
      .send(JSON.stringify(data));
    else res
      .status(404).send();
  });
});


app.get("/movie/:title", (req: Request, res: Response) => {
  let { title } = req.params;
  Movies.get(title).then((data) => {
    if (data) res
      .set("Content-Type", "application/json")
      .send(JSON.stringify(data));
    else res
      .status(404).send();
  });
});