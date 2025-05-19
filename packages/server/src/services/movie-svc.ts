// src/services/traveler-svc.ts
import { Schema, model } from "mongoose";
import { movie } from "../models/movie";

const MovieSchema = new Schema<movie>(
  {
    title: String,
    genres: Array<String>,
    cast: Array<String>,
    description: String,
    imgSrc: String,
  },
  { collection: "movie" }
);

const MovieModel = model<movie>(
    "movie_title",
    MovieSchema
);

function index(): Promise<movie[]> {
    return MovieModel.find();
}

function get(title: String): Promise<movie> {
return MovieModel.find({title})
    .then((list) => list[0])
    .catch((err) => {
    throw `${title} Not Found`;
    });
}

export default { index, get };