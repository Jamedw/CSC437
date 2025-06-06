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
var User_exports = {};
__export(User_exports, {
  userProfileModel: () => userProfileModel,
  userSchema: () => userSchema
});
module.exports = __toCommonJS(User_exports);
var import_mongoose2 = require("mongoose");
const userSchema = new import_mongoose2.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    movieRoyales: [{ type: import_mongoose2.Schema.Types.ObjectId, ref: "MovieRoyale" }],
    favoriteMovies: [{ type: import_mongoose2.Schema.Types.ObjectId, ref: "Movie" }],
    friends: [
      {
        type: import_mongoose2.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { collection: "users", timestamps: true }
);
const userProfileModel = (0, import_mongoose2.model)("User", userSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userProfileModel,
  userSchema
});
