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
var poster_svc_exports = {};
__export(poster_svc_exports, {
  default: () => poster_svc_default
});
module.exports = __toCommonJS(poster_svc_exports);
var import_mongoose = require("mongoose");
const PosterSchema = new import_mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    linkUrl: { type: String, required: true, trim: true },
    img: String
  },
  { collection: "poster" }
);
const PosterModel = (0, import_mongoose.model)(
  "title",
  PosterSchema
);
function index() {
  return PosterModel.find();
}
function get(title) {
  return PosterModel.find({ title }).then((list) => list[0]).catch((err) => {
    throw `${title} Not Found`;
  });
}
var poster_svc_default = { index, get };
