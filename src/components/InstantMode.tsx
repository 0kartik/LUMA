import React, { useState } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { expandInstantPrompt } from '../utils/promptGenerator';

interface InstantModeProps {
  onComplete: (input: string) => void;
  onBack: () => void;
}

export function InstantMode({ onComplete, onBack }: InstantModeProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onComplete(input.trim());
    }
  };

  const examplePrompts = [
    'Help me debug a React component that won\'t render',
    'Write compelling landing page copy for my SaaS product',
    'Explain machine learning concepts in simple terms',
    'Create a study plan for learning Python programming',
    'Generate ideas for a sci-fi short story'
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Zap className="h-6 w-6 text-amber-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Instant Mode
        </h2>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Describe what you want in one line, and LUMA will automatically expand it into a complete 7-step prompt with intelligent defaults.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What do you want help with?
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Help me debug a React component that's not rendering properly..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:text-white resize-none"
            autoFocus
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
          >
            Back to Mode Selection
          </button>
          
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex items-center px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
          >
            Generate Prompt
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </form>

      {/* Example Prompts */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Try these examples:
        </h3>
        <div className="space-y-2">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setInput(example)}
              className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}