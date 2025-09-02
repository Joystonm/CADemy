import * as THREE from 'three';

// Basic Boolean Operations Implementation
// Note: For production use, consider integrating a proper CSG library like three-csg-ts
// This implementation provides basic functionality for the CADemy learning environment

export class BooleanOperations {
  static union(meshA, meshB) {
    // For now, we'll create a simple group to represent union
    // In a full implementation, this would use CSG algorithms
    const group = new THREE.Group();
    
    // Clone the meshes to avoid modifying originals
    const cloneA = meshA.clone();
    const cloneB = meshB.clone();
    
    group.add(cloneA);
    group.add(cloneB);
    
    // Set a property to identify this as a union operation
    group.userData.operation = 'union';
    group.userData.originalMeshes = [meshA, meshB];
    
    console.log('Union operation created between', meshA.userData?.type || 'mesh', 'and', meshB.userData?.type || 'mesh');
    return group;
  }

  static subtract(meshA, meshB) {
    // Placeholder for subtraction operation
    // In a real implementation, this would remove meshB volume from meshA
    const result = meshA.clone();
    
    // Visual indication of subtraction (make it semi-transparent)
    if (result.material) {
      result.material = result.material.clone();
      result.material.transparent = true;
      result.material.opacity = 0.7;
    }
    
    result.userData.operation = 'subtract';
    result.userData.subtractedMesh = meshB;
    
    console.log('Subtract operation:', meshB.userData?.type || 'mesh', 'from', meshA.userData?.type || 'mesh');
    return result;
  }

  static intersect(meshA, meshB) {
    // Placeholder for intersection operation
    // In a real implementation, this would keep only the overlapping volume
    const result = meshA.clone();
    
    // Visual indication of intersection (change color)
    if (result.material) {
      result.material = result.material.clone();
      result.material.color.setHex(0x00ff00); // Green to indicate intersection
    }
    
    result.userData.operation = 'intersect';
    result.userData.intersectedWith = meshB;
    
    console.log('Intersect operation between', meshA.userData?.type || 'mesh', 'and', meshB.userData?.type || 'mesh');
    return result;
  }

  static canPerformOperation(meshA, meshB) {
    // Check if both objects are valid meshes or groups
    const isValidA = meshA && (meshA instanceof THREE.Mesh || meshA instanceof THREE.Group);
    const isValidB = meshB && (meshB instanceof THREE.Mesh || meshB instanceof THREE.Group);
    
    return isValidA && isValidB;
  }

  // Helper method to prepare mesh for operations
  static prepareMeshForOperation(mesh) {
    if (!mesh) return null;
    
    // Ensure geometry exists and is properly formed
    if (mesh instanceof THREE.Mesh && mesh.geometry) {
      // Update matrix world to ensure proper positioning
      mesh.updateMatrixWorld(true);
      
      // Ensure geometry has proper attributes
      if (!mesh.geometry.attributes.normal) {
        mesh.geometry.computeVertexNormals();
      }
      
      // Convert to non-indexed geometry if needed for CSG operations
      if (mesh.geometry.index) {
        mesh.geometry = mesh.geometry.toNonIndexed();
      }
    }
    
    return mesh;
  }

  // Utility method to get bounding box intersection
  static getBoundingBoxIntersection(meshA, meshB) {
    const boxA = new THREE.Box3().setFromObject(meshA);
    const boxB = new THREE.Box3().setFromObject(meshB);
    
    const intersection = boxA.clone();
    intersection.intersect(boxB);
    
    return intersection.isEmpty() ? null : intersection;
  }

  // Check if two meshes are overlapping
  static areOverlapping(meshA, meshB) {
    const intersection = this.getBoundingBoxIntersection(meshA, meshB);
    return intersection !== null;
  }

  // Create a visual preview of boolean operation
  static createOperationPreview(meshA, meshB, operation) {
    if (!this.canPerformOperation(meshA, meshB)) {
      return null;
    }

    const group = new THREE.Group();
    
    // Create wireframe versions for preview
    const wireframeA = this.createWireframePreview(meshA, 0x00ff00); // Green
    const wireframeB = this.createWireframePreview(meshB, 0xff0000); // Red
    
    group.add(wireframeA);
    group.add(wireframeB);
    
    group.userData.previewOperation = operation;
    
    return group;
  }

  static createWireframePreview(mesh, color) {
    if (!mesh || !mesh.geometry) return new THREE.Group();
    
    const wireframe = new THREE.WireframeGeometry(mesh.geometry);
    const material = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.5 });
    const line = new THREE.LineSegments(wireframe, material);
    
    // Copy transform from original mesh
    line.position.copy(mesh.position);
    line.rotation.copy(mesh.rotation);
    line.scale.copy(mesh.scale);
    
    return line;
  }

  // Future: Integration point for proper CSG library
  static async loadCSGLibrary() {
    // This would be where we'd dynamically import a CSG library
    // For now, we'll use our basic implementations
    console.log('CSG library integration point - using basic operations for now');
    return true;
  }
}

// Export utility functions for use in other parts of the application
export const BooleanUtils = {
  // Check if an object is the result of a boolean operation
  isBooleanResult: (object) => {
    return object && object.userData && object.userData.operation;
  },
  
  // Get the operation type of a boolean result
  getOperationType: (object) => {
    return object?.userData?.operation || null;
  },
  
  // Get original meshes from a boolean operation
  getOriginalMeshes: (object) => {
    return object?.userData?.originalMeshes || [];
  }
};
