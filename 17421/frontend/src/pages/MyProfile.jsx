import React, { use, useContext, useState } from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
// .....................Patient Profile or user profile...........
const MyProfile = () => {
  
  // for displaying static user data
  /*const [userData, setUserData] = useState({
    name:"Ritesh",
    image:assets.profile_pic,
    email:"ritesh@gmail.com",
    phone:"8809579377",
    adress:{
      line1:"Rohtas Bihar India",
      line2:"Patna Bihar"
    },
    gender:"Male",
    dob:"2005-04-05"

  })*/
  
  // displaying dynamic data from database

  const {userData, setUserData, token, backendUrl,loadUserProfileData} = useContext(AppContext)

  const addressObj = typeof userData.address === "string"
    ? JSON.parse(userData.address)
    : userData.address;


  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)

  const userProfileData = async () => {
    try {
      
      const formData = new FormData();

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image',image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers:{token}})

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }

      else{
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  return userData && (
    <div className='max-w-lg flex flex-col text-sm gap-2  mx-4 sm:mx-[11%]'>
      {
        isEdit
        ? <label htmlFor="image">
          <div className='inline-block cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image): userData.image} alt="" />
            {!image  && <img className='w-10 absolute bottom-12 right-12' src={assets.upload_icon} alt="upload icon" />}

          </div>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden/>
        </label>
        : <img className='w-36 rounded' src={userData.image} alt="" />
      }

      {
        isEdit 
        ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' 
        type="text" value={userData.name}  onChange={ e => setUserData(prev => ({...prev,name:e.target.value}))}/>
        : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none'/>

      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
           {
            // isEdit
            //   ? <input type="email" value={userData.email} onChange={e => setUserData(prev => ({ ...prev, Email: e.target.value }))} />
            //   : 
              <p className='text-blue-500'>{userData.email}</p>
          }
         
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-28' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-400'>{userData.phone}</p>
          }

          <p className='font-medium'>Address:</p>
          {
            isEdit
            ? <p>
              <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({...prev, adress:{...prev.adress, line2:e.target.value}}))}  value ={userData.line2} type="text" />
              <br />
              <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({...prev, adress:{...prev.adress, line2:e.target.value}}))}  value ={userData.line1} type="text" />
            </p>
            : <p className='text-gray-500'>
              {addressObj?.line1}
              <br />
              {addressObj?.line2}

            </p>
          }
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3' >BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender: </p>

          {
            isEdit
            ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({...prev, gender:e.target.value}))} value={userData.gender} >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p className='text-gray-400'>{userData.gender}</p>
          }

          <p className='font-medium'>Birthday:</p>

          {
            isEdit 
            ? <input className='max-w-28 bg-gray-100' type='date' onChange={(e) => setUserData(prev => ({...prev, dob:e.target.value}))} value={userData.dob} />
            :  <p className='text-gray-400'>{userData.dob}</p>

          }
        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit
          ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-100' onClick={userProfileData}>Save information</button>
          : <button className='border border-primary px-8 py-2 rounded-full ' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile