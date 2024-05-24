const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoomSchema = new Schema(
  {
    roomNumber: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
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
    isEmpty: {
      type: Boolean,
      default: true,
    },
    amenities: [
      {
        idAmenitie: { type: Schema.Types.ObjectId, ref: "Amenitie" },
        quantity: { type: Number },
      },
    ],
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Room", RoomSchema);
