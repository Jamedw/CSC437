import { MovieRoyale } from "./MovieRoyale";
import { User } from "./User";
import { Movie } from "./Movie";
export interface PopulatedUser extends Omit<User, 'movieRoyales' | 'favoriteMovies' | 'friends'> {
    movieRoyales: MovieRoyale[];
    favoriteMovies?: Movie[];
    friends?: User[]; 
}