import { useEffect } from 'react'
import { useScene } from '../context/SceneContext'

const KeyboardMoveHandler = () => {
  const { selectedObject, transformMode, updateObject } = useScene()

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (transformMode !== 'move' || !selectedObject) return

      const currentPos = selectedObject.position
      let newPos = [...currentPos]
      const step = 0.5

      switch (event.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          newPos[2] -= step // Move forward (negative Z)
          break
        case 's':
        case 'arrowdown':
          newPos[2] += step // Move backward (positive Z)
          break
        case 'a':
        case 'arrowleft':
          newPos[0] -= step // Move left (negative X)
          break
        case 'd':
        case 'arrowright':
          newPos[0] += step // Move right (positive X)
          break
        case 'q':
          newPos[1] += step // Move up (positive Y)
          break
        case 'e':
          newPos[1] -= step // Move down (negative Y)
          break
        default:
          return // Don't prevent default for other keys
      }

      event.preventDefault()
      console.log(`Keyboard move: ${event.key} -> ${newPos}`)
      
      updateObject(selectedObject.id, {
        position: newPos
      })
    }

    document.addEventListener('keydown', handleKeyPress)
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [selectedObject, transformMode, updateObject])

  return null
}

export default KeyboardMoveHandler
