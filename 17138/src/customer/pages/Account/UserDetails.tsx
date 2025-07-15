// import React from 'react'
// import ProfileFieldCard from '../../../component/ProfileFieldCard'
// import { Divider } from '@mui/material'

// const UserDetails = () => {
//   return (
//     <div className='flex justify-center py-10'>
       

//         <div className='w-full lg:w-[70%]'>
//             <div className='flex items-center pb-3 justify-between'>
//                 <h1 className='text-2xl font-bold text-gray-700'>Personal Details</h1>
//             </div>
//             <div className='space-y-3'>
//                 <ProfileFieldCard keys="Name" value={"John Doe"} />
//                 <Divider orientation="horizontal" flexItem />
//                 <ProfileFieldCard keys="Email" value="example1@mail.in" />
//                 <Divider orientation="horizontal" flexItem />
//                 <ProfileFieldCard keys="Phone" value="+91 1234567890" />
//                 <Divider orientation="horizontal" flexItem />
//                 <ProfileFieldCard keys="Address" value="123 Main St, City, Country" />
//                 <Divider orientation="horizontal" flexItem />
//                 <ProfileFieldCard keys="Date of Birth" value="01 Jan 1990" />

//             </div>

//         </div>

//     </div>
//   )
// }

// export default UserDetails

import React from 'react';
import ProfileFieldCard from '../../../component/ProfileFieldCard';
import { Divider } from '@mui/material';
import Auth from '../Auth/Auth';
import { useAppSelector } from '../../../State/Store';



const UserDetails = () => {
      const {auth} = useAppSelector(store => store);
  return (
    <div className="flex justify-center py-10 bg-gray-100 min-h-screen">
      <div className="w-full lg:w-[70%] bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <div className="flex items-center pb-4 justify-between border-b border-gray-300">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        </div>

        <div className="space-y-4">
          <ProfileFieldCard keys="Name" value={auth.user?.fullName ?? ""} />
          <ProfileFieldCard keys="Email" value={auth.user?.email ?? ""} />
          <ProfileFieldCard keys="Phone" value={auth.user?.mobile ?? ""}/>
          <ProfileFieldCard keys="Alternate Phone" value={auth.user?.mobile ?? ""} />
          <ProfileFieldCard keys="Address" value="501, Green Park Apartments, Mumbai, India" />
          <ProfileFieldCard keys="Date of Birth" value="15 Aug 1994" />
          <ProfileFieldCard keys="Gender" value="Male" />
          <ProfileFieldCard keys="Loyalty Tier" value="Gold" />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
