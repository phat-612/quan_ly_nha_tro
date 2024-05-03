const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContractSchema = new Schema(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    rentalMonth: {
      thang1n2024: {
        type: Schema.Types.ObjectId,
      },
      thang2n2024: {
        type: Schema.Types.ObjectId,
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Contract", ContractSchema);
