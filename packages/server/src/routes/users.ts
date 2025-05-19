import express, { Request, Response } from "express";
import {User} from "../models/user"
import Users from "../services/user-svc"

const router = express.Router()

router.get("/", (_, res: Response) => {
    Users.index()
      .then((list: User[]) => res.json(list))
      .catch((err) => res.status(500).send(err));
  });
  
router.get("/:username", (req: Request, res: Response) => {
const { username } = req.params;
Users.get(username)
    .then((user: User) => res.json(user))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newUser = req.body;
  
    Users.create(newUser)
      .then((user: User) =>
        res.status(201).json(user)
      )
      .catch((err) => res.status(500).send(err));
  });



router.put("/:username", (req: Request, res: Response) => {
  const { username } = req.params;
  const newUser = req.body;

  Users.update(username, newUser)
    .then((user: User) => res.json(user))
    .catch((err) => res.status(404).end());
});

router.delete("/:username", (req: Request, res: Response) => {
  const { username } = req.params;

  Users.remove(username)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router
