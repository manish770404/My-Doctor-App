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
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || post
router.post("/getuserData", authMiddleware, authController);

//ApplyDoctor || post
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notification || post
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

//Notification || post
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//GET ALL DOC
router.get("/getAllDoctors", getAllDoctorsController);

//BOOK APPOINTMENT

router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

//Booking Avliability
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);



//Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);
module.exports = router;
