import React, { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/helpers/getEnv';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { showToast } from '@/helpers/showToast';

const LikeCount = ({ blogId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const user = useSelector((state) => state.user);
    
    // Get the current user's ID from Redux state
    const userId = user?.user?._id;
    
    const { data: likeData, loading, refetch } = useFetch(
        `${getEnv('VITE_API_BASE_URL')}/blog-like/get-like/${blogId}/${userId || ''}`, 
        {
            method: 'get',
            credentials: 'include'
        }, 
        [blogId, userId]
    );

    // Check if user has liked the blog
    useEffect(() => {
        if (likeData?.isUserliked !== undefined) {
            setIsLiked(likeData.isUserliked);
        }
    }, [likeData]);

    const handleLike = async () => {
        if (!user || !user.isLoggedIn) {
            showToast('error', 'Please login to like this blog');
            return;
        }

        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog-like/do-like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ 
                    blogid: blogId,
                    user: userId 
                })
            });

            if (response.ok) {
                setIsLiked(!isLiked);
                refetch();
                showToast('success', isLiked ? 'Blog unliked' : 'Blog liked');
            } else {
                const data = await response.json();
                showToast('error', data.message || 'Error updating like');
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            showToast('error', 'Error updating like');
        }
    };

    if (loading) return <div className="flex items-center gap-1"><FaRegHeart /> ...</div>;

    return (
        <button 
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-red-500 transition-colors"
            title={user?.isLoggedIn ? (isLiked ? 'Unlike' : 'Like') : 'Login to like'}
        >
            {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            <span>{likeData?.likecount || 0}</span>
        </button>
    );
};

export default LikeCount;  