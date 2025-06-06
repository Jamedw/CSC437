import { MovieRoyale, movieRoyaleModel } from "../models/MovieRoyale";
import { User } from "../models/User"; 
import { Types } from 'mongoose';


export async function create(title: string, currentUser: string): Promise<MovieRoyale> {
try {
    const newRoyale = new movieRoyaleModel({
        title,
        creator: currentUser, 
        participants: [currentUser], 
        status: 'pending', 
        rounds: [], 
        currentRound: 0, 
        numberOfRounds: 5 
    });
    return await newRoyale.save();
    } catch (error) {
    console.error("Error creating Movie Royale:", error);
    
    throw new Error("Failed to create Movie Royale due to validation or database error.");
    }
}


export async function get(id: string): Promise<MovieRoyale | null> {
  
  if (!Types.ObjectId.isValid(id)) {
    return null; 
  }
  try {
    return await movieRoyaleModel.findById(id).exec();
  } catch (error) {
    console.error(`Error fetching MovieRoyale with ID ${id}:`, error);
    throw new Error(`Failed to retrieve Movie Royale with ID ${id}`);
  }
}


export async function update(id: string, updateData: Partial<MovieRoyale>): Promise<MovieRoyale | null> {
  
  if (!Types.ObjectId.isValid(id)) {
    return null; 
  }
  try {
    
    
    return await movieRoyaleModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();
  } catch (error) {
    console.error(`Error updating MovieRoyale with ID ${id}:`, error);
    throw new Error(`Failed to update Movie Royale with ID ${id}`);
  }
}

export async function remove(id: string): Promise<void> {
  
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Movie Royale ID");
  }
  try {
    
    const result = await movieRoyaleModel.deleteOne({ _id: id }).exec();
    
    if (result.deletedCount === 0) {
      throw new Error("Movie Royale not found for deletion");
    }
  } catch (error) {
    console.error(`Error deleting MovieRoyale with ID ${id}:`, error);
    
    if (error instanceof Error && (error.message === "Invalid Movie Royale ID" || error.message === "Movie Royale not found for deletion")) {
      throw error;
    }
    throw new Error(`Failed to delete Movie Royale with ID ${id}`);
  }
}


export async function getByCreator(creatorId: Types.ObjectId | string): Promise<MovieRoyale[]> {
  try {
    return await movieRoyaleModel.find({ creatorId: creatorId }).exec();
  } catch (error) {
    console.error(`Error fetching MovieRoyales by creator ${creatorId}:`, error);
    throw new Error(`Failed to retrieve Movie Royales for creator ${creatorId}`);
  }
}


export async function index(): Promise<MovieRoyale[]> {
  try {
    return await movieRoyaleModel.find({}).exec();
  } catch (error) {
    console.error("Error fetching all MovieRoyales:", error);
    throw new Error("Failed to retrieve all Movie Royales");
  }
}
