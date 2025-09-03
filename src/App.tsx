import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { Module1 } from './components/modules/Module1';
import { Module2 } from './components/modules/Module2';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/localStorage';

function App() {
  const [currentModule, setCurrentModule] = useState<string>('home');
  const [lastModule, setLastModule] = useState<string | null>(null);

  useEffect(() => {
    const savedModule = loadFromLocalStorage('currentModule');
    const savedLastModule = loadFromLocalStorage('lastModule');
    
    if (savedModule && savedModule !== 'home') {
      setCurrentModule(savedModule);
    }
    if (savedLastModule) {
      setLastModule(savedLastModule);
    }
  }, []);

  const handleModuleChange = (moduleId: string) => {
    if (moduleId !== 'home') {
      setLastModule(currentModule !== 'home' ? currentModule : lastModule);
      saveToLocalStorage('lastModule', currentModule !== 'home' ? currentModule : lastModule);
    }
    setCurrentModule(moduleId);
    saveToLocalStorage('currentModule', moduleId);
  };

  const renderCurrentModule = () => {
    switch (currentModule) {
      case 'home':
        return <HomePage onModuleChange={handleModuleChange} lastModule={lastModule} />;
      case 'module1':
        return <Module1 />;
      case 'module2':
        return <Module2 />;
      default:
        return <HomePage onModuleChange={handleModuleChange} lastModule={lastModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentModule={currentModule} onModuleChange={handleModuleChange} />
      <main className="ml-80 p-8">
        <div className="max-w-6xl mx-auto">
          {renderCurrentModule()}
        </div>
      </main>
    </div>
  );
}

export default App;