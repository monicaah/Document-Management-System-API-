module.exports = {
  create: (req, res) => {
    res.send('Create');
  },
  getAll: (req, res) => {
    res.send('GetALL');
  },
  getDoc: (req, res) => {
    res.send('getDoc');
  },
  update: (req, res) => {
    res.send('Update');
  },
  delete: (req, res) => {
    res.send('Delete');
  },
  find: (req, res) => {
    res.send('Find doc');
  },
};
