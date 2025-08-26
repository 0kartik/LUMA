import React from 'react';
import { Sun, Moon, Lightbulb } from 'lucide-react';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
}

export function Header({ theme, onThemeToggle }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Lightbulb className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div className="absolute inset-0 bg-blue-400 dark:bg-blue-300 rounded-full opacity-20 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                LUMA
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                AI Prompt Engineering Tool
              </p>
            </div>
          </div>
          
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}