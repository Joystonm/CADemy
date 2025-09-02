import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { useScene } from '../context/SceneContext'

const SimpleMoveHandler = () => {
  const { gl } = useThree()
  const { selectedObject, transformMode, updateObject } = useScene()

  useEffect(() => {
    if (!gl) return

    const handleClick = (event) => {
      console.log('=== SIMPLE MOVE HANDLER ===')
      console.log('Transform mode:', transformMode)
      console.log('Selected object:', selectedObject)
      console.log('Event target:', event.target)
      console.log('Event type:', event.type)
      
      // Stop event from bubbling to prevent other handlers
      event.stopPropagation()
      event.preventDefault()
      
      if (transformMode !== 'move' || !selectedObject) {
        console.log('❌ Not in move mode or no object selected')
        return
      }

      console.log('✅ Move conditions met, attempting to move object...')
      
      // Simple test: just move to a random position
      const randomX = (Math.random() - 0.5) * 6 // -3 to +3
      const randomZ = (Math.random() - 0.5) * 6 // -3 to +3
      const newPosition = [randomX, 0.5, randomZ]
      
      console.log('🎯 Moving to random position:', newPosition)
      console.log('Object ID:', selectedObject.id)
      
      try {
        updateObject(selectedObject.id, {
          position: newPosition
        })
        console.log('✅ updateObject called successfully')
      } catch (error) {
        console.error('❌ Error calling updateObject:', error)
      }
    }

    const canvas = gl.domElement
    console.log('📱 Adding click listener to canvas:', canvas)
    
    // Use capture phase to intercept events before other handlers
    canvas.addEventListener('click', handleClick, true)
    canvas.addEventListener('mousedown', handleClick, true)

    return () => {
      console.log('🧹 Removing click listeners')
      canvas.removeEventListener('click', handleClick, true)
      canvas.removeEventListener('mousedown', handleClick, true)
    }
  }, [gl, transformMode, selectedObject, updateObject])

  // Also add a visual indicator when move mode is active
  if (transformMode === 'move' && selectedObject) {
    return (
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} onClick={(e) => {
        console.log('Ground plane clicked!')
        e.stopPropagation()
        
        const randomX = (Math.random() - 0.5) * 6
        const randomZ = (Math.random() - 0.5) * 6
        const newPosition = [randomX, 0.5, randomZ]
        
        console.log('Moving via ground plane to:', newPosition)
        updateObject(selectedObject.id, { position: newPosition })
      }}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial transparent opacity={0.1} color="#00ff00" />
      </mesh>
    )
  }

  return null
}

export default SimpleMoveHandler
