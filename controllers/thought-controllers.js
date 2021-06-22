const { Thought, User } = require("../models");

const thoughtControllers = {
  //check
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((result) => res.json(result))
      .catch((err) => res.status(400).json(err));
  },
  //check
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({ path: "reactions", select: "-__v" })
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
  //check
  createThought({ body }, res) {
    Thought.create(body)
      .then((result) => {
        User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: result._id } },
          { new: true }
        );
        if (!result) {
          res.status(404).json({ message: "None found" });
          return;
        }
        res.json(result);
      })
      .catch((err) => res.status(400).json(err));
  },
  //check
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
  //check
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id }).then((result) => {
      if (!result) {
        res.status(404).json({ message: "None found" });
        return;
      }
      User.findOneAndUpdate(
        { thoughts: params.id },
        { $pull: { thoughts: params.id } },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ message: "None found" });
      }
      res.json(result);
    });
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "None found" });
          return;
        }
        res.json(result);
      })
      .catch((err) => res.json(err));
  },

  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { ReactionId: body.ReactionId } } },
      { new: true }
    )
      .then((result) => {
        if (!result) {
          res.status(404).json({ message: "Not found" });
        }
        res.json(result);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtControllers;
