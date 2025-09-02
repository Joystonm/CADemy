import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { useScene } from '../context/SceneContext'
import * as THREE from 'three'

const MoveHandler = () => {
  const { gl, camera, raycaster } = useThree()
  const { selectedObject, transformMode, updateObject } = useScene()

  useEffect(() => {
    if (!gl || !camera || !raycaster) return

    const handleClick = (event) => {
      console.log('Click detected!', { transformMode, selectedObject: !!selectedObject })
      
      if (transformMode !== 'move' || !selectedObject) {
        console.log('Not in move mode or no object selected')
        return
      }

      // Get canvas bounds
      const canvas = gl.domElement
      const rect = canvas.getBoundingClientRect()
      
      // Calculate normalized device coordinates
      const mouse = new THREE.Vector2()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      console.log('Mouse coordinates:', mouse)

      // Update raycaster
      raycaster.setFromCamera(mouse, camera)

      // Create ground plane at y=0
      const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
      const intersectionPoint = new THREE.Vector3()

      // Find intersection with ground plane
      if (raycaster.ray.intersectPlane(groundPlane, intersectionPoint)) {
        console.log('Intersection found:', intersectionPoint)
        
        const newPosition = [
          intersectionPoint.x, 
          Math.max(intersectionPoint.y, 0.5), // Keep above ground
          intersectionPoint.z
        ]
        
        console.log('Moving object to:', newPosition)
        
        updateObject(selectedObject.id, {
          position: newPosition
        })
      } else {
        console.log('No intersection with ground plane')
      }
    }

    // Add event listener to canvas
    const canvas = gl.domElement
    canvas.addEventListener('click', handleClick)

    // Cleanup
    return () => {
      canvas.removeEventListener('click', handleClick)
    }
  }, [gl, camera, raycaster, transformMode, selectedObject, updateObject])

  return null // This component doesn't render anything
}

export default MoveHandler
