const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TenantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    cccd: {
      number: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
    dayOfBirth: {
      type: Date,
    },
    gender: {
      type: Boolean,
    },
    status: {
      type: Boolean,
    },
    idcbefore: {
      type: String,
    },
    idcafter: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Tenant", TenantSchema);
