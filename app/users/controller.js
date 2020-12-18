require('dotenv').config();
const Users = require('./model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const config = require("../../config/database.config");

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //Encrypt password
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    // Create a Note
    // Save Note in the database
    Users.create(req.body)
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all register_data from the database.
exports.findAll = (req, res) => {
    Users.find({})
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving register_data."
        });
    });
};
//login data
exports.login = (req, res) => {

    // const userVarify = jwt.verify(token, "mynameissagarvorasdfsjfjjfjsdfsdfsfjffsdfsdkfjf");
    Users.findOne({email: req.body.email})
        .then(users => {
            const isMatch = bcrypt.compareSync(req.body.password, users.password);
            if (isMatch) {
                const token = jwt.sign({email: req.body.email}, process.env.SECRET_KEY);
                res.status(200).send({auth:true, token:token});
                console.log(token)
                return res.send(users);
            } else {
                return res.status(500).send({message: "User Field Are Not Correct"});
        }
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving login."
        });
    });
};

// Find a single note with a noteId
// exports.findOne = (req, res) => {
//     console.log(req.params.id)
//     Users.findById(req.params.id)
//         .then(users => {
//             if(!users) {
//                 return res.status(404).send({
//                     message: "Note not found with id " + req.params.id
//                 });
//             }
//             res.send(users);
//         }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.id
//             });
//         }
//         return res.status(500).send({
//             message: "Error retrieving note with id " + req.params.id
//         });
//     });
// };

// Find a single userId with a
exports.findUserData = (req, res) => {
    Users.findOne({_id: req.params.id})
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving note with id "
        });
    });
};

//active user or not
exports.activeUsers = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Users.findByIdAndUpdate({_id: req.params.id}, {isActive: req.body.isActive})
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.send(users);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
// Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Users.findByIdAndUpdate(req.params.id, req.body)
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.send(users);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Users.findByIdAndRemove(req.params.id)
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.send({message: "Note deleted successfully!"});

        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        });
    });
};