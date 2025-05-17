// src/services/traveler-svc.ts
import { Schema, model } from "mongoose";
import { poster } from "../models/poster";

const PosterSchema = new Schema<poster>(
  {
    title: { type: String, required: true, trim: true }, 
    linkUrl: { type: String, required: true, trim: true },
    img: String,
  },
  { collection: "poster" }
);

const PosterModel = model<poster>(
    "title",
    PosterSchema
);

function index(): Promise<poster[]> {
    return PosterModel.find();
}

function get(title: String): Promise<poster> {
return PosterModel.find({title})
    .then((list) => list[0])
    .catch((err) => {
    throw `${title} Not Found`;
    });
}

export default { index, get };