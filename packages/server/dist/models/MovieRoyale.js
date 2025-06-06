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
var MovieRoyale_exports = {};
__export(MovieRoyale_exports, {
  movieRoyaleModel: () => movieRoyaleModel,
  movieRoyaleSchema: () => movieRoyaleSchema
});
module.exports = __toCommonJS(MovieRoyale_exports);
var import_mongoose = require("mongoose");
var import_MovieRound = require("../models/MovieRound");
const movieRoyaleSchema = new import_mongoose.Schema(
  {
    participants: [{ type: String, required: false }],
    title: { type: String, required: true, trim: true },
    status: { type: String, enum: ["pending", "active", "completed", "cancelled"], default: "pending", required: true },
    creator: { type: String, required: false, trim: true },
    currentRound: { type: Number, default: 0 },
    numberOfRounds: { type: Number, required: true },
    rounds: [import_MovieRound.movieRoundSchema]
  },
  { collection: "movieRoyales", timestamps: true }
);
const movieRoyaleModel = (0, import_mongoose.model)("MovieRoyale", movieRoyaleSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  movieRoyaleModel,
  movieRoyaleSchema
});
