const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    default: 'user',
  },
});

module.exports = roleSchema;
