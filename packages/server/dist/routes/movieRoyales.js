"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var movieRoyales_exports = {};
__export(movieRoyales_exports, {
  default: () => movieRoyales_default
});
module.exports = __toCommonJS(movieRoyales_exports);
var import_express = __toESM(require("express"));
var import_auth = require("./auth");
var MovieRoyaleService = __toESM(require("../services/movieRoyale-svc"));
var import_mongoose = require("mongoose");
const router = import_express.default.Router();
router.use(import_auth.authenticateUser);
router.get("/", async (_, res) => {
  try {
    const movieRoyales = await MovieRoyaleService.index();
    res.json(movieRoyales);
  } catch (err) {
    console.error("Error fetching all MovieRoyales:", err);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!import_mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Movie Royale ID format");
  }
  try {
    const movieRoyale = await MovieRoyaleService.get(id);
    if (movieRoyale) {
      res.json(movieRoyale);
    } else {
      res.status(404).send("Movie Royale not found");
    }
  } catch (err) {
    console.error("Error fetching MovieRoyale:", err);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/creator/:creatorId", async (req, res) => {
  const { creatorId } = req.params;
  try {
    const movieRoyales = await MovieRoyaleService.getByCreator(creatorId);
    res.json(movieRoyales);
  } catch (err) {
    console.error("Error fetching MovieRoyales by creator:", err);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/", async (req, res) => {
  const { title, name } = req.body;
  console.log("hello !!! ", req.body);
  try {
    const createdMovieRoyale = await MovieRoyaleService.create(req.body["title"], req.body["creatorId"]);
    res.status(201).json(createdMovieRoyale);
  } catch (err) {
    console.error("Error creating MovieRoyale:", err);
    res.status(500).send("Internal Server Error");
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!import_mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Movie Royale ID format");
  }
  const updateData = req.body;
  try {
    const updatedMovieRoyale = await MovieRoyaleService.update(id, updateData);
    if (updatedMovieRoyale) {
      res.json(updatedMovieRoyale);
    } else {
      res.status(404).send("Movie Royale not found for update");
    }
  } catch (err) {
    console.error("Error updating MovieRoyale:", err);
    res.status(500).send("Internal Server Error");
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!import_mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Movie Royale ID format");
  }
  try {
    await MovieRoyaleService.remove(id);
    res.status(204).end();
  } catch (err) {
    if (err.message === "Movie Royale not found for deletion") {
      res.status(404).send(err.message);
    } else if (err.message === "Invalid Movie Royale ID") {
      res.status(400).send(err.message);
    } else {
      console.error("Error deleting MovieRoyale:", err);
      res.status(500).send("Internal Server Error");
    }
  }
});
var movieRoyales_default = router;
