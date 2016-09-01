const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../models/dbconfig')
const setHeader = require('setheader');

const superSecret = config.sessionSecret;

const User = mongoose.model('Users');

const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

// exec method executes the query and passes a callback function that will run
// when the operation is complete

module.exports = {
  create: (req, res) => {
    const user = new User();

    // Set user info from request
    user.username = req.body.username;
    user.name.first = req.body.first;
    user.name.last = req.body.last;
    user.email = req.body.email;
    user.password = req.body.password;

    // save user and check for errors
    user.save((err) => {
      if (err) {
        // Duplicate entry
        if (err.code === 11000) {
          return sendJsonResponse(res, 400, {
            message: 'A user with that username already exists.',
          });
        }
        return sendJsonResponse(res, 404, err);
      }
      const details = ({
        _id: user._id,
        username: req.body.username,
      });
      // Create token
      const token = jwt.sign(details, superSecret, {
        expiresIn: 60 * 60 * 24, // 24 hours
      });
      return sendJsonResponse(res, 200, {
        message: 'User saved',
        token: token,
      });
    });
  },
  getAll: (req, res) => {
    User
      .find()
      .select('-role -docs -__v')
      .exec((err, user) => {
        if (err) res.send(err);
        return sendJsonResponse(res, 200, user);
      });
  },
  login: (req, res) => {
    User
    // Select username from request and find in db
    .findOne({ username: req.body.username })
    .select('password _id')
    .exec((err, user) => {
      if (err) sendJsonResponse(res, 404, err);
      if (!user) {
        sendJsonResponse(res, 404, { message: 'User not found.' });
      } else if (user) {
        // Check if password matches
        const validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          sendJsonResponse(res, 404, { message: 'Authentication failed. Wrong password.' });
        }
        const details = ({
          _id: user._id,
          username: req.body.username,
        });
        // Create token
        const token = jwt.sign(details, superSecret, {
          expiresIn: 60 * 60 * 24, // 24 hours
        });
        sendJsonResponse(res, 200, {
          message: 'Enjoy your token!',
          token: token,
        });
      }
    });
  },
  logout: (req, res) => {
    sendJsonResponse(res, 200, {
      message: 'Bye',
    });
  },
  getUser: (req, res) => {
    User.findById(req.params.user_id)
    .select('-role -docs -__v')
    .exec((err, user) => {
      if (!user) {
        return sendJsonResponse(res, 404, {
          message: 'User not found',
        });
      } else if (err) {
        return sendJsonResponse(res, 404, err);
      }
      return sendJsonResponse(res, 200, user);
    });
  },
  update: (req, res) => {
    User
    .findById(req.params.user_id)
    .select('-role -docs -__v')
    .exec((err, user) => {
      if (!user) {
        sendJsonResponse(res, 404, {
          message: 'locationid not found',
        });
        return;
      } else if (err) {
        sendJsonResponse(res, 400, err);
        return;
      }
      // update the users info only if its new
      if (req.body.name) user.name = req.body.name;
      if (req.body.username) user.username = req.body.username;
      if (req.body.password) user.password = req.body.password;
      if (req.body.first) user.name.first = req.body.first;
      if (req.body.last) user.name.last = req.body.last;
      if (req.body.email) user.name.last = req.body.email;

      // Update the user
      user.save((err, user) => {
        if (err) {
          sendJsonResponse(res, 404, err);
        }
        sendJsonResponse(res, 200, user);
      });
    });
  },
  delete: (req, res) => {
    const userid = req.params.user_id;
    if (userid) {
      User
      .findByIdAndRemove(userid)
      .exec((err) => {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 204, null);
      });
    }
    sendJsonResponse(res, 200, {
      message: 'Successfully deleted',
    });
  },
};
