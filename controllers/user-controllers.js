const { User } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((results) => res.json(results))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      // include thoughts, friends for user; front end will place these on the UI for the page
      .populate([
        //select everything but the version with select: "-__v"
        { path: "thoughts", select: "-__v" },
        { path: "friends", select: "-__v" },
      ])
      // select everything for the User except the version
      .select("-__v")
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "None found" });
          return;
        }
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then((result) => res.json(result))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateUser({ params, body }, res) {
    // (find, update with body, configuration)
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "None found" });
          return;
        }
        res.json(result);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "None found" });
          return;
        }
        res.json(result);
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: body } },
      { new: true }
    )
    .then(result => {
      if(!result) {
        res.status(500).json({ message: "Internal Error" })
        return;
      }
      res.json(result)
    })
    .catch(err => res.json(err))
  },

  deleteFriend({ params }) {
    User.findOneAndUpdate({ _id: params.id })
    .then(result => res.json(result))
    .catch(err => res.json(err))
  },
};

module.exports = userController;
