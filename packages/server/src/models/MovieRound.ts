import { Schema, ObjectId} from 'mongoose';

export interface MovieRound {
    _id: string; 
    participants: ObjectId[]; 
    status: 'pending' | 'active' | 'completed' | 'cancelled'; 
    ballotMovies: ObjectId[]; 
    votes: { userId: ObjectId; movieId: ObjectId; score: number;}[]; 
}

export const movieRoundSchema = new Schema<MovieRound>(
    {
        participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
        status: { type: String, enum: ['pending', 'active', 'completed', 'cancelled'], default: 'pending', required: true },
        ballotMovies: [{ type: Schema.Types.ObjectId, ref: 'Movie', required: true }], 
        votes: [
            {
                userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
                movieId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
                score: { type: Number, required: true },
                _id: false 
            }
        ],
    },
    { _id: true } 
);