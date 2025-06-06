"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var user_crud_exports = {};
__export(user_crud_exports, {
  default: () => user_crud_default
});
module.exports = __toCommonJS(user_crud_exports);
var import_mongoose = require("mongoose");
const UserSchema = new import_mongoose.Schema(
  {
    // Make sure these fields match your actual User interface and MongoDB collection
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    movieRoyales: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "MovieRoyale" }],
    // Assuming MovieRoyale is another model
    favoriteMovies: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Movie" }]
    // Assuming Movie is another model
    // You might also have a 'password' field here if it's stored directly on the user document,
    // though often it's handled by a separate 'credentials' collection/service.
    // password: { type: String, required: true },
  },
  { collection: "users" }
  // Your MongoDB collection name for users
);
const UserModel = (0, import_mongoose.model)(
  "User",
  // This is the model name, used for ref in other schemas
  UserSchema
);
function readUserByUsername(username) {
  return UserModel.findOne({ username }).then((user) => user).catch((err) => {
    console.error(`Error finding user by username ${username}:`, err);
    throw new Error(`Failed to retrieve user: ${err.message}`);
  });
}
function getUserById(id) {
  return UserModel.findById(id).then((user) => user).catch((err) => {
    console.error(`Error finding user by ID ${id}:`, err);
    throw new Error(`Failed to retrieve user by ID: ${err.message}`);
  });
}
var user_crud_default = {
  readUserByUsername,
  getUserById
};
