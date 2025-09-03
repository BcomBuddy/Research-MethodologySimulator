import React, { useState } from 'react';
import { TestTube } from 'lucide-react';

export const HypothesisBuilder: React.FC = () => {
  const [testType, setTestType] = useState('');
  const [parameter, setParameter] = useState('');
  const [value, setValue] = useState('');
  const [direction, setDirection] = useState('');
  const [hypotheses, setHypotheses] = useState<{ h0: string; h1: string } | null>(null);

  const generateHypotheses = () => {
    if (!testType || !parameter || !value || !direction) return;

    let h0 = '';
    let h1 = '';

    if (testType === 'mean') {
      h0 = `H₀: μ = ${value}`;
      if (direction === 'two-tailed') {
        h1 = `H₁: μ ≠ ${value}`;
      } else if (direction === 'greater') {
        h1 = `H₁: μ > ${value}`;
      } else {
        h1 = `H₁: μ < ${value}`;
      }
    } else if (testType === 'proportion') {
      h0 = `H₀: p = ${value}`;
      if (direction === 'two-tailed') {
        h1 = `H₁: p ≠ ${value}`;
      } else if (direction === 'greater') {
        h1 = `H₁: p > ${value}`;
      } else {
        h1 = `H₁: p < ${value}`;
      }
    } else if (testType === 'variance') {
      h0 = `H₀: σ² = ${value}`;
      if (direction === 'two-tailed') {
        h1 = `H₁: σ² ≠ ${value}`;
      } else if (direction === 'greater') {
        h1 = `H₁: σ² > ${value}`;
      } else {
        h1 = `H₁: σ² < ${value}`;
      }
    }

    setHypotheses({ h0, h1 });
  };

  const clearForm = () => {
    setTestType('');
    setParameter('');
    setValue('');
    setDirection('');
    setHypotheses(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
          <select
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Select test type...</option>
            <option value="mean">Population Mean (μ)</option>
            <option value="proportion">Population Proportion (p)</option>
            <option value="variance">Population Variance (σ²)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Parameter Description</label>
          <input
            type="text"
            value={parameter}
            onChange={(e) => setParameter(e.target.value)}
            placeholder="e.g., average customer satisfaction score"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hypothesized Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter hypothesized value..."
            step="0.01"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Test Direction</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Select direction...</option>
            <option value="two-tailed">Two-tailed (≠)</option>
            <option value="greater">Right-tailed (&gt;)</option>
            <option value="less">Left-tailed (&lt;)</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={generateHypotheses}
          disabled={!testType || !parameter || !value || !direction}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <TestTube size={18} />
          Generate Hypotheses
        </button>
        <button
          onClick={clearForm}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {hypotheses && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h4 className="font-semibold text-purple-800 mb-4">Generated Hypotheses:</h4>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded border border-purple-200">
              <p className="text-purple-700 text-lg font-mono">{hypotheses.h0}</p>
              <p className="text-sm text-purple-600 mt-1">Null Hypothesis (no effect)</p>
            </div>
            <div className="bg-white p-4 rounded border border-purple-200">
              <p className="text-purple-700 text-lg font-mono">{hypotheses.h1}</p>
              <p className="text-sm text-purple-600 mt-1">Alternative Hypothesis (effect exists)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};