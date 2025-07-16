import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Loading from '@/components/Loading';
import moment from 'moment';
import { getEnv } from '@/helpers/getEnv';
import { FaUser, FaRegHeart } from 'react-icons/fa';
import { BiBookBookmark } from 'react-icons/bi';
import { MdDateRange } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [usersRes, blogsRes, likesRes] = await Promise.all([
          fetch(`${getEnv('VITE_API_BASE_URL')}/user/get-all-users`),
          fetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-all`),
          fetch(`${getEnv('VITE_API_BASE_URL')}/blog-like/get-all-likes`),
        ]);
        const usersData = await usersRes.json();
        const blogsData = await blogsRes.json();
        const likesData = await likesRes.json();
        setUsers(usersData.users || []);
        setBlogs(blogsData.blog || []);
        setLikes(likesData.likes || []);
      } catch (err) {
        // handle error
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) return <Loading />;

  // Helper to get user name by id
  const getUserName = (userId) => {
    const user = users.find(u => u._id === userId);
    return user ? user.name : 'Unknown';
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-violet-50 via-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-8 mt-2">
          <FaUsers className="text-5xl text-violet-500 mb-2 drop-shadow-lg" />
          <h1 className="text-4xl font-extrabold text-center text-gray-900 drop-shadow-lg">All Users & Activity</h1>
        </div>
        <Card className="mb-12 p-4 overflow-x-auto shadow-xl rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-violet-700"><BiBookBookmark className="inline text-2xl" /> Blog Posts</h2>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-violet-50 text-violet-700">
                <th className="px-4 py-3 font-semibold text-left"><FaUser className="inline mr-2" />User Name</th>
                <th className="px-4 py-3 font-semibold text-left"><BiBookBookmark className="inline mr-2" />Blog Title</th>
                <th className="px-4 py-3 font-semibold text-left"><MdDateRange className="inline mr-2" />Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 && (
                <tr><td colSpan={3} className="text-center py-8 text-gray-400">No blog posts found</td></tr>
              )}
              {blogs.map(blog => (
                <tr key={blog._id} className="border-b hover:bg-violet-50/50 transition">
                  <td className="px-4 py-3 font-bold text-gray-900">{blog.author?.name || getUserName(blog.author?._id)}</td>
                  <td className="px-4 py-3">{blog.title}</td>
                  <td className="px-4 py-3">{moment(blog.createdAt).format('DD MMM, YYYY hh:mm A')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="mb-12 p-4 overflow-x-auto shadow-xl rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-pink-700"><FaRegHeart className="inline text-2xl" /> Blog Likes</h2>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-pink-50 text-pink-700">
                <th className="px-4 py-3 font-semibold text-left"><FaUser className="inline mr-2" />User Name</th>
                <th className="px-4 py-3 font-semibold text-left"><BiBookBookmark className="inline mr-2" />Liked Blog</th>
                <th className="px-4 py-3 font-semibold text-left"><MdDateRange className="inline mr-2" />Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {likes.length === 0 && (
                <tr><td colSpan={3} className="text-center py-8 text-gray-400">No likes found</td></tr>
              )}
              {likes.map(like => (
                <tr key={like._id} className="border-b hover:bg-pink-50/50 transition">
                  <td className="px-4 py-3 font-bold text-gray-900">{like.user?.name || getUserName(like.user?._id)}</td>
                  <td className="px-4 py-3">{like.blogid?.title || 'Unknown'}</td>
                  <td className="px-4 py-3">{moment(like.createdAt).format('DD MMM, YYYY hh:mm A')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default Users; 