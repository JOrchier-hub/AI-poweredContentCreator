import React from 'react';

interface WordCountSelectorProps {
  value: string;
  onChange: (wordCount: string) => void;
}

const wordCounts = [
  { value: 'short', label: '📝 Short (~300 words)' },
  { value: 'medium', label: '📄 Medium (~600 words)' },
  { value: 'long', label: '📚 Long (~1000 words)' },
  { value: 'detailed', label: '📖 Detailed (~1500 words)' }
];

export default function WordCountSelector({ value, onChange }: WordCountSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Word Count
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {wordCounts.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}