
import React, { useState } from 'react';
import { SocialUser } from '../../types';

interface FriendSuggestionCardProps {
  user: SocialUser;
}

const FriendSuggestionCard: React.FC<FriendSuggestionCardProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3 overflow-hidden">
        <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="overflow-hidden">
          <p className="font-semibold text-white text-sm truncate">{user.name}</p>
          <p className="text-xs text-slate-400 truncate">@{user.username}</p>
        </div>
      </div>
      <button
        onClick={handleFollow}
        className={`text-sm font-semibold py-1 px-4 rounded-full transition-colors flex-shrink-0 ${
          isFollowing
            ? 'bg-slate-600 text-white'
            : 'bg-sky-500 text-white hover:bg-sky-400'
        }`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

export default FriendSuggestionCard;
