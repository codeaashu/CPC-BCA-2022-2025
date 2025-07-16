import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        default:'user',
        enum: ['user', 'admin'],
        required: true,
        trim: true

    },

    name:{
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique:true,
    },

    bio:{
        type: String, 
        trim: true,
    },
    avatar:{
        type: String,
        trim: true,
    },
    password:{
        type: String,
        trim: true,
    },

})

const User = mongoose.model('User', userSchema, 'users')
export default User