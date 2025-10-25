
import React, { useState } from 'react';
import Card from '../ui/Card';
import { SocialPost } from '../../types';
import { ICONS } from '../../constants';

interface PostCardProps {
  post: SocialPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Card className="p-5">
      <div className="flex items-start space-x-4">
        <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-white">{post.author.name}</p>
              <p className="text-sm text-slate-400">@{post.author.username} · {post.timestamp}</p>
            </div>
            <button className="text-slate-400 hover:text-sky-400">
              {ICONS.more}
            </button>
          </div>
          <p className="mt-3 text-slate-300 whitespace-pre-wrap">{post.content}</p>
          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post content" className="mt-4 rounded-xl border border-slate-700" />
          )}
          <div className="flex justify-between items-center mt-4 text-slate-400">
            <button className="flex items-center space-x-2 hover:text-sky-400">
              {ICONS.comment}
              <span>{post.comments}</span>
            </button>
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
            >
              <span className={isLiked ? 'fill-current' : ''}>{ICONS.like}</span>
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-400">
              {ICONS.share}
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
