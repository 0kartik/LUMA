import React from 'react';
import { Compass, Zap } from 'lucide-react';
import { Mode } from '../types';

interface ModeSelectorProps {
  selectedMode: Mode;
  onModeChange: (mode: Mode) => void;
}

export function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Choose Your Mode
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onModeChange('guided')}
          className={`p-6 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
            selectedMode === 'guided'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <div className="flex items-center space-x-3 mb-3">
            <Compass className={`h-6 w-6 ${
              selectedMode === 'guided' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <span className={`text-lg font-medium ${
              selectedMode === 'guided' ? 'text-blue-900 dark:text-blue-200' : 'text-gray-900 dark:text-gray-100'
            }`}>
              Guided Mode
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-left">
            Step-by-step wizard that walks you through the 7-step framework with helpful guidance at each stage.
          </p>
        </button>
        
        <button
          onClick={() => onModeChange('instant')}
          className={`p-6 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
            selectedMode === 'instant'
              ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <div className="flex items-center space-x-3 mb-3">
            <Zap className={`h-6 w-6 ${
              selectedMode === 'instant' ? 'text-amber-600' : 'text-gray-400'
            }`} />
            <span className={`text-lg font-medium ${
              selectedMode === 'instant' ? 'text-amber-900 dark:text-amber-200' : 'text-gray-900 dark:text-gray-100'
            }`}>
              Instant Mode
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-left">
            Enter one line and LUMA will automatically expand it into a complete 7-step prompt with smart defaults.
          </p>
        </button>
      </div>
    </div>
  );
}