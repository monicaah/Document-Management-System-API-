const mongoose = require('mongoose');

const Docs = mongoose.model('Users');

const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

module.exports = {
  create: (req, res) => {
    res.send('Create');
  },
  getAll: (req, res) => {
    res.send('GetALL');
  },
  getDoc: (req, res) => {
    Docs
     .findById(req.params.doc_id)
     .select('docs.title docs.content')
     .exec((err, docs) => {
       sendJsonResponse(res, 200, docs);
     });
  },
  update: (req, res) => {
    res.send('Update');
  },
  delete: (req, res) => {
    res.send('Delete');
  },
  find: (req, res) => {
    res.send('Delete');
    // Docs
    //  .findById(req.params.user_id)
    //  .select('docs.title docs.content')
    //  .exec((err, docs) => {
    //     Docs.docs.id(req.params.user_id);
      //  if (!docs) {
      //    return sendJsonResponse(res, 404, {
      //      message: 'Document ID not found',
      //    });
      //  } else if (err) {
        //  return sendJsonResponse(res, 400, err);
      //  }
    //  });
  },
};
