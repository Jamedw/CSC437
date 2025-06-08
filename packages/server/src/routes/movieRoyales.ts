import express, { Request, Response } from "express";
import { authenticateUser } from "./auth";
import { MovieRoyale } from "../models/MovieRoyale";
import * as MovieRoyaleService from "../services/movieRoyale-svc";
import { Types } from 'mongoose';

const router = express.Router();



router.use(authenticateUser);


router.get("/", async (_: Request, res: Response) => {
  try {
    const movieRoyales = await MovieRoyaleService.index();
    res.json(movieRoyales);
  } catch (err: any) {
    console.error("Error fetching all MovieRoyales:", err);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Movie Royale ID format");
  }
  try {
    const movieRoyale = await MovieRoyaleService.get(id);
    if (movieRoyale) {
      res.json(movieRoyale);
    } else {
      res.status(404).send("Movie Royale not found");
    }
  } catch (err: any) {
    console.error("Error fetching MovieRoyale:", err);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/creator/:creatorId", async (req: Request, res: Response) => {
  const { creatorId } = req.params;
  
  
  try {
    const movieRoyales = await MovieRoyaleService.getByCreator(creatorId);
    res.json(movieRoyales);
  } catch (err: any) {
    console.error("Error fetching MovieRoyales by creator:", err);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/", async (req: Request, res: Response) => {
  const {title, name} = req.body;
  console.log("hello !!! ", req.body );
  try {
    const createdMovieRoyale = await MovieRoyaleService.create(req.body["title"], req.body["creatorId"]);
    res.status(201).json(createdMovieRoyale); 
  } catch (err: any) {
    console.error("Error creating MovieRoyale:", err);
    res.status(500).send("Internal Server Error");
  }
});


router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Movie Royale ID format");
  }
  const updateData: Partial<MovieRoyale> = req.body;
  try {
    const updatedMovieRoyale = await MovieRoyaleService.update(id, updateData);
    if (updatedMovieRoyale) {
      res.json(updatedMovieRoyale);
    } else {
      res.status(404).send("Movie Royale not found for update");
    }
  } catch (err: any) {
    console.error("Error updating MovieRoyale:", err);
    res.status(500).send("Internal Server Error");
  }
});


router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Movie Royale ID format");
  }
  try {
    await MovieRoyaleService.remove(id);
    res.status(204).end(); 
  } catch (err: any) {
    
    if (err.message === "Movie Royale not found for deletion") {
      res.status(404).send(err.message);
    } else if (err.message === "Invalid Movie Royale ID") { 
      res.status(400).send(err.message);
    } else {
      console.error("Error deleting MovieRoyale:", err);
      res.status(500).send("Internal Server Error");
    }
  }
});

export default router;
