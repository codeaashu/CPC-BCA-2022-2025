import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { teal } from "@mui/material/colors";
import { Button, Divider } from "@mui/material";
import { Add, AddShoppingCart, FavoriteBorder, LocalShipping, Remove, Shield, Wallet, WorkspacePremium } from "@mui/icons-material";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../State/customer/ProductSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const {productId} = useParams<{productId: string}>();
  const {product} = useAppSelector(store => store)
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(()=>{
    if (productId) {
    dispatch(fetchProductById(Number(productId)))
    }
  },[productId, dispatch])

  const handleActiveImage = (value:number)=>()=>{
    setActiveImage(value)
  }

  // const images = [
  //   "https://m.media-amazon.com/images/I/61HS4sTDnPL._SY741_.jpg",
  //   "https://m.media-amazon.com/images/I/61XSVitox-L._SY741_.jpg",
  //   "https://m.media-amazon.com/images/I/61U0B7tRy+L._SY741_.jpg",
  //   "https://m.media-amazon.com/images/I/51P1YW2yAGL._SY741_.jpg",
  // ];
  return (
    <div className="px-5 lg:px-20 pt-20">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {/* {[1,1,1,1].map((item)=><img 
              className='lg:w-full w-[50px] cursor-pointer rounded-md'
              src='https://m.media-amazon.com/images/I/61HS4sTDnPL._SY741_.jpg' alt=''/>)} */}
            {product.product?.images.map((item,index) => (
              <img 
                onClick={handleActiveImage(index)}
                className="lg:w-full w-[50px] cursor-pointer rounded-md"
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md"
              // src="https://m.media-amazon.com/images/I/61HS4sTDnPL._SY741_.jpg"
              src={product.product?.images[activeImage]}
              alt=""
            />
          </div>
        </section>

        <section>
          <h1 className="font-bold text-lg text-primary-color">
            {/* R Clothing */}{product.product?.seller?.businessDetails.businessName}
            </h1>
          <p className="text-gray-600 font-bold a-size-large">
            {/* Men's Irregular Geometric Pattern and Alphabet Print Sports Collar Tshirt (Rizim Temu Print Polo-Blue) */}
            {product.product?.title}
            </p>
          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <StarIcon sx={{ color: teal[500], fontSize: "17px" }} />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>234 Ratings</span>
          </div>
          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
            <span className="font-sans text-gray-800">
              {/* ₹ 400 */}
              ₹ {product.product?.sellingprice}
              </span>
            <span className="line-through text-gray-400">
              ₹ {product.product?.mrpprice}
              {/* 999 */}
              </span>
            <span className="text-primary-color font-semibold">
              {/* 60 */} {product.product?.discountPercent}
              % off</span>
          </div>
          <p className="text-sm">Inclusive of all taxes. Free Shipping above ₹1500</p>
          </div>

            <div className="mt-7 space-y-3">

              <div className="flex items-center gap-4">
                  <Shield sx={{color:teal[500]}}/>
                  <p>Authenic & Quality Assured</p>
              </div>

              <div className="flex items-center gap-4">
                  <WorkspacePremium sx={{color:teal[500]}}/>
                  <p>100% money back gurantee </p>
              </div>

              <div className="flex items-center gap-4">
                  <LocalShipping sx={{color:teal[500]}}/>
                  <p>Free Shiping & Return</p>
              </div>

              <div className="flex items-center gap-4">
                  <Wallet sx={{color:teal[500]}}/>
                  <p>Pay on delivery might be available</p>
              </div>

            </div>

            <div className="mt-7 space-y-2">
                <h1>
                  Quantity
                </h1>
                <div className="flex items-center gap-2 w-[140px] justify-between">
                    <Button disabled={quantity===1} onClick={()=>setQuantity(quantity-1)}>
                      <Remove/>
                    </Button>
                    <span>{quantity}</span>
                    <Button onClick={()=>setQuantity(quantity+1)}>
                      <Add/>
                    </Button>
                </div>
            </div>

            <div className="mt-12 flex items-center gap-5">

              <Button 
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCart/>}
              sx={{py:"1rem"}}>
                Add To Bag

              </Button>

              <Button 
              fullWidth
              variant="outlined"
              startIcon={<FavoriteBorder/>}
              sx={{py:"1rem"}}>
                Wishlist

              </Button>

            </div>

            <div className="mt-5">
              <p>Stay stylish and comfortable with this geometric-patterned polo T-shirt made from soft cotton. Designed with a flat collar, short sleeves, and a regular fit, it’s perfect for casual wear. Easy to maintain with regular machine wash. Made in India by KAFF Apparels.</p>
            </div>

            <div className="mt-7 space-y-5">
              <ReviewCard/>
              <Divider className="my-5" />
            </div>

        </section>
      </div>

      <div className="mt-20">
        <h1 className="text-lg font-bold">
          Similar Product
        </h1>
        <div className="pt-5">
          <SimilarProduct/>
        </div>
        
      </div>
    </div>
  );
};

export default ProductDetails;
