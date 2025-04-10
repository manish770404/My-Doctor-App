const express =require('express')
const authMiddleware =require('../middlewares/authMiddleware')
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController } = require('../controllers/doctorCtrl')
const router =express.Router()

//post Single Doc Info

router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)

//POST UPDATE PROFILE
router.post('/updateProfile', authMiddleware, updateProfileController);

//POST GET SINGLE INFO
router.post('/getDoctorById' ,authMiddleware, getDoctorByIdController)

//GET Appointments
router.get(
    "/doctor-appointments",
    authMiddleware,
    doctorAppointmentsController
  );

  //POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports =router