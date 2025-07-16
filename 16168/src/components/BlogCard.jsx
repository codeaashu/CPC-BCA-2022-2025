import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from "@/components/ui/badge";
import { Avatar } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import usericon from '@/assets/images/avatar.png';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '@/helpers/RouteName';

const BlogCard = ({ blog }) => {
    // Check if blog and necessary fields are present
    if (!blog || !blog.category || !blog.slug) {
        return <div>Invalid blog data</div>;
    }

    return (
        <Link to={RouteBlogDetails(blog.category?.slug, blog.slug)}>
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white h-full border-0">
                <CardContent className="p-0">
                    <div className="relative">
                        <img 
                            src={blog.featuredImage} 
                            alt={blog.title} 
                            className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-white/90 text-black font-medium px-3 py-1">
                                {blog.category.name}
                            </Badge>
                        </div>
                    </div>

                    <div className="p-5">
                        {/* Title */}
                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                            {blog.title}
                        </h2>

                        {/* Author Info */}
                        <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-8 w-8 border border-gray-200">
                                <AvatarImage src={blog.author?.avatar || usericon} />
                            </Avatar>
                            <div className="flex items-center gap-1">
                                <FaRegUser className="text-gray-900 text-sm" />
                                <span className="text-sm text-gray-700">
                                    {blog.author?.name}
                                </span>
                            </div>
                        </div>

                        {/* Date and Time */}
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <FaRegCalendarAlt className="text-gray-900" />
                                <span>{moment(blog.createdAt).format('DD MMM, YYYY')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <HiOutlineClock className="text-gray-900" />
                                <span>{moment(blog.createdAt).format('hh:mm A')}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default BlogCard;
