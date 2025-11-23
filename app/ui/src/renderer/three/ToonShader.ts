/**
 * Toon Shader
 * Простой toon шейдер с 2-3 ступенями яркости и outline
 */

import * as THREE from 'three';

/**
 * Создает toon шейдер материал
 */
export function createToonMaterial(
  color: THREE.Color = new THREE.Color(0.8, 0.8, 0.9)
): THREE.ShaderMaterial {
  const uniforms: { [uniform: string]: THREE.IUniform<any> } = {
    uColor: { value: color },
    uLightIntensity: { value: 1.0 },
    uSteps: { value: 3.0 }, // Количество ступеней яркости
    uStepSize: { value: 0.4 }, // Размер ступени
  };

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uLightIntensity;
      uniform float uSteps;
      uniform float uStepSize;
      
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      
      void main() {
        vec3 normal = normalize(vNormal);
        
        // Простое освещение на основе нормали
        float dotNL = dot(normal, vec3(0.5, 1.0, 0.5));
        dotNL = max(0.0, dotNL);
        
        // Toon эффект - квантование яркости
        float stepped = floor(dotNL * uSteps) / uSteps;
        stepped = smoothstep(0.0, uStepSize, stepped);
        
        // Финальный цвет
        vec3 finalColor = uColor * (0.3 + stepped * uLightIntensity);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
  });
}

/**
 * Создает outline материал через обратный кейлинг
 */
export function createOutlineMaterial(
  thickness: number = 0.01,
  color: THREE.Color = new THREE.Color(0, 0, 0)
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {
      thickness: { value: thickness },
      outlineColor: { value: color },
    },
    vertexShader: `
      uniform float thickness;
      varying vec3 vNormal;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vec3 newPosition = mvPosition.xyz + vNormal * thickness;
        gl_Position = projectionMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 outlineColor;
      
      void main() {
        gl_FragColor = vec4(outlineColor, 1.0);
      }
    `,
  });
}

/**
 * Применяет toon шейдер к объекту с outline
 */
export function applyToonShader(
  object: THREE.Object3D,
  toonColor: THREE.Color = new THREE.Color(0.8, 0.8, 0.9),
  outlineColor: THREE.Color = new THREE.Color(0, 0, 0),
  outlineThickness: number = 0.02
): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Сохраняем оригинальный материал
      const originalMaterial = child.material;

      // Создаем toon материал
      const toonMaterial = createToonMaterial(toonColor);

      // Если оригинальный материал имеет цвет, используем его
      if (originalMaterial instanceof THREE.MeshStandardMaterial && originalMaterial.map) {
        toonMaterial.uniforms.uColor.value = new THREE.Color(1, 1, 1);
        toonMaterial.uniformsNeedUpdate = true;
      } else if (originalMaterial instanceof THREE.MeshStandardMaterial) {
        toonMaterial.uniforms.uColor.value = originalMaterial.color.clone();
      }

      child.material = toonMaterial;

      // Создаем outline mesh
      const outlineMesh = child.clone();
      outlineMesh.material = createOutlineMaterial(outlineThickness, outlineColor);
      outlineMesh.scale.multiplyScalar(1.02); // Небольшое увеличение для outline
      outlineMesh.renderOrder = -1; // Рендерим outline первым

      // Добавляем outline как дочерний элемент
      child.add(outlineMesh);
    }
  });
}
