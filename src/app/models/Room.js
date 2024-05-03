const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoomSchema = new Schema(
  {
    roomNumber: {
      type: String,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Room", RoomSchema);
