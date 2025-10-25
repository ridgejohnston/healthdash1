
import React, { useState, useEffect, useCallback } from 'react';
import { fetchRecipeArticles } from '../../services/geminiService';
import { SearchResult } from '../../types';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';

interface NewsFeedProps {
  ingredients: string[];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ ingredients }) => {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticles = useCallback(async () => {
    if (ingredients.length === 0) {
      setResult(null);
      return;
    }
    setIsLoading(true);
    const searchResult = await fetchRecipeArticles(ingredients);
    setResult(searchResult);
    setIsLoading(false);
  }, [ingredients]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchArticles();
    }, 500);
    return () => clearTimeout(debounce);
  }, [fetchArticles]);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Recipe & Article Feed</h2>
      {isLoading ? (
        <div className="flex justify-center"><Spinner /></div>
      ) : !result ? (
        <p className="text-slate-400">Select a day with meals to see relevant articles.</p>
      ) : (
        <div className="space-y-4 text-slate-300">
          <h4 className="font-semibold text-white">AI Summary:</h4>
          <p className="whitespace-pre-wrap text-sm">{result.summary}</p>
          
          {result.sources && result.sources.length > 0 && (
            <div>
              <h5 className="font-semibold text-white mt-4 mb-2">Related Articles:</h5>
              <div className="space-y-3">
                {result.sources.map((source, index) => (
                  source.web && (
                    <div key={index} className="bg-slate-700/50 p-3 rounded-lg transition-colors hover:bg-slate-700">
                      <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="group">
                        <p className="font-semibold text-sky-400 group-hover:underline truncate text-sm">{source.web.title || "Untitled Source"}</p>
                        <p className="text-xs text-slate-400 truncate">{source.web.uri}</p>
                      </a>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default NewsFeed;
