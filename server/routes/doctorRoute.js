const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorCtrl");

const router = express.Router();

// Get doctor info
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// Update doctor profile
router.post("/updateProfile", authMiddleware, updateProfileController);

// Get single doctor by ID
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

// Get doctor's appointments
router.get("/doctor-appointments", authMiddleware, doctorAppointmentsController);

// Update appointment status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
