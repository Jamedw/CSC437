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
var movie_svc_exports = {};
__export(movie_svc_exports, {
  createMovie: () => createMovie,
  default: () => movie_svc_default,
  getMovieById: () => getMovieById
});
module.exports = __toCommonJS(movie_svc_exports);
var import_mongoose = require("mongoose");
const movieSchema = new import_mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    releaseYear: { type: Number, required: true },
    genres: [{ type: String }],
    // Array of strings
    cast: [{ type: String }],
    // Array of strings
    description: { type: String },
    imgSrc: { type: String }
  },
  { collection: "movies", timestamps: true }
  // Store movies in a 'movies' collection
);
const movieModel = (0, import_mongoose.model)("Movie", movieSchema);
async function createMovie(movieData) {
  const newMovie = new movieModel(movieData);
  return newMovie.save();
}
async function getMovieById(id) {
  return movieModel.findById(id);
}
var movie_svc_default = movieModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMovie,
  getMovieById
});
