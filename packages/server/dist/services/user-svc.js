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
  default: () => user_svc_default
});
module.exports = __toCommonJS(user_svc_exports);
var import_mongoose = require("mongoose");
const UserSchema = new import_mongoose.Schema(
  {
    username: String,
    password: String,
    movie_royales: Array,
    friends: Array
  },
  { collection: "users" }
);
const UserModel = (0, import_mongoose.model)(
  "Username",
  UserSchema
);
function index() {
  return UserModel.find();
}
function get(username) {
  return UserModel.find({ username }).then((list) => list[0]).catch((err) => {
    throw `${username} Not Found`;
  });
}
function create(json) {
  const t = new UserModel(json);
  return t.save();
}
function update(username, user) {
  return UserModel.findOneAndUpdate({ username }, user, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${username} not updated`;
    else return updated;
  });
}
function remove(username) {
  return UserModel.findOneAndDelete({ username }).then(
    (deleted) => {
      if (!deleted) throw `${username} not deleted`;
    }
  );
}
var user_svc_default = { index, get, create, update, remove };
