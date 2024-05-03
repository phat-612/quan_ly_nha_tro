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
    // sức chứa
    capacity: {
      type: Number,
      required: true,
    },
    idAmenities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Amenity",
      },
    ],
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Room", RoomSchema);
