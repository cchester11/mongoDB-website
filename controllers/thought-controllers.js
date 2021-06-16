const { Thought, User } = require("../models");

const thoughtControllers = {
  getAllThoughts(req, res) {
    Thought.find({})
      // .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((result) => res.json(result))
      .catch((err) => res.status(400).json(err));
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      // .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "None found" });
          return;
        }
        res.json(result);
      })
      .catch((err) => res.status(400).json(err));
  },

  createThought({ body }, res) {
    Thought.create(body)
      .then((result) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: result._id } },
          { new: true }
        );
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

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "None found" });
          return;
        }
        res.json(result);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "None found" });
          return;
        }
        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then((result) => {
        if (!result) {
          return res.status(404).json({ message: "None found" });
        }
        res.json(result);
      });
  },
};

module.exports = thoughtControllers;
