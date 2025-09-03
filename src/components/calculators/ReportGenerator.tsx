import React, { useState } from 'react';
import { FileText } from 'lucide-react';

export const ReportGenerator: React.FC = () => {
  const [title, setTitle] = useState('');
  const [variables, setVariables] = useState('');
  const [sampleSize, setSampleSize] = useState('');
  const [methodology, setMethodology] = useState('');
  const [outline, setOutline] = useState<string[]>([]);

  const generateOutline = () => {
    if (!title.trim() || !variables.trim() || !sampleSize.trim()) return;

    const reportOutline = [
      '1. TITLE PAGE',
      `   - ${title}`,
      `   - Student Name, Roll Number, College`,
      `   - Date of Submission`,
      '',
      '2. ABSTRACT',
      `   - Brief summary of research on ${variables}`,
      `   - Sample size: ${sampleSize}`,
      `   - Key findings and conclusions`,
      '',
      '3. TABLE OF CONTENTS',
      '   - List of chapters, sections, and page numbers',
      '',
      '4. INTRODUCTION',
      '   - Background and context',
      '   - Problem statement',
      '   - Research objectives',
      '   - Significance of the study',
      '',
      '5. LITERATURE REVIEW',
      '   - Previous studies on similar topics',
      '   - Theoretical framework',
      '   - Research gaps identified',
      '',
      '6. RESEARCH METHODOLOGY',
      `   - Research design: ${methodology || 'Descriptive/Analytical'}`,
      `   - Sample size and sampling method: ${sampleSize} participants`,
      '   - Data collection instruments',
      '   - Statistical tools used',
      '',
      '7. DATA ANALYSIS AND INTERPRETATION',
      '   - Descriptive statistics',
      '   - Statistical test results',
      '   - Tables and figures',
      '   - Interpretation of findings',
      '',
      '8. FINDINGS AND DISCUSSION',
      '   - Summary of key results',
      '   - Discussion of implications',
      '   - Comparison with literature',
      '',
      '9. CONCLUSION',
      '   - Summary of findings',
      '   - Limitations of the study',
      '   - Recommendations for future research',
      '',
      '10. REFERENCES',
      '    - APA/MLA format citations',
      '    - Books, journals, websites used',
      '',
      '11. APPENDICES',
      '    - Raw data',
      '    - Questionnaires/Survey instruments',
      '    - Additional calculations'
    ];

    setOutline(reportOutline);
  };

  const clearForm = () => {
    setTitle('');
    setVariables('');
    setSampleSize('');
    setMethodology('');
    setOutline([]);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Research Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Impact of Social Media on Consumer Behavior"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Variables</label>
          <input
            type="text"
            value={variables}
            onChange={(e) => setVariables(e.target.value)}
            placeholder="e.g., social media usage, purchase intention"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sample Size</label>
          <input
            type="text"
            value={sampleSize}
            onChange={(e) => setSampleSize(e.target.value)}
            placeholder="e.g., 200 college students"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Research Design</label>
          <select
            value={methodology}
            onChange={(e) => setMethodology(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Select design...</option>
            <option value="Descriptive">Descriptive Research</option>
            <option value="Analytical">Analytical Research</option>
            <option value="Experimental">Experimental Research</option>
            <option value="Survey">Survey Research</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={generateOutline}
          disabled={!title.trim() || !variables.trim() || !sampleSize.trim()}
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <FileText size={18} />
          Generate Report Outline
        </button>
        <button
          onClick={clearForm}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {outline.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <h4 className="font-semibold text-emerald-800 mb-4">Research Report Outline:</h4>
          <div className="bg-white p-4 rounded border border-emerald-200">
            <pre className="text-emerald-700 text-sm whitespace-pre-wrap font-mono leading-relaxed">
              {outline.join('\n')}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};