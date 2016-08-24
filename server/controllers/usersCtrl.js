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
    const user = new User();

    // Set user info from request
    user.username = req.body.username;
    user.name.first = req.body.first;
    user.name.last = req.body.last;
    user.email = req.body.email;
    user.password = req.body.password;

    // Save user and check for errors
    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          return sendJsonResponse(res, 400, {
            message: 'A user with that username already exists.',
          });
        }
        return sendJsonResponse(res, 404, err);
      }
      return sendJsonResponse(res, 200, {
        message: 'User saved',
      });
    });
  },
  getAll: (req, res) => {
    User
      .find()
      .select('username')
      .exec((err, user) => {
        if (err) res.send(err);
        return sendJsonResponse(res, 200, user);
      });
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
        return sendJsonResponse(res, 404, err);
      }
      return sendJsonResponse(res, 200, user);
    });
  },
  update: (req, res) => {
    User.findById(req.params.user_id)
    .exec((err, user) => {
      if (err) sendJsonResponse(res, 404, err);

      // update the users info only if its new
      if (req.body.name) user.name = req.body.name;
      if (req.body.username) user.username = req.body.username;
      if (req.body.password) user.password = req.body.password;
      if (req.body.first) user.name.first = req.body.first;
      if (req.body.last) user.name.last = req.body.last;

      // Update the user
      user.save(function(err) {
       if (err) res.send(err);

       // return a message
       res.json({ message: 'User updated!' });
       });
    });
  },
  delete: (req, res) => {
    User.remove({
      _id: req.params.user_id
    }, (err, user) => {
      if (err) return res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  },
};
