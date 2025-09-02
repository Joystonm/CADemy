import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScene } from '../context/SceneContext'
import * as THREE from 'three'

const DirectMoveHandler = () => {
  const { camera, raycaster, scene, gl } = useThree()
  const { selectedObject, transformMode, updateObject } = useScene()
  const mouseRef = useRef(new THREE.Vector2())
  const isClickingRef = useRef(false)

  useEffect(() => {
    const canvas = gl.domElement
    
    const handleMouseDown = (event) => {
      if (transformMode === 'move' && selectedObject) {
        isClickingRef.current = true
        console.log('🖱️ Mouse down in move mode')
      }
    }

    const handleMouseUp = (event) => {
      if (transformMode === 'move' && selectedObject && isClickingRef.current) {
        console.log('🖱️ Mouse up - processing move')
        
        // Get mouse position
        const rect = canvas.getBoundingClientRect()
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        
        console.log('Mouse coords:', mouseRef.current)
        
        // Simple position calculation - convert screen to world
        const x = mouseRef.current.x * 5 // Scale to world size
        const z = mouseRef.current.y * 5
        const newPosition = [x, 0.5, z]
        
        console.log('Moving to:', newPosition)
        
        updateObject(selectedObject.id, {
          position: newPosition
        })
        
        isClickingRef.current = false
      }
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [gl, transformMode, selectedObject, updateObject])

  // Render a visible ground plane when in move mode
  if (transformMode === 'move' && selectedObject) {
    return (
      <group>
        {/* Visible ground indicator */}
        <mesh 
          position={[0, 0, 0]} 
          rotation={[-Math.PI / 2, 0, 0]}
          onPointerDown={(e) => {
            console.log('Ground plane clicked!')
            e.stopPropagation()
            
            const point = e.point
            console.log('Click point:', point)
            
            updateObject(selectedObject.id, {
              position: [point.x, 0.5, point.z]
            })
          }}
        >
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial 
            transparent 
            opacity={0.2} 
            color="#00ff00"
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Grid helper */}
        <gridHelper args={[20, 20, '#00ff00', '#00ff00']} position={[0, 0.01, 0]} />
      </group>
    )
  }

  return null
}

export default DirectMoveHandler
