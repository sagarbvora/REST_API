require('./model');
const express = require("express");
const router = express.Router();
const controller = require('./controller');
// Create a new Note
router.post('/', controller.create);

// Retrieve all controller
router.get('/', controller.findAll);

// Retrieve a single Note with noteId
// router.get('/:id', controller.findOne);

//find user details
router.get('/:id', controller.findUserData);

// Update a Note with noteId
router.put('/:id', controller.update);

// Delete a Note with noteId
router.delete('/:id', controller.delete);

//login route
router.post('/login', controller.login);

module.exports = router;