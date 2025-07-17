import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://krdeepak509:Deepak1234@cluster0.27dotxf.mongodb.net/DesiBhoj')
        .then(() => console.log('DB CONNECTED'));
}

