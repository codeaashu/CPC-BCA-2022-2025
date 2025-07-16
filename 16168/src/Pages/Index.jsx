import BlogCard from '@/components/BlogCard';
import Loading from '@/components/Loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'

const Index = () => {
    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-all`, {
        method: 'get',
    });

    if (loading) return <Loading />;
    if (error) return (
        <div className="text-center text-red-500 py-10">
            Error loading blogs. Please try again.
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-white py-12 px-2">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 animate-fade-in-up">
                    {blogData?.blog?.length > 0 ? (
                        blogData.blog
                          .filter(blog => blog && blog.category && blog.slug)
                          .map((blog, idx) => (
                            <div
                                key={blog._id}
                                className="transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                                style={{ animationDelay: `${idx * 80}ms` }}
                            >
                                <BlogCard blog={blog} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            No blogs found. Be the first to create one!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Index;
