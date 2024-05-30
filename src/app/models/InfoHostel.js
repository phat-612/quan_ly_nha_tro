const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InfoHostelSchema = new Schema(
  {
    nameHostel: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    nameRenter: { type: String },
    birthday: { type: Date },
    idCard: { type: String },
    idCardDate: { type: Date },
  },
  { timestamps: true }
);
module.exports = mongoose.model("InfoHostel", InfoHostelSchema);
