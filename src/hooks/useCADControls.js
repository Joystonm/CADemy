import { useState, useCallback, useRef } from 'react';

export const useCADControls = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [transformMode, setTransformMode] = useState('translate'); // 'translate', 'rotate', 'scale'
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize, setGridSize] = useState(1);
  const sceneRef = useRef(null);

  const selectObject = useCallback((object) => {
    setSelectedObject(object);
  }, []);

  const deselectObject = useCallback(() => {
    setSelectedObject(null);
  }, []);

  const changeTransformMode = useCallback((mode) => {
    setTransformMode(mode);
  }, []);

  const toggleSnapToGrid = useCallback(() => {
    setSnapToGrid(prev => !prev);
  }, []);

  const updateGridSize = useCallback((size) => {
    setGridSize(size);
  }, []);

  const addObjectToScene = useCallback((objectType, position = [0, 0, 0]) => {
    // This would interact with the Three.js scene
    console.log(`Adding ${objectType} at position`, position);
  }, []);

  const removeObjectFromScene = useCallback((object) => {
    if (object === selectedObject) {
      setSelectedObject(null);
    }
    // Remove from Three.js scene
    console.log('Removing object', object);
  }, [selectedObject]);

  const duplicateObject = useCallback((object) => {
    if (!object) return;
    // Create a copy of the object
    console.log('Duplicating object', object);
  }, []);

  const getObjectProperties = useCallback(() => {
    if (!selectedObject) return null;
    
    return {
      position: selectedObject.position,
      rotation: selectedObject.rotation,
      scale: selectedObject.scale,
      material: selectedObject.material
    };
  }, [selectedObject]);

  const updateObjectProperties = useCallback((properties) => {
    if (!selectedObject) return;
    
    Object.keys(properties).forEach(key => {
      if (selectedObject[key]) {
        Object.assign(selectedObject[key], properties[key]);
      }
    });
  }, [selectedObject]);

  return {
    selectedObject,
    transformMode,
    snapToGrid,
    gridSize,
    sceneRef,
    selectObject,
    deselectObject,
    changeTransformMode,
    toggleSnapToGrid,
    updateGridSize,
    addObjectToScene,
    removeObjectFromScene,
    duplicateObject,
    getObjectProperties,
    updateObjectProperties
  };
};
