import React, { useState, useEffect } from 'react'
import CanvasWrapper from '../three/CanvasWrapper'
import MissionPanel from '../components/MissionPanel'
import Toolbar from '../components/Toolbar'
import ObjectPanel from '../components/ObjectPanel'
import PropertiesPanel from '../components/PropertiesPanel'
import { useScene } from '../context/SceneContext'

const ChallengeMode = ({ challenge, onComplete, onExit }) => {
  const { objects, selectedObject } = useScene()
  const [progress, setProgress] = useState({
    completed: 0,
    completedObjectives: [],
    currentHint: null,
    startTime: Date.now()
  })

  const [showCelebration, setShowCelebration] = useState(false)

  // Validate challenge progress
  const validateProgress = () => {
    if (!challenge || !challenge.validationRules) return

    const rules = challenge.validationRules
    const completedObjectives = []

    console.log('Validating progress...', { objects, rules })

    // Check each objective based on validation rules
    challenge.objectives.forEach((objective, index) => {
      let isCompleted = false

      switch (index) {
        case 0: // First objective - usually about adding shapes
          if (rules.requiredObjects) {
            isCompleted = rules.requiredObjects.every(shapeType => 
              objects.some(obj => obj.type === shapeType)
            )
            console.log(`Objective ${index}: Required objects check`, isCompleted)
          }
          break
        
        case 1: // Second objective - usually about dimensions or rotation
          if (rules.minDimensions && rules.maxDimensions) {
            const targetObject = objects.find(obj => 
              rules.requiredObjects?.includes(obj.type)
            )
            if (targetObject) {
              const scale = targetObject.scale
              isCompleted = scale.every((s, i) => 
                s >= rules.minDimensions[i] && s <= rules.maxDimensions[i]
              )
            }
          } else if (challenge.id === 1) {
            // For the first challenge, check if cube is rotated to 45 degrees
            const cube = objects.find(obj => obj.type === 'cube')
            if (cube) {
              // Convert radians to degrees and check if any axis has ~45 degrees
              const rotationDegrees = cube.rotation.map(r => Math.abs(r * 180 / Math.PI))
              const has45Degree = rotationDegrees.some(deg => Math.abs(deg - 45) < 5) // Allow 5 degree tolerance
              isCompleted = has45Degree
              console.log(`Objective ${index}: 45-degree rotation check`, { 
                rotationRadians: cube.rotation, 
                rotationDegrees, 
                has45Degree 
              })
            }
          }
          break
        
        case 2: // Third objective - usually about positioning/rotation
          // Custom validation logic based on challenge
          isCompleted = objects.length >= 2 // Placeholder
          break
        
        case 3: // Fourth objective - usually about materials/final touches
          if (rules.materialColor) {
            const targetObject = objects.find(obj => 
              rules.requiredObjects?.includes(obj.type)
            )
            if (targetObject) {
              isCompleted = targetObject.material?.color === rules.materialColor
              console.log(`Objective ${index}: Material color check`, { 
                expected: rules.materialColor, 
                actual: targetObject.material?.color,
                isCompleted 
              })
            }
          } else if (challenge.id === 1) {
            // For the first challenge, check if cube material is blue
            const cube = objects.find(obj => obj.type === 'cube')
            if (cube) {
              // Check for blue color (various blue shades)
              const color = cube.material?.color?.toLowerCase()
              const isBlue = color === '#0000ff' || color === 'blue' || 
                           color === '#4f46e5' || color === '#3b82f6' ||
                           (color && color.includes('blue'))
              isCompleted = isBlue
              console.log(`Objective ${index}: Blue material check`, { color, isBlue })
            }
          }
          break
        
        default:
          // Default validation
          isCompleted = false
      }

      if (isCompleted) {
        completedObjectives.push(index)
      }
    })

    console.log('Validation result:', completedObjectives)

    setProgress(prev => ({
      ...prev,
      completed: completedObjectives.length,
      completedObjectives
    }))

    // Check if challenge is complete
    if (completedObjectives.length === challenge.objectives.length) {
      setShowCelebration(true)
      setTimeout(() => {
        onComplete && onComplete({
          challengeId: challenge.id,
          completionTime: Date.now() - progress.startTime
        })
      }, 2000)
    }
  }

  const showHint = () => {
    const availableHints = challenge.hints || []
    const nextIncompleteObjective = challenge.objectives.findIndex(
      (_, index) => !progress.completedObjectives.includes(index)
    )
    
    if (nextIncompleteObjective !== -1 && availableHints[nextIncompleteObjective]) {
      setProgress(prev => ({
        ...prev,
        currentHint: availableHints[nextIncompleteObjective]
      }))
    }
  }

  // Auto-validate when objects change
  useEffect(() => {
    console.log('Objects changed, validating...', objects)
    if (objects.length > 0) {
      // Add a small delay to ensure all updates are processed
      setTimeout(() => {
        validateProgress()
      }, 100)
    }
  }, [objects, challenge])

  // Also validate when selected object changes (for material updates)
  useEffect(() => {
    if (selectedObject) {
      console.log('Selected object changed, validating...', selectedObject)
      setTimeout(() => {
        validateProgress()
      }, 100)
    }
  }, [selectedObject])

  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={onExit}
              className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-medium"
            >
              ← Back to Challenges
            </button>
          </div>
          
          {/* Challenge Info */}
          <div className="p-4">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Challenge Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{challenge.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{challenge.estimatedTime}</span>
                </div>
              </div>
            </div>

            {/* Manual Validation Button */}
            <button
              onClick={validateProgress}
              className="w-full mb-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium"
            >
              🔄 Check Progress Now
            </button>

            {/* Quick Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <h4 className="font-medium text-blue-800 mb-2">Quick Tips</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Use the shape library to add objects</li>
                <li>• Select objects to modify properties</li>
                <li>• Check progress regularly</li>
                <li>• Ask for hints if stuck</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <CanvasWrapper />
          </div>
          
          {/* Mission Panel at Bottom */}
          <MissionPanel
            challenge={challenge}
            progress={progress}
            onHint={showHint}
            onValidate={validateProgress}
          />
        </div>

        {/* Right Panels */}
        <div className="flex">
          <ObjectPanel />
          <PropertiesPanel />
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Challenge Complete!
            </h2>
            <p className="text-gray-600 mb-4">
              Great job completing "{challenge.title}"!
            </p>
            <div className="bg-gray-50 rounded p-4 mb-4">
              <div className="text-sm text-gray-600 space-y-1">
                <div>Time: {Math.round((Date.now() - progress.startTime) / 1000)}s</div>
                <div>Objectives: {progress.completed}/{challenge.objectives.length}</div>
              </div>
            </div>
            <div className="space-x-3">
              <button
                onClick={() => setShowCelebration(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Continue
              </button>
              <button
                onClick={onExit}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChallengeMode
