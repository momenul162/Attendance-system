const router = require("express").Router();
const { studentAttendanceStatus, studentAttendance } = require("../controller/studentAttendance");

router.get("/status", studentAttendanceStatus);
router.get("/:id", studentAttendance);

module.exports = router;
