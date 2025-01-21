import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ParticleSystem {
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  mesh: THREE.Points;
}

const HeroSection: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight * 0.6);
    mountRef.current.appendChild(renderer.domElement);

    const createParticleSystem = (): ParticleSystem => {
      const geometry = new THREE.BufferGeometry();
      const particlesCount = 3000;
      const posArray = new Float32Array(particlesCount * 3);
      const colors = new Float32Array(particlesCount * 3);

      for(let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 5;
        posArray[i + 1] = (Math.random() - 0.5) * 5;
        posArray[i + 2] = (Math.random() - 0.5) * 5;
        
        // Color
        colors[i] = 0.1 + Math.random() * 0.2;
        colors[i + 1] = 0.3 + Math.random() * 0.3;
        colors[i + 2] = 0.8 + Math.random() * 0.2;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.005,
        vertexColors: true
      });

      const mesh = new THREE.Points(geometry, material);

      return { geometry, material, mesh };
    };

    const particleSystem = createParticleSystem();
    scene.add(particleSystem.mesh);

    camera.position.z = 2;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent): void => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = (): void => {
      requestAnimationFrame(animate);
      
      particleSystem.mesh.rotation.x += mouseY * 0.001;
      particleSystem.mesh.rotation.y += mouseX * 0.001;
      particleSystem.mesh.rotation.z += 0.0005;
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = (): void => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight * 0.6);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particleSystem.geometry.dispose();
      particleSystem.material.dispose();
    };
  }, []);

  const technologies: string[] = ['Three.js', 'WebGL', 'Unreal Engine', 'React', 'GLSL'];

  return (
    <div className="relative h-[60vh]">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center space-y-4">
            <h1 className="text-4xl font-bold">Mohammed Sawad</h1>
            <p className="text-xl text-muted-foreground">
              Senior Software Engineer specializing in 3D Interactive Applications & Game Development
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;