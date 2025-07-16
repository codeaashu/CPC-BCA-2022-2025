import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaBlog } from "react-icons/fa";
import { FaCommentSms } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa";
import { GoDot } from "react-icons/go";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
    const user = useSelector(state => state.user)
    const { data: categoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    })

    return (
        <Sidebar>
            <SidebarHeader className="sidebar h-[08vh] w-[10px] bg-white shadow-lg rounded-lg">
                {/* <img src={logo} /> */}
            </SidebarHeader>
            <SidebarContent className="white">
                <div className="mb-8 px-4">
                    <div className="bg-gradient-to-r from-[#87CEEB] to-[#B0E0E6] rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group">
                        <div className="text-white text-center">
                            <h2 className="text-2xl font-black mb-2 animate-pulse text-gray-800">
                                Explore Blogs & Stories
                            </h2>
                            <p className="text-gray-700 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Discover amazing content
                            </p>
                        </div>
                        <div className="mt-3 flex justify-center">
                            <span className="inline-block animate-bounce text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="group transition-all duration-200 hover:scale-105 hover:bg-violet-50">
                                <FaHome className="text-violet-600 text-xl group-hover:text-violet-800 transition-colors duration-200" />
                                <Link
                                    to="/"
                                    className="text-lg font-bold text-black transition-all duration-200 relative
                                        after:content-[''] after:block after:h-1 after:bg-blue-500 after:rounded-full
                                        after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                                >
                                    Home
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="group transition-all duration-200 hover:scale-105 hover:bg-violet-50">
                                <BiSolidCategoryAlt className="text-gray-500 text-xl group-hover:text-violet-600 transition-colors duration-200" />
                                <Link to={RouteCategoryDetails} className="text-lg font-bold text-black transition-all duration-200 relative after:content-[''] after:block after:h-1 after:bg-violet-600 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Categories</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="group transition-all duration-200 hover:scale-105 hover:bg-violet-50">
                                <FaBlog className="text-gray-500 text-xl group-hover:text-violet-600 transition-colors duration-200" />
                                <Link to={RouteBlog} className="text-lg font-bold text-black transition-all duration-200 relative after:content-[''] after:block after:h-1 after:bg-violet-600 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Blogs</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="group transition-all duration-200 hover:scale-105 hover:bg-violet-50">
                                <FaCommentSms className="text-gray-500 text-xl group-hover:text-violet-600 transition-colors duration-200" />
                                <Link to="/comments" className="text-lg font-bold text-black transition-all duration-200 relative after:content-[''] after:block after:h-1 after:bg-violet-600 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Comments</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="group transition-all duration-200 hover:scale-105 hover:bg-violet-50">
                                <FaUserShield className="text-gray-500 text-xl group-hover:text-violet-600 transition-colors duration-200" />
                                <Link to="/users" className="text-lg font-bold text-black transition-all duration-200 relative after:content-[''] after:block after:h-1 after:bg-violet-600 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Users</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup className="mt-20">
                    <SidebarGroupLabel>
                        <div className="bg-violet-100 p-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 border-l-4 border-violet-500 mb-6">
                            <span className="text-xl font-black text-violet-800 tracking-wide">Categories</span>
                        </div>
                    </SidebarGroupLabel>
                    <SidebarMenu className="mt-4 pl-4">
                        {categoryData && categoryData.category && categoryData.category.length > 0
                            && categoryData.category.map(category => <SidebarMenuItem key={category._id}>
                                <SidebarMenuButton className="group transition-all duration-200 hover:scale-105 hover:bg-violet-50">
                                    <GoDot className="text-gray-500 group-hover:text-violet-600 transition-colors duration-200" />
                                    <Link
                                        to={RouteBlogByCategory(category.slug)}
                                        className="font-bold text-black transition-all duration-200 relative
                                            after:content-[''] after:block after:h-1 after:bg-violet-600 after:rounded-full
                                            after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                                    >
                                        {category.name}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>)
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;