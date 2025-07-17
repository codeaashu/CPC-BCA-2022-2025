import express from "express"
import { addFood,listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

// express router
const foodRouter = express.Router();

// Image Storage Engine : create storage using multer disk storage method

const storage = multer.diskStorage({
  destination:"uploads",
  filename:(req,file,cb)=>{
     return cb(null,`${Date.now()}${file.originalname}`)
  }
})

// middleware upload has a created using that we can store the image in the uploads folder
const upload = multer({storage:storage}) 

// post work send the data on the server
// on the route use upload middleware on this route
foodRouter.post("/add",upload.single("image"), addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);







export default foodRouter;