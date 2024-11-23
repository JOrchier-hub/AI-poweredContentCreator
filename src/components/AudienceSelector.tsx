import React from 'react';

interface AudienceSelectorProps {
  value: string;
  onChange: (audience: string) => void;
}

const audiences = [
  { value: 'general', label: '👥 General' },
  { value: 'technical', label: '💻 Technical' },
  { value: 'business', label: '💼 Business' },
  { value: 'academic', label: '🎓 Academic' },
  { value: 'beginners', label: '🌱 Beginners' }
];

export default function AudienceSelector({ value, onChange }: AudienceSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Target Audience
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {audiences.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}