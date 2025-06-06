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
var movie_royale_svc_exports = {};
__export(movie_royale_svc_exports, {
  createMovieRoyale: () => createMovieRoyale,
  default: () => movie_royale_svc_default,
  getMovieRoyaleById: () => getMovieRoyaleById
});
module.exports = __toCommonJS(movie_royale_svc_exports);
var import_mongoose = require("mongoose");
const movieRoundSchema = new import_mongoose.Schema(
  {
    participants: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    status: { type: String, enum: ["pending", "active", "completed", "cancelled"], default: "pending", required: true },
    ballotMovies: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Movie", required: true }],
    // References to Movies
    votes: [
      {
        userId: { type: import_mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        movieId: { type: import_mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
        score: { type: Number, required: true },
        _id: false
      }
    ]
  },
  { _id: true }
);
const movieRoyaleSchema = new import_mongoose.Schema(
  {
    participants: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    title: { type: String, required: true, trim: true },
    status: { type: String, enum: ["pending", "active", "completed", "cancelled"], default: "pending", required: true },
    creator: { type: import_mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    currentRound: { type: Number, default: 0 },
    numberOfRounds: { type: Number, required: true },
    rounds: [movieRoundSchema]
  },
  { collection: "movie_royales", timestamps: true }
);
const movieRoyaleModel = (0, import_mongoose.model)("MovieRoyale", movieRoyaleSchema);
async function createMovieRoyale(royaleData) {
  const newRoyale = new movieRoyaleModel(royaleData);
  return newRoyale.save();
}
async function getMovieRoyaleById(id) {
  return movieRoyaleModel.findById(id).populate("participants", "name").populate("creator", "name").populate("rounds.ballotMovies", "title imgSrc");
}
var movie_royale_svc_default = movieRoyaleModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMovieRoyale,
  getMovieRoyaleById
});
