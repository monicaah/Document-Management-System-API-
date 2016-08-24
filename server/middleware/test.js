module.exports = {
  index: (req, res, next) => {
// do logging
    console.log('Somebody just came to our app!');

 // we'll add more to the middleware in Chapter 10
 // this is where we will authenticate users

    // next(); // make sure we go to the next routes and don't stop here
    const _send = res.send;
    let sent = false;
    res.send = (data) => {
    if(sent) return;
    _send.bind(res)(data);
    sent = true;
};
next();
  },

};
