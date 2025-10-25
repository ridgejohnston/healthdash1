
import React, { useState, useCallback } from 'react';
import { searchWithGoogle } from '../../services/geminiService';
import { SearchResult } from '../../types';
import { ICONS } from '../../constants';
import Spinner from './Spinner';
import Card from './Card';

interface GeneralSearchProps {
  context: string;
}

const GeneralSearch: React.FC<GeneralSearchProps> = ({ context }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const searchResult = await searchWithGoogle(query, context);
      if (searchResult) {
        setResult(searchResult);
      } else {
        setError('Failed to get a result. Please check your API key and try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [query, context]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Research {context}
      </h3>
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {ICONS.search}
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask anything about ${context}...`}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            aria-label={`Search about ${context}`}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <Spinner size="sm" /> : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-400 mt-4">{error}</p>}
      
      {result && (
        <div className="mt-6 space-y-4 text-slate-300">
          <h4 className="font-semibold text-white">AI Summary:</h4>
          <p className="whitespace-pre-wrap">{result.summary}</p>
          
          {result.sources && result.sources.length > 0 && (
            <div>
              <h5 className="font-semibold text-white mt-6 mb-3">Web Results</h5>
              <div className="space-y-3">
                {result.sources.map((source, index) => (
                  source.web && (
                    <div key={index} className="bg-slate-700/50 p-3 rounded-lg transition-colors hover:bg-slate-700">
                      <a
                        href={source.web.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <p className="font-semibold text-sky-400 group-hover:underline truncate">
                          {source.web.title || "Untitled Source"}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {source.web.uri}
                        </p>
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

export default GeneralSearch;
