import React, { useState } from 'react'
import CanvasWrapper from '../three/CanvasWrapper'
import Toolbar from '../components/Toolbar'
import { useScene } from '../context/SceneContext'
import { useProgress } from '../context/ProgressContext'

const TutorialScene = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isInteractive, setIsInteractive] = useState(false)
  const { addObject } = useScene()
  const { completeTutorial } = useProgress()

  const tutorialSteps = [
    {
      title: "Welcome to CADemy!",
      description: "Learn 3D modeling fundamentals through hands-on practice.",
      instruction: "This tutorial will teach you essential CAD concepts including navigation, object creation, transformations, and basic modeling techniques. Click 'Next' to begin your journey.",
      action: null,
      category: "Introduction"
    },
    {
      title: "Step 1: 3D Navigation Basics",
      description: "Master 3D viewport navigation - the foundation of CAD work.",
      instruction: "Practice these controls:\n• Left-click + drag: Rotate view\n• Right-click + drag: Pan view\n• Scroll wheel: Zoom in/out\n\nTry moving around the 3D space now!",
      action: null,
      category: "Navigation"
    },
    {
      title: "Step 2: Understanding 3D Coordinates",
      description: "Learn the XYZ coordinate system used in 3D modeling.",
      instruction: "Notice the grid and axes:\n• Red line: X-axis (left/right)\n• Green line: Y-axis (up/down)\n• Blue line: Z-axis (forward/back)\n\nThe center point (0,0,0) is called the origin.",
      action: null,
      category: "Fundamentals"
    },
    {
      title: "Step 3: Creating Your First Object",
      description: "Add a cube - the most basic 3D shape.",
      instruction: "Click the button below to add a blue cube at the origin. This demonstrates object creation, a core CAD operation.",
      action: () => {
        const cube = {
          id: Date.now(),
          type: 'cube',
          position: [0, 0.5, 0],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          material: { color: '#4F46E5', metalness: 0.1, roughness: 0.7 }
        }
        addObject(cube)
      },
      category: "Object Creation"
    },
    {
      title: "Step 4: Object Selection",
      description: "Learn to select objects for editing.",
      instruction: "Click directly on the blue cube you just created. Notice how it gets highlighted when selected. Selection is required before you can modify any object.",
      action: null,
      category: "Selection"
    },
    {
      title: "Step 5: Translation (Moving Objects)",
      description: "Learn the Move tool - one of the most used CAD operations.",
      instruction: "1. Ensure the cube is selected\n2. Click the Move tool (↔️) in the toolbar\n3. Click on the green ground plane to move the cube\n\nTry moving it to different positions!",
      action: null,
      category: "Transformations"
    },
    {
      title: "Step 6: Adding Different Primitives",
      description: "Explore basic geometric shapes (primitives).",
      instruction: "Let's add a sphere - another fundamental shape. This will be positioned next to your cube.",
      action: () => {
        const sphere = {
          id: Date.now(),
          type: 'sphere',
          position: [3, 0.5, 0],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          material: { color: '#10B981', metalness: 0.1, roughness: 0.7 }
        }
        addObject(sphere)
      },
      category: "Object Creation"
    },
    {
      title: "Step 7: Cylindrical Shapes",
      description: "Add a cylinder to understand different primitive types.",
      instruction: "Cylinders are essential for creating pipes, rods, and circular features. This red cylinder will complete our basic shape collection.",
      action: () => {
        const cylinder = {
          id: Date.now(),
          type: 'cylinder',
          position: [-3, 0.5, 0],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          material: { color: '#EF4444', metalness: 0.1, roughness: 0.7 }
        }
        addObject(cylinder)
      },
      category: "Object Creation"
    },
    {
      title: "Step 8: Rotation Fundamentals",
      description: "Learn to rotate objects around different axes.",
      instruction: "1. Select the red cylinder\n2. Click the Rotate tool (🔄) in the toolbar\n3. Drag the colored rings to rotate around different axes\n\nTry rotating it 90 degrees to make it horizontal!",
      action: null,
      category: "Transformations"
    },
    {
      title: "Step 9: Scaling Objects",
      description: "Understand how to resize objects proportionally.",
      instruction: "1. Select the green sphere\n2. Click the Scale tool (📏) in the toolbar\n3. Drag the handles to make it larger or smaller\n\nTry making it twice as big!",
      action: null,
      category: "Transformations"
    },
    {
      title: "Step 10: Creating a Cone",
      description: "Add a cone to complete the basic primitive set.",
      instruction: "Cones are useful for creating tapered features, funnels, and pointed objects.",
      action: () => {
        const cone = {
          id: Date.now(),
          type: 'cone',
          position: [0, 0.5, 3],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          material: { color: '#F59E0B', metalness: 0.1, roughness: 0.7 }
        }
        addObject(cone)
      },
      category: "Object Creation"
    },
    {
      title: "Step 11: Precision Positioning",
      description: "Learn about precise object placement.",
      instruction: "In professional CAD, precision is crucial. Practice moving objects to specific positions using the move tool. Try to align objects in a straight line or create geometric patterns.",
      action: null,
      category: "Precision"
    },
    {
      title: "Step 12: Creating a Simple Assembly",
      description: "Combine multiple objects to create a basic structure.",
      instruction: "Let's create a simple tower:\n1. Stack the cube on top of the cylinder\n2. Place the cone on top of the cube\n3. Use the move tool for precise positioning\n\nThis teaches basic assembly concepts!",
      action: null,
      category: "Assembly"
    },
    {
      title: "Step 13: Understanding Materials",
      description: "Learn about object properties and appearance.",
      instruction: "Notice how each object has different colors and surface properties. In CAD, materials define how objects look and behave. Different colors help distinguish between parts in complex assemblies.",
      action: null,
      category: "Materials"
    },
    {
      title: "Step 14: Workspace Organization",
      description: "Learn to keep your 3D workspace organized.",
      instruction: "Good CAD practice involves:\n• Keeping objects organized\n• Using consistent naming\n• Maintaining clean geometry\n• Planning your design approach\n\nTry arranging your objects in a neat pattern.",
      action: null,
      category: "Best Practices"
    },
    {
      title: "Step 15: Design Iteration",
      description: "Practice modifying and refining your design.",
      instruction: "Real CAD work involves constant iteration. Try:\n• Moving objects to new positions\n• Changing their sizes\n• Creating different arrangements\n• Experimenting with layouts",
      action: null,
      category: "Design Process"
    },
    {
      title: "Congratulations! 🎉",
      description: "You've completed the comprehensive CAD tutorial!",
      instruction: "You've learned:\n✅ 3D navigation and coordinates\n✅ Creating primitive shapes\n✅ Object selection and transformation\n✅ Move, rotate, and scale operations\n✅ Basic assembly techniques\n✅ CAD best practices\n\nYou're now ready to explore the playground or try challenges!",
      action: null,
      category: "Completion"
    }
  ]

  const handleStartTutorial = () => {
    setIsInteractive(true)
    setCurrentStep(0)
  }

  const handleNextStep = async () => {
    console.log('handleNextStep called, currentStep:', currentStep, 'totalSteps:', tutorialSteps.length);
    
    const step = tutorialSteps[currentStep]
    if (step.action) {
      step.action()
    }
    
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Tutorial completed - track progress
      console.log('Tutorial completed! Calling completeTutorial...');
      try {
        await completeTutorial('basic-tutorial');
        console.log('completeTutorial finished successfully');
      } catch (error) {
        console.error('Error completing tutorial:', error);
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getActionButtonText = () => {
    switch (currentStep) {
      case 3: return '🟦 Add Blue Cube'
      case 6: return '🟢 Add Green Sphere'
      case 7: return '🔴 Add Red Cylinder'
      case 10: return '🟡 Add Orange Cone'
      default: return 'Complete Step'
    }
  }

  const getQuickTips = () => {
    switch (currentStep) {
      case 1: return "Hold Shift while dragging to pan faster, or use the middle mouse button if you have one."
      case 4: return "Selected objects appear with a colored outline. Only one object can be selected at a time."
      case 5: return "The move tool is essential in CAD. Practice clicking different spots on the ground plane."
      case 8: return "Each colored ring rotates around a different axis: Red=X, Green=Y, Blue=Z."
      case 9: return "Hold Shift while scaling to maintain proportions, or drag individual handles for non-uniform scaling."
      case 12: return "Real CAD assemblies can have hundreds of parts. Start simple and build complexity gradually."
      default: return null
    }
  }

  const getLearningObjective = () => {
    const objectives = {
      "Introduction": "Getting familiar with CAD concepts and interface",
      "Navigation": "Essential 3D viewport navigation skills",
      "Fundamentals": "Understanding 3D coordinate systems and workspace",
      "Object Creation": "Creating and placing basic geometric shapes",
      "Selection": "Selecting objects for editing and modification",
      "Transformations": "Moving, rotating, and scaling objects in 3D space",
      "Precision": "Achieving accurate positioning and measurements",
      "Assembly": "Combining multiple objects into complex structures",
      "Materials": "Understanding object properties and appearance",
      "Best Practices": "Professional CAD workflow and organization",
      "Design Process": "Iterative design and refinement techniques",
      "Completion": "Consolidating learned skills and next steps"
    }
    return objectives[currentTutorialStep.category] || "Building foundational CAD skills"
  }

  if (!isInteractive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">CAD Fundamentals Tutorial</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the essential skills of 3D modeling through our comprehensive, hands-on tutorial. 
              Learn industry-standard CAD concepts step by step.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What You'll Learn</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-white text-xl">🧭</span>
                </div>
                <h3 className="font-semibold text-green-800 mb-2">3D Navigation</h3>
                <p className="text-sm text-green-700">Master viewport controls, coordinate systems, and 3D space orientation.</p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-white text-xl">🔷</span>
                </div>
                <h3 className="font-semibold text-blue-800 mb-2">Primitive Shapes</h3>
                <p className="text-sm text-blue-700">Create cubes, spheres, cylinders, and cones - the building blocks of CAD.</p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-white text-xl">🔄</span>
                </div>
                <h3 className="font-semibold text-purple-800 mb-2">Transformations</h3>
                <p className="text-sm text-purple-700">Move, rotate, and scale objects with precision using professional tools.</p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <h3 className="font-semibold text-orange-800 mb-2">Precision Work</h3>
                <p className="text-sm text-orange-700">Learn accurate positioning and measurement techniques for professional results.</p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-white text-xl">🏗️</span>
                </div>
                <h3 className="font-semibold text-red-800 mb-2">Assembly Basics</h3>
                <p className="text-sm text-red-700">Combine multiple objects to create complex structures and assemblies.</p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-lg">
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <h3 className="font-semibold text-teal-800 mb-2">Best Practices</h3>
                <p className="text-sm text-teal-700">Professional workflow, organization, and design iteration techniques.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tutorial Overview</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-700 mb-2"><strong>Duration:</strong> 15-20 minutes</p>
                  <p className="text-gray-700 mb-2"><strong>Difficulty:</strong> Beginner-friendly</p>
                  <p className="text-gray-700"><strong>Prerequisites:</strong> None required</p>
                </div>
                <div>
                  <p className="text-gray-700 mb-2"><strong>Steps:</strong> 16 interactive lessons</p>
                  <p className="text-gray-700 mb-2"><strong>Format:</strong> Hands-on practice</p>
                  <p className="text-gray-700"><strong>Progress:</strong> Self-paced learning</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={handleStartTutorial}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold text-lg shadow-lg transform hover:scale-105"
              >
                🚀 Start Interactive Tutorial
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Begin your journey into 3D modeling and CAD design
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-3">💡 Learning Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Take your time with each step</li>
                <li>• Practice the mouse controls</li>
                <li>• Experiment with different positions</li>
                <li>• Don't hesitate to repeat steps</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-3">🎮 Controls Preview</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• <strong>Left-click + drag:</strong> Rotate view</li>
                <li>• <strong>Right-click + drag:</strong> Pan view</li>
                <li>• <strong>Scroll wheel:</strong> Zoom in/out</li>
                <li>• <strong>Click object:</strong> Select it</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-3">🏆 After Tutorial</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Explore the Playground mode</li>
                <li>• Try the Challenge mode</li>
                <li>• Create your own designs</li>
                <li>• Build complex assemblies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentTutorialStep = tutorialSteps[currentStep]

  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      
      {/* Tutorial Header */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-3">
              <span className="px-2 py-1 bg-green-200 text-green-800 text-xs font-medium rounded-full">
                {currentTutorialStep.category}
              </span>
              <h2 className="text-xl font-bold text-gray-800">{currentTutorialStep.title}</h2>
            </div>
            <p className="text-gray-700 mt-1">{currentTutorialStep.description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {tutorialSteps.length}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}% Complete
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex">
        {/* 3D Canvas */}
        <div className="flex-1">
          <CanvasWrapper />
        </div>
        
        {/* Tutorial Panel */}
        <div className="w-96 p-4 bg-gray-50 border-l overflow-y-auto">
          <div className="space-y-4">
            {/* Current Instruction */}
            <div className="p-4 bg-white rounded-lg border border-green-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <h3 className="font-semibold text-green-800">Current Task</h3>
              </div>
              <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {currentTutorialStep.instruction}
              </div>
            </div>

            {/* Action Button */}
            {currentTutorialStep.action && (
              <button
                onClick={handleNextStep}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-sm"
              >
                {getActionButtonText()}
              </button>
            )}

            {/* Quick Tips */}
            {getQuickTips() && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">💡 Quick Tip</h4>
                <p className="text-sm text-yellow-700">{getQuickTips()}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex space-x-2">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="flex-1 bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                ← Previous
              </button>
              <button
                onClick={handleNextStep}
                disabled={currentStep === tutorialSteps.length - 1}
                className="flex-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {currentStep === tutorialSteps.length - 1 ? 'Finish ✓' : 'Next →'}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Tutorial Progress</span>
                <span>{Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">🎯 What You're Learning</h4>
              <div className="text-sm text-blue-700">
                {getLearningObjective()}
              </div>
            </div>

            {/* Exit Tutorial */}
            <button
              onClick={() => setIsInteractive(false)}
              className="w-full bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 text-sm transition-colors"
            >
              Exit Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorialScene
