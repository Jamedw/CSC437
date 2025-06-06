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
var movieRoyale_svc_exports = {};
__export(movieRoyale_svc_exports, {
  create: () => create,
  get: () => get,
  getByCreator: () => getByCreator,
  index: () => index,
  remove: () => remove,
  update: () => update
});
module.exports = __toCommonJS(movieRoyale_svc_exports);
var import_MovieRoyale = require("../models/MovieRoyale");
var import_mongoose = require("mongoose");
async function create(title, currentUser) {
  try {
    const newRoyale = new import_MovieRoyale.movieRoyaleModel({
      title,
      creator: currentUser,
      participants: [currentUser],
      status: "pending",
      rounds: [],
      currentRound: 0,
      numberOfRounds: 5
    });
    return await newRoyale.save();
  } catch (error) {
    console.error("Error creating Movie Royale:", error);
    throw new Error("Failed to create Movie Royale due to validation or database error.");
  }
}
async function get(id) {
  if (!import_mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  try {
    return await import_MovieRoyale.movieRoyaleModel.findById(id).exec();
  } catch (error) {
    console.error(`Error fetching MovieRoyale with ID ${id}:`, error);
    throw new Error(`Failed to retrieve Movie Royale with ID ${id}`);
  }
}
async function update(id, updateData) {
  if (!import_mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  try {
    return await import_MovieRoyale.movieRoyaleModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();
  } catch (error) {
    console.error(`Error updating MovieRoyale with ID ${id}:`, error);
    throw new Error(`Failed to update Movie Royale with ID ${id}`);
  }
}
async function remove(id) {
  if (!import_mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Movie Royale ID");
  }
  try {
    const result = await import_MovieRoyale.movieRoyaleModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new Error("Movie Royale not found for deletion");
    }
  } catch (error) {
    console.error(`Error deleting MovieRoyale with ID ${id}:`, error);
    if (error instanceof Error && (error.message === "Invalid Movie Royale ID" || error.message === "Movie Royale not found for deletion")) {
      throw error;
    }
    throw new Error(`Failed to delete Movie Royale with ID ${id}`);
  }
}
async function getByCreator(creatorId) {
  try {
    return await import_MovieRoyale.movieRoyaleModel.find({ creatorId }).exec();
  } catch (error) {
    console.error(`Error fetching MovieRoyales by creator ${creatorId}:`, error);
    throw new Error(`Failed to retrieve Movie Royales for creator ${creatorId}`);
  }
}
async function index() {
  try {
    return await import_MovieRoyale.movieRoyaleModel.find({}).exec();
  } catch (error) {
    console.error("Error fetching all MovieRoyales:", error);
    throw new Error("Failed to retrieve all Movie Royales");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  get,
  getByCreator,
  index,
  remove,
  update
});
