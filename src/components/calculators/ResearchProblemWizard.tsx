import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';

export const ResearchProblemWizard: React.FC = () => {
  const [area, setArea] = useState('');
  const [variables, setVariables] = useState('');
  const [scope, setScope] = useState('');
  const [problemStatement, setProblemStatement] = useState('');

  const generateProblemStatement = () => {
    if (!area.trim() || !variables.trim() || !scope.trim()) {
      return;
    }

    const statement = `To examine the ${variables.toLowerCase()} in ${area.toLowerCase()} ${scope.toLowerCase()}.`;
    setProblemStatement(statement);
  };

  const clearForm = () => {
    setArea('');
    setVariables('');
    setScope('');
    setProblemStatement('');
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Research Area</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="e.g., consumer behavior, marketing effectiveness"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Variables</label>
          <input
            type="text"
            value={variables}
            onChange={(e) => setVariables(e.target.value)}
            placeholder="e.g., relationship between price and demand"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scope</label>
          <input
            type="text"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder="e.g., among college students in Mumbai"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={generateProblemStatement}
          disabled={!area.trim() || !variables.trim() || !scope.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Wand2 size={18} />
          Generate Problem Statement
        </button>
        <button
          onClick={clearForm}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {problemStatement && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 className="font-semibold text-green-800 mb-2">Generated Problem Statement:</h4>
          <p className="text-green-700 text-lg italic">"{problemStatement}"</p>
        </div>
      )}
    </div>
  );
};