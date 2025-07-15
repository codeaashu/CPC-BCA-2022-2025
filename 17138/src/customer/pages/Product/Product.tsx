import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";
import { Product } from "../../../types/ProductTypes";

const Products = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState<string>();
  const [page,setPage]=useState(1);
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParam] = useSearchParams("");
  const {category}= useParams();
  const {product}=useAppSelector(store => store);

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };

  const handlePageChange = (value:number) => {
    setPage(value)
  }

  useEffect(() => {
    const [minPrice, maxPrice] = searchParam.get("price")?.split("-") || [];
   

    const color = searchParam.get("color") || "";
    const size = searchParam.get("size") || "";
    const minDiscount= searchParam.get("discount") ?Number(searchParam.get("discount")) : 0;

    const pageNumber = page - 1; 

    const newFilter = {
      color: color ||"",
      size: size,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minDiscount,
      pageNumber,
      category: category,
    }
    dispatch(fetchAllProducts(newFilter));
    dispatch(fetchAllProducts({}));
  }
  , [category,searchParam,dispatch,page]);

  return (
    <div className="-z-10 mt-10">
      <div>
        <h1
          className="text-3xl text-center font-bold text-gray-600 pb-5 px-9
            uppercase space-x-2"
        >
          <span className="text-primary-color">Products</span>
          <span className="text-gray-700 font-serif">List</span>
        </h1>
      </div>

      <div className="lg:flex">
        <section className="filter_section hidden lg:block w-[20%]">
          <FilterSection />
        </section>

        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex items-center justify-between px-9 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton>
                  <FilterAlt />
                </IconButton>
              )}
              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>

            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleSortChange}
              >
                <MenuItem value={"price_low"}>Price: Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price: High - Low</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />
          <section className="products_section grid sm:grid-cols-2 
          md:grid-cols-3 lg:grid-cols-4  gap-y-5 px-5 justify-center">
            {product.products.map((item)=><ProductCard item={item}/>)}
          </section>
          <div className="flex justify-center py-10">
                <Pagination 
                onChange={(e,value) =>handlePageChange(value)}
                count={10} variant="outlined" 
                color="primary"/>
              </div>
        </div>

              

      </div>
    </div>
  );
};

export default Products;
