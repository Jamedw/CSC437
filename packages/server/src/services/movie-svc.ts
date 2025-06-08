
import { Schema, model } from "mongoose";
import { Movie } from "../models/Movie";


const movieSchema = new Schema<Movie>(
    {
        title: { type: String, required: true, trim: true },
        releaseYear: { type: Number, required: true },
        genres: [{ type: String }], 
        cast: [{ type: String }],   
        description: { type: String },
        imgSrc: { type: String },
    },
    { collection: 'movies', timestamps: true } 
);

const movieModel = model<Movie>('Movie', movieSchema);


async function createMovie(movieData: Omit<Movie, '_id'>): Promise<Movie> {
    const newMovie = new movieModel(movieData);
    return newMovie.save();
}

async function getMovieById(id: string): Promise<Movie | null> {
    return movieModel.findById(id);
}



export default movieModel;
export { createMovie, getMovieById };