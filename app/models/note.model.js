const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    name: String,
    salary: Number,
    age: Number,
    status: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);