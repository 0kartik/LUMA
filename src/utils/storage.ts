import { GeneratedPrompt } from '../types';

const STORAGE_KEY = 'luma-prompts';
const THEME_KEY = 'luma-theme';

export function savePrompt(prompt: GeneratedPrompt): void {
  try {
    const existing = getStoredPrompts();
    const updated = [prompt, ...existing.filter(p => p.id !== prompt.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save prompt:', error);
  }
}

export function getStoredPrompts(): GeneratedPrompt[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const prompts = JSON.parse(stored);
    return prompts.map((p: any) => ({
      ...p,
      createdAt: new Date(p.createdAt)
    }));
  } catch (error) {
    console.error('Failed to retrieve prompts:', error);
    return [];
  }
}

export function deletePrompt(id: string): void {
  try {
    const existing = getStoredPrompts();
    const updated = existing.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to delete prompt:', error);
  }
}

export function saveTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Failed to save theme:', error);
  }
}

export function getStoredTheme(): 'light' | 'dark' | null {
  try {
    return localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
  } catch (error) {
    console.error('Failed to retrieve theme:', error);
    return null;
  }
}

export function exportPrompt(prompt: GeneratedPrompt, format: 'text' | 'json'): void {
  try {
    let content: string;
    let filename: string;
    let mimeType: string;
    
    if (format === 'json') {
      content = JSON.stringify(prompt, null, 2);
      filename = `${prompt.title || 'prompt'}.json`;
      mimeType = 'application/json';
    } else {
      content = `# ${prompt.title || 'Generated Prompt'}\n\n## Human-Optimized\n${prompt.humanOptimized}\n\n## Machine-Optimized\n${prompt.machineOptimized}`;
      filename = `${prompt.title || 'prompt'}.txt`;
      mimeType = 'text/plain';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export prompt:', error);
  }
}