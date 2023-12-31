const router = require("express").Router();
const usersController = require("../controller/users");

/**
 * -Find one user by userId or email
 * -@method GET
 */
router.get("/:userId", usersController.getUserById);

/**
 * -Update user by userId
 * -@method PUT
 */
router.put("/:userId", usersController.putUserById);

/**
 * -Update user by userId
 * -@method PATCH
 */
router.patch("/:userId", usersController.patchUserById);

/**
 * -Update user by userId
 * -@method DELETE
 */
router.delete("/:userId", usersController.deleteUserById);

/**
 * -Get all Users
 * -@method GET
 */
router.get("/", usersController.getUsers);

/**
 * -Create a new user
 * -@method POST
 */
router.post("/", usersController.postUser);

module.exports = router;
