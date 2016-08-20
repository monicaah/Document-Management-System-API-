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
    res.send('getUser');
  },
  update: (req, res) => {
    res.send('Update');
  },
  delete: (req, res) => {
    res.send('Delete');
  },
};
