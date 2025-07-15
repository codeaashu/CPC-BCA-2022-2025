import { Button } from '@mui/material'
import React, { useState } from 'react'
import DealTable from './DealTable'
import DealCategoryTable from './DealCategoryTable'
import CreateDealForm from './CreateDealForm'

const tabs = [
  "Deals",
  "Category",
  "Create Deal",
]

const Deal = () => {
  const [activeTab, setActiveTab] = useState("Deals")
  return (
    <div>
      <div className='flex gap-4'>
        {tabs.map((item) => <Button onClick={()=>setActiveTab(item)} variant={activeTab==item?"contained":"outlined"}>{item}</Button>)}
      </div>
      <div className='mt-5'>
        {activeTab == "Deals" ? (<DealTable/>) : activeTab == "Category" ? (
          <DealCategoryTable/>):(
            <div className='mt-5 flex flex-col justify-center items-center h-[70vh]'>
              <CreateDealForm/>
            </div>
          )}
      </div>
    </div>
  )
}

export default Deal