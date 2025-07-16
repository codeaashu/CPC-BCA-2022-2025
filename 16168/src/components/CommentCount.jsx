import React from 'react';
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/helpers/getEnv';
import { FaRegComments } from 'react-icons/fa';

const CommentCount = ({ props }) => {
    const { data: countData, loading } = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get-count/${props.blogid}`, {
        method: 'get',
        credentials: 'include'
    });

    if (loading) return <div className="flex items-center gap-1"><FaRegComments /> ...</div>;

    const count = countData?.commentCount || 0;

    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">
                {count} {count === 1 ? 'Comment' : 'Comments'}
            </span>
        </div>
    );
};

export default CommentCount; 