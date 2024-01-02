const { addMinutes, isAfter } = require("date-fns");
const AdminAttendance = require("../models/AdminAttendance");
const StudentAttendance = require("../models/StudentAttendance");
const error = require("../utils/error");

const studentAttendanceStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("Not Running", 400);
    }
    const started = addMinutes(new Date(running.createdAt), running.timeLimit);

    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }

    return res.status(200).json(running);
  } catch (error) {
    next(error);
  }
};
const studentAttendance = async (req, res, next) => {
  const { id } = req.params;
  try {
    const attendanceSheet = await AdminAttendance.findById(id);

    if (!attendanceSheet) {
      throw error("Invalid Attendance ID", 400);
    }

    if (attendanceSheet.status == "COMPLETED") {
      throw error("Time out!! Attendance Sheet Already Closed");
    }

    let attendance = await StudentAttendance.findOne({ adminAttendance: id, user: req.user._id });

    if (attendance) {
      throw error("Already Register", 400);
    }

    attendance = new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });

    await attendance.save();
    return res.status(201).json({ message: "Attendance Successfull", attendance });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  studentAttendanceStatus,
  studentAttendance,
};
