// src/services/traveler-svc.ts
import { Schema, model } from "mongoose";
import { Poster } from "../models/poster";

const PosterSchema = new Schema<Poster>(
  {
    title: { type: String, required: true, trim: true }, 
    linkUrl: { type: String, required: true, trim: true },
    img: String,
  },
  { collection: "poster" }
);

const PosterModel = model<Poster>(
    "title",
    PosterSchema
);

function index(): Promise<Poster[]> {
    return PosterModel.find();
}

function get(title: String): Promise<Poster> {
return PosterModel.find({title})
    .then((list) => list[0])
    .catch((err) => {
    throw `${title} Not Found`;
    });
}

export default { index, get };