import React, { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { TransformControls } from '@react-three/drei'
import { useScene } from '../context/SceneContext'

const ObjectTransformControls = () => {
  const { selectedObject, transformMode, updateObject } = useScene()
  const { scene } = useThree()
  const transformRef = useRef()

  // Find the selected object's mesh in the scene
  const selectedMesh = selectedObject ? scene.getObjectByName(`object-${selectedObject.id}`) : null

  const handleChange = () => {
    if (selectedMesh && selectedObject && transformRef.current) {
      const position = selectedMesh.position.toArray()
      const rotation = selectedMesh.rotation.toArray().slice(0, 3) // Remove the order property
      const scale = selectedMesh.scale.toArray()

      updateObject(selectedObject.id, {
        position,
        rotation,
        scale
      })
    }
  }

  // Map transform modes to TransformControls modes
  const getTransformMode = () => {
    switch (transformMode) {
      case 'move':
        return 'translate'
      case 'rotate':
        return 'rotate'
      case 'scale':
        return 'scale'
      default:
        return 'translate'
    }
  }

  // Only show transform controls when an object is selected and we're not in select mode
  if (!selectedObject || !selectedMesh || transformMode === 'select') {
    return null
  }

  return (
    <TransformControls
      ref={transformRef}
      object={selectedMesh}
      mode={getTransformMode()}
      onChange={handleChange}
      onMouseDown={() => {
        // Disable orbit controls when dragging
        const orbitControls = scene.userData.orbitControls
        if (orbitControls) orbitControls.enabled = false
      }}
      onMouseUp={() => {
        // Re-enable orbit controls when done dragging
        const orbitControls = scene.userData.orbitControls
        if (orbitControls) orbitControls.enabled = true
      }}
    />
  )
}

export default ObjectTransformControls
