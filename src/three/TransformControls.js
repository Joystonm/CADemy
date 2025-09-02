import * as THREE from 'three';

export class TransformControlsManager {
  constructor(camera, renderer) {
    this.camera = camera;
    this.renderer = renderer;
    this.selectedObject = null;
    this.mode = 'translate'; // 'translate', 'rotate', 'scale'
  }

  setMode(mode) {
    this.mode = mode;
  }

  selectObject(object) {
    this.selectedObject = object;
  }

  deselectObject() {
    this.selectedObject = null;
  }

  translateObject(deltaX, deltaY, deltaZ) {
    if (this.selectedObject) {
      this.selectedObject.position.x += deltaX;
      this.selectedObject.position.y += deltaY;
      this.selectedObject.position.z += deltaZ;
    }
  }

  rotateObject(deltaX, deltaY, deltaZ) {
    if (this.selectedObject) {
      this.selectedObject.rotation.x += deltaX;
      this.selectedObject.rotation.y += deltaY;
      this.selectedObject.rotation.z += deltaZ;
    }
  }

  scaleObject(scaleX, scaleY, scaleZ) {
    if (this.selectedObject) {
      this.selectedObject.scale.x *= scaleX;
      this.selectedObject.scale.y *= scaleY;
      this.selectedObject.scale.z *= scaleZ;
    }
  }

  getObjectProperties() {
    if (!this.selectedObject) return null;
    
    return {
      position: {
        x: this.selectedObject.position.x,
        y: this.selectedObject.position.y,
        z: this.selectedObject.position.z
      },
      rotation: {
        x: this.selectedObject.rotation.x,
        y: this.selectedObject.rotation.y,
        z: this.selectedObject.rotation.z
      },
      scale: {
        x: this.selectedObject.scale.x,
        y: this.selectedObject.scale.y,
        z: this.selectedObject.scale.z
      }
    };
  }
}
