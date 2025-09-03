import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import { calculateVariance, getFCritical } from '../../utils/statistics';
import { StatisticalResult } from '../../types';

export const FTestCalculator: React.FC = () => {
  const [sample1Input, setSample1Input] = useState('');
  const [sample2Input, setSample2Input] = useState('');
  const [alpha, setAlpha] = useState('0.05');
  const [result, setResult] = useState<StatisticalResult | null>(null);

  const parseData = (input: string): number[] => {
    return input.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
  };

  const calculateFTest = () => {
    const sample1 = parseData(sample1Input);
    const sample2 = parseData(sample2Input);
    
    if (sample1.length === 0 || sample2.length === 0) return;

    const n1 = sample1.length;
    const n2 = sample2.length;
    const s1Squared = calculateVariance(sample1);
    const s2Squared = calculateVariance(sample2);
    
    // F = larger variance / smaller variance
    const fStatistic = Math.max(s1Squared, s2Squared) / Math.min(s1Squared, s2Squared);
    const df1 = s1Squared >= s2Squared ? n1 - 1 : n2 - 1;
    const df2 = s1Squared >= s2Squared ? n2 - 1 : n1 - 1;

    const alphaValue = parseFloat(alpha);
    const criticalValue = getFCritical(df1, df2, alphaValue);
    const decision = fStatistic > criticalValue ? 'Reject H₀' : 'Fail to Reject H₀';
    const conclusion = fStatistic > criticalValue 
      ? 'The variances are significantly different'
      : 'The variances are not significantly different';

    const steps = [
      { label: 'Formula', result: 'F = s₁² / s₂² (larger variance in numerator)' },
      { label: 'Sample 1 Statistics', result: `n₁ = ${n1}, s₁² = ${s1Squared.toFixed(4)}` },
      { label: 'Sample 2 Statistics', result: `n₂ = ${n2}, s₂² = ${s2Squared.toFixed(4)}` },
      { label: 'Substitution', result: `F = ${Math.max(s1Squared, s2Squared).toFixed(4)} / ${Math.min(s1Squared, s2Squared).toFixed(4)}` },
      { label: 'Test Statistic', result: fStatistic.toFixed(4) }
    ];

    setResult({
      steps,
      testStatistic: fStatistic,
      degreesOfFreedom: [df1, df2],
      criticalValue,
      decision,
      conclusion
    });
  };

  const loadSampleData = () => {
    setSample1Input('85, 90, 78, 92, 88, 76, 94');
    setSample2Input('82, 89, 91, 77, 85, 93, 80');
  };

  const clearForm = () => {
    setSample1Input('');
    setSample2Input('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sample 1 Data</label>
          <textarea
            value={sample1Input}
            onChange={(e) => setSample1Input(e.target.value)}
            placeholder="Enter comma-separated values..."
            rows={2}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sample 2 Data</label>
          <textarea
            value={sample2Input}
            onChange={(e) => setSample2Input(e.target.value)}
            placeholder="Enter comma-separated values..."
            rows={2}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Significance Level (α)</label>
          <select
            value={alpha}
            onChange={(e) => setAlpha(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="0.05">0.05 (5%)</option>
            <option value="0.01">0.01 (1%)</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={calculateFTest}
          disabled={!sample1Input || !sample2Input}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Calculator size={18} />
          Calculate F-Test
        </button>
        <button
          onClick={loadSampleData}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Load Sample Data
        </button>
        <button
          onClick={clearForm}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {result && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h4 className="font-semibold text-orange-800 mb-4">F-Test Results:</h4>
          <div className="space-y-3">
            {result.steps.map((step, index) => (
              <div key={index} className="bg-white p-3 rounded border border-orange-200">
                <p className="font-medium text-orange-800">{step.label}:</p>
                <p className="text-orange-700 font-mono">{step.result}</p>
              </div>
            ))}
            <div className="bg-white p-4 rounded border-2 border-orange-300">
              <p className="font-medium text-orange-800">Degrees of Freedom: df₁ = {result.degreesOfFreedom[0]}, df₂ = {result.degreesOfFreedom[1]}</p>
              <p className="font-medium text-orange-800">Critical Value: {result.criticalValue?.toFixed(4)}</p>
              <p className="font-bold text-orange-800 text-lg">Decision: {result.decision}</p>
              <p className="text-orange-700 mt-2">{result.conclusion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};