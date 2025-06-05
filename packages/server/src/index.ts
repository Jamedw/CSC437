// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Posters from "./services/poster-svc";
import Movies from "./services/movie-svc";
import users from "./routes/users"
import auth, { authenticateUser } from "./routes/auth";
import fs from "node:fs/promises";
import path from "path";

connect("movie_royal"); // use your own db name here

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

console.log("Serving static files from ", staticDir);
app.use(express.static(staticDir));

app.use("/api/users", authenticateUser, users);
app.use("/auth", auth);

// Page Routes:
app.get("/ping", (_: Request, res: Response) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});

app.get("/poster/:title", authenticateUser, (req: Request, res: Response) => {
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

// SPA Routes: /app/...
app.use("/app", (_: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});