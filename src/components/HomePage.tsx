import React, { useState } from 'react';
import { BookOpen, Calculator } from 'lucide-react';
import { modules } from '../data/modules';

interface HomePageProps {
  onModuleChange: (moduleId: string) => void;
  lastModule: string | null;
}

export const HomePage: React.FC<HomePageProps> = ({ onModuleChange, lastModule }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const videoUrls = {
    'English': 'https://www.youtube.com/embed/qzvP4kEVShA',
    'Hindi/Urdu': 'https://www.youtube.com/embed/vGCI2gTVMRc',
    'Telugu': 'https://www.youtube.com/embed/BeRntzdd6RM'
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 flex flex-col items-center justify-center text-center py-10">
        <h2 className="text-4xl font-bold text-white mb-4">Research & Methodology Simulator</h2>
        <p className="text-lg text-white mt-2 max-w-2xl">
          Master research concepts and statistical analysis through interactive simulations designed specifically for B.Com students.
        </p>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">📽️ Learn about this simulator</h3>
        
        {/* Language Selection Dropdown */}
        <div className="mb-6">
          <label htmlFor="video-language" className="block text-sm font-medium text-gray-700 mb-2">
            Select Video Language
          </label>
          <select
            id="video-language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium transition-all duration-200 hover:border-gray-400"
          >
            <option value="English">English</option>
            <option value="Hindi/Urdu">Hindi/Urdu</option>
            <option value="Telugu">Telugu</option>
          </select>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`${videoUrls[selectedLanguage as keyof typeof videoUrls]}?rel=0&modestbranding=1`}
              title="Research & Methodology Simulator Introduction"
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
            onClick={() => onModuleChange(module.id)}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                {module.icon === 'BookOpen' && <BookOpen className="text-blue-600" size={24} />}
                {module.icon === 'Calculator' && <Calculator className="text-blue-600" size={24} />}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{module.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{module.description}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
              Start Learning
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calculator className="text-blue-600" size={24} />
          Quick Start Calculators
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-medium text-gray-800 mb-2">Mean Calculator</h4>
            <p className="text-sm text-gray-600">Calculate sample mean quickly</p>
            <button 
              onClick={() => onModuleChange('module2')}
              className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
            >
              Try Now →
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-medium text-gray-800 mb-2">Hypothesis Builder</h4>
            <p className="text-sm text-gray-600">Generate H₀ and H₁ statements</p>
            <button 
              onClick={() => onModuleChange('module1')}
              className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
            >
              Try Now →
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h4 className="font-medium text-gray-800 mb-2">Test Selection</h4>
            <p className="text-sm text-gray-600">Choose appropriate statistical test</p>
            <button 
              onClick={() => onModuleChange('module1')}
              className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
            >
              Try Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};