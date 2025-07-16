import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/helpers/getEnv';
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '@/helpers/RouteName';
import { Card, CardContent } from '@/components/ui/card';
import moment from 'moment';
import Loading from '@/components/Loading';

const CategoryBlogs = () => {
    const { categorySlug } = useParams();

    const { data, loading, error } = useFetch(
        `${getEnv('VITE_API_BASE_URL')}/blog/get-blog-by-category/${categorySlug}`,
        {
            method: 'get',
            credentials: 'include'
        },
        [categorySlug]
    );

    if (loading) return <Loading />;
    if (error) return <div className="text-center text-red-500">Error loading blogs</div>;
    if (!data?.blog || data.blog.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                No blogs found in this category
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 pb-4 border-b">
                {data.categoryData.name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.blog.map(blog => (
                    <Link 
                        key={blog._id}
                        to={RouteBlogDetails(blog.category.slug, blog.slug)}
                    >
                        <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                            <div className="aspect-video overflow-hidden">
                                <img 
                                    src={blog.featuredImage} 
                                    alt={blog.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <CardContent className="p-4">
                                <h2 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                                    {blog.title}
                                </h2>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <img 
                                            src={blog.author.avatar} 
                                            alt={blog.author.name}
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <span>{blog.author.name}</span>
                                    </div>
                                    <span>•</span>
                                    <time>{moment(blog.createdAt).format('MMM D, YYYY')}</time>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryBlogs; 