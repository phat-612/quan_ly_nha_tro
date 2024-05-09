const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DetailContractSchema = new Schema(
  {
    idContract: {
      type: Schema.Types.ObjectId,
      ref: "Contract",
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
    oldWater: {
      type: Number,
    },
    newWater: {
      type: Number,
    },
    oldElectric: {
      type: Number,
    },
    newElectric: {
      type: Number,
    },
    total: {
      type: Number,
    },
    paid: {
      type: Number,
    },
    isLastDetail: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("DetailContract", DetailContractSchema);
