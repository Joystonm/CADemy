import React, { useState } from 'react'
import { useScene } from '../context/SceneContext'
import { useProgressChecker } from '../hooks/useProgressChecker'
import challengesData from '../data/challenges.json'

const TestMoveAndProgress = () => {
  const { objects, selectedObject, transformMode, setTransformMode } = useScene()
  const { checkProgress, isChecking, currentValidationStatus } = useProgressChecker()
  const [testResults, setTestResults] = useState(null)

  const firstChallenge = challengesData.challenges[0]

  const handleTestProgress = async () => {
    const results = await checkProgress(firstChallenge)
    setTestResults(results)
  }

  return (
    <div className="p-4 bg-gray-100 border rounded">
      <h3 className="text-lg font-semibold mb-4">Test Move Tool & Progress Checker</h3>
      
      {/* Move Tool Test */}
      <div className="mb-4">
        <h4 className="font-medium mb-2">Move Tool Test</h4>
        <div className="text-sm space-y-1">
          <div>Selected Object: {selectedObject ? selectedObject.type : 'None'}</div>
          <div>Transform Mode: {transformMode}</div>
          <div>Objects in Scene: {objects.length}</div>
        </div>
        <button
          onClick={() => setTransformMode('move')}
          className={`mt-2 px-3 py-1 rounded text-sm ${
            transformMode === 'move' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Enable Move Mode
        </button>
        <div className="mt-2 text-xs text-gray-600">
          {transformMode === 'move' && selectedObject 
            ? '✅ Select an object and click anywhere to move it there'
            : '❌ Select an object and enable move mode to test'
          }
        </div>
      </div>

      {/* Progress Checker Test */}
      <div className="mb-4">
        <h4 className="font-medium mb-2">Progress Checker Test</h4>
        <div className="text-sm space-y-1">
          <div>Challenge: {firstChallenge.title}</div>
          <div>Objects: {currentValidationStatus.objectTypes.join(', ') || 'None'}</div>
        </div>
        <button
          onClick={handleTestProgress}
          disabled={isChecking}
          className={`mt-2 px-3 py-1 rounded text-sm ${
            isChecking 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isChecking ? 'Checking...' : 'Test Progress Check'}
        </button>
      </div>

      {/* Test Results */}
      {testResults && (
        <div className="mt-4 p-3 bg-white border rounded">
          <h4 className="font-medium mb-2">Progress Results</h4>
          <div className="text-sm space-y-1">
            <div>Completed: {testResults.completed}/{testResults.total}</div>
            <div>Completed Objectives: [{testResults.completedObjectives.join(', ')}]</div>
            <div>Is Complete: {testResults.isComplete ? '✅' : '❌'}</div>
            {testResults.error && (
              <div className="text-red-600">Error: {testResults.error}</div>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <h4 className="font-medium text-blue-800 mb-1">Test Instructions</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <div>1. Add a cube from the object panel</div>
          <div>2. Select the cube and enable move mode</div>
          <div>3. Click anywhere on the ground to move the cube</div>
          <div>4. Scale the cube to 2x2x2 in properties panel</div>
          <div>5. Rotate the cube 45° around Y-axis</div>
          <div>6. Change material color to blue</div>
          <div>7. Click "Test Progress Check" to validate</div>
        </div>
      </div>
    </div>
  )
}

export default TestMoveAndProgress
