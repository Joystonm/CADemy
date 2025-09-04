import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { SceneProvider } from './context/SceneContext'
import { AuthProvider } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import { useAuth } from './context/AuthContext'
import AppRouter from './router'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import ErrorBoundary from './components/ErrorBoundary'

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4 animate-pulse">
            <span className="text-3xl font-bold text-white">C</span>
          </div>
          <p className="text-gray-600">Loading CADemy...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="App">
      <Navbar />
      <AppRouter />
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ProgressProvider>
          <AppProvider>
            <SceneProvider>
              <Router>
                <AppContent />
              </Router>
            </SceneProvider>
          </AppProvider>
        </ProgressProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
