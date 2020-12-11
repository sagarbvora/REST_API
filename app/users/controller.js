const Users = require('./model');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

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
exports.login = (req, res) => {
    Users.findOne({email: req.body.email, password: req.body.password})
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving register_data."
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
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
// Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Users.findByIdAndUpdate(req.params.id, req.body)
        .then(users => {
            if(!users) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.send(users);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
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

            if(!users) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.send({message: "Note deleted successfully!"});

        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        });
    });
};