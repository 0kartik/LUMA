import React from 'react';
import { templates, templateCategories } from '../data/templates';
import { Template } from '../types';

interface TemplatesProps {
  onTemplateSelect: (template: Template) => void;
}

export function Templates({ onTemplateSelect }: TemplatesProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Start with a Template
      </h2>
      
      {templateCategories.map(category => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {templates
              .filter(template => template.category === category)
              .map(template => (
                <button
                  key={template.id}
                  onClick={() => onTemplateSelect(template)}
                  className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{template.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {template.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}