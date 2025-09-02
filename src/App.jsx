import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { SceneProvider } from './context/SceneContext'
import AppRouter from './router'
import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <SceneProvider>
          <Router>
            <div className="App">
              <Navbar />
              <AppRouter />
            </div>
          </Router>
        </SceneProvider>
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App
