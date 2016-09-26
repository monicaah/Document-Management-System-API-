const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'user',
  },
});


module.exports = roleSchema;
