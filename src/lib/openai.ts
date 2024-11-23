import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true // Note: In production, you should use a backend server
});

// Helper function to check if OpenAI is properly configured
export const isOpenAIConfigured = () => {
  return Boolean(apiKey && apiKey.startsWith('sk-'));
};