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
      .then((user: User | null) => { // IMPORTANT: user can be User or null
        if (user) {
          res.json(user);
        } else {
          res.status(404).send("User not found"); // Or a more specific error message
        }
      })
      .catch((err: any) => {
        console.error("Error fetching user:", err); // Log the error for debugging
        res.status(500).send("Internal Server Error"); // Send a generic 500 for unexpected errors
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
      .then((user: User | null) => { // IMPORTANT: user can be User or null
        if (user) {
          res.json(user); // Send the updated user data
        } else {
          res.status(404).send("User not found for update"); // Or a more specific error message
        }
      })
      .catch((err: any) => {
        console.error("Error updating user:", err); // Log the error for debugging
        res.status(500).send("Internal Server Error"); // Send a generic 500 for unexpected errors
      });
  });

router.delete("/:username", (req: Request, res: Response) => {
  const { username } = req.params;

  Users.remove(username)
    .then(() => res.status(204).end())
    .catch((err: any) => res.status(404).send(err));
});

export default router
