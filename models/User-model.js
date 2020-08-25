const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default: "https://archive.org/download/user-image-with-black-background_318-34564/user-image-with-black-background_318-34564.jpg"
    },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    stores: [{ type: Schema.Types.ObjectId, ref: "Store" }]
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;