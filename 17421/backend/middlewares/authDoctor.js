import jwt from "jsonwebtoken";

// Doctor authentication middleware

const authDoctor = async (req, res, next) => {
    try {
        
       const {dtoken} = req.headers // Extract token from Authorization header
        if (!dtoken) {
            return res.json({success:false, message:"not authorized login agains"})
            
        }
        
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.docId = token_decode.id
       
        next();


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

export default authDoctor;