import { useState, useCallback, useMemo } from 'react'
import { useScene } from '../context/SceneContext'
import * as THREE from 'three'

export const useProgressChecker = () => {
  const { objects } = useScene()
  const [isChecking, setIsChecking] = useState(false)

  // Utility functions for validation
  const validateObjectExists = useCallback((requiredObjects) => {
    if (!requiredObjects || !Array.isArray(requiredObjects)) return true
    
    return requiredObjects.every(requiredType => 
      objects.some(obj => obj.type === requiredType)
    )
  }, [objects])

  const validateRotation = useCallback((rotationRule) => {
    if (!rotationRule) return true
    
    const targetObject = objects.find(obj => obj.type === 'cube') // Assuming first challenge
    if (!targetObject) return false

    const { axis, degrees } = rotationRule
    const targetRadians = (degrees * Math.PI) / 180
    const tolerance = 0.1 // 0.1 radian tolerance (~5.7 degrees)

    switch (axis.toLowerCase()) {
      case 'x':
        return Math.abs(targetObject.rotation[0] - targetRadians) < tolerance
      case 'y':
        return Math.abs(targetObject.rotation[1] - targetRadians) < tolerance
      case 'z':
        return Math.abs(targetObject.rotation[2] - targetRadians) < tolerance
      default:
        return false
    }
  }, [objects])

  const validateScale = useCallback((scaleRule) => {
    if (!scaleRule || !Array.isArray(scaleRule)) return true
    
    const targetObject = objects.find(obj => obj.type === 'cube') // Assuming first challenge
    if (!targetObject) return false

    const [targetX, targetY, targetZ] = scaleRule
    const tolerance = 0.1
    
    return (
      Math.abs(targetObject.scale[0] - targetX) < tolerance &&
      Math.abs(targetObject.scale[1] - targetY) < tolerance &&
      Math.abs(targetObject.scale[2] - targetZ) < tolerance
    )
  }, [objects])

  const validateMaterialColor = useCallback((colorRule) => {
    if (!colorRule) return true
    
    const targetObject = objects.find(obj => obj.type === 'cube') // Assuming first challenge
    if (!targetObject || !targetObject.material) return false

    // Convert hex color to compare
    const targetColor = new THREE.Color(colorRule)
    const objectColor = new THREE.Color(targetObject.material.color)
    
    return targetColor.equals(objectColor)
  }, [objects])

  const validateHandleDiameter = useCallback((diameterRule) => {
    if (!diameterRule) return true
    
    const handleObject = objects.find(obj => obj.type === 'cylinder')
    if (!handleObject) return false

    // Assuming cylinder radius is stored in scale or geometry parameters
    const radius = handleObject.scale[0] * 0.5 // Default cylinder radius is 0.5
    const diameter = radius * 2
    
    return diameter >= diameterRule
  }, [objects])

  const validateConnectedObjects = useCallback((connectionRule) => {
    if (!connectionRule) return true
    
    // Simple proximity check for connected objects
    const sphere = objects.find(obj => obj.type === 'sphere')
    const cylinder = objects.find(obj => obj.type === 'cylinder')
    
    if (!sphere || !cylinder) return false

    const distance = Math.sqrt(
      Math.pow(sphere.position[0] - cylinder.position[0], 2) +
      Math.pow(sphere.position[1] - cylinder.position[1], 2) +
      Math.pow(sphere.position[2] - cylinder.position[2], 2)
    )

    return distance < 2 // Objects should be within 2 units of each other
  }, [objects])

  // Main validation function
  const checkProgress = useCallback(async (challenge) => {
    setIsChecking(true)
    
    // Add small delay to show checking state
    await new Promise(resolve => setTimeout(resolve, 300))
    
    try {
      const { validationRules } = challenge
      const completedObjectives = []

      // Check each validation rule
      if (validationRules.requiredObjects) {
        if (validateObjectExists(validationRules.requiredObjects)) {
          completedObjectives.push(0) // First objective: Add object
        }
      }

      if (validationRules.scaleRequired) {
        if (validateScale(validationRules.scaleRequired)) {
          completedObjectives.push(1) // Second objective: Resize
        }
      }

      if (validationRules.rotationRequired) {
        if (validateRotation(validationRules.rotationRequired)) {
          completedObjectives.push(2) // Third objective: Rotate
        }
      }

      if (validationRules.materialColor) {
        if (validateMaterialColor(validationRules.materialColor)) {
          completedObjectives.push(3) // Fourth objective: Material
        }
      }

      // Additional validations for other challenges
      if (validationRules.handleDiameter) {
        if (validateHandleDiameter(validationRules.handleDiameter)) {
          completedObjectives.push(3)
        }
      }

      if (validationRules.connected) {
        if (validateConnectedObjects(validationRules.connected)) {
          completedObjectives.push(2)
        }
      }

      const progress = {
        completed: completedObjectives.length,
        completedObjectives,
        total: challenge.objectives.length,
        isComplete: completedObjectives.length === challenge.objectives.length
      }

      setIsChecking(false)
      return progress

    } catch (error) {
      console.error('Progress check error:', error)
      setIsChecking(false)
      return {
        completed: 0,
        completedObjectives: [],
        total: challenge.objectives.length,
        isComplete: false,
        error: error.message
      }
    }
  }, [objects, validateObjectExists, validateRotation, validateScale, validateMaterialColor, validateHandleDiameter, validateConnectedObjects])

  // Memoized validation status for real-time feedback
  const currentValidationStatus = useMemo(() => {
    return {
      hasObjects: objects.length > 0,
      objectTypes: objects.map(obj => obj.type),
      selectedObjectProperties: objects.length > 0 ? {
        position: objects[0].position,
        rotation: objects[0].rotation,
        scale: objects[0].scale,
        material: objects[0].material
      } : null
    }
  }, [objects])

  return {
    checkProgress,
    isChecking,
    currentValidationStatus
  }
}
