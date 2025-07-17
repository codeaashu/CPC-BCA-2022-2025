import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import { useSelector } from 'react-redux';
import Landing from './Pages/Landing';

import Index from './Pages/Index';
import SignIn from './Pages/SignIn';
import Signup from './Pages/SignUp';
import Profile from './Pages/Profile';

import AddCategory from './Pages/Category/AddCategory';
import EditCategory from './Pages/Category/EditCategory';
import CategoryDetails from './Pages/Category/CategoryDetails';
import AddBlog from './Pages/Blog/AddBlog';
import BlogDetails from './Pages/Blog/BlogDetail';
import EditBlog from './Pages/Blog/EditBlog';
import BlogByCategory from './Pages/Blog/BlogByCategory';
import SingleBlogDetails from './Pages/Blog/SingleBlogDetails';
import TestBlog from './Pages/Blog/TestBlog';
import Comments from './Pages/Comments';
import Users from './Pages/Users';

import { 
  RouteAddCategory, 
  RouteBlog, 
  RouteBlogAdd, 
  RouteBlogEdit, 
  RouteBlogByCategory, 
  RouteCategoryDetails, 
  RouteEditCategory, 
  RouteIndex, 
  RouteProfile, 
  RouteSignIn, 
  RouteSignup, 
  RouteBlogDetails,
  RouteUser
} from './helpers/RouteName';

const App = () => {
  const user = useSelector((state) => state.user);
  if (!user.isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout ko parent route banaya */}
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />
          
          {/* Blog Category */}
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} /> 

          {/* Blog */}
          <Route path={RouteBlogAdd} element={<AddBlog />} />
          <Route path={RouteBlog} element={<BlogDetails />} />
          <Route path={RouteBlogEdit()} element={<EditBlog />} /> 
          <Route path="/blog/category/:categorySlug" element={<BlogByCategory />} />
          
          {/* Blog Detail Route */}
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path="/test-blog" element={<TestBlog />} />
          {/* Users Route */}
          <Route path={RouteUser} element={<Users />} />
        </Route>

        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignup} element={<Signup />} />
        <Route path="/comments" element={<Comments />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
