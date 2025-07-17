import React from 'react';
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/helpers/getEnv';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import usericon from '@/assets/images/avatar.png';
import moment from 'moment';

const CommentList = ({ props }) => {
    const { data: comments, loading, refetch } = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get/${props.blogid}`, {
        method: 'get',
        credentials: 'include'
    }, [props.newComment]);

    if (loading) return <div>Loading comments...</div>;

    const commentCount = comments?.comments?.length || 0;

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
                {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
            </h3>
            
            {comments && comments.comments && comments.comments.map(comment => (
                <div key={comment._id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage 
                            src={comment.user?.avatar || usericon} 
                            alt={comment.user?.name || 'User'}
                        />
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{comment.user?.name || 'Anonymous'}</p>
                            <span className="text-sm text-gray-500">
                                {moment(comment.createdAt).format('DD-MM-YYYY')}
                            </span>
                        </div>
                        <p className="mt-1 text-gray-600">{comment.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentList; 