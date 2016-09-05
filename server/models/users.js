const mongoose = require('mongoose');
const docSchema = require('./docs');
const roleSchema = require('./roles');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;
// const id = mongoose.Types.ObjectId();

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: [roleSchema],
  docs: [docSchema],
});

// Hash the password before the user is saved
userSchema.pre('save', function (next) {
  const user = this;
  // Hash the password only if the password has been changed or user is new
  if (!user.isModified('password')) return next();
  // generate the hash
  bcrypt.hash(user.password, null, null, (err, hash) => {
    if (err) return next(err);
    // Change the password to the hashed one
    user.password = hash;
    next();
  });
});

 // Compare a given password with the database hash
userSchema.methods.comparePassword = function(password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

mongoose.model('Users', userSchema);
