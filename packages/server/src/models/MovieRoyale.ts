import { ObjectId } from 'mongodb';

export interface MovieRoyale {
    _id?: ObjectId; 
    participants: ObjectId[]; 
    title: string;
    status: 'pending' | 'active' | 'completed' | 'cancelled'; 
    creator: ObjectId;
    currentRound: number;
    numberOfRounds: number;
}