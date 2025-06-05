import { ObjectId } from "mongoose"
import { MovieRoyale } from "./MovieRoyale";
import { Movie } from "./Movie";   
export interface User {
    _id?: ObjectId; 
    name: string;
    movieRoyales: MovieRoyale[]; 
    favoriteMovies?: Movie[]; 
}