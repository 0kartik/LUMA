import { Template } from '../types';

export const templates: Template[] = [
  // Coding Help
  {
    id: 'debug-code',
    name: 'Debug Code Issue',
    category: 'Coding Help',
    description: 'Get help debugging specific code problems',
    icon: '🐛',
    data: {
      role: 'You are an expert software engineer and debugging specialist',
      task: 'Help me debug and fix a specific code issue',
      format: 'Provide the corrected code, explain the issue, and suggest best practices',
      constraints: 'Focus on the specific problem, provide working code, explain your reasoning'
    }
  },
  {
    id: 'code-review',
    name: 'Code Review',
    category: 'Coding Help',
    description: 'Get comprehensive code review and improvements',
    icon: '🔍',
    data: {
      role: 'You are a senior software architect and code reviewer',
      task: 'Review my code and provide detailed feedback on improvements',
      format: 'Structured review with sections for: Issues, Improvements, Best Practices, Refactored Code',
      constraints: 'Be constructive, focus on maintainability, performance, and readability'
    }
  },

  // Marketing Copy
  {
    id: 'landing-page',
    name: 'Landing Page Copy',
    category: 'Marketing Copy',
    description: 'Create compelling landing page content',
    icon: '🚀',
    data: {
      role: 'You are a conversion copywriting expert with 10+ years of experience',
      task: 'Write high-converting landing page copy for my product/service',
      format: 'Include headline, subheadline, benefits, features, social proof, and CTA',
      constraints: 'Focus on benefits over features, use persuasive language, keep it scannable'
    }
  },
  {
    id: 'email-campaign',
    name: 'Email Campaign',
    category: 'Marketing Copy',
    description: 'Generate engaging email marketing content',
    icon: '📧',
    data: {
      role: 'You are an email marketing specialist with expertise in engagement and conversions',
      task: 'Create an email campaign sequence for my target audience',
      format: 'Subject line, preview text, body content with clear structure and CTA',
      constraints: 'Keep subject line under 50 characters, personalize content, include clear value proposition'
    }
  },

  // Study Aid
  {
    id: 'explain-concept',
    name: 'Explain Complex Concept',
    category: 'Study Aid',
    description: 'Break down difficult topics into understandable explanations',
    icon: '🧠',
    data: {
      role: 'You are an expert educator and learning specialist',
      task: 'Explain a complex concept in simple, understandable terms',
      format: 'Start with simple explanation, add details progressively, include analogies and examples',
      constraints: 'Use clear language, provide real-world examples, break into digestible chunks'
    }
  },
  {
    id: 'study-plan',
    name: 'Study Plan Creator',
    category: 'Study Aid',
    description: 'Create structured learning plans for any subject',
    icon: '📚',
    data: {
      role: 'You are an educational consultant and learning strategist',
      task: 'Create a comprehensive study plan for mastering a specific subject',
      format: 'Weekly breakdown with topics, resources, exercises, and milestones',
      constraints: 'Consider different learning styles, include practical exercises, set realistic timelines'
    }
  },

  // Storytelling
  {
    id: 'story-outline',
    name: 'Story Outline',
    category: 'Storytelling',
    description: 'Create compelling story structures and outlines',
    icon: '📖',
    data: {
      role: 'You are a professional storyteller and narrative structure expert',
      task: 'Create a detailed story outline with compelling plot structure',
      format: 'Three-act structure with character development, plot points, and scene breakdowns',
      constraints: 'Include character motivations, conflict development, and satisfying resolution'
    }
  },
  {
    id: 'character-development',
    name: 'Character Development',
    category: 'Storytelling',
    description: 'Develop rich, complex characters for your stories',
    icon: '🎭',
    data: {
      role: 'You are a character development specialist and creative writing coach',
      task: 'Help me create detailed, complex characters for my story',
      format: 'Character profile including background, motivations, flaws, growth arc, and relationships',
      constraints: 'Make characters relatable and flawed, ensure clear motivations and realistic development'
    }
  },

  // Resume/Job Prep
  {
    id: 'resume-optimizer',
    name: 'Resume Optimizer',
    category: 'Resume/Job Prep',
    description: 'Improve your resume for specific job applications',
    icon: '📄',
    data: {
      role: 'You are a professional career coach and resume writing expert',
      task: 'Optimize my resume for a specific job application',
      format: 'Improved resume sections with quantified achievements and relevant keywords',
      constraints: 'Use action verbs, quantify achievements, tailor to job description, maintain ATS compatibility'
    }
  },
  {
    id: 'interview-prep',
    name: 'Interview Preparation',
    category: 'Resume/Job Prep',
    description: 'Prepare for job interviews with tailored questions and answers',
    icon: '💼',
    data: {
      role: 'You are an experienced hiring manager and interview preparation specialist',
      task: 'Help me prepare for a job interview with likely questions and strong answers',
      format: 'Common questions, STAR method answers, company-specific insights, and follow-up questions',
      constraints: 'Focus on specific role and company, use concrete examples, practice behavioral questions'
    }
  }
];

export const templateCategories = [
  'Coding Help',
  'Marketing Copy',
  'Study Aid',
  'Storytelling',
  'Resume/Job Prep'
];