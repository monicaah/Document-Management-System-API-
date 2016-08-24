const mongoose = require('mongoose');

const User = mongoose.model('Users');

const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

// exec method executes the query and passes a callback function that will run
// when the operation is complete

module.exports = {
  create: (req, res) => {
    res.send('Create');
  },
  getAll: (req, res) => {
    res.send('GetALL');
  },
  login: (req, res) => {
    res.send('login');
  },
  logout: (req, res) => {
    res.send('Logout');
  },
  getUser: (req, res) => {
    User.findById(req.params.user_id)
    .exec((err, user) => {
      if (!user) {
        return sendJsonResponse(res, 404, {
          message: 'User not found',
        });
      } else if (err) {
        return sendJsonResponse(res, 200, err);
      }
      return sendJsonResponse(res, 200, user);
    });
  },
  update: (req, res) => {
    res.send('Update');
  },
  delete: (req, res) => {
    res.send('Delete');
  },
};
