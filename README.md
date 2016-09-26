## [Document Management System (API)](https://github.com/andela-mkwamboka/Document-Management-System-API-)

[![Build Status](https://travis-ci.org/andela-mkwamboka/Document-Management-System-API-.svg?branch=develop)](https://travis-ci.org/andela-mkwamboka/Document-Management-System-API-)

>This document management system manages documents users and user roles.

The document:
  - Access rights according to roles
  - Specifies the date it was published

  ## Description

  The system manages documents, users and user roles. Each document defines access rights, the document defines which roles can access it.  Each document specifies the date it was published. Users are categorized by roles, each user has a role defined for them.

  ## Pre-requisites

  * MongoDB
  * NodeJS
  * Postman

  ## Installation

  * Copy the project path from repo
  * In your terminal run `git clone` _project path_
  * `cd` into the project root
  * In the project root run `npm install` to install dependencies
  * To start app `node index.js` OR `nodemon index.js`
  * To run tests `npm test`

  ## Testing with Postman

  * Create a user [POST] `http://localhost:8080/api/users`
  * Login the said user [POST] `http://localhost:8080/api/users/login`
  * Then play around with the availed routes

  ## Routes

  * users:

    1.`http://localhost:8080/api/users/login`

        login : POST

    2.`http://localhost:8080/api/users`

        create : POST
        all : GET

    3.`http://localhost:8080/api/users/:user_id`

        find-one : GET
        update-one : PUT
        delete-one : DELETE

    4.`http://localhost:8080/api/users/:user_id`

        find-documents-user : GET

  * documents

    1.`http://localhost:8080/api/documents`

        create : POST
        all : GET

    2.`http://localhost:8080/api/documents/:document_id`

        find-one : GET
        update-one : PUT
        delete-one : DELETE

  * roles

    1.`http://localhost:8080/api/roles`

        create : POST
        all : GET

    2.`http://localhost:8080/api/roles/:role_id`

        update-one : PUT
        delete-one : DELETE
