 const doctorModel =require('../models/doctorModel')
 const  userModel =require('../models/userModel')

const getAllUsersController =async(req,res) =>{
    try {
        const users = await userModel.find({});
        res.status(200).send({
          success: true,
          message: "users data list",
          data: users,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "erorr while fetching users",
          error,
        });
      }
    };



const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};
// doctor account status

const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    const user = await userModel.findOne({ _id: doctor.userId });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    user.notification.push({
      type: 'doctor-request-account-updated',
      message: `Your Doctor Account Request Has ${status}`,
      onClickPath: '/notification',
    });

    user.isDoctor = status === 'approved';
    await user.save();

    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

module.exports ={getAllDoctorsController,getAllUsersController,changeAccountStatusController}

