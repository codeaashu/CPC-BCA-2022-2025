import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/Pages/Home';
import Login from '@/Pages/Auth/Login';
import Register from '@/Pages/Auth/Register';
import Dashboard from '@/Pages/Dashboard';
import AddBlog from '@/Pages/Blog/AddBlog';
import EditBlog from '@/Pages/Blog/EditBlog';
import SingleBlogDetails from '@/Pages/Blog/SingleBlogdetails';
import CategoryBlogs from '@/Pages/Blog/CategoryBlogs';
import Comments from '@/Pages/Comments';
import Users from '@/Pages/Users';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'add-blog', element: <AddBlog /> },
            { path: 'edit-blog/:blogid', element: <EditBlog /> },
            { path: 'blog/:categorySlug/:blogSlug', element: <SingleBlogDetails /> },
            { path: 'category/:categorySlug', element: <CategoryBlogs /> },
            { path: 'comments', element: <Comments /> },
            { path: 'users', element: <Users /> }
        ]
    }
]);

export default router; 