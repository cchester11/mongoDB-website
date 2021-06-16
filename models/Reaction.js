const { Schema, model } = require("mongoose");
const dateFormatter = require("../utils/dateFormatter");

const ReactionSchema = new Schema(
  {
    ReactionId: {
      type: Schema.Types.ObjectId,
      default: new Schema.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
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

const Reaction = model("Reaction", ReactionSchema);

module.exports = Reaction;
