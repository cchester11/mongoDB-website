const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controllers')

router.route('/')
  .get(getAllUsers)
  .post(createUser)

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

router.route('/api/users/:userId/friends/:friendId')
  .post(addFriend)
  .put(deleteFriend)

module.exports = router; 