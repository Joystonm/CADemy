import * as THREE from 'three';

export class SceneUtils {
  static snapToGrid(position, gridSize = 1) {
    return {
      x: Math.round(position.x / gridSize) * gridSize,
      y: Math.round(position.y / gridSize) * gridSize,
      z: Math.round(position.z / gridSize) * gridSize
    };
  }

  static alignObjects(objects, axis = 'x', alignment = 'center') {
    if (objects.length < 2) return;

    let referenceValue;
    
    switch (alignment) {
      case 'min':
        referenceValue = Math.min(...objects.map(obj => obj.position[axis]));
        break;
      case 'max':
        referenceValue = Math.max(...objects.map(obj => obj.position[axis]));
        break;
      case 'center':
      default:
        const sum = objects.reduce((acc, obj) => acc + obj.position[axis], 0);
        referenceValue = sum / objects.length;
        break;
    }

    objects.forEach(obj => {
      obj.position[axis] = referenceValue;
    });
  }

  static distributeObjects(objects, axis = 'x', spacing = 2) {
    if (objects.length < 2) return;

    objects.sort((a, b) => a.position[axis] - b.position[axis]);
    
    for (let i = 1; i < objects.length; i++) {
      objects[i].position[axis] = objects[i - 1].position[axis] + spacing;
    }
  }

  static createGrid(size = 10, divisions = 10) {
    const grid = new THREE.GridHelper(size, divisions);
    grid.rotateX(Math.PI / 2);
    return grid;
  }

  static createAxesHelper(size = 5) {
    return new THREE.AxesHelper(size);
  }

  static getObjectBounds(object) {
    const box = new THREE.Box3().setFromObject(object);
    return {
      min: box.min,
      max: box.max,
      size: box.getSize(new THREE.Vector3()),
      center: box.getCenter(new THREE.Vector3())
    };
  }

  static centerObject(object) {
    const bounds = this.getObjectBounds(object);
    object.position.sub(bounds.center);
  }
}
