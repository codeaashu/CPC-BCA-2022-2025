import React from 'react';
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/helpers/getEnv';
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '@/helpers/RouteName';
import { Card } from './ui/card';
import { FaRegHeart } from 'react-icons/fa';
import { BiComment } from 'react-icons/bi';
import moment from 'moment';

const RelatedBlog = ({ category, currentBlog }) => {
    if (!category) {
        return null;
    }

    const { data: relatedBlogs, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-related-blog/${category}/${currentBlog || 'none'}`, {
        method: 'get',
        credentials: 'include'
    }, [category, currentBlog]);

    if (loading) return <div className="p-4 text-gray-500">Loading related blogs...</div>;
    if (error) return null;
    if (!relatedBlogs || !relatedBlogs.relatedBlog || relatedBlogs.relatedBlog.length === 0) return null;

    // Get remaining blogs
    const remainingBlogs = relatedBlogs.relatedBlog.slice(0, 5);

    if (remainingBlogs.length === 0) return null;

    return (
        <Card className="p-8 bg-white rounded-2xl shadow-xl mb-8 animate-fade-in">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 border-b pb-4 text-center tracking-tight">Related Blogs</h3>
            <div className="space-y-6">
                {remainingBlogs.map((blog, idx) => (
                    <Link 
                        key={blog._id} 
                        to={RouteBlogDetails(blog.category?.slug || category, blog.slug)}
                        className="group block"
                        style={{ animationDelay: `${idx * 80}ms` }}
                    >
                        <div className="flex gap-4 items-center bg-gray-50 rounded-xl p-2 transition-all duration-300 hover:bg-violet-50 hover:shadow-lg hover:scale-[1.03] hover:-translate-y-1">
                            <img 
                                src={blog.featuredImage} 
                                alt={blog.title}
                                className="w-24 h-16 object-cover rounded-lg flex-shrink-0 group-hover:opacity-90 transition-opacity"
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-base font-semibold line-clamp-2 group-hover:text-violet-600 transition-colors text-gray-800 mb-1">
                                    {blog.title}
                                </h4>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>{moment(blog.createdAt).format('MMM DD, YYYY')}</span>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <FaRegHeart className="text-gray-400" />
                                            <span>0</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BiComment className="text-gray-400" />
                                            <span>0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
    );
};

export default RelatedBlog;
