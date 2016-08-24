const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const docSchema = new Schema({
  _id: Schema.Types.ObjectId,
  ownerId: Number,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = docSchema;
