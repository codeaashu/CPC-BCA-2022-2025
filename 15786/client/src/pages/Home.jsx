import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import Category from "../components/Category";
import Hero from "../components/Hero";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div  className="mt-10">
      <Hero />
      <Category/>
      < BestSeller/>
      < BottomBanner/>
       <NewsLetter/>
      </div>
  );
};

export default Home;