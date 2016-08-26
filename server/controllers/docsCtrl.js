const mongoose = require('mongoose');

const Docs = mongoose.model('Users');

const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

module.exports = {
  // User is the parent document
  create: (req, res, user) => {
    if (!user) {
      sendJsonResponse(res, 403, {
        message: 'You need to be logged in to create document',
      });
    } else {
      // Data to be saved pushed into subdocument array
      Docs.docs.push({
        title: req.body.title,
        content: req.body.content,
      });
      // Save document
      Docs.save((err, docs) => {
        let thisDoc;
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          updatedocs(docs._id); // Update list of documents
          // Retrieve last review added to array and return it as JSON confirmation response
          thisDoc = user.docs[user.docs.length - 1];
          sendJsonResponse(res, 201, thisDoc);
        }
      });
    }
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
