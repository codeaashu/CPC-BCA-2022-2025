import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
    try {
        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        if (!docData) {
            return res.json({success: false, message: "Doctor not found"});
        }

        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available});
        res.json({success:true, message:'availability changed'})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }

}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])

        res.json({success:true, doctors})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//API for doctor login

const loginDoctor = async (req, res) => {

    try {

        const {email, password} = req.body

        const doctor = await doctorModel.findOne({email});

        if (!doctor) {
            return res.json({success: false, message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {
           const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET);
          return  res.json({success: true, message: "Login successful", token});
        }

        else{
            return res.json({success: false, message: "Invalid credentials"});
        }

        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// Api to get doctor appointments for doctor pannel

const appointmentsDoctor = async (req, res) => {
    try {

        const docId = req.docId;
        const appointments = await appointmentModel.find({docId});

        if (!appointments) {
            return res.json({success: false, message: "No appointments found"});
        }
        
        res.json({success:true, appointments})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API to mark appointment as completed for Doctor panel
const appointmentComplete = async (req, res) => {
    try {

        const docId = req.docId;
        const {appointmentId} = req.body;

       const appointmentData = await appointmentModel.findById(appointmentId);

       if (appointmentData && appointmentData.docId === docId) {
        
        await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true});
        return res.json({success:true, message:"appointment completed"})
       }
       else{
        return res.json({success:false, message:"MArked Failed"})
       }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//API to cancel appointment for doctor panel

const appointmentCancel = async (req, res) => {
    try {

        const docId = req.docId;
        const { appointmentId} = req.body;

       const appointmentData = await appointmentModel.findById(appointmentId);

       if (appointmentData && appointmentData.docId === docId) {
        
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});
        return res.json({success:true, message:"appointment cancelled"})
       }
       else{
        return res.json({success:false, message:"Cancellation  Failed"})
       }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// Api to get dashboard data for doctor panel

const doctorDashboard = async (req, res) => {
    
    try {

        const docId = req.docId;
        const appointments = await appointmentModel.find({docId})

        let earnings = 0;

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
        })

        let patients = [];

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })


        const dashData = {
            earnings,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments:appointments.reverse().slice(0,5)

        }

        res.json({success:true, dashData})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {

    try {

        const docId = req.docId;
        const profileData = await doctorModel.findById(docId).select('-password');

        if (!profileData) {
            return res.json({success: false, message: "Doctor not found"});
        }

        res.json({success:true, profileData})

        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}


// API to update doctor profile from doctor panel

const updateDoctorProfile = async (req, res) => {
    
    try {

        const docId = req.docId;
        const {fees, address, available} = req.body

        await doctorModel.findByIdAndUpdate(docId, {fees, address, available})
        res.json({success:true, message:"profile updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}


export {changeAvailability , doctorList, loginDoctor, appointmentsDoctor, appointmentComplete,appointmentCancel , doctorDashboard,doctorProfile ,updateDoctorProfile}