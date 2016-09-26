const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const docSchema = new Schema({
  ownerId: String,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  }
);

module.exports = docSchema;
