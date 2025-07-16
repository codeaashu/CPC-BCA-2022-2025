import React, { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { getEnv } from '@/helpers/getEnv';
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '@/helpers/RouteName';
import { Card } from './ui/card';
import moment from 'moment';

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef(null);

    // Fetch recent blogs when component mounts
    useEffect(() => {
        const fetchRecentBlogs = async () => {
            try {
                const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-all`, {
                    // Removing credentials requirement for public access
                });
                const data = await response.json();
                // Take only the first 5 blogs as recent blogs
                setRecentBlogs((data.blog || []).slice(0, 5));
            } catch (error) {
                console.error('Error fetching recent blogs:', error);
            }
        };
        fetchRecentBlogs();
    }, []);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        setLoading(true);
        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/search?q=${encodeURIComponent(searchTerm)}`, {
                // Removing credentials requirement for public access
            });
            const data = await response.json();
            setSearchResults(data.blogs || []);
        } catch (error) {
            console.error('Error searching blogs:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) handleSearch();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputFocus = () => {
        setShowDropdown(true);
    };

    const highlightMatch = (text, term) => {
        if (!term) return text;
        const regex = new RegExp(`(${term})`, 'gi');
        return text.split(regex).map((part, i) =>
            regex.test(part) ? <mark key={i} className="bg-yellow-200 rounded px-0.5">{part}</mark> : part
        );
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Search blogs by title, category, or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={handleInputFocus}
                    className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-base"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            </div>

            {showDropdown && (
                <Card className="absolute w-full mt-2 bg-white shadow-xl rounded-lg overflow-hidden z-50 border border-gray-200 max-h-[80vh] overflow-y-auto">
                    {loading ? (
                        <div className="p-4 text-center text-gray-500">
                            <div className="animate-pulse flex justify-center items-center space-x-2">
                                <div className="h-2.5 w-2.5 bg-violet-400 rounded-full animate-bounce"></div>
                                <div className="h-2.5 w-2.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                                <div className="h-2.5 w-2.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                            </div>
                        </div>
                    ) : searchTerm ? (
                        searchResults.length > 0 ? (
                            <div className="divide-y">
                                {searchResults.map((blog) => (
                                    <Link
                                        key={blog._id}
                                        to={`/blog/${blog.category?.slug}/${blog.slug}`}
                                        className="block p-4 hover:bg-gray-50 transition-colors"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            {highlightMatch(blog.title, searchTerm)}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <BiCategory className="text-violet-500" />
                                                {blog.category?.name}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt className="text-violet-500" />
                                                {moment(blog.createdAt).format('MMM D, YYYY')}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaUser className="text-violet-500" />
                                                {blog.author?.name}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                No results found for "{searchTerm}"
                            </div>
                        )
                    ) : (
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-700 mb-3">Recent Blogs</h3>
                            <div className="divide-y">
                                {recentBlogs.map((blog) => (
                                    <Link
                                        key={blog._id}
                                        to={`/blog/${blog.category?.slug}/${blog.slug}`}
                                        className="block py-2 hover:bg-gray-50 transition-colors"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <h4 className="font-medium text-gray-900">{blog.title}</h4>
                                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                            <span className="flex items-center gap-1">
                                                <BiCategory />
                                                {blog.category?.name}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt />
                                                {moment(blog.createdAt).format('MMM D, YYYY')}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
};

export default SearchBox;
