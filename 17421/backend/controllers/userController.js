import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import  razorpay from 'razorpay'
import crypto from 'crypto';

//API to register user
const registerUser = async (req, res) => {
    try {
        
        const {name, email, password} = req.body
        if (!name || !password || !email) {
            return res.json({success: false, message: "missing details"})
        }
        // Check if the email is valid

        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "invalid email"})
        }

        // Check if the password is at least 8 characters long
        if (password.length < 8) {
            return res.json({success: false, message: "password must be at least 8 characters"})
        }
        // Here we hash the password and save the user to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }
        // Save userData to the database
        // Assuming you have a User model to interact with the database

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);

        res.json({success:true, token})



    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API for user login

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if (!user) {
           return res.json({success:false, message:'user does not exist'})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        }
        else{
            res.json({success:false, message:'email or password is incorrect'} )
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API to get user profile data

const getProfile = async (req, res) => {
    try {
        
        // const  userId  = req.body
        const userData = await userModel.findById(req.userId).select('-password')

        res.json({success:true, userData})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API to update user profile data

const updateProfile = async (req, res) => {
    try {

        const userId = req.userId;
        const {name,phone,  address, dob, gender} = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender){
            return res.json({success:false,message:"data is missing"})
        }

        await userModel.findByIdAndUpdate(
            userId,
            {
                name,
                phone,
                address: typeof address === 'string' ? JSON.parse(address) : address,
                dob,
                gender
            }
        );

        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image:imageURL})
        }
        
        res.json({success:true, message:"profile updates"})



        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
    

// API to book appointment

const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;  // set by authUser middleware
    const {docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select('-password');
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = { ...docData.slots_booked };

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select('-password');
    // console.log(userData);
    
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const docDataObj = docData.toObject();
    delete docDataObj.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData: docDataObj,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({ success: true, message: "Appointment booked successfully" });

  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};


// Api to get user appointments for frontend my-appointments page

const listAppointments = async (req, res) => {
  try {
    const userId =req.userId
    // console.log(userId);
    
    const appointments  = await appointmentModel.find({userId})
    // console.log(appointments);
    

    res.json({success:true, appointments})
    
  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
  }
}


//API to cancel appointment

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId} = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)
    // console.log(appointmentData);
    
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    //verify appointment user
    if (appointmentData.userId.toString() !== userId) {
      return res.json({success:false, message:"Unauthorized action"})
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
    
    // releasing doctor slot

    const {docId, slotDate, slotTime} = appointmentData

    const doctorData = await doctorModel.findById(docId)

    let slots_booked = doctorData.slots_booked

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
    }

    await doctorModel.findByIdAndUpdate(docId, {slots_booked})

    res.json({ success:true, message:"Appointment cancelled" })
  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
  }
} 

const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})
// API to make payment of appointment using razorpay

const paymentRazorpay = async (req, res) => {

  try {
    const { appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)
    // console.log(appointmentData);
    

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appontment cancelled or not found" })
    }

    // Creating options for razorpay payment

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,

    }

    // creation of an order

    const order = await  razorpayInstance.orders.create(options)

    res.json({ success: true, order })

  } catch (error) {
     console.log(error);
    res.json({success:false, message:error.message})
  }
 
}


// Api to varify payment razorpay

const verifyRazorpay = async (req, res) => {
  
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
     const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Signature verification failed" });
    }

    // console.log(orderInfo);
    if (orderInfo.status === 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
    

    
    
  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
  }
}

export {registerUser, loginUser,getProfile, updateProfile, bookAppointment,listAppointments,cancelAppointment,paymentRazorpay,verifyRazorpay}