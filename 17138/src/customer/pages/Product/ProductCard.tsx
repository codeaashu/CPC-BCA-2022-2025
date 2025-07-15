import React, { use, useEffect, useState } from 'react'
import './ProductCard.css'; // Assuming you have a CSS file for styling
import { Button } from '@mui/material';
import { Favorite, ModeComment } from '@mui/icons-material';
import { pink, teal } from '@mui/material/colors';
import { dark } from '@mui/material/styles/createPalette';
import { Product } from '../../../types/ProductTypes';
import { useNavigate } from 'react-router-dom';

// const images = [
//         "https://m.media-amazon.com/images/I/61HS4sTDnPL._SY741_.jpg",
//         "https://m.media-amazon.com/images/I/61XSVitox-L._SY741_.jpg",
//         "https://m.media-amazon.com/images/I/51P1YW2yAGL._SY741_.jpg",
//         "https://m.media-amazon.com/images/I/61OgwPCLMsL._SY741_.jpg",
//         "https://m.media-amazon.com/images/I/61U0B7tRy+L._SY741_.jpg"
//     ];

const ProductCard = ({item}:{item:Product}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    // const intervalRef = useRef<any>(null);

    useEffect(() => {

        let interval:any

        if (isHovered) 
        {
            interval = setInterval(() => 
            {
                setCurrentImage((prev) => (prev + 1) % item.images.length);
            }, 1000); 
        }
            else if(interval) 
            {
                clearInterval(interval);
                interval = null;
            }
        return () => clearInterval(interval);
    },[isHovered])

  return (
    <>
        {/* <div onClick={()=>navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)} className="group px-4 relative"> */}
                <div onClick={()=>navigate(`/product-details/${item.category?.categoryId}`)} className="group px-4 relative">
            <div className='card'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>

                {item.images.map((item,index) => <img 
                className='card-media object-top'
                    src={item}
                    alt=""
                    style={{transform:`translateX(${(index-currentImage)*100}%)`}}
                    />)}

                   {isHovered && <div className='indicator flex flex-col items-center space-y-2'>
                        <div className='flex gap-3'>
                            <Button variant='contained' color='secondary' >
                                <Favorite sx={{color:pink[500]}}/>
                            </Button>
                            <Button variant='contained' color='secondary' >
                                <ModeComment sx={{color:teal[500]}}/>
                            </Button>
                        </div>
                    </div>
                    }
            </div>
            <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
                    <div className='name'>
                        <h1>{item.seller?.businessDetails.businessName}</h1>
                        <p>{item.title}</p>
                    </div>
                    <div className='price flex items-center gap-3'>
                        <span className='font-sans text-gray-800'>
                            ₹ {item.sellingprice}
                            </span>
                            <span className='thin-line-through text-gray-400'>
                            ₹ {item.mrpprice}
                            </span>
                            <span className='text-primary-color font-semibold'>
                            {item.discountPercent}% off

                            </span>
                    </div>
            </div>
        </div>
    </>
  )
}

export default ProductCard