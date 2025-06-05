// src/services/traveler-svc.ts
import { Schema, model } from "mongoose";
import { User } from "../models/User";

const UserSchema = new Schema<User>(
  {
    username: String,
    password: String,
    movie_royales: Array<String>,
    friends: Array<String>
  },
  { collection: "users" }
);

const UserModel = model<User>(
    "Username",
    UserSchema
);

function index(): Promise<User[]> {
    return UserModel.find();
}

function get(username: String): Promise<User> {
return UserModel.find({username})
    .then((list) => list[0])
    .catch((err) => {
    throw `${username} Not Found`;
    });
}

function create(json: User): Promise<User> {
    const t = new UserModel(json);
    return t.save();
  }
  

// in src/services/traveler-svc.ts
function update(
    username: String,
    user: User
  ): Promise<User> {
    return UserModel.findOneAndUpdate({ username }, user, {
      new: true
    }).then((updated) => {
      if (!updated) throw `${username} not updated`;
      else return updated as User;
    });
  }

function remove(username: String): Promise<void> {
return UserModel.findOneAndDelete({username }).then(
    (deleted) => {
    if (!deleted) throw `${username} not deleted`;
    }
);
}

export default { index, get , create, update, remove};