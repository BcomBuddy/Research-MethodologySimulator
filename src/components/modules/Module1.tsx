import React, { useState } from 'react';
import { BookOpen, Settings, Target, TestTube } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { ResearchProblemWizard } from '../calculators/ResearchProblemWizard';
import { ScaleIdentifier } from '../calculators/ScaleIdentifier';
import { HypothesisBuilder } from '../calculators/HypothesisBuilder';
import { TestSelector } from '../calculators/TestSelector';

export const Module1: React.FC = () => {
  const [activeSimulator, setActiveSimulator] = useState<string>('');

  const simulators = [
    {
      id: 'research-problem',
      title: 'Research Problem Wizard',
      description: 'Generate concise problem statements',
      icon: <Target size={20} />,
      component: <ResearchProblemWizard />
    },
    {
      id: 'scale-identifier',
      title: 'Scale Identifier',
      description: 'Identify measurement levels for variables',
      icon: <Settings size={20} />,
      component: <ScaleIdentifier />
    },
    {
      id: 'hypothesis-builder',
      title: 'Hypothesis Builder',
      description: 'Construct H₀ and H₁ statements',
      icon: <TestTube size={20} />,
      component: <HypothesisBuilder />
    },
    {
      id: 'test-selection',
      title: 'Test Selection Helper',
      description: 'Choose appropriate statistical tests',
      icon: <BookOpen size={20} />,
      component: <TestSelector />
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
            Back to Module I
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Module I: Introduction, Measurement & Hypothesis Testing</h2>
        <p className="text-gray-600">Learn research fundamentals and hypothesis testing concepts</p>
      </div>

      {/* Definitions Section */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Definitions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800">Research</h4>
            <p className="text-gray-600 text-sm">Systematic investigation to establish facts and reach new conclusions. Steps: Problem identification, literature review, hypothesis formulation, data collection, analysis, and conclusion.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Measurement Scales</h4>
            <p className="text-gray-600 text-sm"><strong>Nominal:</strong> Categories (e.g., gender). <strong>Ordinal:</strong> Ranked categories (e.g., satisfaction levels). <strong>Interval:</strong> Equal intervals, no true zero (e.g., temperature). <strong>Ratio:</strong> Equal intervals with true zero (e.g., height).</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Scaling Techniques</h4>
            <p className="text-gray-600 text-sm">Likert Scale, Semantic Differential, Thurstone Scale, Guttman Scale.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Hypothesis</h4>
            <p className="text-gray-600 text-sm">Testable statement about population parameters. <strong>H₀:</strong> Null hypothesis (no effect). <strong>H₁:</strong> Alternative hypothesis (effect exists). Types: Directional vs. Non-directional.</p>
          </div>
        </div>
      </div>

      {/* Interactive Simulator Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Interactive Simulator</h3>
          <p className="text-gray-600 text-sm mt-1">Choose a tool to practice research concepts</p>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-4">
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