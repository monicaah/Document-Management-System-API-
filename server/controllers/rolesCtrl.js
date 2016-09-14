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
  getRole: (req, res) => {
    // Roles
  //   .findOne({ _id: ownerId },
  //     (err, user) => {
  //       if (user) {
  //         if (err) sendJsonResponse(res, 404, err);
  //         const doc = user.docs.filter((document) => {
  //           return document._id == req.params.doc_id;
  //         }).pop();
  //         if (doc == undefined) {
  //           sendJsonResponse(res, 401, {
  //             message: 'No documents found',
  //           });
  //         }
  //         sendJsonResponse(res, 200, doc);
  //       }
  //     });
  },
  update: (req, res) => {
  //   const ownerId = req.decoded._id;
  //   Docs
  //   .findOne({ _id: ownerId })
  //   .exec((err, userdocs) => {
  //     let docArray = userdocs.docs.map((doc) => {
  //       if (doc._id == req.params.doc_id) {
  //         if (req.body.title) doc.title = req.body.title;
  //         if (req.body.content) doc.content = req.body.content;
  //       }
  //       return doc;
  //     });
  //     userdocs.docs = docArray;
  //     userdocs.save((error, userDocs) => {
  //       if (error) sendJsonResponse(res, 404, err);
  //       sendJsonResponse(res, 200, userDocs.docs);
  //     })
  //   });
  },
  delete: (req, res) => {
  //   const ownerId = req.decoded._id;
  //   Docs
  //   .findById(ownerId)
  //   .exec((err, user) => {
  //     const doc = user.docs.id(req.params.doc_id).remove();
  //     user.save((error) => {
  //       if (error) {
  //         res.send(error);
  //       } else {
  //         res.send({
  //           message: 'Removed',
  //         });
  //       }
  //     });
  //   });
  },
};
