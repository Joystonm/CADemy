import * as THREE from 'three';

export class ObjectFactory {
  static createCube(size = 1) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(geometry, material);
  }

  static createSphere(radius = 1) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    return new THREE.Mesh(geometry, material);
  }

  static createCylinder(radiusTop = 1, radiusBottom = 1, height = 2) {
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    return new THREE.Mesh(geometry, material);
  }

  static createCone(radius = 1, height = 2) {
    const geometry = new THREE.ConeGeometry(radius, height, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    return new THREE.Mesh(geometry, material);
  }

  static createPlane(width = 2, height = 2) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({ color: 0xff00ff, side: THREE.DoubleSide });
    return new THREE.Mesh(geometry, material);
  }
}
