
import React, { useState } from 'react';
import Card from '../ui/Card';
import { ICONS } from '../../constants';
import { SocialUser } from '../../types';

interface CreatePostProps {
  currentUser: SocialUser;
  onPost: (content: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ currentUser, onPost }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onPost(content.trim());
      setContent('');
    }
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-700 border-slate-600 rounded-lg p-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              rows={3}
              placeholder="What's on your mind?"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 pl-16">
          <div className="flex items-center space-x-4 text-slate-400">
            <button type="button" className="hover:text-sky-400">{ICONS.image}</button>
            {/* Add other media buttons here */}
          </div>
          <button
            type="submit"
            disabled={!content.trim()}
            className="bg-sky-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            Post
          </button>
        </div>
      </form>
    </Card>
  );
};

export default CreatePost;
