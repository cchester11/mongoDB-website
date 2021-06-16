const { Schema, model } = require("mongoose");
const validateEmail = require("../utils/validateEmail");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: "Username required",
    },
    email: {
      type: String,
      unique: true,
      required: "Email required",
      validate: [validateEmail, "Please use a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

UserSchema.virtual("friendCount").get(function() {
  return this.friends.length;
});

// create a User model: give it the name 'User' and populate it with UserSchema
const User = model("User", UserSchema);

module.exports = User;
