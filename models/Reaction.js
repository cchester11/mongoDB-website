const { Schema, model, Types } = require("mongoose");
const dateFormatter = require("../utils/dateFormatter");

const ReactionSchema = new Schema(
  {
    ReactionId: {
      type: Types.ObjectId,
      default: new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormatter(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);



module.exports = ReactionSchema;
