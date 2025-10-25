
import React, { useState } from 'react';
import { SocialPost, SocialUser, SocialGroup } from '../types';
import Card from '../components/ui/Card';
import CreatePost from '../components/social/CreatePost';
import PostCard from '../components/social/PostCard';
import GroupCard from '../components/social/GroupCard';
import FriendSuggestionCard from '../components/social/FriendSuggestionCard';

const currentUser: SocialUser = {
  name: 'Jane Doe',
  username: 'janedoe_health',
  avatarUrl: 'https://picsum.photos/id/237/100/100',
};

const mockPosts: SocialPost[] = [
  {
    id: '1',
    author: { name: 'Dr. Emily Carter', username: 'dremily', avatarUrl: 'https://picsum.photos/id/1027/100/100' },
    timestamp: '2h',
    content: 'Just read a fascinating study on the benefits of intermittent fasting for metabolic health. The key is consistency and finding a schedule that works for you. #health #nutrition #fasting',
    likes: 128,
    comments: 15,
  },
  {
    id: '2',
    author: { name: 'Alex Fitness', username: 'alexfit', avatarUrl: 'https://picsum.photos/id/1005/100/100' },
    timestamp: '5h',
    content: 'Crushed my morning workout! Nothing beats that post-exercise feeling. Remember to listen to your body and rest when you need to. Here’s a shot from my run today.',
    imageUrl: 'https://picsum.photos/seed/run/600/400',
    likes: 256,
    comments: 32,
  },
  {
    id: '3',
    author: { name: 'Jane Doe', username: 'janedoe_health', avatarUrl: 'https://picsum.photos/id/237/100/100' },
    timestamp: '1d',
    content: 'Feeling great after a week of consistent medication reminders and healthy eating. This app is really helping me stay on track with my goals!',
    likes: 78,
    comments: 9,
  },
];

const mockGroups: SocialGroup[] = [
  {
    id: 'g1',
    name: 'Healthy Eaters Club',
    description: 'Sharing recipes and tips for a nutritious diet.',
    memberCount: 1200,
    bannerUrl: 'https://picsum.photos/seed/food/300/100',
  },
  {
    id: 'g2',
    name: 'Marathon Runners',
    description: 'Training plans, race reports, and motivation.',
    memberCount: 854,
    bannerUrl: 'https://picsum.photos/seed/running/300/100',
  },
  {
    id: 'g3',
    name: 'Mindfulness & Meditation',
    description: 'A space to discuss practices for mental clarity.',
    memberCount: 2300,
    bannerUrl: 'https://picsum.photos/seed/zen/300/100',
  },
];

const mockFriendSuggestions: SocialUser[] = [
  {
    name: 'Mike Runner',
    username: 'mikeruns',
    avatarUrl: 'https://picsum.photos/id/1011/100/100',
  },
  {
    name: 'Sarah Cooks',
    username: 'sarahcooks',
    avatarUrl: 'https://picsum.photos/id/1025/100/100',
  },
  {
    name: 'David Gym',
    username: 'davidgym',
    avatarUrl: 'https://picsum.photos/id/1012/100/100',
  },
];

const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts);

  const handlePost = (content: string) => {
    const newPost: SocialPost = {
      id: Date.now().toString(),
      author: currentUser,
      timestamp: 'Just now',
      content: content,
      likes: 0,
      comments: 0,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Left Sidebar - Profile */}
      <aside className="lg:col-span-1 space-y-6 hidden lg:block">
        <Card className="p-5 text-center sticky top-8">
          <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-24 h-24 rounded-full mx-auto border-4 border-slate-700" />
          <h2 className="text-xl font-bold text-white mt-4">{currentUser.name}</h2>
          <p className="text-sm text-slate-400">@{currentUser.username}</p>
          <div className="flex justify-around mt-4 text-sm">
            <div>
              <p className="font-bold text-white">125</p>
              <p className="text-slate-400">Following</p>
            </div>
            <div>
              <p className="font-bold text-white">432</p>
              <p className="text-slate-400">Followers</p>
            </div>
          </div>
        </Card>
      </aside>

      {/* Main Feed */}
      <main className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold text-white">Health Community</h1>
        <CreatePost currentUser={currentUser} onPost={handlePost} />
        <div className="space-y-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>

      {/* Right Sidebar - Suggestions */}
      <aside className="lg:col-span-1 space-y-6 hidden lg:block">
        <div className="sticky top-8 space-y-6">
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-white mb-2">Who to Follow</h3>
            <div className="space-y-1">
              {mockFriendSuggestions.map(user => (
                <FriendSuggestionCard key={user.username} user={user} />
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-white mb-4">Discover Groups</h3>
            <div className="space-y-4">
              {mockGroups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-white mb-4">Trending Topics</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-sky-400 hover:underline cursor-pointer">#MindfulEating</li>
              <li className="text-sky-400 hover:underline cursor-pointer">#HIITWorkout</li>
              <li className="text-sky-400 hover:underline cursor-pointer">#DigitalDetox</li>
              <li className="text-sky-400 hover:underline cursor-pointer">#SleepHygiene</li>
            </ul>
          </Card>
        </div>
      </aside>
    </div>
  );
};

export default SocialFeed;
