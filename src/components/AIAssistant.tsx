import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { openai, isOpenAIConfigured } from '../lib/openai';
import ToneSelector from './ToneSelector';
import AudienceSelector from './AudienceSelector';
import WordCountSelector from './WordCountSelector';

interface AIAssistantProps {
  onSuggest: (content: string) => void;
}

export default function AIAssistant({ onSuggest }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState('professional');
  const [audience, setAudience] = useState('general');
  const [wordCount, setWordCount] = useState('medium');

  const getWordCountTarget = (count: string) => {
    switch (count) {
      case 'short': return '300';
      case 'medium': return '600';
      case 'long': return '1000';
      case 'detailed': return '1500';
      default: return '600';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    if (!isOpenAIConfigured()) {
      toast.error('Invalid OpenAI API key. Please check your .env file');
      return;
    }

    setLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a professional blog writer. Write in a ${tone} tone for a ${audience} audience. Create a well-structured blog post of approximately ${getWordCountTarget(wordCount)} words using markdown format. Include headings, paragraphs, and bullet points where appropriate.`
          },
          {
            role: "user",
            content: `Write a blog post about: ${prompt}`
          }
        ],
        model: "gpt-3.5-turbo",
      });

      const content = completion.choices[0]?.message?.content;
      if (content) {
        onSuggest(content);
        toast.success('AI content generated successfully!');
        setPrompt('');
      }
    } catch (error: any) {
      console.error('Error generating content:', error);
      const errorMessage = error?.message || 'Failed to generate content. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToneSelector value={tone} onChange={setTone} />
        <AudienceSelector value={audience} onChange={setAudience} />
        <WordCountSelector value={wordCount} onChange={setWordCount} />
      </div>
      
      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to write about..."
          className="w-full px-4 py-3 pr-24 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">Generate</span>
        </button>
      </div>
    </form>
  );
}