export interface PromptStep {
  id: string;
  title: string;
  description: string;
  placeholder: string;
  value: string;
}

export interface PromptData {
  id: string;
  name: string;
  steps: {
    role: string;
    task: string;
    context: string;
    format: string;
    constraints: string;
    examples: string;
    iteration: string;
  };
  createdAt: Date;
  template?: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  steps: Partial<PromptData['steps']>;
}

export type OutputFormat = 'human' | 'machine';
export type Mode = 'guided' | 'instant';

export interface ValidationResult {
  isValid: boolean;
  score: number;
  suggestions: string[];
  strengths: string[];
}