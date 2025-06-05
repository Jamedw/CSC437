import { ObjectId } from 'mongodb';

export interface MovieRound {
    _id?: ObjectId; 
    participants: ObjectId[]; 
    status: 'pending' | 'active' | 'completed' | 'cancelled'; 
    ballotMovies: ObjectId[]; 
    votes: { userId: ObjectId; movieId: ObjectId; score: number;}[]; 
}