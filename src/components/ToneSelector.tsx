import React from 'react';

interface ToneSelectorProps {
  value: string;
  onChange: (tone: string) => void;
}

const tones = [
  { value: 'professional', label: '👔 Professional' },
  { value: 'casual', label: '😊 Casual' },
  { value: 'humorous', label: '😄 Humorous' },
  { value: 'formal', label: '🎩 Formal' },
  { value: 'enthusiastic', label: '🎉 Enthusiastic' }
];

export default function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Writing Tone
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {tones.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}