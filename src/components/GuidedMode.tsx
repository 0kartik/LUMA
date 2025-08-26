import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { PromptData } from '../types';
import { promptSteps } from '../utils/promptGenerator';

interface GuidedModeProps {
  initialData?: Partial<PromptData>;
  onComplete: (data: PromptData) => void;
  onBack: () => void;
}

export function GuidedMode({ initialData, onComplete, onBack }: GuidedModeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PromptData>({
    role: initialData?.role || '',
    task: initialData?.task || '',
    context: initialData?.context || '',
    format: initialData?.format || '',
    constraints: initialData?.constraints || '',
    examples: initialData?.examples || '',
    iteration: initialData?.iteration || ''
  });

  const handleNext = () => {
    if (currentStep < promptSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleInputChange = (field: keyof PromptData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const currentPromptStep = promptSteps[currentStep];
  const progress = ((currentStep + 1) / promptSteps.length) * 100;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Progress Bar */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Step {currentStep + 1} of {promptSteps.length}: {currentPromptStep.title}
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(progress)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between mt-4">
          {promptSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}
            >
              {index < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="p-6">
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {currentPromptStep.description}
          </p>
          
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {currentPromptStep.title}
            {currentPromptStep.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
          
          <textarea
            value={formData[currentPromptStep.id as keyof PromptData]}
            onChange={(e) => handleInputChange(currentPromptStep.id as keyof PromptData, e.target.value)}
            placeholder={currentPromptStep.placeholder}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white resize-none"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
        <button
          onClick={handlePrev}
          className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {currentStep === 0 ? 'Back to Mode Selection' : 'Previous'}
        </button>
        
        <button
          onClick={handleNext}
          disabled={currentPromptStep.required && !formData[currentPromptStep.id as keyof PromptData]}
          className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {currentStep === promptSteps.length - 1 ? 'Generate Prompt' : 'Next'}
          {currentStep < promptSteps.length - 1 && (
            <ChevronRight className="h-4 w-4 ml-1" />
          )}
        </button>
      </div>
    </div>
  );
}