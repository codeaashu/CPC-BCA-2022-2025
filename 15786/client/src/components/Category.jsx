import { useContext } from "react";
import { categories } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Category = () => {
    const{navigate}=useContext(AppContext);
  return (
    <div className="mt-16">
        <p className="text-2xl font-medium md:text-3xl">Categories</p>
        <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 md:grid-cols-7 gap-4 items-center justify-center">
            {categories.map((category,index)=>(
                <div 
                onClick={()=>{
                    navigate(`/products/${category.path.toLowerCase()}`);
                    scrollTo(0, 0);
                }}
                key={index}
                 className={"group cursor-pointer py-5 px-3 rounded-lg gap-2 flex flex-col items-center justify-center"}
                 style={{backgroundColor:category.bgColor}}
                 >
                    <img
                     src={category.image}
                      alt=""
                      className="max-w-28 transition group-hover:scale-110"/>
                    <p className="text-sm font-medium">{category.text}</p>
                 </div>
            ))}
        </div>
    </div>
  );
};

export default Category;