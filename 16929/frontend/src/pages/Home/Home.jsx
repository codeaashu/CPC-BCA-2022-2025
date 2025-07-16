import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner'
import SpecialOffer from '../../components/SpecialOffer/SpecialOffer'
import AboutHome from '../../components/AboutHome/AboutHome'
import OurMenuHome from '../../components/OurMenuHome/OurMenuHome'
import Footer from '../../components/Footer/Footer'

const Home = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <SpecialOffer />
            <AboutHome />
            <OurMenuHome />
            <Footer />
        </>
    )
}

export default Home