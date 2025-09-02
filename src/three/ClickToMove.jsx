import React from 'react'
import { useScene } from '../context/SceneContext'
import * as THREE from 'three'

const ClickToMove = () => {
  const { selectedObject, transformMode, updateObject } = useScene()

  const handleGroundClick = (event) => {
    if (transformMode === 'move' && selectedObject) {
      event.stopPropagation()
      
      const point = event.point
      updateObject(selectedObject.id, {
        position: [point.x, Math.max(point.y, 0.5), point.z]
      })
    }
  }

  // Only show when in move mode with selected object
  if (transformMode !== 'move' || !selectedObject) {
    return null
  }

  return (
    <mesh
      onClick={handleGroundClick}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial 
        transparent 
        opacity={0.1} 
        color="#00ff00"
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default ClickToMove
