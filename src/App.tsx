import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { Templates } from './components/Templates';
import { GuidedMode } from './components/GuidedMode';
import { InstantMode } from './components/InstantMode';
import { PromptCard } from './components/PromptCard';
import { Library } from './components/Library';
import { Mode, Theme, PromptData, GeneratedPrompt, Template } from './types';
import { generatePrompt, validatePrompt, expandInstantPrompt } from './utils/promptGenerator';
import { savePrompt, getStoredPrompts, deletePrompt, exportPrompt, saveTheme, getStoredTheme } from './utils/storage';
import { BookOpen, Home, Lightbulb } from 'lucide-react';

type AppState = 'mode-selection' | 'templates' | 'guided' | 'instant' | 'result' | 'library';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('mode-selection');
  const [selectedMode, setSelectedMode] = useState<Mode>('guided');
  const [theme, setTheme] = useState<Theme>('light');
  const [promptData, setPromptData] = useState<PromptData>({
    role: '',
    task: '',
    context: '',
    format: '',
    constraints: '',
    examples: '',
    iteration: ''
  });
  const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedPrompt | null>(null);
  const [savedPrompts, setSavedPrompts] = useState<GeneratedPrompt[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Initialize theme and load saved prompts
  useEffect(() => {
    const savedTheme = getStoredTheme();
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    
    setSavedPrompts(getStoredPrompts());
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveTheme(theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleModeChange = (mode: Mode) => {
    setSelectedMode(mode);
    if (mode === 'guided') {
      setCurrentState('templates');
    } else {
      setCurrentState('instant');
    }
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setPromptData(prevData => ({
      ...prevData,
      ...template.data
    }));
    setCurrentState('guided');
  };

  const handleSkipTemplates = () => {
    setCurrentState('guided');
  };

  const handleGuidedComplete = (data: PromptData) => {
    setPromptData(data);
    generateAndShowPrompt(data, selectedTemplate?.name);
  };

  const handleInstantComplete = (input: string) => {
    const expandedData = expandInstantPrompt(input);
    setPromptData(expandedData);
    generateAndShowPrompt(expandedData);
  };

  const generateAndShowPrompt = (data: PromptData, templateName?: string) => {
    const { human, machine } = generatePrompt(data);
    const prompt: GeneratedPrompt = {
      id: Date.now().toString(),
      title: data.task.substring(0, 50) + (data.task.length > 50 ? '...' : ''),
      humanOptimized: human,
      machineOptimized: machine,
      data,
      template: templateName,
      createdAt: new Date()
    };
    
    setGeneratedPrompt(prompt);
    setCurrentState('result');
  };

  const handleSavePrompt = (prompt: GeneratedPrompt) => {
    savePrompt(prompt);
    setSavedPrompts(getStoredPrompts());
  };

  const handleDeletePrompt = (id: string) => {
    deletePrompt(id);
    setSavedPrompts(getStoredPrompts());
  };

  const handleExportPrompt = (prompt: GeneratedPrompt, format: 'text' | 'json') => {
    exportPrompt(prompt, format);
  };

  const handleEditPrompt = () => {
    if (selectedMode === 'guided') {
      setCurrentState('guided');
    } else {
      setCurrentState('instant');
    }
  };

  const resetToHome = () => {
    setCurrentState('mode-selection');
    setPromptData({
      role: '',
      task: '',
      context: '',
      format: '',
      constraints: '',
      examples: '',
      iteration: ''
    });
    setGeneratedPrompt(null);
    setSelectedTemplate(null);
  };

  const showLibrary = () => {
    setCurrentState('library');
  };

  const validation = generatedPrompt ? validatePrompt(generatedPrompt.data) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Header theme={theme} onThemeToggle={handleThemeToggle} />
      
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={resetToHome}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                currentState === 'mode-selection' 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </button>
            
            <button
              onClick={showLibrary}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                currentState === 'library'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Library ({savedPrompts.length})
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {currentState === 'mode-selection' && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Lightbulb className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                    <div className="absolute inset-0 bg-blue-400 dark:bg-blue-300 rounded-full opacity-20 animate-pulse"></div>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Welcome to LUMA
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                  Generate high-quality GPT prompts using the proven 7-step framework
                </p>
              </div>
              
              <ModeSelector selectedMode={selectedMode} onModeChange={handleModeChange} />
            </div>
          )}

          {currentState === 'templates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Choose a Template (Optional)
                </h2>
                <button
                  onClick={handleSkipTemplates}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  Skip templates →
                </button>
              </div>
              <Templates onTemplateSelect={handleTemplateSelect} />
            </div>
          )}

          {currentState === 'guided' && (
            <GuidedMode
              initialData={promptData}
              onComplete={handleGuidedComplete}
              onBack={() => selectedTemplate ? setCurrentState('templates') : setCurrentState('mode-selection')}
            />
          )}

          {currentState === 'instant' && (
            <InstantMode
              onComplete={handleInstantComplete}
              onBack={() => setCurrentState('mode-selection')}
            />
          )}

          {currentState === 'result' && generatedPrompt && validation && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Your Generated Prompt
                </h2>
                <button
                  onClick={resetToHome}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  Create Another →
                </button>
              </div>
              
              <PromptCard
                prompt={generatedPrompt}
                validation={validation}
                onSave={handleSavePrompt}
                onExport={handleExportPrompt}
                onEdit={handleEditPrompt}
              />
            </div>
          )}

          {currentState === 'library' && (
            <Library
              prompts={savedPrompts}
              onDeletePrompt={handleDeletePrompt}
              onExportPrompt={handleExportPrompt}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;