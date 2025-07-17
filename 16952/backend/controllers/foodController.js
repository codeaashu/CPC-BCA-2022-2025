import foodModel from "../models/foodModel.js";
import fs from 'fs'



// add food item 

export const addFood = async (req, res) => {
  
  let image_filename = `${req.file.filename}`;
  const {name,description,price,category} = req.body

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image:image_filename
  })
  try {
    await food.save(); // database saved
    res.json({success:true,message:"Food Added"})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }

}

// all food list
export const listFood = async (req,res) => {
    try {
      const foods = await foodModel.find({});
      res.json({success:true,data:foods})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
    }
}

// remove food item
export const removeFood = async (req,res) => {
  try {
    const food = await foodModel.findById(req.body.id); // find the food model using id
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}