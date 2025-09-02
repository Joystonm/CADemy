import React, { useState, useEffect } from 'react'
import { useScene } from '../context/SceneContext'

const PropertiesPanel = () => {
  const { selectedObject, updateObject } = useScene()
  const [localValues, setLocalValues] = useState({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    material: { color: '#888888', metalness: 0.1, roughness: 0.7 }
  })

  // Update local values when selected object changes
  useEffect(() => {
    if (selectedObject) {
      setLocalValues({
        position: {
          x: selectedObject.position[0] || 0,
          y: selectedObject.position[1] || 0,
          z: selectedObject.position[2] || 0
        },
        rotation: {
          x: (selectedObject.rotation[0] * 180 / Math.PI) || 0, // Convert radians to degrees
          y: (selectedObject.rotation[1] * 180 / Math.PI) || 0,
          z: (selectedObject.rotation[2] * 180 / Math.PI) || 0
        },
        scale: {
          x: selectedObject.scale[0] || 1,
          y: selectedObject.scale[1] || 1,
          z: selectedObject.scale[2] || 1
        },
        material: {
          color: selectedObject.material?.color || '#888888',
          metalness: selectedObject.material?.metalness || 0.1,
          roughness: selectedObject.material?.roughness || 0.7
        }
      })
    }
  }, [selectedObject])

  const handleValueChange = (category, axis, value) => {
    const newValues = {
      ...localValues,
      [category]: {
        ...localValues[category],
        [axis]: category === 'material' ? value : (parseFloat(value) || 0)
      }
    }
    setLocalValues(newValues)
    
    if (selectedObject && updateObject) {
      const updates = {}
      
      if (category === 'position') {
        updates.position = [newValues.position.x, newValues.position.y, newValues.position.z]
      } else if (category === 'rotation') {
        // Convert degrees to radians
        updates.rotation = [
          newValues.rotation.x * Math.PI / 180,
          newValues.rotation.y * Math.PI / 180,
          newValues.rotation.z * Math.PI / 180
        ]
      } else if (category === 'scale') {
        updates.scale = [newValues.scale.x, newValues.scale.y, newValues.scale.z]
      } else if (category === 'material') {
        updates.material = {
          ...selectedObject.material,
          [axis]: value // Use the raw value for material properties
        }
        console.log('Updating material:', updates.material)
      }
      
      updateObject(selectedObject.id, updates)
    }
  }

  const handleQuickTransform = (type, axis, amount) => {
    if (!selectedObject) return
    
    const current = localValues[type][axis]
    const newValue = current + amount
    handleValueChange(type, axis, newValue)
  }

  const resetTransform = (type) => {
    if (!selectedObject) return
    
    const resetValues = {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 }
    }
    
    const newValues = {
      ...localValues,
      [type]: resetValues[type]
    }
    setLocalValues(newValues)
    
    if (type === 'position') {
      updateObject(selectedObject.id, { position: [0, 0, 0] })
    } else if (type === 'rotation') {
      updateObject(selectedObject.id, { rotation: [0, 0, 0] })
    } else if (type === 'scale') {
      updateObject(selectedObject.id, { scale: [1, 1, 1] })
    }
  }

  if (!selectedObject) {
    return (
      <div className="w-64 bg-white border-l border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Properties</h2>
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">📦</div>
          <p>Select an object to edit its properties</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-64 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Properties</h2>
        <p className="text-sm text-gray-600">{selectedObject.type} selected</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Position Controls */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <button
              onClick={() => resetTransform('position')}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Reset
            </button>
          </div>
          <div className="space-y-2">
            {['x', 'y', 'z'].map((axis) => (
              <div key={axis} className="flex items-center space-x-2">
                <label className="w-4 text-xs font-medium text-gray-500 uppercase">{axis}</label>
                <input
                  type="number"
                  step="0.1"
                  value={localValues.position[axis]}
                  onChange={(e) => handleValueChange('position', axis, e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleQuickTransform('position', axis, -0.5)}
                    className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded text-xs"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleQuickTransform('position', axis, 0.5)}
                    className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rotation Controls */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Rotation (degrees)</label>
            <button
              onClick={() => resetTransform('rotation')}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Reset
            </button>
          </div>
          <div className="space-y-2">
            {['x', 'y', 'z'].map((axis) => (
              <div key={axis} className="flex items-center space-x-2">
                <label className="w-4 text-xs font-medium text-gray-500 uppercase">{axis}</label>
                <input
                  type="number"
                  step="1"
                  value={Math.round(localValues.rotation[axis])}
                  onChange={(e) => handleValueChange('rotation', axis, e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleQuickTransform('rotation', axis, -15)}
                    className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded text-xs"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleQuickTransform('rotation', axis, 15)}
                    className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Rotation Buttons */}
          <div className="mt-3 grid grid-cols-3 gap-1">
            <button
              onClick={() => handleValueChange('rotation', 'y', 90)}
              className="px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded text-xs"
            >
              90°
            </button>
            <button
              onClick={() => handleValueChange('rotation', 'y', 180)}
              className="px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded text-xs"
            >
              180°
            </button>
            <button
              onClick={() => handleValueChange('rotation', 'y', 270)}
              className="px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded text-xs"
            >
              270°
            </button>
          </div>
        </div>

        {/* Scale Controls */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Scale</label>
            <button
              onClick={() => resetTransform('scale')}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Reset
            </button>
          </div>
          <div className="space-y-2">
            {['x', 'y', 'z'].map((axis) => (
              <div key={axis} className="flex items-center space-x-2">
                <label className="w-4 text-xs font-medium text-gray-500 uppercase">{axis}</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={localValues.scale[axis]}
                  onChange={(e) => handleValueChange('scale', axis, e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleQuickTransform('scale', axis, -0.1)}
                    className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded text-xs"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleQuickTransform('scale', axis, 0.1)}
                    className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Uniform Scale */}
          <div className="mt-3">
            <button
              onClick={() => {
                const uniformScale = (localValues.scale.x + localValues.scale.y + localValues.scale.z) / 3
                handleValueChange('scale', 'x', uniformScale)
                handleValueChange('scale', 'y', uniformScale)
                handleValueChange('scale', 'z', uniformScale)
              }}
              className="w-full px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs"
            >
              Make Uniform
            </button>
          </div>
        </div>

        {/* Material Controls */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Color</label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={localValues.material.color}
                  onChange={(e) => {
                    console.log('Color picker changed to:', e.target.value)
                    handleValueChange('material', 'color', e.target.value)
                  }}
                  className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={localValues.material.color}
                  onChange={(e) => {
                    console.log('Color text changed to:', e.target.value)
                    handleValueChange('material', 'color', e.target.value)
                  }}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              {/* Quick Color Buttons */}
              <div className="mt-2 grid grid-cols-4 gap-1">
                {[
                  { name: 'Blue', color: '#0000ff' },
                  { name: 'Red', color: '#ff0000' },
                  { name: 'Green', color: '#00ff00' },
                  { name: 'Yellow', color: '#ffff00' }
                ].map((colorOption) => (
                  <button
                    key={colorOption.name}
                    onClick={() => {
                      console.log(`Quick color ${colorOption.name} clicked:`, colorOption.color)
                      handleValueChange('material', 'color', colorOption.color)
                    }}
                    className="w-full h-6 rounded border border-gray-300 hover:border-gray-400"
                    style={{ backgroundColor: colorOption.color }}
                    title={colorOption.name}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1">Metalness</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={localValues.material.metalness}
                onChange={(e) => handleValueChange('material', 'metalness', e.target.value)}
                className="w-full"
              />
              <span className="text-xs text-gray-400">{localValues.material.metalness}</span>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1">Roughness</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={localValues.material.roughness}
                onChange={(e) => handleValueChange('material', 'roughness', e.target.value)}
                className="w-full"
              />
              <span className="text-xs text-gray-400">{localValues.material.roughness}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Object Info */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 space-y-1">
          <div>ID: {selectedObject.id}</div>
          <div>Type: {selectedObject.type}</div>
        </div>
      </div>
    </div>
  )
}

export default PropertiesPanel
