const mongoose = require('mongoose');
const docSchema = require('./docs');
const roleSchema = require('./roles');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    select: false,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: [roleSchema],
  docs: [docSchema],
});

mongoose.model('Users', userSchema);
