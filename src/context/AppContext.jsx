import React, { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

const initialState = {
  user: null,
  currentChallenge: null,
  completedChallenges: [],
  settings: {
    theme: 'light',
    gridVisible: true,
    gridSize: 1,
    autoSave: true
  },
  ui: {
    sidebarVisible: true,
    propertiesPanelVisible: true,
    toolbarVisible: true
  }
}

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    
    case 'SET_CURRENT_CHALLENGE':
      return { ...state, currentChallenge: action.payload }
    
    case 'COMPLETE_CHALLENGE':
      // Only add if not already completed
      if (!state.completedChallenges.includes(action.payload)) {
        return {
          ...state,
          completedChallenges: [...state.completedChallenges, action.payload]
        }
      }
      return state
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      }
    
    case 'TOGGLE_UI_ELEMENT':
      return {
        ...state,
        ui: { ...state.ui, [action.payload]: !state.ui[action.payload] }
      }
    
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const setUser = (user) => {
    dispatch({ type: 'SET_USER', payload: user })
  }

  const setCurrentChallenge = (challenge) => {
    dispatch({ type: 'SET_CURRENT_CHALLENGE', payload: challenge })
  }

  const completeChallenge = (challengeId) => {
    dispatch({ type: 'COMPLETE_CHALLENGE', payload: challengeId })
  }

  const updateSettings = (settings) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings })
  }

  const toggleUIElement = (element) => {
    dispatch({ type: 'TOGGLE_UI_ELEMENT', payload: element })
  }

  const value = {
    ...state,
    setUser,
    setCurrentChallenge,
    completeChallenge,
    updateSettings,
    toggleUIElement
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
