const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  title: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
  },
});

module.exports = roleSchema;
