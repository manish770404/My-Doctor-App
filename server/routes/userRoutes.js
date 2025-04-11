const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
  markAllNotificationController,
} = require("../controllers/userCtrl");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Auth Routes
router.post("/login", loginController);
router.post("/register", registerController);
router.post("/getuserData", authMiddleware, authController);

// Doctor Routes
router.post("/apply-doctor", authMiddleware, applyDoctorController);
router.get("/getAllDoctors", getAllDoctorsController);

// Notification Routes
router.post("/get-all-notification", authMiddleware, getAllNotificationController);
router.post("/delete-all-notifications", authMiddleware, deleteAllNotificationController);

// Appointment Routes
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);
router.post("/booking-availbility", authMiddleware, bookingAvailabilityController);
router.get("/user-appointments", authMiddleware, userAppointmentsController);
router.post(
  "/mark-all-notifications-read",
  authMiddleware,
  markAllNotificationController);

module.exports = router;
