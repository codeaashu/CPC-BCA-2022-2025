import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchTechNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_GNEWS_API_KEY;
        const res = await axios.get(
          `https://gnews.io/api/v4/top-headlines?topic=technology&lang=en&country=in&max=6&apikey=${apiKey}`
        );
        setBlogs(res.data.articles);
      } catch (err) {
        console.error("Failed to load tech blogs:", err);
      }
    };

    fetchTechNews();
  }, []);

  return (
    <>
      <Navbar />
      <motion.div
        className="max-w-6xl mx-auto py-16 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-orange-500">Latest Tech Blogs</h1>

        {blogs.length === 0 ? (
          <p className="text-gray-500">Loading real-time tech articles...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((blog, index) => (
              <div key={index} className="p-5 rounded-lg bg-white shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{blog.source.name} • {blog.publishedAt.slice(0, 10)}</p>
                <p className="text-gray-600 text-sm mb-3">{blog.description}</p>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline text-sm font-medium"
                >
                  Read Full Blog →
                </a>
              </div>
            ))}
          </div>
        )}
      </motion.div>
      <Footer />
    </>
  );
};

export default Blog;
