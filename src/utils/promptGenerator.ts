import { PromptData, GeneratedPrompt, ValidationResult } from '../types';

export const promptSteps = [
  {
    id: 'role',
    title: 'Role',
    description: 'Define the AI\'s expertise and persona',
    placeholder: 'You are an expert software engineer with 10+ years of experience...',
    required: true,
    type: 'textarea' as const
  },
  {
    id: 'task',
    title: 'Task',
    description: 'Specify exactly what you want the AI to do',
    placeholder: 'Help me debug this React component that\'s not rendering properly...',
    required: true,
    type: 'textarea' as const
  },
  {
    id: 'context',
    title: 'Context',
    description: 'Provide relevant background information',
    placeholder: 'I\'m building a React app with TypeScript. The component should display user data...',
    required: false,
    type: 'textarea' as const
  },
  {
    id: 'format',
    title: 'Format',
    description: 'Specify how you want the output structured',
    placeholder: 'Provide the corrected code, explain the issue, and suggest improvements...',
    required: false,
    type: 'textarea' as const
  },
  {
    id: 'constraints',
    title: 'Constraints',
    description: 'Set limitations and requirements',
    placeholder: 'Keep the solution under 50 lines, use modern ES6+ syntax, include error handling...',
    required: false,
    type: 'textarea' as const
  },
  {
    id: 'examples',
    title: 'Examples',
    description: 'Provide examples to guide the AI\'s response',
    placeholder: 'Good example: [show desired output]. Bad example: [show what to avoid]...',
    required: false,
    type: 'textarea' as const
  },
  {
    id: 'iteration',
    title: 'Iteration',
    description: 'Instructions for follow-up and refinement',
    placeholder: 'Ask me clarifying questions if anything is unclear. Offer to explain any part in detail...',
    required: false,
    type: 'textarea' as const
  }
];

export function generatePrompt(data: PromptData): { human: string; machine: string } {
  const humanPrompt = generateHumanOptimized(data);
  const machinePrompt = generateMachineOptimized(data);
  
  return {
    human: humanPrompt,
    machine: machinePrompt
  };
}

function generateHumanOptimized(data: PromptData): string {
  let prompt = '';
  
  if (data.role) {
    prompt += `${data.role}\n\n`;
  }
  
  if (data.task) {
    prompt += `**Task:** ${data.task}\n\n`;
  }
  
  if (data.context) {
    prompt += `**Context:** ${data.context}\n\n`;
  }
  
  if (data.format) {
    prompt += `**Required Format:** ${data.format}\n\n`;
  }
  
  if (data.constraints) {
    prompt += `**Constraints:** ${data.constraints}\n\n`;
  }
  
  if (data.examples) {
    prompt += `**Examples:** ${data.examples}\n\n`;
  }
  
  if (data.iteration) {
    prompt += `**Follow-up:** ${data.iteration}`;
  }
  
  return prompt.trim();
}

function generateMachineOptimized(data: PromptData): string {
  const structured = {
    system_role: data.role || '',
    primary_task: data.task || '',
    context_information: data.context || '',
    output_format: data.format || '',
    constraints: data.constraints || '',
    examples: data.examples || '',
    iteration_instructions: data.iteration || ''
  };
  
  return JSON.stringify(structured, null, 2);
}

export function validatePrompt(data: PromptData): ValidationResult {
  const suggestions: string[] = [];
  const warnings: string[] = [];
  let score = 0;
  
  // Check for required elements
  if (!data.role) {
    warnings.push('Missing role definition - the AI won\'t know its expertise level');
  } else {
    score += 20;
    if (data.role.includes('expert') || data.role.includes('specialist')) {
      score += 10;
    }
  }
  
  if (!data.task) {
    warnings.push('Missing task specification - the AI won\'t know what to do');
  } else {
    score += 20;
    if (data.task.length > 20) {
      score += 10;
    }
  }
  
  // Check for clarity
  if (data.task && (data.task.includes('help me') || data.task.includes('can you'))) {
    suggestions.push('Make your task more specific. Instead of "help me", specify exactly what you want');
  }
  
  // Check for context
  if (data.context) {
    score += 15;
  } else {
    suggestions.push('Adding context will help the AI provide more relevant responses');
  }
  
  // Check for format specification
  if (data.format) {
    score += 15;
  } else {
    suggestions.push('Specify the desired output format (list, paragraph, code, etc.)');
  }
  
  // Check for constraints
  if (data.constraints) {
    score += 10;
  } else {
    suggestions.push('Adding constraints helps ensure the AI stays focused and relevant');
  }
  
  // Check for examples
  if (data.examples) {
    score += 10;
  } else {
    suggestions.push('Examples significantly improve AI understanding and output quality');
  }
  
  const isValid = score >= 40 && data.role && data.task;
  
  return {
    isValid,
    score: Math.min(score, 100),
    suggestions,
    warnings
  };
}

export function expandInstantPrompt(input: string): PromptData {
  const task = input.trim();
  
  // Simple AI-like expansion based on keywords and patterns
  let role = 'You are a helpful AI assistant';
  let format = 'Provide a clear and detailed response';
  let constraints = 'Be accurate and helpful';
  let iteration = 'Ask me if you need any clarification';
  
  // Detect domain and adjust role
  if (task.toLowerCase().includes('code') || task.toLowerCase().includes('programming') || task.toLowerCase().includes('debug')) {
    role = 'You are an expert software engineer with extensive programming experience';
    format = 'Provide working code with explanations';
    constraints = 'Use best practices and include error handling';
  } else if (task.toLowerCase().includes('write') || task.toLowerCase().includes('content') || task.toLowerCase().includes('copy')) {
    role = 'You are a professional content writer and copywriting expert';
    format = 'Create engaging, well-structured content';
    constraints = 'Keep it clear, concise, and audience-appropriate';
  } else if (task.toLowerCase().includes('learn') || task.toLowerCase().includes('explain') || task.toLowerCase().includes('teach')) {
    role = 'You are an expert educator and learning specialist';
    format = 'Break down complex topics into easy-to-understand explanations';
    constraints = 'Use simple language and provide examples';
  } else if (task.toLowerCase().includes('design') || task.toLowerCase().includes('creative')) {
    role = 'You are a creative design expert with extensive experience';
    format = 'Provide creative solutions with detailed reasoning';
    constraints = 'Consider usability, aesthetics, and current trends';
  }
  
  return {
    role,
    task,
    context: '',
    format,
    constraints,
    examples: '',
    iteration
  };
}