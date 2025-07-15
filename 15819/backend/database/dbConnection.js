import mongoose from "mongoose";

/*

* Here created a Async Function
* Function connect with Database 
* 
*/

export const dbConnection = async () => {
   try {
    const conIns = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGODB_NAME}`);
    console.log("MONGODB Connected ",conIns.connection.host)
   } catch (error) {
    console.log(`Some error occured while connecting to datebase: ${error}`);
    process.exit(1)
   }
        
};