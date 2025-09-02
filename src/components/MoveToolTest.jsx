import React, { useState, useEffect } from 'react'
import { useScene } from '../context/SceneContext'

const MoveToolTest = () => {
  const { 
    objects, 
    selectedObject, 
    transformMode, 
    setTransformMode, 
    addObject,
    selectObject,
    updateObject
  } = useScene()
  
  const [forceUpdate, setForceUpdate] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const [lastPosition, setLastPosition] = useState(null)
  
  const forceRefresh = () => {
    setForceUpdate(prev => prev + 1)
    console.log('🔄 Force refresh triggered')
  }

  // Monitor position changes with proper dependency
  useEffect(() => {
    if (selectedObject) {
      setLastPosition([...selectedObject.position]) // Create new array to trigger re-render
    }
  }, [selectedObject?.position?.[0], selectedObject?.position?.[1], selectedObject?.position?.[2]])

  const addTestCube = () => {
    const newCube = {
      id: Date.now(),
      type: 'cube',
      position: [0, 0.5, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      material: {
        color: '#ff6b6b',
        metalness: 0.1,
        roughness: 0.7
      }
    }
    addObject(newCube)
    selectObject(newCube)
    console.log('Test cube added:', newCube)
  }

  const enableMoveMode = () => {
    setTransformMode('move')
    console.log('Move mode enabled - should stay active!')
  }

  const forceStayInMoveMode = () => {
    // Keep forcing move mode every 100ms to prevent it from changing
    const interval = setInterval(() => {
      if (transformMode !== 'move') {
        console.log('Forcing move mode back on!')
        setTransformMode('move')
      }
    }, 100)
    
    // Stop after 10 seconds
    setTimeout(() => {
      clearInterval(interval)
      console.log('Stopped forcing move mode')
    }, 10000)
  }

  const testDirectUpdate = () => {
    if (selectedObject) {
      console.log('=== DIRECT UPDATE TEST ===')
      console.log('Selected object before:', selectedObject)
      console.log('All objects before:', objects)
      
      // Try to update directly
      const newPosition = [3, 1, 3]
      console.log('Calling updateObject with:', selectedObject.id, { position: newPosition })
      
      updateObject(selectedObject.id, { position: newPosition })
      
      // Check after a delay
      setTimeout(() => {
        console.log('Objects after update:', objects)
        console.log('Selected object after update:', selectedObject)
      }, 100)
    }
  }

  const moveToSpecificPositions = () => {
    if (!selectedObject) return
    
    const positions = [
      [2, 0.5, 0],
      [-2, 0.5, 0], 
      [0, 0.5, 2],
      [0, 0.5, -2],
      [0, 0.5, 0]
    ]
    
    let index = 0
    const interval = setInterval(() => {
      if (index < positions.length) {
        console.log('Moving to position:', positions[index])
        updateObject(selectedObject.id, { position: positions[index] })
        index++
      } else {
        clearInterval(interval)
      }
    }, 1000)
  }

  // Add click listener to count clicks
  useEffect(() => {
    const handleClick = () => {
      setClickCount(prev => prev + 1)
      console.log('Global click detected, count:', clickCount + 1)
    }
    
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [clickCount])

  return (
    <div className="absolute top-20 left-4 bg-white bg-opacity-95 rounded-lg p-4 shadow-lg z-10 max-w-xs">
      <h3 className="font-bold text-gray-800 mb-3">Move Tool Debug</h3>
      
      <div className="space-y-1 text-xs">
        <div>Objects: {objects.length}</div>
        <div>Selected: {selectedObject ? selectedObject.type : 'None'}</div>
        <div>Selected ID: {selectedObject ? selectedObject.id : 'None'}</div>
        <div>Mode: <span className="font-medium">{transformMode}</span></div>
        <div>Click Count: {clickCount}</div>
        {selectedObject && (
          <>
            <div>Position: [{selectedObject.position.map(p => p.toFixed(1)).join(', ')}]</div>
            <div>Position Raw: {JSON.stringify(selectedObject.position)}</div>
          </>
        )}
        {lastPosition && (
          <div>Last Pos: [{lastPosition.map(p => p.toFixed(1)).join(', ')}]</div>
        )}
      </div>

      <div className="space-y-2 mt-4">
        <button
          onClick={addTestCube}
          className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Add Test Cube
        </button>
        
        <button
          onClick={enableMoveMode}
          disabled={!selectedObject}
          className={`w-full px-3 py-2 rounded text-sm ${
            selectedObject 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Enable Move Mode
        </button>

        <button
          onClick={forceStayInMoveMode}
          disabled={!selectedObject}
          className={`w-full px-3 py-2 rounded text-sm ${
            selectedObject 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          🔒 Force Move Mode (10s)
        </button>

        <button
          onClick={forceRefresh}
          className="w-full px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
        >
          🔄 Force Refresh UI
        </button>

        <button
          onClick={testDirectUpdate}
          disabled={!selectedObject}
          className={`w-full px-3 py-2 rounded text-sm ${
            selectedObject 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          🔧 DEBUG: Direct Update Test
        </button>

        <button
          onClick={moveToSpecificPositions}
          disabled={!selectedObject}
          className={`w-full px-3 py-2 rounded text-sm ${
            selectedObject 
              ? 'bg-orange-500 text-white hover:bg-orange-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          🔄 Animated Move Test
        </button>
      </div>

      {transformMode === 'move' && selectedObject && (
        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-xs">
          <div className="font-medium text-green-800">Move Mode Active!</div>
          <div className="text-green-700">Click anywhere on the 3D canvas to move the object.</div>
          <div className="text-green-600 mt-1">Watch console for click events.</div>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-600">
        <div className="font-medium">Debug Steps:</div>
        <div>1. Add cube → Select it</div>
        <div>2. Enable move mode</div>
        <div>3. Click on 3D canvas</div>
        <div>4. Check console logs</div>
        <div>5. Watch position change</div>
      </div>
    </div>
  )
}

export default MoveToolTest
