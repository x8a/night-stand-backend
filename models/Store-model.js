const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    store: {
      type: String
    },
    address: {
      type: String
    },
    reader: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;