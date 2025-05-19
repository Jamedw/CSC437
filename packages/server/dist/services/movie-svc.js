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
  default: () => movie_svc_default
});
module.exports = __toCommonJS(movie_svc_exports);
var import_mongoose = require("mongoose");
const MovieSchema = new import_mongoose.Schema(
  {
    title: String,
    genres: Array,
    cast: Array,
    description: String,
    imgSrc: String
  },
  { collection: "movie" }
);
const MovieModel = (0, import_mongoose.model)(
  "movie_title",
  MovieSchema
);
function index() {
  return MovieModel.find();
}
function get(title) {
  return MovieModel.find({ title }).then((list) => list[0]).catch((err) => {
    throw `${title} Not Found`;
  });
}
var movie_svc_default = { index, get };
