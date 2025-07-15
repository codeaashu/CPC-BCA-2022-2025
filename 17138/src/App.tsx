import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, ThemeProvider } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Navbar from './customer/components/Navbar/Navbar';
import customeTheme from './theme/customeTheme';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';
import ProductDetails from './customer/pages/Page Details/ProductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import { Check } from '@mui/icons-material';
import Checkout from './customer/pages/checkout/Checkout';
import Account from './customer/pages/Account/Account';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BecomeSeller from './customer/pages/Become Seller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import AdminDashboard from './admin/Pages/Dashboard/AdminDashboard';
import { fetchProduct } from './State/fetchProduct';
import store, { useAppDispatch, useAppSelector } from './State/Store';
import { fetchSellerProfile } from './State/seller/sellerSlice';
import Auth from './customer/pages/Auth/Auth';
import Wishlist from './customer/pages/Account/Wishlist';
import { fetchUserProfile } from './State/AuthSlice';


function App() {
  const dispatch = useAppDispatch();
  const {seller,auth} = useAppSelector(store =>store)
  const navigate = useNavigate();

//   useEffect(() => {
//   const jwt = localStorage.getItem("jwt");
//   if (jwt) {
//     dispatch(fetchSellerProfile(jwt));
//   }
// }, []);

// useEffect(() => {
//   if (seller.profle) {
//     navigate("/seller");
//   }
// }, [seller.profle]);

// useEffect(() => {
//   const jwt = localStorage.getItem("jwt");
//   if (!jwt && window.location.pathname.startsWith("/seller")) {
//     navigate("/");
//   }
// }, []);



  // useEffect(() => {
  //   dispatch(fetchSellerProfile(localStorage.getItem('jwt') || ''));
  //   fetchProduct()
  // }, []);

// useEffect(() => {
//   const jwt = localStorage.getItem('jwt');
//   if (jwt) {
//     dispatch(fetchSellerProfile(jwt));
//   }
// }, []);



  useEffect(() => {
    if (seller.profile) {
      navigate('/seller');
    }
  }, [seller.profile]);

//   useEffect(() => {
//   const jwt = localStorage.getItem('jwt');
//   if (seller.profle && jwt) {
//     navigate('/seller');
//   }
// }, [seller.profle]);




  useEffect(()=>{
    dispatch(fetchUserProfile({jwt: auth.jwt || localStorage.getItem('jwt') }));
  },[auth.jwt])
  

  return (
    
      
      <ThemeProvider theme={customeTheme}>
        <div>
          
          {/* <Home /> */}
          {/* <Product /> */}
          {/* <ProductDetails/> */}
          {/* <Review /> */}
          {/* <Cart /> */}
          {/* <Checkout /> */}
          {/* <Account /> */}

          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/product/:category" element={<Product />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/review" element={<Review />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account/*" element={<Account />} />
            <Route path="/become-seller" element={<BecomeSeller/>} />
            <Route path="/seller/*" element={<SellerDashboard/>} />
            <Route path="/admin/*" element={<AdminDashboard/>} />
            {/* <Route path="/product-details/:category/:title/:productId" element={<ProductDetails />} /> */}

            {/* Add more routes as needed */}
          </Routes>
        </div>
        
      </ThemeProvider>
      
      

    
  );
}

export default App;


// import React, { useEffect } from 'react';
// import { ThemeProvider } from '@mui/material';
// import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

// import customeTheme from './theme/customeTheme';
// import Navbar from './customer/components/Navbar/Navbar';

// import Home from './customer/pages/Home/Home';
// import Product from './customer/pages/Product/Product';
// import ProductDetails from './customer/pages/Page Details/ProductDetails';
// import Review from './customer/pages/Review/Review';
// import Cart from './customer/pages/Cart/Cart';
// import Checkout from './customer/pages/checkout/Checkout';
// import Account from './customer/pages/Account/Account';
// import BecomeSeller from './customer/pages/Become Seller/BecomeSeller';
// import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
// import AdminDashboard from './admin/Pages/Dashboard/AdminDashboard';
// import Auth from './customer/pages/Auth/Auth';
// import Wishlist from './customer/pages/Account/Wishlist';

// import { useAppDispatch, useAppSelector } from './State/Store';
// import { fetchSellerProfile } from './State/seller/sellerSlice';
// import { fetchUserProfile } from './State/AuthSlice';

// function App() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { seller, auth } = useAppSelector((store) => store);

//   // 🧠 Fetch seller profile if JWT exists
//   useEffect(() => {
//     const jwt = localStorage.getItem('jwt');
//     if (jwt) {
//       dispatch(fetchSellerProfile(jwt));
//     }
//   }, [dispatch]);

//   // 🧠 Fetch customer profile (for /account or general auth)
//   useEffect(() => {
//     const jwt = auth.jwt || localStorage.getItem('jwt');
//     if (jwt) {
//       dispatch(fetchUserProfile({ jwt }));
//     }
//   }, [auth.jwt, dispatch]);

//   // 🔁 Redirect seller to /seller if profile is loaded
//   useEffect(() => {
//     if (seller.profile && location.pathname === '/login') {
//       navigate('/seller');
//     }
//   }, [seller.profile, navigate, location.pathname]);

//   // 🔒 Restrict access to /seller if not logged in as seller
//   useEffect(() => {
//     const jwt = localStorage.getItem('jwt');
//     if (!jwt && location.pathname.startsWith('/seller')) {
//       navigate('/login');
//     }
//   }, [location.pathname, navigate]);

//   return (
//     <ThemeProvider theme={customeTheme}>
//       <div>
//         <Navbar />

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/wishlist" element={<Wishlist />} />
//           <Route path="/login" element={<Auth />} />
//           <Route path="/product/:category" element={<Product />} />
//           <Route path="/product-details/:id" element={<ProductDetails />} />
//           <Route path="/review" element={<Review />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/account/*" element={<Account />} />
//           <Route path="/become-seller" element={<BecomeSeller />} />

//           {/* Seller and Admin dashboards */}
//           <Route path="/seller/*" element={<SellerDashboard />} />
//           <Route path="/admin/*" element={<AdminDashboard />} />
//         </Routes>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;
