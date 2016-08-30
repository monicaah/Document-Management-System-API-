const mongoose = require('mongoose');
const config = require('../models/dbconfig');

const superSecret = config.sessionSecret;
const Docs = mongoose.model('Users');

const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

module.exports = {
  create: (req, res) => {
    const ownerId = req.decoded._id;
    if (ownerId) {
      Docs
      .findById(ownerId)
      .select('docs')
      .exec((err, user) => {
        if (err) sendJsonResponse(res, 404, err);
        user.docs.push({
          ownerId: user._id,
          title: req.body.title,
          content: req.body.content,
        });
        user.save((error, users) => {
          if (error) sendJsonResponse(res, 400, err);
          const thisDoc = users.docs[users.docs.length - 1];
          sendJsonResponse(res, 201, thisDoc);
        });
      });
    } else {
      sendJsonResponse(res, 404, {
        message: 'Not found, ownerId required',
      });
    }
  },
  getAll: (req, res) => {
    const ownerId = req.decoded._id;
    Docs
      .findById(ownerId)
      .select('docs')
      .exec((err, docs) => {
        if (err) sendJsonResponse(res, 404, err);
        sendJsonResponse(res, 200, docs);
      });
  },
  getDoc: (req, res) => {
    const ownerId = req.decoded._id;
    Docs.findOne({ _id: ownerId },
      (err, user) => {
        if (err) sendJsonResponse(res, 404, err);
        const doc = user.docs.filter((document) => {
          return document._id == req.params.doc_id;
        }).pop();
        sendJsonResponse(res, 200, doc);
    });
  },
  update: (req, res) => {
    const ownerId = req.decoded._id;
    Docs
    .findOne({ _id: ownerId })
    .exec((err, userdocs) => {
      if (err) sendJsonResponse(res, 404, err);
      const doc = userdocs.docs.filter((document) => {
        return document._id == req.params.doc_id;
      }).pop();
      if (req.body.title) userdocs.title = req.body.title;
      if (req.body.content) userdocs.content = req.body.content;
      userdocs.modifiedAt = Date.now;
      userdocs.createdAt = userdocs.createdAt;
      // Update the docs
      userdocs.save((err, user) => {
        if (err) {
          sendJsonResponse(res, 404, err);
        }
        sendJsonResponse(res, 200, {
          message: 'Successfully Updated'
        });
      });

    });
  },
  delete: (req, res) => {
    // const ownerId = req.decoded._id;
    // Docs.findByIdAndUpdate({ _id: ownerId }, {
    //   $pull: {
    //     doc: { '_id': req.params.doc_id}
    //   }
    // });
    // const ownerId = req.decoded._id;
    // Docs.remove({ _id: ownerId }, (err, user) => {
    //   const doc = user.docs.filter((document) => {
    //     return document._id == req.params.doc_id;
    //   }).pop();
    //   sendJsonResponse(res, 200, {
    //     message: 'Deleted'
    //   });
    // });
  },
  find: (req, res) => {
    const ownerId = req.decoded._id;
    Docs
     .findById(ownerId)
     .select('docs.title docs.content')
     .exec((err, docs) => {
       if (!docs) {
         return sendJsonResponse(res, 404, {
           message: 'Document ID not found',
         });
       } else if (err) {
         return sendJsonResponse(res, 400, err);
       }
     });
  },
};
