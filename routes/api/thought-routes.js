const router = require('express').Router();

const {
  getAllThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controllers');

router.route('/')
  .get(getAllThoughts)
  .post(createThought)

router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

router.route(`/api/thoughts/:thoughtId/reactions`)
  .post(addReaction)
  .put(deleteReaction)
  module.exports = router;