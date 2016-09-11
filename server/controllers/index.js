module.exports = {
  index: (req, res) => {
    console.log('you have access!');
    res.send('Document management API');
  },
};
