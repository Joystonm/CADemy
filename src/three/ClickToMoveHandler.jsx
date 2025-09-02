import React, { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useScene } from '../context/SceneContext'
import * as THREE from 'three'

const ClickToMoveHandler = () => {
  const { camera, raycaster, gl } = useThree()
  const { selectedObject, transformMode, updateObject } = useScene()
  const groundPlaneRef = useRef()

  const handleClick = (event) => {
    // Only handle clicks when in move mode and object is selected
    if (transformMode !== 'move' || !selectedObject) {
      console.log('Click ignored:', { transformMode, selectedObject: !!selectedObject })
      return
    }

    console.log('Move click detected')
    event.stopPropagation()

    // Get canvas bounds for proper mouse coordinate calculation
    const canvas = gl.domElement
    const rect = canvas.getBoundingClientRect()
    
    // Calculate normalized device coordinates
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    console.log('Mouse coordinates:', { x, y })

    // Create a ground plane for raycasting
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const intersectionPoint = new THREE.Vector3()
    
    // Update raycaster
    raycaster.setFromCamera({ x, y }, camera)

    // Find intersection with ground plane
    if (raycaster.ray.intersectPlane(groundPlane, intersectionPoint)) {
      console.log('Intersection found:', intersectionPoint)
      
      // Move object to intersection point, keeping Y at current level or ground level
      const newY = Math.max(intersectionPoint.y, 0.5) // Keep objects above ground
      const newPosition = [intersectionPoint.x, newY, intersectionPoint.z]
      
      console.log('Moving object to:', newPosition)
      
      updateObject(selectedObject.id, {
        position: newPosition
      })
    } else {
      console.log('No intersection found')
    }
  }

  return (
    <mesh
      ref={groundPlaneRef}
      onClick={handleClick}
      visible={false}
      position={[0, -0.01, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[1000, 1000]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  )
}

export default ClickToMoveHandler
