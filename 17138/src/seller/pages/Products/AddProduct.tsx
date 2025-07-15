// // import { AddPhotoAlternate, Close } from '@mui/icons-material'
// // import { CircularProgress, Grid, IconButton, TextField } from '@mui/material'
// // import { upload } from '@testing-library/user-event/dist/upload'
// // import { Formik, useFormik } from 'formik'
// // import { s, t } from 'framer-motion/dist/types.d-CtuPurYT'
// // import React, { use, useState } from 'react'
// // import { uploadToCloudinary } from '../../../Util/uploadToCloudinary'
// // import { menLevelTwo } from '../../../data/category/level two/menLevelTwo'
// // import { womenLevelTwo } from '../../../data/category/level two/womenLevelTwo'
// // import { furnitureLevelTwo } from '../../../data/category/level two/furnitureLevelTwo'
// // import { electronicsLevelTwo } from '../../../data/category/level two/electronicsLevelTwo'
// // import { menLevelThree } from '../../../data/category/level three/menLevelThree'
// // import { womenLevelThree } from '../../../data/category/level three/womenLevelThree'
// // import { furnitureLevelThree } from '../../../data/category/level three/furnitureLevelThree'
// // import { electronicsLevelThree } from '../../../data/category/level three/electronicsLevelThree'

// // const categorytwo: { [key: string]: any[] } = {
// //   men:menLevelTwo,
// //   women: womenLevelTwo,
// //   kids:[],
// //   home_furniture: furnitureLevelTwo,
// //   beauty:[],
// //   electronics:electronicsLevelTwo,
// // };

// // const categorythree: { [key: string]: any[] } = {
// //   men:menLevelThree,
// //   women: womenLevelThree,
// //   kids:[],
// //   home_furniture: furnitureLevelThree,
// //   beauty:[],
// //   electronics:electronicsLevelThree,
// // };

// // const AddProduct = () => {

// //   const [uploadImage, setUploadingImage] = useState(false);

// //   const [snackbar, setSnackbar] = useState(false);

// //   const formik = useFormik({
// //     initialValues:{
// //       title: '',
// //       description: '',
// //       mrpPrice: '',
// //       sellingPrice: '',
// //       quantity: '',
// //       color: '',
// //       images: [],
// //       category: '',
// //       category2: '',
// //       category3: '',
// //       sizes:'',
// //     },
// //     onSubmit: (values) => {
// //       console.log("Form Values", values);
// //     },
// //   });

// //   const handleImageChange = async (event:any) => {
// //     const file = event.target.files[0];
// //     setUploadingImage(true);
// //     const image = await uploadToCloudinary(file);
// //     // formik.setFieldValue('images', [...formik.values.images, file]);
// //     setUploadingImage(false);
// //   };

// //   const handleRemoveImage = (index:number) => {
// //     const updatedImages =[...formik.values.images];
// //     updatedImages.splice(index, 1);
// //     formik.setFieldValue('images', updatedImages);
// //   };

// //   const childCategory  = (category:any, parentCateforyId: any) => {
// //     return category.filter((child:any) =>{
// //       //console.log("Category", parentCateforyId, child);
// //       return child.parentCategory === parentCateforyId;
// //     });
// //   };
// //    const handleCloseSnackbar = () => {
// //     setSnackbar(false);
// //    }

// //   return (
// //     <div>
// //       <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
// //         <Grid container spacing={2}>
// //           <Grid className="flex flex-wrap gap-5" size={{xs:12}}>
           
// //             <input
// //               type="file"
// //               accept='image/*'
// //               id="fileInput"
// //               style={{ display: 'none' } }
// //               onChange={handleImageChange}
// //             />
// //             <label className='relative' htmlFor="fileInput">
// //               <span className='w-24 h-24 cursor-pointer flex items-center 
// //               justify-center p-3 border rounded-md border-gray-400'>
// //                 <AddPhotoAlternate className='text-gray-700'/>
// //               </span>
// //               {uploadImage && (
// //                 <div className='absolute top-0 left-0 w-full h-full 
// //                 bg-gray-200 flex items-center justify-center'>
// //                   <CircularProgress className='text-gray-700' />
// //                 </div> }
// //             </label>

// //             <div className='flex flex-wrap gap-2'>
// //               {formik.values.images.map((image, index) => (
// //                 <div className='relative'>
// //                   <img
// //                   className='w-24 h-24 object-cover rounded-md'
// //                   key={index}
// //                   src={image}
// //                   alt = {`Product Image ${index + 1}`}
// //                   />
// //                   <IconButton
// //                     className='absolute top-0 right-0 spyace-bg-red-500 spyace-text-white spyace-rounded-full spyace-p-1 hover:spyace-bg-red-600'
// //                     onClick={() => handleRemoveImage(index)}
// //                     size='small'
// //                     color='error'
// //                     sx={{
// //                       position:"absolute",
// //                       top:0,
// //                       right:0,
// //                       outline:"none",
// //                     }}
// //                     >
// //                       <Close sx={{fontSize:"1rem"}}/>
// //                     </IconButton>
// //             </div>
// //               ))}
// //               </div>
// //           </Grid>
// //           <Grid size={{xs:12}}>
// //             <TextField
// //             fullWidth
// //             id='title'
// //             name='title'
// //             label="Title"
// //             value={formik.values.title}
// //             onChange={formik.handleChange}
// //             error={formik.touched.title && Boolean(formik.errors.title)}
// //             helperText={formik.touched.title && formik.errors.title}
// //             required
// //             />
// //           </Grid>
// //           <Grid size={{xs:12}}>
// //             <TextField
// //             fullWidth
// //             id='description'
// //             name='description'
// //             label="Description"
// //             value={formik.values.description}
// //             onChange={formik.handleChange}
// //             error={formik.touched.description && Boolean(formik.errors.description)}
// //             helperText={formik.touched.description && formik.errors.description}
// //             required
// //             multiline
// //             rows={4}
// //             />
// //           </Grid>
// //       </form>
// //     </div>
// //   )
// // }

// // export default AddProduct

// import { AddPhotoAlternate, Close } from '@mui/icons-material';
// import { CircularProgress, Grid, IconButton, TextField, Button, Snackbar, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
// import { Formik, useFormik } from 'formik';
// import * as Yup from 'yup';
// import React, { useState } from 'react';
// import { uploadToCloudinary } from '../../../Util/uploadToCloudinary';
// import { menLevelTwo } from '../../../data/category/level two/menLevelTwo';
// import { womenLevelTwo } from '../../../data/category/level two/womenLevelTwo';
// import { furnitureLevelTwo } from '../../../data/category/level two/furnitureLevelTwo';
// import { electronicsLevelTwo } from '../../../data/category/level two/electronicsLevelTwo';
// import { menLevelThree } from '../../../data/category/level three/menLevelThree';
// import { womenLevelThree } from '../../../data/category/level three/womenLevelThree';
// import { furnitureLevelThree } from '../../../data/category/level three/furnitureLevelThree';
// import { electronicsLevelThree } from '../../../data/category/level three/electronicsLevelThree';
// import { colors } from '../../../data/Filter/color';
// import { mainCategory } from '../../../data/category/mainCategory';

// const categorytwo:{[key: string]: any[]} = {
//   men: menLevelTwo,
//   women: womenLevelTwo,
//   kids: [],
//   home_furniture: furnitureLevelTwo,
//   beauty: [],
//   electronics: electronicsLevelTwo,
// };

// const categorythree: { [key: string]: any[] } = {
//   men: menLevelThree,
//   women: womenLevelThree,
//   kids: [],
//   home_furniture: furnitureLevelThree,
//   beauty: [],
//   electronics: electronicsLevelThree,
// };

// const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

// const AddProduct = () => {
//   const [uploadImage, setUploadingImage] = useState(false);
//   const [snackbar, setSnackbar] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       description: '',
//       mrpPrice: '',
//       sellingPrice: '',
//       quantity: '',
//       color: '',
//       images: [],
//       category: '',
//       category2: '',
//       category3: '',
//       sizes: '',
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required('Title is required'),
//       description: Yup.string().required('Description is required'),
//       mrpPrice: Yup.number().required('MRP Price is required').positive('Must be a positive number'),
//       sellingPrice: Yup.number().required('Selling Price is required').positive('Must be a positive number'),
//       quantity: Yup.number().required('Quantity is required').integer('Must be an integer').positive('Must be a positive number'),
//       color: Yup.string().required('Color is required'),
//       category: Yup.string().required('Category is required'),
//       category2: Yup.string().required('Subcategory is required'),
//       category3: Yup.string().required('Sub-subcategory is required'),
//       sizes: Yup.string().required('Size is required'),
//     }),
//     onSubmit: (values) => {
//       console.log("Form Values", values);
//       // setSnackbar(true);
//     },
//   });

//   const handleImageChange = async (event:any) => {
//     const file = event.target.files[0];
//     setUploadingImage(true);
//     const image = await uploadToCloudinary(file);
//     formik.setFieldValue('images', [...formik.values.images, image]);
//     setUploadingImage(false);
//   };

//   const handleRemoveImage = (index:number) => {
//     const updatedImages = [...formik.values.images];
//     updatedImages.splice(index, 1);
//     formik.setFieldValue('images', updatedImages);
//   };

//   const childCategory  = (category:any, parentCateforyId: any) => {
//     return category.filter((child:any) =>{
//       //console.log("Category", parentCateforyId, child);
//       return child.parentCategory === parentCateforyId;
//     });
//   };
//   const handleCloseSnackbar = () => {
//     setSnackbar(false);
//   };

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
//         <Grid container spacing={2}>
//           <Grid size={{xs:12}} className="flex flex-wrap gap-5">
//             <input
//               type="file"
//               accept='image/*'
//               id="fileInput"
//               style={{ display: 'none' }}
//               onChange={handleImageChange}
//             />
//             <label className='relative' htmlFor="fileInput">
//               <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400'>
//                 <AddPhotoAlternate className='text-gray-700' />
//               </span>
//               {uploadImage && (
//                 <div className='absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center'>
//                   <CircularProgress className='text-gray-700' />
//                 </div>
//               )}
//             </label>

//             <div className='flex flex-wrap gap-2'>
//               {formik.values.images.map((image, index) => (
//                 <div className='relative' key={index}>
//                   <img
//                     className='w-24 h-24 object-cover rounded-md'
//                     src={image}
//                     alt={`Product Image ${index + 1}`}
//                   />
//                   <IconButton
//                     className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600'
//                     onClick={() => handleRemoveImage(index)}
//                     size='small'
//                     color='error'
//                   >
//                     <Close sx={{ fontSize: "1rem" }} />
//                   </IconButton>
//                 </div>
//               ))}
//             </div>
//           </Grid>

//           <Grid size={{xs:12}}>
//             <TextField
//               fullWidth
//               id='title'
//               name='title'
//               label="Title"
//               value={formik.values.title}
//               onChange={formik.handleChange}
//               error={formik.touched.title && Boolean(formik.errors.title)}
//               helperText={formik.touched.title && formik.errors.title}
//               required
//             />
//           </Grid>

//           <Grid size={{xs:12}}>
//             <TextField
//               fullWidth
//               id='description'
//               name='description'
//               label="Description"
//               value={formik.values.description}
//               onChange={formik.handleChange}
//               error={formik.touched.description && Boolean(formik.errors.description)}
//               helperText={formik.touched.description && formik.errors.description}
//               required
//               multiline
//               rows={4}
//             />
//           </Grid>

//           <Grid size={{xs:12, sm:6}}>
//             <TextField
//               fullWidth
//               id='mrpPrice'
//               name='mrpPrice'
//               label="MRP Price"
//               type="number"
//               value={formik.values.mrpPrice}
//               onChange={formik.handleChange}
//               error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
//               helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
//               required
//             />
//           </Grid>

//           <Grid size={{xs:12, sm:6}}>
//             <TextField
//               fullWidth
//               id='sellingPrice'
//               name='sellingPrice'
//               label="Selling Price"
//               type="number"
//               value={formik.values.sellingPrice}
//               onChange={formik.handleChange}
//               error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
//               helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
//               required
//             />
//           </Grid>

//           <Grid size={{xs:12, sm:6}}>
//             <TextField
//               fullWidth
//               id='quantity'
//               name='quantity'
//               label="Quantity"
//               type="number"
//               value={formik.values.quantity}
//               onChange={formik.handleChange}
//               error={formik.touched.quantity && Boolean(formik.errors.quantity)}
//               helperText={formik.touched.quantity && formik.errors.quantity}
//               required
//             />
//           </Grid>

// <Grid size={{ xs: 12, sm: 6 }}>
//   <FormControl
//     fullWidth
//     error={formik.touched.color && Boolean(formik.errors.color)}
//     required
//   >
//     <InputLabel id='color-label'>Color</InputLabel>
//     <Select 
//       labelId='color-label'
//       id='color'
//       name='color'
//       value={formik.values.color}
//       onChange={formik.handleChange}
//       label="Color"
//     >
//       <MenuItem value=""><em>None</em></MenuItem>
//       {colors.map((color, index) => (
//         <MenuItem key={index} value={color.name}>
//           <div className='flex gap-3'>
//             <span 
//               style={{ backgroundColor: color.hex }} 
//               className={`h-5 w-5 rounded-full ${color.name === 'white' ? 'border' : ''}`}
//             ></span>
//             {color.name} {/* Optional: Display the name of the color */}
//           </div>
//         </MenuItem>
//       ))}
//     </Select>
//     {formik.touched.color && formik.errors.color && (
//       <FormHelperText>{formik.errors.color}</FormHelperText>)}
//   </FormControl>
// </Grid>


//           {/* <Grid size={{xs:12, sm:6}}>
//             <FormControl
//               fullWidth              
//               error={formik.touched.category && Boolean(formik.errors.category)}
//               required
//             >
//             <InputLabel id='category-label'>Category</InputLabel>
//             <Select
//               labelId='category-label'
//               id='category'
//               name='category'
//               value={formik.values.category}
//               onChange={formik.handleChange}
//               label="Category"
//             >
//               {mainCategory.map((item) => (
//                 <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>
//               ))}
//             </FormControl>
//           </Grid> */}

//             <Grid size={{xs:12, sm:6}}>
//     <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)} required>
//       <InputLabel id='category-label'>Category</InputLabel>
//       <Select
//         labelId='category-label'
//         id='category'
//         name='category'
//         value={formik.values.category}
//         onChange={formik.handleChange}
//         label="Category"
//       >
//         {mainCategory.map((item) => (
//           <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>
//         ))}
//       </Select>
//       {formik.touched.category && formik.errors.category && (
//         <FormHelperText>{formik.errors.category}</FormHelperText>
//       )}
//     </FormControl>
//   </Grid>

//               {/* <Grid size={{xs:12, sm:6}}>
//             <TextField
//               fullWidth
//               id='category2'
//               name='category2'
//               label="Subcategory"
//               select
//               value={formik.values.category2}
//               onChange={formik.handleChange}
//               error={formik.touched.category2 && Boolean(formik.errors.category2)}
//               helperText={formik.touched.category2 && formik.errors.category2}
//               required
//             >
//               {categorytwo[formik.values.category]?.map((item) => (
//   <MenuItem key={item} value={item}>{item}</MenuItem>
// ))}
//             </TextField>
//           </Grid> */}

//           <Grid size={{xs:12, sm:6}}>
//     <FormControl fullWidth error={formik.touched.category2 && Boolean(formik.errors.category2)} required>
//       <InputLabel id='category2-label'>Subcategory</InputLabel>
//       <Select
//         labelId='category2-label'
//         id='category2'
//         name='category2'
//         value={formik.values.category2}
//         onChange={formik.handleChange}
//       >
//         {categorytwo[formik.values.category]?.map((item) => (
//           <MenuItem key={item} value={item}>{item}</MenuItem>
//         ))}
//       </Select>
//       {formik.touched.category2 && formik.errors.category2 && (
//         <FormHelperText>{formik.errors.category2}</FormHelperText>
//       )}
//     </FormControl>
//   </Grid>

//           <Grid size={{xs:12, sm:6}}>
//             <TextField
//               fullWidth
//               id='category3'
//               name='category3'
//               label="Sub-subcategory"
//               select
//               value={formik.values.category3}
//               onChange={formik.handleChange}
//               error={formik.touched.category3 && Boolean(formik.errors.category3)}
//               helperText={formik.touched.category3 && formik.errors.category3}
//               required
//             >
//               {categorythree[formik.values.category2]?.map((item) => (
//   <MenuItem key={item} value={item}>{item}</MenuItem>
// ))}
//             </TextField>
//           </Grid>

//           <Grid size={{xs:12, sm:6}}>
//             <TextField
//               fullWidth
//               id='sizes'
//               name='sizes'
//               label="Sizes"
//               select
//               value={formik.values.sizes}
//               onChange={formik.handleChange}
//               error={formik.touched.sizes && Boolean(formik.errors.sizes)}
//               helperText={formik.touched.sizes && formik.errors.sizes}
//               required
//             >
//               {sizes.map((size) => (
//                 <MenuItem key={size} value={size}>{size}</MenuItem>
//               ))}
//             </TextField>
//           </Grid>

//           <Grid size={{xs:12}}>
//             <Button type="submit" variant="contained" color="primary">
//               Add Product
//             </Button>
//           </Grid>
//         </Grid>
//       </form>

//       <Snackbar
//         open={snackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         message="Product added successfully!"
//       />
//     </div>
//   );
// };

// export default AddProduct;

import { AddPhotoAlternate, Close } from '@mui/icons-material';
import {
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Button,
  Snackbar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { uploadToCloudinary } from '../../../Util/uploadToCloudinary';
import { menLevelTwo } from '../../../data/category/level two/menLevelTwo';
import { womenLevelTwo } from '../../../data/category/level two/womenLevelTwo';
import { furnitureLevelTwo } from '../../../data/category/level two/furnitureLevelTwo';
import { electronicsLevelTwo } from '../../../data/category/level two/electronicsLevelTwo';
import { menLevelThree } from '../../../data/category/level three/menLevelThree';
import { womenLevelThree } from '../../../data/category/level three/womenLevelThree';
import { furnitureLevelThree } from '../../../data/category/level three/furnitureLevelThree';
import { electronicsLevelThree } from '../../../data/category/level three/electronicsLevelThree';
import { colors } from '../../../data/Filter/color';
import { mainCategory } from '../../../data/category/mainCategory';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../../State/Store';
import { createProduct } from '../../../State/seller/sellerProductSlice';

const categorytwo: Record<string, string[]> = {
  men: menLevelTwo.map((i) => i.name),
  women: womenLevelTwo.map((i) => i.name),
  kids: [],
  home_furniture: furnitureLevelTwo.map((i) => i.name),
  beauty: [],
  electronics: electronicsLevelTwo.map((i) => i.name)
};

const categorythree: Record<string, string[]> = {
  men: menLevelThree.map((i) => i.name),
  women: womenLevelThree.map((i) => i.name),
  kids: [],
  home_furniture: furnitureLevelThree.map((i) => i.name),
  beauty: [],
  electronics: electronicsLevelThree.map((i) => i.name)
};

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const AddProduct = () => {
  const [uploadImage, setUploadingImage] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      mrpPrice: '',
      sellingPrice: '',
      quantity: '',
      color: '',
      images: [],
      category: '',
      category2: '',
      category3: '',
      sizes: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      mrpPrice: Yup.number().required('MRP Price is required').positive(),
      sellingPrice: Yup.number().required('Selling Price is required').positive(),
      quantity: Yup.number().required('Quantity is required').integer().positive(),
      color: Yup.string().required('Color is required'),
      category: Yup.string().required('Category is required'),
      category2: Yup.string().required('Subcategory is required'),
      category3: Yup.string().required('Sub-subcategory is required'),
      sizes: Yup.string().required('Size is required')
    }),
    onSubmit: (values) => {
      console.log('Form Values', values);
      dispatch(createProduct({request:values,jwt:localStorage.getItem('jwt')}));
      setSnackbar(true);
    }
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue('images', [...formik.values.images, image]);
    setUploadingImage(false);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue('images', updatedImages);
  };

  const handleCloseSnackbar = () => setSnackbar(false);

  return (
    <form onSubmit={formik.handleSubmit} className='space-y-4 p-4'>
      <Grid container spacing={2}>
        <Grid size={12} className="flex flex-wrap gap-5">
          <input type="file" accept="image/*" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} />
          <label htmlFor="fileInput" className="relative">
            <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400'>
              <AddPhotoAlternate className='text-gray-700' />
            </span>
            {uploadImage && (
              <div className='absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center'>
                <CircularProgress className='text-gray-700' />
              </div>
            )}
          </label>

          <div className='flex flex-wrap gap-2'>
            {formik.values.images.map((image, index) => (
              <div className='relative' key={index}>
                <img className='w-24 h-24 object-cover rounded-md' src={image} alt={`Product Image ${index + 1}`} />
                <IconButton
                  onClick={() => handleRemoveImage(index)}
                  className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600'
                  size='small'
                >
                  <Close sx={{ fontSize: '1rem' }} />
                </IconButton>
              </div>
            ))}
          </div>
        </Grid>

        <Grid size={12}>
          <TextField fullWidth id="title" name="title" label="Title" value={formik.values.title}
            onChange={formik.handleChange} error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title} required />
        </Grid>

        <Grid size={12}>
          <TextField fullWidth id="description" name="description" label="Description"
            multiline rows={4} value={formik.values.description}
            onChange={formik.handleChange} error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description} required />
        </Grid>

        <Grid size={{xs:12, sm:6}}>
          <TextField fullWidth id="mrpPrice" name="mrpPrice" label="MRP Price" type="number"
            value={formik.values.mrpPrice} onChange={formik.handleChange}
            error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
            helperText={formik.touched.mrpPrice && formik.errors.mrpPrice} required />
        </Grid>

        <Grid size={{xs:12, sm:6}}>
          <TextField fullWidth id="sellingPrice" name="sellingPrice" label="Selling Price" type="number"
            value={formik.values.sellingPrice} onChange={formik.handleChange}
            error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
            helperText={formik.touched.sellingPrice && formik.errors.sellingPrice} required />
        </Grid>

        <Grid size={{xs:12, sm:6}}>
          <TextField fullWidth id="quantity" name="quantity" label="Quantity" type="number"
            value={formik.values.quantity} onChange={formik.handleChange}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity} required />
        </Grid>

        <Grid size={{xs:12, sm:6}}>
          <FormControl fullWidth error={formik.touched.color && Boolean(formik.errors.color)} required>
            <InputLabel id="color-label">Color</InputLabel>
            <Select labelId="color-label" id="color" name="color" value={formik.values.color}
              onChange={formik.handleChange} label="Color">
              <MenuItem value=""><em>None</em></MenuItem>
              {colors.map((color, index) => (
                <MenuItem key={index} value={color.name}>
                  <div className='flex gap-3'>
                    <span style={{ backgroundColor: color.hex }}
                      className={`h-5 w-5 rounded-full ${color.name === 'white' ? 'border' : ''}`}></span>
                    {color.name}
                  </div>
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{formik.touched.color && formik.errors.color}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid size={{xs:12, sm:6}}>
          <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)} required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select labelId="category-label" id="category" name="category" value={formik.values.category}
              onChange={formik.handleChange}>
              {mainCategory.map((item) => (
                <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{formik.touched.category && formik.errors.category}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid size={{xs:12, sm:6}}>
          <FormControl fullWidth error={formik.touched.category2 && Boolean(formik.errors.category2)} required>
            <InputLabel id="category2-label">Subcategory</InputLabel>
            <Select labelId="category2-label" id="category2" name="category2" value={formik.values.category2}
              onChange={formik.handleChange}>
              {categorytwo[formik.values.category]?.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{formik.touched.category2 && formik.errors.category2}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid size={{xs:12, sm:6}}>
          <FormControl fullWidth error={formik.touched.category3 && Boolean(formik.errors.category3)} required>
            <InputLabel id="category3-label">Sub-subcategory</InputLabel>
            <Select labelId="category3-label" id="category3" name="category3" value={formik.values.category3}
              onChange={formik.handleChange}>
              {categorythree[formik.values.category]?.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{formik.touched.category3 && formik.errors.category3}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid size={{xs:12, sm:6}}>
          <TextField fullWidth id="sizes" name="sizes" label="Sizes" select value={formik.values.sizes}
            onChange={formik.handleChange} error={formik.touched.sizes && Boolean(formik.errors.sizes)}
            helperText={formik.touched.sizes && formik.errors.sizes} required>
            {sizes.map((size) => (
              <MenuItem key={size} value={size}>{size}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={12}>
          <Button type="submit" variant="contained" color="primary">Add Product</Button>
        </Grid>
      </Grid>

      <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Product added successfully!" />
    </form>
  );
};

export default AddProduct;
