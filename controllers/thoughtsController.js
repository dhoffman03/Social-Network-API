const { Thought, User } = require('../models');

module.exports = {
    // /api/users
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find({})
        .then(thoughtData => res.json(thoughtData))
        .catch((err) => res.status(500).json(err));
    },
    // Create a new thought
    createThought(req, res) {

    },
    // /api/users/:thoughtId
    // Get a single thought
    getThoughtById(req, res) {

    },
    // Update a user's thought
    updateThought(req, res) {

    },
    // Delete a user's thought
    deleteThought(req, res) {

    },
}