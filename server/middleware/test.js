const jwt = require('jsonwebtoken');
const config = require('../models/dbconfig');

const superSecret = config.sessionSecret;

module.exports = {
  index: (req, res, next) => {
    console.log('Somebody just came to our app!');
    next();
     // we'll add more to the middleware in Chapter 10
     // this is where we will authenticate users

        // next(); // make sure we go to the next routes and don't stop here
    //     const _send = res.send;
    //     let sent = false;
    //     res.send = (data) => {
    //     if(sent) return;
    //     _send.bind(res)(data);
    //     sent = true;
    // };
  },
  authenticate: (req, res, next) => {
    // Check header or url parameters or post parameters for token
    const token = req.headers.authorization.split(' ')[1];
    // decode token
    if (token) {
      // Verify secret and check expires time
      jwt.verify(token, superSecret, (err, decoded) => {
        if (err) {
          return res.status(403).send({
            message: 'Faild to authenticate token',
            err: err,
          });
        } else {
          // Save token on request for  use in routes
          req.decoded = decoded;
          next();
       }
      });
    } else {
      return res.status(403).send({
        message: 'No token found',
      });
    }
  }

};
