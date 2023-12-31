const router = require("express").Router();
const authRoutes = require("./auth");
const usersRoutes = require("./users");

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", usersRoutes);

module.exports = router;
