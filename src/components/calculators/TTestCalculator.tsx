import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import { calculateMean, calculateStandardDeviation, getTCritical } from '../../utils/statistics';
import { StatisticalResult, TTestData } from '../../types';

export const TTestCalculator: React.FC = () => {
  const [testType, setTestType] = useState<'one-sample' | 'independent' | 'paired'>('one-sample');
  const [sample1Input, setSample1Input] = useState('');
  const [sample2Input, setSample2Input] = useState('');
  const [populationMean, setPopulationMean] = useState('');
  const [alpha, setAlpha] = useState('0.05');
  const [result, setResult] = useState<StatisticalResult | null>(null);

  const parseData = (input: string): number[] => {
    return input.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
  };

  const calculateTTest = () => {
    const sample1 = parseData(sample1Input);
    if (sample1.length === 0) return;

    const alphaValue = parseFloat(alpha);
    let testStatistic = 0;
    let df = 0;
    let steps: any[] = [];

    if (testType === 'one-sample') {
      if (!populationMean) return;
      
      const mu0 = parseFloat(populationMean);
      const n = sample1.length;
      const xBar = calculateMean(sample1);
      const s = calculateStandardDeviation(sample1);
      
      testStatistic = (xBar - mu0) / (s / Math.sqrt(n));
      df = n - 1;

      steps = [
        { label: 'Formula', result: 't = (x̄ - μ₀) / (s / √n)' },
        { label: 'Sample Statistics', result: `n = ${n}, x̄ = ${xBar.toFixed(4)}, s = ${s.toFixed(4)}` },
        { label: 'Substitution', result: `t = (${xBar.toFixed(4)} - ${mu0}) / (${s.toFixed(4)} / √${n})` },
        { label: 'Calculation', result: `t = ${(xBar - mu0).toFixed(4)} / ${(s / Math.sqrt(n)).toFixed(4)}` },
        { label: 'Test Statistic', result: testStatistic.toFixed(4) }
      ];
    } else if (testType === 'independent') {
      const sample2 = parseData(sample2Input);
      if (sample2.length === 0) return;

      const n1 = sample1.length;
      const n2 = sample2.length;
      const x1Bar = calculateMean(sample1);
      const x2Bar = calculateMean(sample2);
      const s1 = calculateStandardDeviation(sample1);
      const s2 = calculateStandardDeviation(sample2);
      
      const pooledVariance = ((n1 - 1) * s1 * s1 + (n2 - 1) * s2 * s2) / (n1 + n2 - 2);
      const standardError = Math.sqrt(pooledVariance * (1/n1 + 1/n2));
      
      testStatistic = (x1Bar - x2Bar) / standardError;
      df = n1 + n2 - 2;

      steps = [
        { label: 'Formula', result: 't = (x̄₁ - x̄₂) / √(sp² × (1/n₁ + 1/n₂))' },
        { label: 'Sample 1 Statistics', result: `n₁ = ${n1}, x̄₁ = ${x1Bar.toFixed(4)}, s₁ = ${s1.toFixed(4)}` },
        { label: 'Sample 2 Statistics', result: `n₂ = ${n2}, x̄₂ = ${x2Bar.toFixed(4)}, s₂ = ${s2.toFixed(4)}` },
        { label: 'Pooled Variance', result: `sp² = ${pooledVariance.toFixed(4)}` },
        { label: 'Standard Error', result: `SE = ${standardError.toFixed(4)}` },
        { label: 'Test Statistic', result: testStatistic.toFixed(4) }
      ];
    } else if (testType === 'paired') {
      const sample2 = parseData(sample2Input);
      if (sample2.length === 0 || sample1.length !== sample2.length) return;

      const differences = sample1.map((val, i) => val - sample2[i]);
      const n = differences.length;
      const dBar = calculateMean(differences);
      const sd = calculateStandardDeviation(differences);
      
      testStatistic = dBar / (sd / Math.sqrt(n));
      df = n - 1;

      steps = [
        { label: 'Formula', result: 't = d̄ / (sd / √n)' },
        { label: 'Differences', result: `d = [${differences.map(d => d.toFixed(2)).join(', ')}]` },
        { label: 'Difference Statistics', result: `n = ${n}, d̄ = ${dBar.toFixed(4)}, sd = ${sd.toFixed(4)}` },
        { label: 'Test Statistic', result: testStatistic.toFixed(4) }
      ];
    }

    const criticalValue = getTCritical(df, alphaValue);
    const decision = Math.abs(testStatistic) > criticalValue ? 'Reject H₀' : 'Fail to Reject H₀';
    const conclusion = Math.abs(testStatistic) > criticalValue 
      ? 'There is sufficient evidence to support the alternative hypothesis'
      : 'There is insufficient evidence to support the alternative hypothesis';

    setResult({
      steps,
      testStatistic,
      degreesOfFreedom: df,
      criticalValue,
      decision,
      conclusion
    });
  };

  const loadSampleData = () => {
    if (testType === 'one-sample') {
      setSample1Input('85, 90, 78, 92, 88, 76, 94, 82, 89, 91');
      setPopulationMean('85');
    } else if (testType === 'independent') {
      setSample1Input('85, 90, 78, 92, 88');
      setSample2Input('76, 94, 82, 89, 91');
    } else if (testType === 'paired') {
      setSample1Input('85, 90, 78, 92, 88');
      setSample2Input('83, 88, 80, 90, 86');
    }
  };

  const clearForm = () => {
    setSample1Input('');
    setSample2Input('');
    setPopulationMean('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTestType('one-sample')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            testType === 'one-sample' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          One-Sample
        </button>
        <button
          onClick={() => setTestType('independent')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            testType === 'independent' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Independent
        </button>
        <button
          onClick={() => setTestType('paired')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            testType === 'paired' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Paired
        </button>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sample {testType === 'paired' ? '1 (Before)' : testType === 'independent' ? '1' : ''} Data
          </label>
          <textarea
            value={sample1Input}
            onChange={(e) => setSample1Input(e.target.value)}
            placeholder="Enter comma-separated values (e.g., 85, 90, 78, 92, 88)..."
            rows={2}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {(testType === 'independent' || testType === 'paired') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sample 2 {testType === 'paired' ? '(After)' : ''} Data
            </label>
            <textarea
              value={sample2Input}
              onChange={(e) => setSample2Input(e.target.value)}
              placeholder="Enter comma-separated values..."
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        )}

        {testType === 'one-sample' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Population Mean (μ₀)</label>
            <input
              type="number"
              value={populationMean}
              onChange={(e) => setPopulationMean(e.target.value)}
              placeholder="Enter population mean..."
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        )}

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
          onClick={calculateTTest}
          disabled={!sample1Input || (testType === 'one-sample' && !populationMean) || ((testType === 'independent' || testType === 'paired') && !sample2Input)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Calculator size={18} />
          Calculate t-Test
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
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-800 mb-4">t-Test Results:</h4>
          <div className="space-y-3">
            {result.steps.map((step, index) => (
              <div key={index} className="bg-white p-3 rounded border border-blue-200">
                <p className="font-medium text-blue-800">{step.label}:</p>
                <p className="text-blue-700 font-mono">{step.result}</p>
              </div>
            ))}
            <div className="bg-white p-4 rounded border-2 border-blue-300">
              <p className="font-medium text-blue-800">Degrees of Freedom: {result.degreesOfFreedom}</p>
              <p className="font-medium text-blue-800">Critical Value: ±{result.criticalValue?.toFixed(4)}</p>
              <p className="font-bold text-blue-800 text-lg">Decision: {result.decision}</p>
              <p className="text-blue-700 mt-2">{result.conclusion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};