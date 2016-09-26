const mongoose = require('mongoose');

const Roles = mongoose.model('Users');

const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

module.exports = {
  getAll: (req, res) => {
    Roles
      .find()
      .select('role')
      .exec((err, user) => {
        if (err) {
          sendJsonResponse(res, 404, err);
        } else {
          const uniqueRoles = [];
          user.forEach((userRole) => {
            if (uniqueRoles.indexOf(userRole.role[0].title) === -1) {
              uniqueRoles.push(userRole.role[0].title);
            }
          });
          sendJsonResponse(res, 200, uniqueRoles);
        }
      });
  },
};
