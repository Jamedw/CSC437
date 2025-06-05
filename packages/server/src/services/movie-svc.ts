// src/services/traveler-svc.ts
import { Schema, model } from "mongoose";
import { Movie } from "../models/Movie";

const MovieSchema = new Schema<Movie>(
  {
    title: String,
    genres: Array<String>,
    cast: Array<String>,
    description: String,
    imgSrc: String,
  },
  { collection: "movie" }
);

const MovieModel = model<Movie>(
    "movie_title",
    MovieSchema
);

function index(): Promise<Movie[]> {
    return MovieModel.find();
}

function get(title: String): Promise<Movie> {
return MovieModel.find({title})
    .then((list) => list[0])
    .catch((err) => {
    throw `${title} Not Found`;
    });
}

export default { index, get };