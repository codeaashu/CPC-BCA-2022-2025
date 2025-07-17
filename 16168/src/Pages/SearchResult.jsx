import BlogCard from '@/components/BlogCard'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import RelatedBlog from '@/components/RelatedBlog'
import { Link } from 'react-router-dom'

const SearchResult = () => {
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q')
    
    const { data: searchData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/search?q=${encodeURIComponent(q)}`, {
        method: 'get',
        credentials: 'include'
    }, [q])

    // Get the category from the first blog if available
    const firstBlogCategory = searchData?.blogs?.[0]?.category?.slug

    return (
        <div className='flex gap-8'>
            {/* Main Content */}
            <div className='flex-1'>
                <div className='flex flex-col gap-3 border-b pb-3 mb-5'>
                    <h4 className='text-2xl font-bold text-violet-500'>Search Results for: "{q}"</h4>
                    {searchData?.categories?.length > 0 && (
                        <div className='flex gap-2 flex-wrap'>
                            <span className='text-gray-600'>Matching categories:</span>
                            {searchData.categories.map(category => (
                                <Link 
                                    key={category._id}
                                    to={`/category/${category.slug}`}
                                    className='text-violet-600 hover:text-violet-800 transition-colors'
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
                    {loading ? (
                        <div className="col-span-full text-center py-10">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-violet-500 border-t-transparent"></div>
                        </div>
                    ) : error ? (
                        <div className="col-span-full text-center text-red-500 py-10">
                            Error: {error.message}
                        </div>
                    ) : searchData?.blogs?.length > 0 ? (
                        searchData.blogs.map(blog => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-10">
                            No results found for "{q}"
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar using existing RelatedBlog component */}
            <div className='lg:w-[380px] hidden lg:block'>
                {firstBlogCategory && (
                    <RelatedBlog 
                        category={firstBlogCategory} 
                        currentBlog={searchData?.blogs?.[0]?.slug}
                    />
                )}
            </div>
                                                                                
        </div>
    )
}

export default SearchResult
