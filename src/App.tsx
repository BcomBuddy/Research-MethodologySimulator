import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { Module1 } from './components/modules/Module1';
import { Module2 } from './components/modules/Module2';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/localStorage';

function App() {
  const { user, ssoUser, loading: authLoading, signOut } = useAuth();
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

  const handleLogout = async () => {
    try {
      await signOut();
      setCurrentModule('home');
      saveToLocalStorage('currentModule', 'home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated (only for Firebase users)
  if (!user && !ssoUser) {
    return <LoginPage onLogin={() => {}} />;
  }

  // If SSO user, show authentication required message
  if (ssoUser && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Authentication Required</h1>
          <p className="text-gray-600 mb-4">
            This app requires authentication through the main BcomBuddy platform.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Please access this app through the BcomBuddy dashboard.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>SSO User Detected:</strong> {ssoUser.name} ({ssoUser.email})
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Role: {ssoUser.role} | Year: {ssoUser.yearOfStudy}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Sidebar 
          currentModule={currentModule} 
          onModuleChange={handleModuleChange} 
          onLogout={handleLogout}
          ssoUser={ssoUser}
        />
        <main className="ml-80 p-8">
          <div className="max-w-6xl mx-auto">
            {renderCurrentModule()}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default App;