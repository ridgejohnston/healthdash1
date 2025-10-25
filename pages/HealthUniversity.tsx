
import React, { useState, useEffect, useCallback } from 'react';
import { HealthArticle } from '../types';
import { fetchHealthArticles } from '../services/geminiService';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import { ICONS } from '../constants';
import GeneralSearch from '../components/ui/GeneralSearch';

const allTopics = ['Cardiology', 'Nutrition', 'Fitness', 'Mental Health', 'Longevity', 'Endocrinology', 'Neurology'];

const HealthUniversity: React.FC = () => {
  const [articles, setArticles] = useState<HealthArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [userTopics, setUserTopics] = useState<string[]>(['Nutrition', 'Fitness', 'Longevity']);

  const loadArticles = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const fetchedArticles = await fetchHealthArticles(userTopics);
      setArticles(fetchedArticles);
      if (fetchedArticles.length === 0) {
        setError('Could not fetch articles. Your API key might be missing or invalid.');
      }
    } catch (err) {
      setError('An error occurred while fetching articles.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userTopics]);

  useEffect(() => {
    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTopics]);

  const toggleTopic = (topic: string) => {
    setUserTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Health University</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-white mb-4">My Topics</h2>
            <div className="flex flex-wrap gap-2">
              {allTopics.map(topic => (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                    userTopics.includes(topic) ? 'bg-sky-600 text-white' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4">Select topics to personalize your article feed.</p>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <GeneralSearch context="General Health and Medical Research" />
          
          <h2 className="text-2xl font-bold text-white">Latest Articles For You</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <Card className="p-6 text-center text-red-400">{error}</Card>
          ) : (
            <div className="space-y-4">
              {articles.map((article, index) => (
                <Card key={index} className="p-5 hover:border-sky-500 transition-colors">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="group">
                    <p className="text-sm font-semibold text-sky-400">{article.source}</p>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:underline">{article.title}</h3>
                    <p className="text-slate-300 mt-2 text-sm">{article.summary}</p>
                  </a>
                  <div className="flex gap-4 mt-4">
                    <button className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors">
                      {ICONS.like}
                      <span className="text-xs">More like this</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors">
                      {ICONS.dislike}
                      <span className="text-xs">Less like this</span>
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthUniversity;
