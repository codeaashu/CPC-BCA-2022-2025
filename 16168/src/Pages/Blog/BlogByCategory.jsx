import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/helpers/getEnv';
import BlogCard from '@/components/BlogCard';
import Loading from '@/components/Loading';

const BlogByCategory = () => {
    const { categorySlug } = useParams();
    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blog-by-category/${categorySlug}`, {
        method: 'get',
        credentials: 'include'
    });

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error loading blogs</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
            <div className="container mx-auto px-4 py-8">
                {blogData?.categoryData && (
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-purple-800 mb-2">
                            {blogData.categoryData.name}
                        </h1>
                        <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogData?.blog?.length > 0 ? (
                        blogData.blog.map(blog => (
                            <div key={blog._id} className="transform hover:-translate-y-1 transition-transform duration-300">
                                <BlogCard blog={blog} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-16">
                            <p className="text-xl text-purple-600 mb-4">No blogs found in this category</p>
                            <div className="w-16 h-1 bg-purple-400 rounded-full"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogByCategory; 