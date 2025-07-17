import express from "express"
import cors from "cors"
import { connectDB } from "./configure/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import { placeOrder } from "./controllers/orderController.js"
import orderRouter from "./routes/orderRoute.js"

// app config

// initialize our app using the express package
const app = express()
// port no server will be running
const port = 4001

// initialize middleware
app.use(express.json()) // using this middleware get the request frontend to backend parse using the json
app.use(cors()) // using the cors we can access the backend from any frontend

// DB connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
   res.send("API working")
}) // Http method using that we can  request the data from the server

// run the express sever
app.listen(port,()=>{
  console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://rabish:<db_password>@rabish.tskn1.mongodb.net/?