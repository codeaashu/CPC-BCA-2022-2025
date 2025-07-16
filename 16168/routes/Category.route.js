import express from 'express'
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from '../controllers/Category.controller.js';


const CategoryRoute = express.Router()

CategoryRoute.post('/add', addCategory)
CategoryRoute.put('/update/:categoryid', updateCategory)
CategoryRoute.get('/show/:categoryid', showCategory)
CategoryRoute.delete('/delete/:categoryid', deleteCategory)
CategoryRoute.get('/all-category', getAllCategory)



export default CategoryRoute;