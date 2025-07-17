import jwt from "jsonwebtoken";

// user authentication middleware

const authUser = async (req, res, next) => {
    try {
        
       const {token} = req.headers // Extract token from Authorization header
        if (!token) {
            return res.json({success:false, message:"not authorized login agains"})
            
        }
        
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = token_decode.id
       
        next();


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

export default authUser;