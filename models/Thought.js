const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormatter')

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true, 
      maxlength: 280
    },
    createdAt: {
      type: Date, 
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction'
      }
    ]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

ThoughtSchema.virtual("reactionCount").get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;