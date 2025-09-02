import React, { createContext, useContext, useReducer } from 'react'

const SceneContext = createContext()

const initialState = {
  objects: [],
  selectedObject: null,
  transformMode: 'select',
  camera: {
    position: [5, 5, 5],
    target: [0, 0, 0]
  },
  scene: {
    background: '#f0f0f0',
    gridVisible: true,
    axesVisible: true
  },
  history: {
    past: [],
    present: null,
    future: []
  }
}

const sceneReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_OBJECT':
      return {
        ...state,
        objects: [...state.objects, action.payload]
      }
    
    case 'REMOVE_OBJECT':
      return {
        ...state,
        objects: state.objects.filter(obj => obj.id !== action.payload),
        selectedObject: state.selectedObject?.id === action.payload ? null : state.selectedObject
      }
    
    case 'SELECT_OBJECT':
      return {
        ...state,
        selectedObject: action.payload
      }
    
    case 'DESELECT_OBJECT':
      return {
        ...state,
        selectedObject: null
      }
    
    case 'UPDATE_OBJECT':
      return {
        ...state,
        objects: state.objects.map(obj =>
          obj.id === action.payload.id ? { ...obj, ...action.payload.updates } : obj
        ),
        selectedObject: state.selectedObject?.id === action.payload.id 
          ? { ...state.selectedObject, ...action.payload.updates }
          : state.selectedObject
      }
    
    case 'SET_TRANSFORM_MODE':
      return {
        ...state,
        transformMode: action.payload
      }
    
    case 'UPDATE_CAMERA':
      return {
        ...state,
        camera: { ...state.camera, ...action.payload }
      }
    
    case 'UPDATE_SCENE_SETTINGS':
      return {
        ...state,
        scene: { ...state.scene, ...action.payload }
      }
    
    case 'CLEAR_SCENE':
      return {
        ...state,
        objects: [],
        selectedObject: null
      }
    
    case 'DUPLICATE_OBJECT':
      if (!state.selectedObject) return state
      
      const duplicatedObject = {
        ...state.selectedObject,
        id: Date.now(),
        position: [
          state.selectedObject.position[0] + 1,
          state.selectedObject.position[1],
          state.selectedObject.position[2] + 1
        ]
      }
      
      return {
        ...state,
        objects: [...state.objects, duplicatedObject],
        selectedObject: duplicatedObject
      }
    
    default:
      return state
  }
}

export const SceneProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sceneReducer, initialState)

  // Ensure state is properly initialized
  const safeState = {
    objects: [],
    selectedObject: null,
    transformMode: 'select',
    camera: { position: [5, 5, 5], target: [0, 0, 0] },
    scene: { background: '#f0f0f0', gridVisible: true, axesVisible: true },
    history: { past: [], present: null, future: [] },
    ...state
  }

  const addObject = (object) => {
    dispatch({ type: 'ADD_OBJECT', payload: object })
  }

  const removeObject = (objectId) => {
    dispatch({ type: 'REMOVE_OBJECT', payload: objectId })
  }

  const selectObject = (object) => {
    dispatch({ type: 'SELECT_OBJECT', payload: object })
  }

  const deselectObject = () => {
    dispatch({ type: 'DESELECT_OBJECT' })
  }

  const updateObject = (objectId, updates) => {
    dispatch({ type: 'UPDATE_OBJECT', payload: { id: objectId, updates } })
  }

  const setTransformMode = (mode) => {
    dispatch({ type: 'SET_TRANSFORM_MODE', payload: mode })
  }

  const updateCamera = (cameraSettings) => {
    dispatch({ type: 'UPDATE_CAMERA', payload: cameraSettings })
  }

  const updateSceneSettings = (settings) => {
    dispatch({ type: 'UPDATE_SCENE_SETTINGS', payload: settings })
  }

  const clearScene = () => {
    dispatch({ type: 'CLEAR_SCENE' })
  }

  const duplicateObject = () => {
    dispatch({ type: 'DUPLICATE_OBJECT' })
  }

  const deleteSelectedObject = () => {
    if (safeState.selectedObject) {
      dispatch({ type: 'REMOVE_OBJECT', payload: safeState.selectedObject.id })
    }
  }

  const contextValue = {
    ...safeState,
    addObject,
    removeObject,
    selectObject,
    deselectObject,
    updateObject,
    setTransformMode,
    updateCamera,
    updateSceneSettings,
    clearScene,
    duplicateObject,
    deleteSelectedObject
  }

  return (
    <SceneContext.Provider value={contextValue}>
      {children}
    </SceneContext.Provider>
  )
}

export const useScene = () => {
  const context = useContext(SceneContext)
  if (!context) {
    console.error('useScene called outside of SceneProvider')
    throw new Error('useScene must be used within a SceneProvider')
  }
  
  // Add debugging to see what's in the context
  console.log('useScene context:', {
    hasScene: !!context.scene,
    sceneKeys: context.scene ? Object.keys(context.scene) : 'undefined',
    contextKeys: Object.keys(context)
  })
  
  return context
}
