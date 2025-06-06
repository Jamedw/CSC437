import { Schema, model} from 'mongoose';
import { MovieRound , movieRoundSchema} from '../models/MovieRound'
export interface MovieRoyale {
    _id?: string; 
    participants: string[]; 
    title: string;
    status: 'pending' | 'active' | 'completed' | 'cancelled'; 
    creator: string;
    rounds: MovieRound[];
    currentRound: number;
    numberOfRounds?: number;
}

export const movieRoyaleSchema = new Schema<MovieRoyale>(
    {
        participants: [{ type: String, required: false }], 
        title: { type: String, required: true, trim: true },
        status: { type: String, enum: ['pending', 'active', 'completed', 'cancelled'], default: 'pending', required: true },
        creator: { type: String, required: false, trim: true }, 
        currentRound: { type: Number, default: 0 },
        numberOfRounds: { type: Number, required: true },
        rounds: [movieRoundSchema],
    },
    { collection: 'movieRoyales', timestamps: true } 
);

export const movieRoyaleModel = model<MovieRoyale>('MovieRoyale', movieRoyaleSchema);
