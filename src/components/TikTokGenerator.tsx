import React, { useState } from 'react';
import { Sparkles, Loader2, Clock, Music, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { openai, isOpenAIConfigured } from '../lib/openai';

interface TikTokGeneratorProps {
  onGenerate: (script: string) => void;
}

export default function TikTokGenerator({ onGenerate }: TikTokGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState('30');
  const [style, setStyle] = useState('trendy');
  const [target, setTarget] = useState('gen-z');

  const styles = [
    { value: 'trendy', label: '🔥 Trendy' },
    { value: 'educational', label: '📚 Educational' },
    { value: 'storytelling', label: '📖 Storytelling' },
    { value: 'comedy', label: '😂 Comedy' },
    { value: 'tutorial', label: '🎓 Tutorial' }
  ];

  const targets = [
    { value: 'gen-z', label: '👾 Gen Z' },
    { value: 'millennials', label: '🌟 Millennials' },
    { value: 'professionals', label: '💼 Professionals' },
    { value: 'students', label: '📚 Students' },
    { value: 'general', label: '👥 General' }
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
            content: `You are a professional TikTok script writer. Create a ${duration}-second ${style} TikTok script targeting ${target} audience. Include hooks, transitions, music suggestions, and visual directions. Format the script with clear sections for VISUAL, AUDIO, and TEXT ON SCREEN.`
          },
          {
            role: "user",
            content: `Write a TikTok script about: ${prompt}`
          }
        ],
        model: "gpt-3.5-turbo",
      });

      const content = completion.choices[0]?.message?.content;
      if (content) {
        onGenerate(content);
        toast.success('TikTok script generated successfully!');
        setPrompt('');
      }
    } catch (error: any) {
      console.error('Error generating script:', error);
      toast.error(error?.message || 'Failed to generate script');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            <Clock className="w-4 h-4 inline mr-2" />
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[#ff0050] bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#ff0050] focus:border-transparent"
          >
            <option value="15">15 seconds</option>
            <option value="30">30 seconds</option>
            <option value="60">60 seconds</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            <Music className="w-4 h-4 inline mr-2" />
            Style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[#ff0050] bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#ff0050] focus:border-transparent"
          >
            {styles.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Target Audience
          </label>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[#ff0050] bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#ff0050] focus:border-transparent"
          >
            {targets.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What's your TikTok about?"
          className="w-full px-4 py-3 pr-24 rounded-lg border border-[#ff0050] bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff0050] focus:border-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#ff0050] text-white rounded-md flex items-center gap-2 hover:bg-[#e6004c] disabled:opacity-50 disabled:cursor-not-allowed"
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