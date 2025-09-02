import React from 'react'
import { useScene } from '../context/SceneContext'

const Toolbar = () => {
  const { 
    transformMode, 
    setTransformMode, 
    selectedObject, 
    clearScene,
    scene,
    updateSceneSettings,
    duplicateObject,
    deleteSelectedObject
  } = useScene()

  const tools = [
    { id: 'select', name: 'Select', icon: '🔍', shortcut: 'V', color: 'from-blue-500 to-blue-600' },
    { id: 'move', name: 'Move (Click to Place)', icon: '↔️', shortcut: 'G', color: 'from-green-500 to-green-600' },
    { id: 'rotate', name: 'Rotate', icon: '🔄', shortcut: 'R', color: 'from-purple-500 to-purple-600' },
    { id: 'scale', name: 'Scale', icon: '📏', shortcut: 'S', color: 'from-amber-500 to-amber-600' },
    { id: 'align', name: 'Align', icon: '📐', shortcut: 'A', color: 'from-cyan-500 to-cyan-600' },
  ]

  const actions = [
    { id: 'duplicate', name: 'Duplicate', icon: '📋', shortcut: 'Ctrl+D' },
    { id: 'delete', name: 'Delete', icon: '🗑️', shortcut: 'Del' },
  ]

  const viewControls = [
    { id: 'grid', name: 'Toggle Grid', icon: '⊞', shortcut: 'G' },
  ]

  const handleToolClick = (toolId) => {
    setTransformMode(toolId)
    console.log(`Tool selected: ${toolId}`)
  }

  const handleActionClick = (actionId) => {
    switch (actionId) {
      case 'duplicate':
        if (selectedObject) {
          duplicateObject()
          console.log('Object duplicated')
        }
        break
      case 'delete':
        if (selectedObject) {
          deleteSelectedObject()
          console.log('Object deleted')
        }
        break
      default:
        console.log(`Action: ${actionId}`)
    }
  }

  const handleViewControlClick = (controlId) => {
    switch (controlId) {
      case 'grid':
        updateSceneSettings({ gridVisible: !scene.gridVisible })
        console.log(`Grid ${!scene.gridVisible ? 'enabled' : 'disabled'}`)
        break
      default:
        console.log(`View control: ${controlId}`)
    }
  }

  const handleNewScene = () => {
    if (window.confirm('Create new scene? This will clear all objects.')) {
      clearScene()
      console.log('Scene cleared')
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm bg-white/95 sticky top-20 z-40">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left Section - Main Tools */}
          <div className="flex items-center space-x-4">
            {/* File Operations */}
            <div className="flex items-center">
              <button 
                onClick={handleNewScene}
                className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
                title="New Scene (Ctrl+N)"
              >
                <span className="mr-1.5 text-sm">📄</span>
                New
              </button>
            </div>

            {/* Separator */}
            <div className="w-px h-5 bg-gray-200"></div>

            {/* Transform Tools */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-medium text-gray-500 mr-1">Tools:</span>
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className={`group relative p-1.5 rounded-lg transition-all duration-200 border-2 ${
                    transformMode === tool.id 
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-300 shadow-md' 
                      : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                  }`}
                  title={`${tool.name} (${tool.shortcut})`}
                >
                  <span className={`text-base transition-transform duration-200 ${
                    transformMode === tool.id ? 'scale-110' : 'group-hover:scale-105'
                  }`}>
                    {tool.icon}
                  </span>
                  {transformMode === tool.id && (
                    <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Separator */}
            <div className="w-px h-5 bg-gray-200"></div>

            {/* Action Tools */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-medium text-gray-500 mr-1">Actions:</span>
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action.id)}
                  className={`group p-1.5 rounded-lg transition-all duration-200 border-2 shadow-sm hover:shadow-md ${
                    (action.id === 'duplicate' || action.id === 'delete') && !selectedObject 
                      ? 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed' 
                      : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                  title={`${action.name} (${action.shortcut})`}
                  disabled={action.id === 'duplicate' || action.id === 'delete' ? !selectedObject : false}
                >
                  <span className={`text-base transition-transform duration-200 ${
                    !((action.id === 'duplicate' || action.id === 'delete') && !selectedObject) 
                      ? 'group-hover:scale-105' : ''
                  }`}>
                    {action.icon}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Section - View Controls */}
          <div className="flex items-center space-x-4">
            {/* View Controls */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-medium text-gray-500 mr-1">View:</span>
              {viewControls.map((control) => (
                <button
                  key={control.id}
                  onClick={() => handleViewControlClick(control.id)}
                  className={`group p-1.5 rounded-lg transition-all duration-200 border-2 shadow-sm hover:shadow-md ${
                    control.id === 'grid' && scene.gridVisible
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-700' 
                      : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                  title={`${control.name} (${control.shortcut})`}
                >
                  <span className={`text-base transition-transform duration-200 group-hover:scale-105`}>
                    {control.icon}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        {selectedObject && (
          <div className="mt-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-indigo-700">
                  Selected: <span className="capitalize">{selectedObject.type}</span>
                </span>
                <span className="text-indigo-600">
                  Mode: <span className="capitalize font-medium">{transformMode}</span>
                </span>
              </div>
              <div className="text-indigo-600">
                Press <kbd className="px-1.5 py-0.5 bg-white rounded border text-xs font-mono">Esc</kbd> to deselect
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Toolbar
