import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { trackEvent } from '../../lib/firebase';

interface Section3DWrapperProps {
    children: React.ReactNode;
    id: string;
    effect?: '3d-card' | '3d-particles' | '3d-grid' | '3d-mesh';
    depth?: number;
    backgroundColor?: string;
}

const Section3DWrapper: React.FC<Section3DWrapperProps> = ({
                                                               children,
                                                               id,
                                                               effect = '3d-card',
                                                               depth = 20,
                                                               backgroundColor = 'rgba(15, 23, 42, 0.7)'
                                                           }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    // Mouse position
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Track component mounted
        trackEvent('3d_section_mounted', {
            section_id: id,
            effect_type: effect
        });

        // IntersectionObserver for tracking when the section comes into view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        trackEvent('3d_section_viewed', {
                            section_id: id,
                            effect_type: effect
                        });
                    } else {
                        setIsInView(false);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (wrapperRef.current) {
            observer.observe(wrapperRef.current);
        }

        // Cleanup
        return () => {
            if (wrapperRef.current) {
                observer.unobserve(wrapperRef.current);
            }
        };
    }, [id, effect]);

    // Mouse movement effect
    useEffect(() => {
        if (effect !== '3d-card' || !isInView) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!wrapperRef.current) return;

            // Get bounding rectangle of wrapper
            const rect = wrapperRef.current.getBoundingClientRect();

            // Calculate mouse position relative to the wrapper
            // Normalize from -1 to 1
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [effect, isInView]);

    // Apply 3D transform effect based on mouse position
    useEffect(() => {
        if (effect !== '3d-card' || !contentRef.current || !isInView) return;

        // Calculate rotation based on mouse position
        // Limit the rotation to +/- 5 degrees
        const rotateY = mousePosition.x * 5;
        const rotateX = -mousePosition.y * 5;

        contentRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${isInView ? 1 : 0.95})
    `;
    }, [mousePosition, effect, isInView]);

    // 3D particle background effect
    useEffect(() => {
        if (effect !== '3d-particles' || !bgRef.current || !isInView) return;

        // THREE.js setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        // Setup renderer
        renderer.setSize(bgRef.current.clientWidth, bgRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        bgRef.current.appendChild(renderer.domElement);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 1000;

        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
            // Position
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;

            // Color
            colors[i] = Math.random();
            colors[i + 1] = Math.random();
            colors[i + 2] = Math.random();
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 0.5
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Camera position
        camera.position.z = 3;

        // Animation
        const animate = () => {
            const animationId = requestAnimationFrame(animate);

            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.0003;

            renderer.render(scene, camera);

            // Cleanup animation if component is no longer in view
            if (!isInView) {
                cancelAnimationFrame(animationId);
            }
        };

        animate();

        // Handle resize
        const handleResize = () => {
            if (!bgRef.current) return;

            camera.aspect = bgRef.current.clientWidth / bgRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(bgRef.current.clientWidth, bgRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (bgRef.current && bgRef.current.contains(renderer.domElement)) {
                bgRef.current.removeChild(renderer.domElement);
            }
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();
        };
    }, [effect, isInView]);

    // 3D grid background effect
    useEffect(() => {
        if (effect !== '3d-grid' || !bgRef.current || !isInView) return;

        // THREE.js setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        // Setup renderer
        renderer.setSize(bgRef.current.clientWidth, bgRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        bgRef.current.appendChild(renderer.domElement);

        // Create grid
        const gridHelper = new THREE.GridHelper(20, 20, 0x666666, 0x444444);
        scene.add(gridHelper);

        // Camera position
        camera.position.y = 1;
        camera.position.z = 5;
        camera.rotation.x = -Math.PI / 16;

        // Animation
        const animate = () => {
            const animationId = requestAnimationFrame(animate);

            gridHelper.position.z += 0.01;
            if (gridHelper.position.z > 1) {
                gridHelper.position.z = 0;
            }

            renderer.render(scene, camera);

            // Cleanup animation if component is no longer in view
            if (!isInView) {
                cancelAnimationFrame(animationId);
            }
        };

        animate();

        // Handle resize
        const handleResize = () => {
            if (!bgRef.current) return;

            camera.aspect = bgRef.current.clientWidth / bgRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(bgRef.current.clientWidth, bgRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (bgRef.current && bgRef.current.contains(renderer.domElement)) {
                bgRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [effect, isInView]);

    // 3D mesh effect
    useEffect(() => {
        if (effect !== '3d-mesh' || !bgRef.current || !isInView) return;

        // THREE.js setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        // Setup renderer
        renderer.setSize(bgRef.current.clientWidth, bgRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        bgRef.current.appendChild(renderer.domElement);

        // Create waves mesh
        const geometry = new THREE.PlaneGeometry(15, 15, 32, 32);
        const material = new THREE.MeshNormalMaterial({
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        scene.add(mesh);

        // Create animation for vertices
        const positionAttribute = geometry.attributes.position;
        const initialPositions = new Float32Array(positionAttribute.array.length);
        for (let i = 0; i < positionAttribute.array.length; i++) {
            initialPositions[i] = positionAttribute.array[i];
        }

        // Camera position
        camera.position.y = 2;
        camera.position.z = 5;

        // Animation
        let frame = 0;
        const animate = () => {
            const animationId = requestAnimationFrame(animate);
            frame += 0.01;

            // Update vertices to create wave effect
            for (let i = 0; i < positionAttribute.count; i++) {
                const x = initialPositions[i * 3];
                const z = initialPositions[i * 3 + 2];

                // Wave formula
                const y = Math.sin((x + frame) * 0.5) * 0.5 + Math.sin((z + frame) * 0.5) * 0.5;

                positionAttribute.setY(i, y);
            }

            positionAttribute.needsUpdate = true;

            renderer.render(scene, camera);

            // Cleanup animation if component is no longer in view
            if (!isInView) {
                cancelAnimationFrame(animationId);
            }
        };

        animate();

        // Handle resize
        const handleResize = () => {
            if (!bgRef.current) return;

            camera.aspect = bgRef.current.clientWidth / bgRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(bgRef.current.clientWidth, bgRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (bgRef.current && bgRef.current.contains(renderer.domElement)) {
                bgRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [effect, isInView]);

    return (
        <div
            id={id}
            ref={wrapperRef}
            className="relative overflow-hidden my-16 rounded-lg"
            style={{ minHeight: '400px' }}
        >
            {/* Background with 3D effect */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0"
            />

            {/* Overlay */}
            <div
                className="absolute inset-0 z-10"
                style={{ backgroundColor }}
            />

            {/* Content with 3D transform */}
            <div
                ref={contentRef}
                className="relative z-20 transition-transform duration-300 ease-out p-8"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: `perspective(1000px) translateZ(${depth}px)`,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Section3DWrapper;