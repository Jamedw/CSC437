
import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { Credential } from "../models/credential";
import { User, userProfileModel} from '../models/User'; 

const credentialSchema = new Schema<Credential>(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    hashedPassword: {
      type: String,
      required: true
    }
  },
  { collection: "user_credentials" }
);

const credentialModel = model<Credential>(
  "Credential",
  credentialSchema
);

function create(username: string, password: string): Promise<Credential> {
    return credentialModel
      .find({ username })
      .then((found: Credential[]) => {
        if (found.length) {
            
            throw `Username exists: ${username}`;
        }
      })
      .then(() =>
        
        bcrypt
          .genSalt(10)
          .then((salt: string) => bcrypt.hash(password, salt))
          .then(async (hashedPassword: string) => { 
            const creds = new credentialModel({
              username,
              hashedPassword
            });
            const savedCredential = await creds.save(); 

            const newUserProfile = new userProfileModel({
                name: username, 
                movieRoyales: [], 
                favoriteMovies: [],
                friends: []
            } as User); 
            await newUserProfile.save(); 

            
            return savedCredential;
          })
      );
}


function verify(username: string, password: string): Promise<string> {
  return credentialModel
    .find({ username })
    .then((found) => {
      
      if (!found || found.length !== 1)
        throw "Invalid username or password";
      return found[0]; 
    })
    .then(
      (credsOnFile: Credential) =>
        
        bcrypt.compare(
          password,
          credsOnFile.hashedPassword
        )
        .then((result: boolean) => {
          if (!result)
            throw("Invalid username or password"); 
          return credsOnFile.username; 
        })
      );
}

export default { create, verify };