import React from 'react';
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/helpers/getEnv';
import { Button } from '@/components/ui/button';
import { FaRegTrashAlt, FaRegCommentDots, FaUser, FaCalendarAlt, FaBlog } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import moment from 'moment';
import usericon from '@/assets/images/avatar.png';
import { Link } from 'react-router-dom';
import { RouteBlogDetails, RouteSignIn } from '@/helpers/RouteName';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from 'react-redux';

// Array of color classes for different users
const userColors = [
  'text-red-600',
  'text-blue-600',
  'text-green-600',
  'text-purple-600',
  'text-orange-600',
  'text-teal-600',
  'text-pink-600',
  'text-indigo-600'
];

const Comments = () => {
  const user = useSelector((state) => state.user);
  const { data, loading, error, refetch } = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get-all-comment`, {
    method: 'get',
    credentials: 'include'
  });

  // Function to get color based on username
  const getUserColor = (username) => {
    // Create a simple hash of the username to get a consistent color
    const hash = username.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return userColors[hash % userColors.length];
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
    if (!confirmDelete) return;
    const res = await fetch(`${getEnv('VITE_API_BASE_URL')}/comment/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (res.ok) refetch();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <div className="flex items-center gap-3 mb-2">
            <FaRegCommentDots 
              className="text-4xl text-violet-500" 
              style={{ 
                animation: 'bounce 1s infinite'
              }} 
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900"
              style={{ 
                animation: 'fadeIn 0.5s ease-out'
              }}
          >
            All Comments
          </h1>
        </div>

        {!user.isLoggedIn ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-red-500 text-lg mb-4 animate-fadeIn font-semibold drop-shadow-lg">You must be logged in to view comments</p>
            <Button asChild className="px-3 py-1 text-xs bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold rounded-full shadow-lg animate-bounce transition-transform duration-20 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-200">
              <Link to={RouteSignIn} className="flex items-center gap-2"><span>Sign In</span></Link>
            </Button>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
          </div>
        ) : error ? (
          <div className="text-center p-8 text-red-500">Error loading comments</div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-violet-100">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-violet-50 via-violet-100 to-violet-50">
                  <TableHead className="py-5">
                    <div className="flex items-center gap-2 text-violet-700">
                      <FaUser className="text-xl text-violet-400" />
                      <span className="text-lg font-semibold">User</span>
                    </div>
                  </TableHead>
                  <TableHead className="py-5">
                    <div className="flex items-center gap-2 text-violet-700">
                      <BiMessageSquareDetail className="text-xl text-violet-400" />
                      <span className="text-lg font-semibold">Comment</span>
                    </div>
                  </TableHead>
                  <TableHead className="py-5">
                    <div className="flex items-center gap-2 text-violet-700">
                      <FaBlog className="text-xl text-violet-400" />
                      <span className="text-lg font-semibold">Blog Post</span>
                    </div>
                  </TableHead>
                  <TableHead className="py-5">
                    <div className="flex items-center gap-2 text-violet-700">
                      <FaCalendarAlt className="text-xl text-violet-400" />
                      <span className="text-lg font-semibold">Date</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-right py-5">
                    <div className="flex items-center justify-end gap-2 text-violet-700">
                      <span className="text-lg font-semibold">Action</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.comments?.length > 0 ? (
                  data.comments.map((comment, idx) => (
                    <TableRow 
                      key={comment._id}
                      className="cursor-pointer hover:underline"
                      style={{
                        animation: `fadeIn 0.3s ease-out ${idx * 0.1}s backwards`
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img 
                            src={comment.user?.avatar || usericon} 
                            alt={comment.user?.name} 
                            className="w-8 h-8 rounded-full border-2 border-violet-200 hover:border-violet-400 transition-all duration-300 hover:scale-110"
                          />
                          <span className={`font-medium uppercase ${getUserColor(comment.user?.name || 'Unknown')}`}>
                            {comment.user?.name || 'Unknown'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="text-gray-900 font-medium line-clamp-2">
                          {comment.comment}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-900 font-medium">
                          {comment.blogid?.title ? comment.blogid.title : <span className="text-blue-400 italic">Deleted Blog</span>}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <span className="text-gray-900 font-medium">
                          {moment(comment.createdAt).format('MMM DD, YYYY')}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-red-500 transition-all duration-300"
                          onClick={() => handleDelete(comment._id)}
                        >
                          <FaRegTrashAlt />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <FaRegCommentDots className="mx-auto h-12 w-12 text-violet-300 mb-3 animate-pulse" />
                      <p className="text-gray-500 text-lg">No comments found</p>
                      <p className="text-gray-400 mt-1">Be the first one to comment!</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments; 