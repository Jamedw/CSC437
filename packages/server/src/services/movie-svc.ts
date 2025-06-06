// src/services/traveler-svc.ts
import { Schema, model } from "mongoose";
import { Movie } from "../models/Movie";


const movieSchema = new Schema<Movie>(
    {
        title: { type: String, required: true, trim: true },
        releaseYear: { type: Number, required: true },
        genres: [{ type: String }], // Array of strings
        cast: [{ type: String }],   // Array of strings
        description: { type: String },
        imgSrc: { type: String },
    },
    { collection: 'movies', timestamps: true } // Store movies in a 'movies' collection
);

const movieModel = model<Movie>('Movie', movieSchema);

// Example functions for movie service
async function createMovie(movieData: Omit<Movie, '_id'>): Promise<Movie> {
    const newMovie = new movieModel(movieData);
    return newMovie.save();
}

async function getMovieById(id: string): Promise<Movie | null> {
    return movieModel.findById(id);
}

// ... other functions like updateMovie, deleteMovie, searchMovies

export default movieModel;
export { createMovie, getMovieById };