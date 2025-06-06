// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Movies from "./services/movie-svc";
import users from "./routes/users"
import movieRoyales from "./routes/movieRoyales"
import auth, { authenticateUser } from "./routes/auth";
import fs from "node:fs/promises";
import path from "path";

connect("movie_royal"); // use your own db name here

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

console.log("Serving static files from ", staticDir);
app.use(express.static(staticDir));

app.use(express.json());
app.use("/api/users", authenticateUser, users);
app.use("/api/movieRoyales", authenticateUser, movieRoyales);

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

app.get("/login", (req: Request, res: Response) => {
  res
    .set("Content-Type", "text/html")
    .send(renderPage(LoginPage.render()));
});

app.get("/register", (req: Request, res: Response) => {
  res
    .set("Content-Type", "text/html")
    .send(renderPage(RegistrationPage.render()));
});

app.get("/login", (req: Request, res: Response) => {
  res
    .set("Content-Type", "text/html")
    .send(renderPage(LoginPage.render()));
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