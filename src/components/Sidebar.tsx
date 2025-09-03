import React from 'react';
import { BookOpen, Calculator, Home } from 'lucide-react';
import { modules } from '../data/modules';

interface SidebarProps {
  currentModule: string;
  onModuleChange: (moduleId: string) => void;
}

const iconMap: { [key: string]: React.ReactNode } = {
  BookOpen: <BookOpen size={20} />,
  Calculator: <Calculator size={20} />,
};

export const Sidebar: React.FC<SidebarProps> = ({ currentModule, onModuleChange }) => {
  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg border-r border-gray-200 z-10">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Research & Methodology Simulator</h1>
        <p className="text-sm text-gray-600 mt-1">3rd Year – 5th Semester</p>
      </div>
      
      <nav className="p-4 space-y-2">
        <button
          onClick={() => onModuleChange('home')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
            currentModule === 'home'
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Home size={20} />
          <span className="font-medium">Home</span>
        </button>
        
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
              currentModule === module.id
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {iconMap[module.icon]}
            <div>
              <div className="font-medium">{module.title.split(':')[0]}</div>
              <div className="text-xs text-gray-500 mt-1">{module.description}</div>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};