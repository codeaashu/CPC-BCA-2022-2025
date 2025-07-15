import React from 'react'
import AdminDrawerList from '../../Component/AdminDrawerList'
import AdminRoutes from '../../../Routes/AdminRoutes';

const AdminDashboard = () => {
  const toggleDrawer = () => {
    // Logic to toggle the drawer
    console.log("Drawer toggled");
  };
  return (
    <div>
        <div className='lg:flex lg:h-[90vh]'>

            <section className="hidden lg:block h-full">
                <AdminDrawerList toggleDrawer={toggleDrawer}/>
            </section>
            <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
                <AdminRoutes/>
            </section>

        </div>
    </div>
  )
}

export default AdminDashboard