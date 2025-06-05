import { ObjectId } from 'mongodb';

export interface MovieRoyale {
    _id?: ObjectId; 
    participants: ObjectId[]; 
    status: 'pending' | 'active' | 'completed' | 'cancelled'; 
    creator: ObjectId;
    currentRound: number;
    numberOfRounds: number;
}