const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContractSchema = new Schema(
  {
    tenantId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
      },
    ],
    roomId: {
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
  },
  { timestamps: true }
);
module.exports = mongoose.model("Contract", ContractSchema);
