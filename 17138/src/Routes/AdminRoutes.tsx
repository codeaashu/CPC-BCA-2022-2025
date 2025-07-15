import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellersTable from '../admin/Pages/Sellers/SellersTable'
import Coupon from '../admin/Pages/Coupon/Coupon'
import AddNewCouponForm from '../admin/Pages/Coupon/AddNewCouponForm'
import GridTable from '../admin/Pages/HomePage/GridTable'
import ElectronicTable from '../admin/Pages/HomePage/ElectronicTable'
import ShopByCategory from '../admin/Pages/HomePage/ShopByCategory'
import Deal from '../admin/Pages/HomePage/Deal'

const AdminRoutes = () => {
  return (
    <div>
        <Routes>

            <Route path='/'element={<SellersTable />} />
            <Route path='/coupon'element={<Coupon />} />
            <Route path='/add-coupon'element={<AddNewCouponForm />} />
            <Route path='/home-grid'element={<GridTable />} />
            <Route path='/electronics-category'element={<ElectronicTable />} />
            <Route path='/shop-by-category'element={<ShopByCategory />} />
            <Route path='/deals'element={<Deal />} />


        </Routes>
    </div>
  )
}

export default AdminRoutes