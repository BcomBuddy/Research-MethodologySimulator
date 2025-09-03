import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const TestSelector: React.FC = () => {
  const [dataType, setDataType] = useState('');
  const [groups, setGroups] = useState('');
  const [goal, setGoal] = useState('');
  const [recommendation, setRecommendation] = useState<{ test: string; reason: string } | null>(null);

  const selectTest = () => {
    if (!dataType || !groups || !goal) return;

    let test = '';
    let reason = '';

    if (dataType === 'continuous') {
      if (groups === 'one' && goal === 'compare-mean') {
        test = 'One-Sample t-Test';
        reason = 'Comparing sample mean to known population mean';
      } else if (groups === 'two' && goal === 'compare-means') {
        test = 'Independent Samples t-Test';
        reason = 'Comparing means of two independent groups';
      } else if (groups === 'two' && goal === 'compare-variances') {
        test = 'F-Test';
        reason = 'Comparing variances of two groups';
      } else if (groups === 'multiple' && goal === 'compare-means') {
        test = 'One-Way ANOVA';
        reason = 'Comparing means across multiple groups';
      } else if (groups === 'multiple' && goal === 'two-factors') {
        test = 'Two-Way ANOVA';
        reason = 'Testing effects of two factors simultaneously';
      } else if (groups === 'one' && goal === 'compare-variances') {
        test = 'Chi-Square Test for Variance';
        reason = 'Testing if sample variance differs from population variance';
      } else if (groups === 'two' && goal === 'two-factors') {
        test = 'Two-Way ANOVA';
        reason = 'Testing interaction effects between two factors with two groups each';
      }
    } else if (dataType === 'categorical') {
      if (goal === 'goodness-of-fit') {
        test = 'Chi-Square Goodness of Fit';
        reason = 'Testing if sample fits expected distribution';
      } else if (goal === 'independence') {
        test = 'Chi-Square Test of Independence';
        reason = 'Testing if two categorical variables are independent';
      } else if (goal === 'compare-proportions') {
        test = 'Z-Test for Proportions';
        reason = 'Comparing sample proportion to population proportion';
      }
    }

    if (test) {
      setRecommendation({ test, reason });
    }
  };

  const clearForm = () => {
    setDataType('');
    setGroups('');
    setGoal('');
    setRecommendation(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
          <select
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Select data type...</option>
            <option value="continuous">Continuous (Interval/Ratio)</option>
            <option value="categorical">Categorical (Nominal/Ordinal)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Groups</label>
          <select
            value={groups}
            onChange={(e) => setGroups(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Select groups...</option>
            <option value="one">One Group</option>
            <option value="two">Two Groups</option>
            <option value="multiple">Multiple Groups</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Research Goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Select goal...</option>
            {dataType === 'continuous' && (
              <>
                <option value="compare-mean">Compare to Population Mean</option>
                <option value="compare-means">Compare Group Means</option>
                <option value="compare-variances">Compare Variances</option>
                <option value="two-factors">Test Two Factors</option>
              </>
            )}
            {dataType === 'categorical' && (
              <>
                <option value="goodness-of-fit">Test Distribution Fit</option>
                <option value="independence">Test Independence</option>
                <option value="compare-proportions">Compare Proportions</option>
              </>
            )}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={selectTest}
          disabled={!dataType || !groups || !goal}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Search size={18} />
          Recommend Test
        </button>
        <button
          onClick={clearForm}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {recommendation && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
          <h4 className="font-semibold text-indigo-800 mb-2">Recommended Test:</h4>
          <div className="space-y-2">
            <p className="text-indigo-700 text-lg font-medium">{recommendation.test}</p>
            <p className="text-indigo-600"><strong>Reason:</strong> {recommendation.reason}</p>
          </div>
        </div>
      )}
    </div>
  );
};