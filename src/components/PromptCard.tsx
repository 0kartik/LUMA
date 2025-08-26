import React, { useState } from 'react';
import { Copy, Download, Save, Edit3, Check, AlertTriangle, CheckCircle } from 'lucide-react';
import { GeneratedPrompt, OutputFormat, ValidationResult } from '../types';

interface PromptCardProps {
  prompt: GeneratedPrompt;
  validation: ValidationResult;
  onSave: (prompt: GeneratedPrompt) => void;
  onExport: (prompt: GeneratedPrompt, format: 'text' | 'json') => void;
  onEdit: () => void;
}

export function PromptCard({ prompt, validation, onSave, onExport, onEdit }: PromptCardProps) {
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('human');
  const [copiedState, setCopiedState] = useState<'none' | 'human' | 'machine'>('none');

  const copyToClipboard = async (text: string, type: 'human' | 'machine') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState(type);
      setTimeout(() => setCopiedState('none'), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getValidationColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getValidationIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <AlertTriangle className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Validation Results */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          {getValidationIcon(validation.score)}
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Prompt Quality Score: 
            <span className={`ml-2 font-bold ${getValidationColor(validation.score)}`}>
              {validation.score}/100
            </span>
          </h3>
        </div>
        
        {validation.warnings.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">
              Issues to Address:
            </h4>
            <ul className="space-y-1">
              {validation.warnings.map((warning, index) => (
                <li key={index} className="text-sm text-red-600 dark:text-red-400 flex items-start">
                  <span className="mr-2">•</span>
                  {warning}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {validation.suggestions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2">
              Suggestions for Improvement:
            </h4>
            <ul className="space-y-1">
              {validation.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-blue-600 dark:text-blue-400 flex items-start">
                  <span className="mr-2">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Generated Prompt */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Generated Prompt
          </h3>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              title="Edit prompt"
            >
              <Edit3 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Output Format Toggle */}
        <div className="flex space-x-1 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setOutputFormat('human')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
              outputFormat === 'human'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Human-Optimized
          </button>
          <button
            onClick={() => setOutputFormat('machine')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
              outputFormat === 'machine'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Machine-Optimized
          </button>
        </div>

        {/* Prompt Content */}
        <div className="relative">
          <pre className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm whitespace-pre-wrap overflow-x-auto border border-gray-200 dark:border-gray-700">
            <code className="text-gray-900 dark:text-gray-100">
              {outputFormat === 'human' ? prompt.humanOptimized : prompt.machineOptimized}
            </code>
          </pre>
          
          <button
            onClick={() => copyToClipboard(
              outputFormat === 'human' ? prompt.humanOptimized : prompt.machineOptimized,
              outputFormat
            )}
            className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
            title="Copy to clipboard"
          >
            {copiedState === outputFormat ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={() => onSave(prompt)}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <Save className="h-4 w-4 mr-2" />
            Save to Library
          </button>
          
          <button
            onClick={() => onExport(prompt, 'text')}
            className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Export as Text
          </button>
          
          <button
            onClick={() => onExport(prompt, 'json')}
            className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Export as JSON
          </button>
        </div>
      </div>
    </div>
  );
}