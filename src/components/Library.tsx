import React, { useState } from 'react';
import { Trash2, Copy, Download, Search, Calendar, Tag } from 'lucide-react';
import { GeneratedPrompt } from '../types';

interface LibraryProps {
  prompts: GeneratedPrompt[];
  onDeletePrompt: (id: string) => void;
  onExportPrompt: (prompt: GeneratedPrompt, format: 'text' | 'json') => void;
}

export function Library({ prompts, onDeletePrompt, onExportPrompt }: LibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.humanOptimized.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || prompt.template === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(prompts.map(p => p.template).filter(Boolean)));

  if (prompts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
        <div className="text-gray-400 dark:text-gray-600 mb-4">
          <Tag className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No saved prompts yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Create your first prompt using Guided or Instant mode, then save it to your library.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Your Prompt Library ({prompts.length})
      </h2>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPrompts.map((prompt) => (
          <div
            key={prompt.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                {prompt.title}
              </h3>
              <div className="flex space-x-2 ml-2">
                <button
                  onClick={() => copyToClipboard(prompt.humanOptimized)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  title="Copy prompt"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onExportPrompt(prompt, 'text')}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  title="Export prompt"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDeletePrompt(prompt.id)}
                  className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  title="Delete prompt"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {prompt.template && (
              <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full mb-2">
                {prompt.template}
              </span>
            )}
            
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3">
              {prompt.humanOptimized.substring(0, 150)}...
            </p>
            
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="h-3 w-3 mr-1" />
              {prompt.createdAt.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {filteredPrompts.length === 0 && searchQuery && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            No prompts found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}