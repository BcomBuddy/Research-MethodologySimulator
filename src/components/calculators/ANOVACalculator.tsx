import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import { calculateMean, getFCritical } from '../../utils/statistics';
import { StatisticalResult } from '../../types';

export const ANOVACalculator: React.FC = () => {
  const [anovaType, setAnovaType] = useState<'one-way' | 'two-way'>('one-way');
  const [groupsInput, setGroupsInput] = useState('');
  const [alpha, setAlpha] = useState('0.05');
  const [result, setResult] = useState<StatisticalResult | null>(null);

  const parseGroups = (input: string): number[][] => {
    return input.split('\n').map(line => 
      line.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x))
    ).filter(group => group.length > 0);
  };

  const calculateOneWayANOVA = () => {
    const groups = parseGroups(groupsInput);
    if (groups.length < 2) return;

    const k = groups.length; // number of groups
    const groupMeans = groups.map(group => calculateMean(group));
    const groupSizes = groups.map(group => group.length);
    const totalN = groupSizes.reduce((sum, n) => sum + n, 0);
    
    // Grand mean
    const allValues = groups.flat();
    const grandMean = calculateMean(allValues);

    // Sum of Squares Between (SSB)
    let ssb = 0;
    for (let i = 0; i < k; i++) {
      ssb += groupSizes[i] * Math.pow(groupMeans[i] - grandMean, 2);
    }

    // Sum of Squares Within (SSW)
    let ssw = 0;
    for (let i = 0; i < k; i++) {
      for (const value of groups[i]) {
        ssw += Math.pow(value - groupMeans[i], 2);
      }
    }

    // Total Sum of Squares
    const sst = ssb + ssw;

    // Degrees of freedom
    const dfBetween = k - 1;
    const dfWithin = totalN - k;
    const dfTotal = totalN - 1;

    // Mean Squares
    const msb = ssb / dfBetween;
    const msw = ssw / dfWithin;

    // F statistic
    const fStatistic = msb / msw;

    const alphaValue = parseFloat(alpha);
    const criticalValue = getFCritical(dfBetween, dfWithin, alphaValue);
    const decision = fStatistic > criticalValue ? 'Reject H₀' : 'Fail to Reject H₀';
    const conclusion = fStatistic > criticalValue 
      ? 'At least one group mean is significantly different'
      : 'All group means are equal';

    const steps = [
      { label: 'Formula', result: 'F = MSB / MSW' },
      { label: 'Group Means', result: `[${groupMeans.map(m => m.toFixed(2)).join(', ')}]` },
      { label: 'Grand Mean', result: grandMean.toFixed(4) },
      { label: 'Sum of Squares Between', result: `SSB = ${ssb.toFixed(4)}` },
      { label: 'Sum of Squares Within', result: `SSW = ${ssw.toFixed(4)}` },
      { label: 'Mean Square Between', result: `MSB = ${ssb.toFixed(4)} / ${dfBetween} = ${msb.toFixed(4)}` },
      { label: 'Mean Square Within', result: `MSW = ${ssw.toFixed(4)} / ${dfWithin} = ${msw.toFixed(4)}` },
      { label: 'F Statistic', result: `F = ${msb.toFixed(4)} / ${msw.toFixed(4)} = ${fStatistic.toFixed(4)}` }
    ];

    setResult({
      steps,
      testStatistic: fStatistic,
      degreesOfFreedom: [dfBetween, dfWithin],
      criticalValue,
      decision,
      conclusion
    });
  };

  const loadSampleData = () => {
    if (anovaType === 'one-way') {
      setGroupsInput('85, 90, 78, 92, 88\n76, 94, 82, 89, 91\n80, 85, 87, 83, 86');
    } else {
      setGroupsInput('85, 90, 78\n92, 88, 76\n94, 82, 89');
    }
  };

  const clearForm = () => {
    setGroupsInput('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setAnovaType('one-way')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            anovaType === 'one-way' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          One-Way ANOVA
        </button>
        <button
          onClick={() => setAnovaType('two-way')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            anovaType === 'two-way' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Two-Way ANOVA
        </button>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {anovaType === 'one-way' ? 'Groups Data (each line = one group)' : 'Factor Data (rows = Factor A, columns = Factor B)'}
          </label>
          <textarea
            value={groupsInput}
            onChange={(e) => setGroupsInput(e.target.value)}
            placeholder={anovaType === 'one-way' 
              ? "Group 1: 85, 90, 78, 92, 88\nGroup 2: 76, 94, 82, 89, 91\nGroup 3: 80, 85, 87, 83, 86"
              : "Factor A1: 85, 90, 78\nFactor A2: 92, 88, 76\nFactor A3: 94, 82, 89"
            }
            rows={4}
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
          onClick={calculateOneWayANOVA}
          disabled={!groupsInput}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Calculator size={18} />
          Calculate ANOVA
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
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
          <h4 className="font-semibold text-teal-800 mb-4">ANOVA Results:</h4>
          <div className="space-y-3">
            {result.steps.map((step, index) => (
              <div key={index} className="bg-white p-3 rounded border border-teal-200">
                <p className="font-medium text-teal-800">{step.label}:</p>
                <p className="text-teal-700 font-mono">{step.result}</p>
              </div>
            ))}
            <div className="bg-white p-4 rounded border-2 border-teal-300">
              <p className="font-medium text-teal-800">Degrees of Freedom: df₁ = {result.degreesOfFreedom[0]}, df₂ = {result.degreesOfFreedom[1]}</p>
              <p className="font-medium text-teal-800">Critical Value: {result.criticalValue?.toFixed(4)}</p>
              <p className="font-bold text-teal-800 text-lg">Decision: {result.decision}</p>
              <p className="text-teal-700 mt-2">{result.conclusion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};