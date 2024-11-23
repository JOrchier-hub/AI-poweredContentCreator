import React, { useState } from 'react';
import { PenLine, Sparkles, ArrowRight, TrendingUp, Twitter } from 'lucide-react';
import AIAssistant from './components/AIAssistant';
import TikTokGenerator from './components/TikTokGenerator';
import TwitterGenerator from './components/TwitterGenerator';
import { Toaster } from 'react-hot-toast';

function App() {
  const [content, setContent] = useState('');
  const [tiktokScript, setTiktokScript] = useState('');
  const [tweetContent, setTweetContent] = useState('');

  const handleAISuggestion = (suggestion: string) => {
    setContent(suggestion);
  };

  const handleTikTokScript = (script: string) => {
    setTiktokScript(script);
  };

  const handleTweetContent = (tweet: string) => {
    setTweetContent(tweet);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section with CTA */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <PenLine className="w-12 h-12 text-indigo-600" />
            <Sparkles className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Content Creation
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your ideas into engaging blog posts, viral TikTok scripts, and trending tweets in seconds.
            Let AI help you create content that resonates with your audience.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#blog"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Write a Blog Post
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#tiktok"
              className="inline-flex items-center gap-2 bg-[#ff0050] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e6004c] transition-colors"
            >
              Create TikTok Script
              <TrendingUp className="w-5 h-5" />
            </a>
            <a 
              href="#twitter"
              className="inline-flex items-center gap-2 bg-[#1DA1F2] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#1a8cd8] transition-colors"
            >
              Craft Twitter Post
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Blog Generator Section */}
        <div id="blog" className="space-y-6 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-indigo-600">
              <PenLine className="w-6 h-6" />
              Generate Your Blog Post
            </h2>
            <AIAssistant onSuggest={handleAISuggestion} />
          </div>

          {content && (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Your Generated Content</h2>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          )}
        </div>

        {/* TikTok Script Generator Section */}
        <div id="tiktok" className="space-y-6 mb-16">
          <div className="bg-[#111] text-white p-8 rounded-xl shadow-lg border border-[#ff0050]">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-[#ff0050]">
              <TrendingUp className="w-6 h-6" />
              Generate Your Viral TikTok Script
            </h2>
            <TikTokGenerator onGenerate={handleTikTokScript} />
          </div>

          {tiktokScript && (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-[#ff0050]">Your TikTok Script</h2>
              <div className="prose max-w-none whitespace-pre-line">
                {tiktokScript}
              </div>
            </div>
          )}
        </div>

        {/* Twitter Post Generator Section */}
        <div id="twitter" className="space-y-6">
          <div className="bg-[#1DA1F2] bg-opacity-10 p-8 rounded-xl shadow-lg border border-[#1DA1F2]">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-[#1DA1F2]">
              <Twitter className="w-6 h-6" />
              Generate Your Viral Tweet
            </h2>
            <TwitterGenerator onGenerate={handleTweetContent} />
          </div>

          {tweetContent && (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-[#1DA1F2]">Your Tweet</h2>
              <div className="prose max-w-none">
                <div className="bg-white rounded-xl border border-[#1DA1F2] border-opacity-20 p-6">
                  <p className="text-xl whitespace-pre-line">{tweetContent}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;