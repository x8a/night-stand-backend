const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    store: {
      type: String,
      required: true,
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    reader: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

const Store = mongoose.model('User', storeSchema);
module.exports = Store;