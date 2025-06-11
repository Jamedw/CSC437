import { ObjectId } from "mongoose"
import { Schema, model } from 'mongoose';

export interface User {
    _id?: string; 
    name?: string;
    movieRoyales?: ObjectId[]; 
    favoriteMovies?: ObjectId[]; 
    friends?: ObjectId[];
}
export const userSchema = new Schema<User>(
    {

        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        movieRoyales: [{ type: Schema.Types.ObjectId, ref: 'MovieRoyale' }], 
        favoriteMovies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }], 
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        ],
    },
    { collection: "users", timestamps: true }
  );
  
  
export const userProfileModel = model<User>("User", userSchema);