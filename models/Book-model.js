const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number
    },
    pic: {
      type: String,
      default: "https://vbu.ac.in/wp-content/uploads/2015/08/books-2.png"
    },
    reader: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;