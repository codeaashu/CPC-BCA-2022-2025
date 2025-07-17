import validator from "validator";
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary";
import { json } from "express";
import jwt from "jsonwebtoken"

import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

import userModel from "../models/userModel.js";




// API for adding dotor

const addDoctor = async (req, res) => {

   try {

    const {name, email, password, speciality, degree, experience, about,  fees, address} = req.body
    const imageFile = req.file
   
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
        return res.json({success:false,message:"missing Details"});
      
    }
    
    //validating email
    if (!validator.isEmail(email)) {
        return res.json({success:false,message:"Please enter a valid Email"});
    }
    
    // validating password

    if (password.length < 8) {
      return res.json({success:false,message:"Please enter a strong password"});
      
    }

    // hashing doctor passsword

    const salt  =  await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
    const imageUrl = imageUpload.secure_url




    const doctorData = {
      name,
      email,
      image:imageUrl,
      password:hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), // Assuming address is a JSON string, parse it to an object

      date: Date.now()

    }

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({success:true, message:"Doctor added"})


    console.log({name, email, password, speciality, degree, experience, about,  fees, address}, imageFile);

   

   } catch (error) {
    console.log("Error adding doctor:", error);
    res.status(400).json({success:false, message: error.message });
   }
}


// API for admin login

const loginAdmin = async (req, res) => {
  try {

    const{ email, password}= req.body
    

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign( email+password , process.env.JWT_SECRET) // Generate a token for the admin
      res.json({ success: true, token })
    }

    else{
      res.json({success:false, message:"Invalid credentials"})
    }
    
  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
    
  }
}

// API to get all doctors list for admin panel

  const allDoctors = async (req, res) => {
    try {
      // If you want to exclude the password field, you can use the select method
      const doctors = await doctorModel.find({}).select('-password') // Exclude password field from the response
      
      res.json({success:true, doctors})
      
    } catch (error) {
      console.log(error);
      res.json({success:false, message:error.message})
    }
  }

  // API to get all appointments list

  const appointmntAdmin = async (req, res) => {
     try {
      const appointments =  await appointmentModel.find({})
      res.json({success:true, appointments})


     } catch (error) {
      console.log(error);
      res.json({success:false, message:error.message})
      
     }
  }

// API for Apointment cancellation
const appointmentCancelAdmin = async (req, res) => {
  try {

    
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)
    // console.log(appointmentData);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

   
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    // releasing doctor slot

    const { docId, slotDate, slotTime } = appointmentData

    const doctorData = await doctorModel.findById(docId)

    let slots_booked = doctorData.slots_booked

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: "Appointment cancelled" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
} 

// API to get dashboard data for admin pannel

const adminDashboardData = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patient: users.length,
      latestAppointments: appointments.slice(0,5), // Get the last 5 appointments
    }

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API to get all user list for admin panel

  const allUsers = async (req, res) => {
    try {
      // If you want to exclude the password field, you can use the select method
      const users = await userModel.find({}).select('-password') // Exclude password field from the response
      
      res.json({success:true, users})
      
    } catch (error) {
      console.log(error); 
      res.json({success:false, message:error.message})
    }
  }


  // API to delete user 

  const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body; 
        const deletedUser = await userModel.findByIdAndDelete(userId);
        // console.log(deletedUser);
        

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

  // API to delete doctor 

  const deleteDoctor = async (req, res) => {
    try {
        const  {docId}  = req.body; 
        const deletedDoctor = await doctorModel.findByIdAndDelete(docId);
        console.log(deletedDoctor);
        if (!deletedDoctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        res.json({ success: true, message: "Doctor deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};




export  {addDoctor,loginAdmin, allDoctors, appointmntAdmin, appointmentCancelAdmin , adminDashboardData,allUsers,deleteUser, deleteDoctor}
