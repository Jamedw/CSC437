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
var user_svc_exports = {};
__export(user_svc_exports, {
  addFavoriteMovie: () => addFavoriteMovie,
  addMovieRoyaleToUser: () => addMovieRoyaleToUser,
  create: () => create,
  get: () => get,
  getUserProfile: () => getUserProfile,
  index: () => index,
  remove: () => remove,
  removeFavoriteMovie: () => removeFavoriteMovie,
  removeMovieRoyaleFromUser: () => removeMovieRoyaleFromUser,
  update: () => update
});
module.exports = __toCommonJS(user_svc_exports);
var import_mongoose = require("mongoose");
var import_User = require("../models/User");
async function getUserProfile(username) {
  return import_User.userProfileModel.findOne({ name: username }).populate("friends", "name").populate("favoriteMovies").populate("movieRoyales");
}
async function addFavoriteMovie(username, movieId) {
  const user = await import_User.userProfileModel.findOne({ name: username });
  if (!user) {
    throw new Error("User not found.");
  }
  if (user.favoriteMovies?.some((mId) => mId.toString() === movieId)) {
    throw new Error("Movie already in favorites.");
  }
  user.favoriteMovies?.push(new import_mongoose.Schema.Types.ObjectId(movieId));
  return user.save();
}
async function removeFavoriteMovie(username, movieId) {
  const user = await import_User.userProfileModel.findOne({ name: username });
  if (!user) {
    throw new Error("User not found.");
  }
  user.favoriteMovies = user.favoriteMovies?.filter((mId) => mId.toString() !== movieId);
  return user.save();
}
async function addMovieRoyaleToUser(username, royaleId) {
  const user = await import_User.userProfileModel.findOne({ name: username });
  if (!user) {
    throw new Error("User not found.");
  }
  if (user.movieRoyales?.some((rId) => rId.toString() === royaleId)) {
    throw new Error("User already linked to this Movie Royale.");
  }
  user.movieRoyales.push(new import_mongoose.Schema.Types.ObjectId(royaleId));
  return user.save();
}
async function removeMovieRoyaleFromUser(username, royaleId) {
  const user = await import_User.userProfileModel.findOne({ name: username });
  if (!user) {
    throw new Error("User not found.");
  }
  user.movieRoyales = user.movieRoyales.filter((rId) => rId.toString() !== royaleId);
  return user.save();
}
async function index() {
  return import_User.userProfileModel.find({});
}
async function get(username) {
  return import_User.userProfileModel.findOne({ name: username });
}
async function create(userData) {
  const newUser = new import_User.userProfileModel(userData);
  return newUser.save();
}
async function update(username, updates) {
  return import_User.userProfileModel.findOneAndUpdate({ name: username }, updates, { new: true });
}
async function remove(username) {
  await import_User.userProfileModel.deleteOne({ name: username });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addFavoriteMovie,
  addMovieRoyaleToUser,
  create,
  get,
  getUserProfile,
  index,
  remove,
  removeFavoriteMovie,
  removeMovieRoyaleFromUser,
  update
});
