import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
// import LandingPage from './LandingPage'
import Features from '../components/Features'

const Home = () => {
  return (
    <div>
      <Header />
      <Features />
      <SpecialityMenu />
      <TopDoctors/>
      {/* <LandingPage /> */}
     
      <Banner/>
    
      
    </div>
  )
}

export default Home