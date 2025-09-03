import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const ScaleIdentifier: React.FC = () => {
  const [variable, setVariable] = useState('');
  const [result, setResult] = useState<{ scale: string; reason: string } | null>(null);

  const identifyScale = () => {
    if (!variable.trim()) return;

    const variableLower = variable.toLowerCase();
    
    let scale = '';
    let reason = '';

    if (variableLower.includes('gender') || variableLower.includes('color') || variableLower.includes('category') || variableLower.includes('type')) {
      scale = 'Nominal';
      reason = 'Categories with no natural order';
    } else if (variableLower.includes('rank') || variableLower.includes('grade') || variableLower.includes('satisfaction') || variableLower.includes('rating')) {
      scale = 'Ordinal';
      reason = 'Ordered categories with no equal intervals';
    } else if (variableLower.includes('temperature') || variableLower.includes('iq') || variableLower.includes('score')) {
      scale = 'Interval';
      reason = 'Equal intervals but no true zero point';
    } else if (variableLower.includes('height') || variableLower.includes('weight') || variableLower.includes('age') || variableLower.includes('income') || variableLower.includes('price')) {
      scale = 'Ratio';
      reason = 'Equal intervals with meaningful zero point';
    } else {
      scale = 'Nominal';
      reason = 'Default classification for categorical data';
    }

    setResult({ scale, reason });
  };

  const clearForm = () => {
    setVariable('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Describe your variable</label>
        <textarea
          value={variable}
          onChange={(e) => setVariable(e.target.value)}
          placeholder="e.g., student satisfaction with online learning, monthly household income, employee performance ranking"
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={identifyScale}
          disabled={!variable.trim()}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Search size={18} />
          Identify Scale
        </button>
        <button
          onClick={clearForm}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {result && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
          <h4 className="font-semibold text-teal-800 mb-2">Measurement Scale Identification:</h4>
          <div className="space-y-2">
            <p className="text-teal-700"><strong>Scale:</strong> {result.scale}</p>
            <p className="text-teal-700"><strong>Reason:</strong> {result.reason}</p>
          </div>
        </div>
      )}
    </div>
  );
};