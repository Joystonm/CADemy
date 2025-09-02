import React, { useState } from 'react'
import { useScene } from '../context/SceneContext'

const SimpleMoveControls = () => {
  const { selectedObject, transformMode, updateObject } = useScene()
  const [targetX, setTargetX] = useState(0)
  const [targetZ, setTargetZ] = useState(0)

  if (transformMode !== 'move' || !selectedObject) {
    return null
  }

  const moveToPosition = (x, z) => {
    console.log(`🎯 SimpleMoveControls: Moving object to [${x}, 0.5, ${z}]`)
    console.log('🎯 Selected object ID:', selectedObject.id)
    
    // Force a completely new position array
    const newPosition = [parseFloat(x), 0.5, parseFloat(z)]
    
    updateObject(selectedObject.id, {
      position: newPosition
    })
    
    console.log('🎯 Move command sent')
  }

  const handleInputMove = () => {
    moveToPosition(targetX, targetZ)
  }

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-95 rounded-lg p-4 shadow-lg z-20">
      <h3 className="font-bold text-gray-800 mb-3 text-center">Move Tool Active</h3>
      
      {/* Quick Move Buttons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button onClick={() => moveToPosition(-2, 2)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">↖ (-2,2)</button>
        <button onClick={() => moveToPosition(0, 2)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">↑ (0,2)</button>
        <button onClick={() => moveToPosition(2, 2)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">↗ (2,2)</button>
        
        <button onClick={() => moveToPosition(-2, 0)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">← (-2,0)</button>
        <button onClick={() => moveToPosition(0, 0)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">⌂ (0,0)</button>
        <button onClick={() => moveToPosition(2, 0)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">→ (2,0)</button>
        
        <button onClick={() => moveToPosition(-2, -2)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">↙ (-2,-2)</button>
        <button onClick={() => moveToPosition(0, -2)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">↓ (0,-2)</button>
        <button onClick={() => moveToPosition(2, -2)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">↘ (2,-2)</button>
      </div>

      {/* Custom Position Input */}
      <div className="border-t pt-3">
        <div className="flex items-center space-x-2 mb-2">
          <label className="text-xs font-medium">X:</label>
          <input 
            type="number" 
            value={targetX} 
            onChange={(e) => setTargetX(parseFloat(e.target.value) || 0)}
            className="w-16 px-1 py-1 border rounded text-xs"
            step="0.5"
          />
          <label className="text-xs font-medium">Z:</label>
          <input 
            type="number" 
            value={targetZ} 
            onChange={(e) => setTargetZ(parseFloat(e.target.value) || 0)}
            className="w-16 px-1 py-1 border rounded text-xs"
            step="0.5"
          />
          <button 
            onClick={handleInputMove}
            className="bg-green-500 text-white px-2 py-1 rounded text-xs"
          >
            Move
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-600 text-center mt-2">
        Current: [{selectedObject.position.map(p => p.toFixed(1)).join(', ')}]
      </div>
    </div>
  )
}

export default SimpleMoveControls
