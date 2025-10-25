
import React from 'react';
import { SocialGroup } from '../../types';

interface GroupCardProps {
  group: SocialGroup;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <div className="bg-slate-700/50 rounded-lg overflow-hidden transition-transform hover:scale-105">
      <img src={group.bannerUrl} alt={`${group.name} banner`} className="w-full h-16 object-cover" />
      <div className="p-3">
        <h4 className="font-bold text-white truncate">{group.name}</h4>
        <p className="text-xs text-slate-400">{group.memberCount.toLocaleString()} members</p>
        <button className="w-full mt-3 bg-sky-600 text-white font-semibold text-sm py-1 rounded-full hover:bg-sky-500 transition-colors">
          Join
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
