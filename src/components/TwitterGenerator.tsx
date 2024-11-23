import React, { useState } from 'react';
import { Sparkles, Loader2, Hash, Target, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { openai, isOpenAIConfigured } from '../lib/openai';

interface TwitterGeneratorProps {
  onGenerate: (tweet: string) => void;
}

export default function TwitterGenerator({ onGenerate }: TwitterGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState('viral');
  const [goal, setGoal] = useState('engagement');
  const [includeHashtags, setIncludeHashtags] = useState(true);

  const styles = [
    { value: 'viral', label: '🚀 Viral' },
    { value: 'professional', label: '💼 Professional' },
    { value: 'humorous', label: '😄 Humorous' },
    { value: 'controversial', label: '🔥 Controversial' },
    { value: 'informative', label: '📚 Informative' }
  ];

  const goals = [
    { value: 'engagement', label: '💬 Maximum Engagement' },
    { value: 'clicks', label: '🔗 Drive Clicks' },
    { value: 'followers', label: '👥 Gain Followers' },
    { value: 'awareness', label: '📢 Raise Awareness' },
    { value: 'discussion', label: '🗣 Start Discussion' }
  ];

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
            content: `You are a Twitter expert who creates ${style} tweets optimized for ${goal}. ${
              includeHashtags ? 'Include 2-3 relevant hashtags.' : 'Do not include hashtags.'
            } Keep the tweet within 280 characters. Make it attention-grabbing and shareable.`
          },
          {
            role: "user",
            content: `Write a tweet about: ${prompt}`
          }
        ],
        model: "gpt-3.5-turbo",
      });

      const content = completion.choices[0]?.message?.content;
      if (content) {
        onGenerate(content);
        toast.success('Tweet generated successfully!');
        setPrompt('');
      }
    } catch (error: any) {
      console.error('Error generating tweet:', error);
      toast.error(error?.message || 'Failed to generate tweet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1DA1F2] mb-2">
            <Zap className="w-4 h-4 inline mr-2" />
            Style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[#1DA1F2] bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
          >
            {styles.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1DA1F2] mb-2">
            <Target className="w-4 h-4 inline mr-2" />
            Goal
          </label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[#1DA1F2] bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
          >
            {goals.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1DA1F2] mb-2">
            <Hash className="w-4 h-4 inline mr-2" />
            Hashtags
          </label>
          <div className="flex items-center mt-3">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeHashtags}
                onChange={(e) => setIncludeHashtags(e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DA1F2]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DA1F2]"></div>
              <span className="ms-3 text-sm font-medium text-[#1DA1F2]">Include Hashtags</span>
            </label>
          </div>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What's your tweet about?"
          className="w-full px-4 py-3 pr-24 rounded-lg border border-[#1DA1F2] bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#1DA1F2] text-white rounded-md flex items-center gap-2 hover:bg-[#1a8cd8] disabled:opacity-50 disabled:cursor-not-allowed"
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