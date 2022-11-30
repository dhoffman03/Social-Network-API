const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {

        },
        reactionBody: {

        },
        username: {

        },
        createdAt: {

        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAt => moment(createdAt).format('MMM Do, YYYY [at] hh:mm a'),
        },
        username: {

        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;