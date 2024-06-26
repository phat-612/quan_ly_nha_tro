const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContractSchema = new Schema(
  {
    idTenants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
      },
    ],
    idRoom: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    oldWater: {
      type: Number,
      required: true,
    },
    oldElectric: {
      type: Number,
      required: true,
    },
    waterPrice: {
      type: Number,
      required: true,
    },
    electricPrice: {
      type: Number,
      required: true,
    },
    roomPrice: {
      type: Number,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    images: [String],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Contract", ContractSchema);
