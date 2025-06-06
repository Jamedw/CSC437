
import { Schema, model } from "mongoose";
import { User , userProfileModel, userSchema} from "../models/User";


async function getUserProfile(username: string): Promise<User | null> {
    return userProfileModel.findOne({ name: username })
        .populate('friends', 'name') 
        .populate('favoriteMovies')
        .populate('movieRoyales');  
                                
}

async function addFavoriteMovie(username: string, movieId: string): Promise<User> {
    const user = await userProfileModel.findOne({ name: username });
    if (!user) {
        throw new Error("User not found.");
    }
    if (user.favoriteMovies?.some(mId => mId.toString() === movieId)) {
        throw new Error("Movie already in favorites.");
    }
    user.favoriteMovies?.push(new Schema.Types.ObjectId(movieId)); 
    return user.save();
}

async function removeFavoriteMovie(username: string, movieId: string): Promise<User> {
    const user = await userProfileModel.findOne({ name: username });
    if (!user) {
        throw new Error("User not found.");
    }
    user.favoriteMovies = user.favoriteMovies?.filter(mId => mId.toString() !== movieId);
    return user.save();
}


async function addMovieRoyaleToUser(username: string, royaleId: string): Promise<User> {
  const user = await userProfileModel.findOne({ name: username });
  if (!user) {
      throw new Error("User not found.");
  }
  
  if (user.movieRoyales?.some(rId => rId.toString() === royaleId)) {
      throw new Error("User already linked to this Movie Royale.");
  }
  user.movieRoyales.push(new Schema.Types.ObjectId(royaleId));
  return user.save();
}

async function removeMovieRoyaleFromUser(username: string, royaleId: string): Promise<User> {
  const user = await userProfileModel.findOne({ name: username });
  if (!user) {
      throw new Error("User not found.");
  }
  user.movieRoyales = user.movieRoyales.filter(rId => rId.toString() !== royaleId);
  return user.save();
}

async function index(): Promise<User[]> {
    return userProfileModel.find({});
}

async function get(username: string): Promise<User | null> {
    return userProfileModel.findOne({ name: username });
}

async function create(userData: Partial<User>): Promise<User> {
    const newUser = new userProfileModel(userData);
    return newUser.save();
}

async function update(username: string, updates: Partial<User>): Promise<User | null> {
    // Note: You might want to prevent direct updates to referenced arrays like friends,
    // favoriteMovies, movieRoyales using this generic update.
    // For those, it's better to use specific functions like addFavoriteMovie etc.
    return userProfileModel.findOneAndUpdate({ name: username }, updates, { new: true });
}

async function remove(username: string): Promise<void> {
    await userProfileModel.deleteOne({ name: username });
}


export {
  addFavoriteMovie,
  removeFavoriteMovie,
  addMovieRoyaleToUser,
  removeMovieRoyaleFromUser,
  getUserProfile, 
  index,
  get,
  create,
  update,
  remove
};