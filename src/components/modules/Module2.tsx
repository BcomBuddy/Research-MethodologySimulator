import React, { useState } from 'react';
import { BarChart3, Calculator, FileText, TrendingUp } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { TTestCalculator } from '../calculators/TTestCalculator';
import { FTestCalculator } from '../calculators/FTestCalculator';
import { ChiSquareCalculator } from '../calculators/ChiSquareCalculator';
import { ANOVACalculator } from '../calculators/ANOVACalculator';
import { ReportGenerator } from '../calculators/ReportGenerator';

export const Module2: React.FC = () => {
  const [activeSimulator, setActiveSimulator] = useState<string>('');

  const simulators = [
    {
      id: 't-test',
      title: 't-Test Calculator',
      description: 'One-sample, independent, and paired t-tests',
      icon: <Calculator size={20} />,
      component: <TTestCalculator />
    },
    {
      id: 'f-test',
      title: 'F-Test Calculator',
      description: 'Variance ratio test for two samples',
      icon: <TrendingUp size={20} />,
      component: <FTestCalculator />
    },
    {
      id: 'chi-square',
      title: 'Chi-Square Test',
      description: 'Goodness of fit and independence tests',
      icon: <BarChart3 size={20} />,
      component: <ChiSquareCalculator />
    },
    {
      id: 'anova',
      title: 'ANOVA Calculator',
      description: 'One-way and Two-way analysis of variance',
      icon: <BarChart3 size={20} />,
      component: <ANOVACalculator />
    },
    {
      id: 'report-generator',
      title: 'Research Report Generator',
      description: 'Generate research report outline',
      icon: <FileText size={20} />,
      component: <ReportGenerator />
    }
  ];

  // If a simulator is active, show only the simulator screen
  if (activeSimulator) {
    const currentSimulator = simulators.find(s => s.id === activeSimulator);
    return (
      <div className="space-y-6">
        {/* Back button and simulator header */}
        <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
          <button
            onClick={() => setActiveSimulator('')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Module II
          </button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{currentSimulator?.title}</h2>
            <p className="text-gray-600">{currentSimulator?.description}</p>
          </div>
        </div>

        {/* Simulator content */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          {currentSimulator?.component}
        </div>
      </div>
    );
  }

  // Default module view with definitions and simulator selection
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Module II: Parametric & Non-Parametric Tests; Research Report</h2>
        <p className="text-gray-600">Practice statistical testing and research report writing</p>
      </div>

      {/* Definitions Section */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Definitions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800">Statistical Tests</h4>
            <p className="text-gray-600 text-sm"><strong>t-Test:</strong> Compares means between groups. <strong>F-Test:</strong> Compares variances. <strong>Chi-Square:</strong> Tests independence or goodness of fit. <strong>ANOVA:</strong> Compares means across multiple groups.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Research Report Contents</h4>
            <p className="text-gray-600 text-sm">Title Page, Abstract, Introduction, Literature Review, Methodology, Results, Discussion, Conclusion, References, Appendices.</p>
          </div>
        </div>
      </div>

      {/* Interactive Simulator Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Interactive Simulator</h3>
          <p className="text-gray-600 text-sm mt-1">Choose a statistical calculator to practice</p>
        </div>

        <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {simulators.map((sim) => (
            <button
              key={sim.id}
              onClick={() => setActiveSimulator(sim.id)}
              className="p-4 border border-gray-200 rounded-lg text-left hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-blue-600">{sim.icon}</div>
                <h4 className="font-medium text-gray-800">{sim.title}</h4>
              </div>
              <p className="text-sm text-gray-600">{sim.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};