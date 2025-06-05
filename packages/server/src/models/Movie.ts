
import { ObjectId } from 'mongodb';

export interface Movie {
    _id?: ObjectId; 
    title: string,
    releaseYear: number;
    genres: Array<string>,
    cast: Array<string>,
    description: string,
    imgSrc: string,
}