import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Press = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_GNEWS_API_KEY;
        const res = await axios.get(`https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=6&apikey=${apiKey}`);
        setArticles(res.data.articles);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Navbar />
      <motion.div
        className="max-w-5xl mx-auto px-6 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">In the Press</h1>
        <p className="text-gray-600 mb-6">See how CareerConnect is making headlines across India.</p>

        {articles.length === 0 ? (
          <p className="text-gray-500">Loading news...</p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {articles.map((article, index) => (
              <li
                key={index}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{article.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{article.publishedAt?.slice(0, 10)} - {article.source.name}</p>
                <p className="text-gray-700 text-sm mb-4">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline text-sm font-medium"
                >
                  Read Full Article →
                </a>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
      <Footer />
    </>
  );
};

export default Press;
