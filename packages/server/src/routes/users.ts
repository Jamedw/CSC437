import express, { Request, Response } from "express";
import {User} from "../models/User"
import * as Users from "../services/user-svc"

const router = express.Router()

router.get("/", (_, res: Response) => {
    Users.index()
      .then((list: User[]) => res.json(list))
      .catch((err: any) => res.status(500).send(err));
  });
  
  router.get("/:username", (req: Request, res: Response) => {
    const { username } = req.params;
    Users.get(username)
      .then((user: User | null) => { 
        if (user) {
          res.json(user);
        } else {
          res.status(404).send("User not found"); 
        }
      })
      .catch((err: any) => {
        console.error("Error fetching user:", err); 
        res.status(500).send("Internal Server Error"); 
      });
  });

router.post("/", (req: Request, res: Response) => {
    const newUser = req.body;
  
    Users.create(newUser)
      .then((user: User) =>
        res.status(201).json(user)
      )
      .catch((err: any) => res.status(500).send(err));
  });



  router.put("/:username", (req: Request, res: Response) => {
    const { username } = req.params;
    const newUser = req.body;
  
    Users.update(username, newUser)
      .then((user: User | null) => { 
        if (user) {
          res.json(user); 
        } else {
          res.status(404).send("User not found for update"); 
        }
      })
      .catch((err: any) => {
        console.error("Error updating user:", err); 
        res.status(500).send("Internal Server Error"); 
      });
  });

router.delete("/:username", (req: Request, res: Response) => {
  const { username } = req.params;

  Users.remove(username)
    .then(() => res.status(204).end())
    .catch((err: any) => res.status(404).send(err));
});

export default router