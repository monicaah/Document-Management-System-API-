const mongoose = require('mongoose');

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
          if (error) sendJsonResponse(res, 400, error);
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
        if (err) {
          sendJsonResponse(res, 404, err);
        } else if (docs.docs.length === 0) {
          sendJsonResponse(res, 401, {
            message: 'No documents found',
          });
        }
        sendJsonResponse(res, 200, docs);
      });
  },
  getDoc: (req, res) => {
    const ownerId = req.decoded._id;
    Docs
    .findOne({ _id: ownerId },
      (err, user) => {
        if (user) {
          if (err) sendJsonResponse(res, 404, err);
          const doc = user.docs.filter((document) => {
            return document._id == req.params.doc_id;
          }).pop();
          if (doc == undefined) {
            sendJsonResponse(res, 401, {
              message: 'No documents found',
            });
          }
          sendJsonResponse(res, 200, doc);
        }
      });
  },
  update: (req, res) => {
    const ownerId = req.decoded._id;
    Docs
    .findOne({ _id: ownerId })
    .exec((err, userdocs) => {
      let docArray = userdocs.docs.map((doc) => {
        if (doc._id == req.params.doc_id) {
          if (req.body.title) doc.title = req.body.title;
          if (req.body.content) doc.content = req.body.content;
        }
        return doc;
      });
      userdocs.docs = docArray;
      userdocs.save((error, userDocs) => {
        if (error) sendJsonResponse(res, 404, err);
        sendJsonResponse(res, 200, userDocs.docs);
      })
    });
  },
  delete: (req, res) => {
    const ownerId = req.decoded._id;
    Docs
    .findById(ownerId)
    .exec((err, user) => {
      const doc = user.docs.id(req.params.doc_id).remove();
      user.save((error) => {
        if (error) {
          res.send(error);
        } else {
          res.send({
            message: 'Removed',
          });
        }
      });
    });
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
        return sendJsonResponse(res, 200, docs);
     });
  },
};
