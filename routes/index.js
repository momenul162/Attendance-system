const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const authRoutes = require("./auth");
const usersRoutes = require("./users");
const adminAttendanceRoutes = require("./adminAttendance");
const studentAttendanceRoutes = require("./studentAttendance");

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", authenticate, usersRoutes);
router.use("/api/v1/admin/attendance", authenticate, adminAttendanceRoutes);
router.use("/api/v1/student/attendance", authenticate, studentAttendanceRoutes);

module.exports = router;
