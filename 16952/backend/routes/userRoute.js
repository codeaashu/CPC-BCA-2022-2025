import express from "express"
import { loginUser,registerUser } from "../controllers/userController.js"

// create router using express router
const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)

export default userRouter;