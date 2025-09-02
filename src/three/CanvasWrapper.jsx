import React, { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Text } from '@react-three/drei'
import { useScene } from '../context/SceneContext'
import ObjectTransformControls from './ObjectTransformControls'
import ClickToMove from './ClickToMove'
import * as THREE from 'three'

// Component to render individual 3D objects
const SceneObject = ({ object, isSelected, onSelect }) => {
  const meshRef = useRef()

  const handleClick = (event) => {
    event.stopPropagation()
    onSelect(object)
  }

  // Force re-render when position changes by creating new arrays
  const position = [object.position[0], object.position[1], object.position[2]]
  const rotation = [object.rotation[0], object.rotation[1], object.rotation[2]]
  const scale = [object.scale[0], object.scale[1], object.scale[2]]

  // Set mesh name for TransformControls
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.name = `object-${object.id}`
    }
  }, [object.id])

  // Create geometry based on object type
  const createGeometry = () => {
    switch (object.type) {
      case 'cube':
        return <boxGeometry args={[1, 1, 1]} />
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />
      case 'cylinder':
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
      case 'cone':
        return <coneGeometry args={[0.5, 1, 32]} />
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 100]} />
      case 'plane':
        return <planeGeometry args={[1, 1]} />
      case 'grip-handle':
        return <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
      case 'button-large':
        return <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
      case 'ramp':
        return <boxGeometry args={[2, 0.1, 1]} />
      case 'lever':
        return <boxGeometry args={[1.5, 0.1, 0.1]} />
      case 'braille-dot':
        return <sphereGeometry args={[0.05, 16, 16]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={handleClick}
    >
      {createGeometry()}
      <meshStandardMaterial
        color={object.material?.color || '#888888'}
        metalness={object.material?.metalness || 0.1}
        roughness={object.material?.roughness || 0.7}
        transparent={object.material?.transparent || false}
        opacity={object.material?.opacity || 1}
      />
      {/* Selection indicator */}
      {isSelected && (
        <mesh>
          {createGeometry()}
          <meshBasicMaterial
            color="#00ff00"
            wireframe={true}
            transparent={true}
            opacity={0.3}
          />
        </mesh>
      )}
    </mesh>
  )
}

// Main scene component
const Scene = () => {
  try {
    const sceneContext = useScene()
    
    // Provide default values if context is not available
    const objects = sceneContext?.objects || []
    const selectedObject = sceneContext?.selectedObject || null
    const selectObject = sceneContext?.selectObject || (() => {})
    const deselectObject = sceneContext?.deselectObject || (() => {})
    const updateObject = sceneContext?.updateObject || (() => {})
    const transformMode = sceneContext?.transformMode || 'select'
    const scene = sceneContext?.scene || {
      background: '#f0f0f0',
      gridVisible: true,
      axesVisible: true
    }

    return (
      <>
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />

        {/* Scene Objects */}
        {objects && objects.length > 0 && objects.map((object) => (
          <SceneObject
            key={object.id}
            object={object}
            isSelected={selectedObject?.id === object.id}
            onSelect={selectObject}
          />
        ))}

        {/* Transform Controls */}
        <ObjectTransformControls />

        {/* Click to Move */}
        <ClickToMove />

        {/* Camera Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          dampingFactor={0.05}
          screenSpacePanning={false}
          minDistance={2}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2}
        />

        {/* Grid and Helpers */}
        {scene.gridVisible && (
          <Grid
            infiniteGrid
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6f6f6f"
            sectionSize={10}
            sectionThickness={1}
            sectionColor="#9d4b4b"
            fadeDistance={30}
            fadeStrength={1}
          />
        )}

        {scene.axesVisible && <axesHelper args={[5]} />}

        {/* Welcome Text for Empty Scene */}
        {(!objects || objects.length === 0) && (
          <Text
            position={[0, 2, 0]}
            fontSize={0.5}
            color="#666666"
            anchorX="center"
            anchorY="middle"
          >
            Add shapes from the panel to get started!
          </Text>
        )}

        {/* Background */}
        <color attach="background" args={[scene.background || '#f0f0f0']} />
      </>
    )
  } catch (error) {
    console.error('Scene render error:', error)
    return (
      <>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <color attach="background" args={['#f0f0f0']} />
        <Text
          position={[0, 0, 0]}
          fontSize={0.5}
          color="#ff0000"
          anchorX="center"
          anchorY="middle"
        >
          Scene Error: {error.message}
        </Text>
      </>
    )
  }
}

const CanvasWrapper = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('CanvasWrapper mounting...')
    // Simulate loading time
    const timer = setTimeout(() => {
      console.log('CanvasWrapper loaded')
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-2">3D Canvas Error</h3>
          <p className="text-red-500 text-sm">{error.message}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading 3D Environment...</p>
        </div>
      </div>
    )
  }

  try {
    // Try to access the scene context to check if it's available
    const sceneContext = useScene()
    const objects = sceneContext?.objects || []
    const selectedObject = sceneContext?.selectedObject || null
    const transformMode = sceneContext?.transformMode || 'select'

    return (
      <div className="w-full h-full relative">
        <Canvas
          camera={{ 
            position: [5, 5, 5], 
            fov: 60,
            near: 0.1,
            far: 1000
          }}
          shadows
          gl={{ 
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true // For screenshots
          }}
          onError={(error) => {
            console.error('Canvas error:', error)
            setError(error)
          }}
        >
          <Scene />
        </Canvas>

        {/* Overlay UI Elements */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded p-2 text-sm">
          <div className="space-y-1 text-gray-600">
            <div>🖱️ Left click: Rotate view</div>
            <div>🖱️ Right click: Pan view</div>
            <div>🖱️ Scroll: Zoom in/out</div>
            <div>🖱️ Click object: Select</div>
            <div className="border-t pt-1 mt-1">
              <div>Mode: <span className="font-medium">{transformMode}</span></div>
            </div>
          </div>
        </div>

        {/* Performance Monitor (Development) */}
        {import.meta.env.DEV && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
            <div>Objects: {objects?.length || 0}</div>
            <div>Selected: {selectedObject ? selectedObject.type : 'None'}</div>
            <div>Transform: {transformMode}</div>
          </div>
        )}

        {/* Instructions for empty scene */}
        {(!objects || objects.length === 0) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white bg-opacity-90 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome to CADemy!</h3>
              <p className="text-gray-600">Add shapes from the panel to get started with 3D modeling.</p>
            </div>
          </div>
        )}

        {/* Transform Mode Instructions */}
        {selectedObject && transformMode === 'move' && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded shadow-lg">
            <div className="text-sm font-medium">
              🎯 Click on the green ground plane to move object there
            </div>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('CanvasWrapper render error:', error)
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Context Error</h3>
          <p className="text-red-500 text-sm">Scene context is not available: {error.message}</p>
          <p className="text-gray-600 text-xs mt-2">Make sure SceneProvider is wrapping this component</p>
        </div>
      </div>
    )
  }
}

export default CanvasWrapper
