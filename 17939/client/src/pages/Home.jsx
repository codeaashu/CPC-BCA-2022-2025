import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import JobListing from '../components/JobListing'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <JobListing />
      <AppDownload />
      <Footer />
    </div>
  )
}

export default Home