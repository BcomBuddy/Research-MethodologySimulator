import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import { getChiSquareCritical } from '../../utils/statistics';
import { StatisticalResult } from '../../types';

export const ChiSquareCalculator: React.FC = () => {
  const [testType, setTestType] = useState<'goodness-of-fit' | 'independence'>('goodness-of-fit');
  const [observedInput, setObservedInput] = useState('');
  const [expectedInput, setExpectedInput] = useState('');
  const [alpha, setAlpha] = useState('0.05');
  const [result, setResult] = useState<StatisticalResult | null>(null);

  const parseMatrix = (input: string): number[][] => {
    return input.split('\n').map(row => 
      row.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x))
    ).filter(row => row.length > 0);
  };

  const parseArray = (input: string): number[] => {
    return input.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
  };

  const calculateChiSquare = () => {
    if (testType === 'goodness-of-fit') {
      const observed = parseArray(observedInput);
      const expected = parseArray(expectedInput);
      
      if (observed.length === 0 || expected.length === 0 || observed.length !== expected.length) return;

      let chiSquare = 0;
      const calculations: string[] = [];
      
      for (let i = 0; i < observed.length; i++) {
        const contribution = Math.pow(observed[i] - expected[i], 2) / expected[i];
        chiSquare += contribution;
        calculations.push(`(${observed[i]} - ${expected[i]})² / ${expected[i]} = ${contribution.toFixed(4)}`);
      }

      const df = observed.length - 1;
      const alphaValue = parseFloat(alpha);
      const criticalValue = getChiSquareCritical(df, alphaValue);
      const decision = chiSquare > criticalValue ? 'Reject H₀' : 'Fail to Reject H₀';
      const conclusion = chiSquare > criticalValue 
        ? 'The observed frequencies differ significantly from expected'
        : 'The observed frequencies do not differ significantly from expected';

      const steps = [
        { label: 'Formula', result: 'χ² = Σ[(O - E)² / E]' },
        { label: 'Observed Frequencies', result: `[${observed.join(', ')}]` },
        { label: 'Expected Frequencies', result: `[${expected.join(', ')}]` },
        { label: 'Calculations', result: calculations.join(' + ') },
        { label: 'Test Statistic', result: chiSquare.toFixed(4) }
      ];

      setResult({
        steps,
        testStatistic: chiSquare,
        degreesOfFreedom: df,
        criticalValue,
        decision,
        conclusion
      });
    } else {
      // Independence test
      const observedMatrix = parseMatrix(observedInput);
      if (observedMatrix.length === 0) return;

      const rows = observedMatrix.length;
      const cols = observedMatrix[0].length;
      
      // Calculate row and column totals
      const rowTotals = observedMatrix.map(row => row.reduce((sum, val) => sum + val, 0));
      const colTotals = Array(cols).fill(0).map((_, j) => 
        observedMatrix.reduce((sum, row) => sum + row[j], 0)
      );
      const grandTotal = rowTotals.reduce((sum, val) => sum + val, 0);

      // Calculate expected frequencies
      const expected = observedMatrix.map((row, i) => 
        row.map((_, j) => (rowTotals[i] * colTotals[j]) / grandTotal)
      );

      // Calculate chi-square
      let chiSquare = 0;
      const calculations: string[] = [];
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const contribution = Math.pow(observedMatrix[i][j] - expected[i][j], 2) / expected[i][j];
          chiSquare += contribution;
          calculations.push(`(${observedMatrix[i][j]} - ${expected[i][j].toFixed(2)})² / ${expected[i][j].toFixed(2)} = ${contribution.toFixed(4)}`);
        }
      }

      const df = (rows - 1) * (cols - 1);
      const alphaValue = parseFloat(alpha);
      const criticalValue = getChiSquareCritical(df, alphaValue);
      const decision = chiSquare > criticalValue ? 'Reject H₀' : 'Fail to Reject H₀';
      const conclusion = chiSquare > criticalValue 
        ? 'The variables are not independent'
        : 'The variables are independent';

      const steps = [
        { label: 'Formula', result: 'χ² = Σ[(O - E)² / E]' },
        { label: 'Expected Frequencies', result: expected.map(row => `[${row.map(val => val.toFixed(2)).join(', ')}]`).join(' | ') },
        { label: 'Calculations', result: calculations.slice(0, 3).join(' + ') + (calculations.length > 3 ? '...' : '') },
        { label: 'Test Statistic', result: chiSquare.toFixed(4) }
      ];

      setResult({
        steps,
        testStatistic: chiSquare,
        degreesOfFreedom: df,
        criticalValue,
        decision,
        conclusion
      });
    }
  };

  const loadSampleData = () => {
    if (testType === 'goodness-of-fit') {
      setObservedInput('20, 30, 25, 15');
      setExpectedInput('22.5, 22.5, 22.5, 22.5');
    } else {
      setObservedInput('10, 20, 15\n25, 30, 20');
    }
  };

  const clearForm = () => {
    setObservedInput('');
    setExpectedInput('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTestType('goodness-of-fit')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            testType === 'goodness-of-fit' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Goodness of Fit
        </button>
        <button
          onClick={() => setTestType('independence')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            testType === 'independence' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Test of Independence
        </button>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observed Frequencies {testType === 'independence' ? '(rows separated by new lines)' : ''}
          </label>
          <textarea
            value={observedInput}
            onChange={(e) => setObservedInput(e.target.value)}
            placeholder={testType === 'goodness-of-fit' 
              ? "Enter comma-separated values (e.g., 20, 30, 25, 15)..."
              : "Enter matrix format (e.g., 10, 20, 15 on first line, 25, 30, 20 on second line)..."
            }
            rows={testType === 'independence' ? 3 : 2}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {testType === 'goodness-of-fit' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expected Frequencies</label>
            <textarea
              value={expectedInput}
              onChange={(e) => setExpectedInput(e.target.value)}
              placeholder="Enter comma-separated expected values..."
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
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
          onClick={calculateChiSquare}
          disabled={!observedInput || (testType === 'goodness-of-fit' && !expectedInput)}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Calculator size={18} />
          Calculate Chi-Square
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
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h4 className="font-semibold text-purple-800 mb-4">Chi-Square Test Results:</h4>
          <div className="space-y-3">
            {result.steps.map((step, index) => (
              <div key={index} className="bg-white p-3 rounded border border-purple-200">
                <p className="font-medium text-purple-800">{step.label}:</p>
                <p className="text-purple-700 font-mono">{step.result}</p>
              </div>
            ))}
            <div className="bg-white p-4 rounded border-2 border-purple-300">
              <p className="font-medium text-purple-800">Degrees of Freedom: {result.degreesOfFreedom}</p>
              <p className="font-medium text-purple-800">Critical Value: {result.criticalValue?.toFixed(4)}</p>
              <p className="font-bold text-purple-800 text-lg">Decision: {result.decision}</p>
              <p className="text-purple-700 mt-2">{result.conclusion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};