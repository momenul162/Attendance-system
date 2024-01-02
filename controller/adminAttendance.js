const { addMinutes, isAfter } = require("date-fns");
const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");

const getEnable = async (_req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });

    if (running) {
      throw error("Already Running", 400);
    }

    const timeSheet = new AdminAttendance({});
    await timeSheet.save();

    return res.status(201).json({ message: "Success", timeSheet });
  } catch (error) {
    next(error);
  }
};
const getDisable = async (_req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });

    if (!running) {
      throw error("Not Running", 400);
    }

    running.status = "COMPLETED";
    await running.save();

    return res.status(200).json(running);
  } catch (error) {
    next(error);
  }
};

const getStatus = async (_req, res, next) => {
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

module.exports = {
  getEnable,
  getDisable,
  getStatus,
};
