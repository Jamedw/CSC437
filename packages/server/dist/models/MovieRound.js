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
var MovieRound_exports = {};
__export(MovieRound_exports, {
  movieRoundSchema: () => movieRoundSchema
});
module.exports = __toCommonJS(MovieRound_exports);
var import_mongoose = require("mongoose");
const movieRoundSchema = new import_mongoose.Schema(
  {
    participants: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    status: { type: String, enum: ["pending", "active", "completed", "cancelled"], default: "pending", required: true },
    ballotMovies: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Movie", required: true }],
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  movieRoundSchema
});
