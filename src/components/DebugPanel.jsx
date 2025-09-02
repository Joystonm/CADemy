import React from 'react'
import { useScene } from '../context/SceneContext'
import { useApp } from '../context/AppContext'

const DebugPanel = () => {
  try {
    const sceneContext = useScene()
    const appContext = useApp()

    return (
      <div className="fixed bottom-4 left-4 bg-black bg-opacity-75 text-white p-3 rounded text-xs max-w-xs">
        <h4 className="font-bold mb-2">Debug Info</h4>
        <div className="space-y-1">
          <div>Scene Context: {sceneContext ? '✅ Available' : '❌ Missing'}</div>
          <div>App Context: {appContext ? '✅ Available' : '❌ Missing'}</div>
          <div>Objects: {sceneContext?.objects?.length || 0}</div>
          <div>Selected: {sceneContext?.selectedObject?.type || 'None'}</div>
          <div>Completed Challenges: {appContext?.completedChallenges?.length || 0}</div>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="fixed bottom-4 left-4 bg-red-600 text-white p-3 rounded text-xs max-w-xs">
        <h4 className="font-bold mb-2">Context Error</h4>
        <div>{error.message}</div>
      </div>
    )
  }
}

export default DebugPanel
