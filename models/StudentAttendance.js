const { model, Schema } = require("mongoose");

const studentAttendanceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    adminAttendance: {
      type: Schema.Types.ObjectId,
      ref: "AdminAttendance",
    },
  },
  {
    timestamps: true,
  }
);

const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);
module.exports = StudentAttendance;
