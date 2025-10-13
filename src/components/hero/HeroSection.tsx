import { MouseEvent, useEffect, useRef, useState } from 'react';
import { ChevronsDown} from 'lucide-react'

type Vector2 = {x: number, y: number};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [clickIntensity, setClickIntensity] = useState(0.0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader - Glass spheres with refraction and reflection
    const fragmentShaderSource = `
      precision highp float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_click;
      
      #define PI 3.14159265359
      #define TAU 6.28318530718
      #define EPSILON 0.001
      #define MAX_DIST 50.0
      
      // Material properties
      struct Material {
        vec3 color;
        float roughness;
        float metallic;
        float ior; // Index of refraction
        float transparency;
      };
      
      // Ray structure
      struct Ray {
        vec3 origin;
        vec3 direction;
      };
      
      // Hit information
      struct Hit {
        float t;
        vec3 point;
        vec3 normal;
        Material material;
        bool hit;
      };
      
      // Rotation matrix
      mat2 rot(float a) {
        float c = cos(a), s = sin(a);
        return mat2(c, -s, s, c);
      }
      
      // Fresnel reflectance (Schlick's approximation)
      float fresnel(vec3 I, vec3 N, float ior) {
        float cosi = clamp(dot(I, N), -1.0, 1.0);
        float etai = 1.0, etat = ior;
        if (cosi > 0.0) {
          float temp = etai;
          etai = etat;
          etat = temp;
        }
        float sint = etai / etat * sqrt(max(0.0, 1.0 - cosi * cosi));
        if (sint >= 1.0) return 1.0; // Total internal reflection
        
        float cost = sqrt(max(0.0, 1.0 - sint * sint));
        cosi = abs(cosi);
        float Rs = ((etat * cosi) - (etai * cost)) / ((etat * cosi) + (etai * cost));
        float Rp = ((etai * cosi) - (etat * cost)) / ((etai * cosi) + (etat * cost));
        return (Rs * Rs + Rp * Rp) / 2.0;
      }
      
      // Refraction calculation
      vec3 refract_ray(vec3 I, vec3 N, float ior) {
        float cosi = clamp(dot(I, N), -1.0, 1.0);
        float etai = 1.0, etat = ior;
        vec3 n = N;
        if (cosi < 0.0) {
          cosi = -cosi;
        } else {
          float temp = etai;
          etai = etat;
          etat = temp;
          n = -N;
        }
        float eta = etai / etat;
        float k = 1.0 - eta * eta * (1.0 - cosi * cosi);
        return k < 0.0 ? vec3(0.0) : eta * I + (eta * cosi - sqrt(k)) * n;
      }
      
      // Scene distance function
      Hit raycast(Ray ray) {
        Hit hit;
        hit.hit = false;
        hit.t = MAX_DIST;
        
        vec3 ro = ray.origin;
        vec3 rd = ray.direction;
        
        // Glass spheres with different properties
        vec3 spherePos1 = vec3(sin(u_time * 0.3) * 2.0, cos(u_time * 0.4) * 1.5, 0.0);
        vec3 spherePos2 = vec3(-cos(u_time * 0.5) * 1.8, sin(u_time * 0.3) * 1.2, -1.0);
        vec3 spherePos3 = vec3(cos(u_time * 0.2) * 1.5, -sin(u_time * 0.6) * 1.0, 1.5);
        vec3 spherePos4 = vec3(0.0, sin(u_time * 0.8) * 0.8, -2.0);
        
        // Check sphere 1 - Clear glass
        vec3 oc1 = ro - spherePos1;
        float a1 = dot(rd, rd);
        float b1 = 2.0 * dot(oc1, rd);
        float c1 = dot(oc1, oc1) - 0.8 * 0.8;
        float disc1 = b1 * b1 - 4.0 * a1 * c1;
        
        if (disc1 > 0.0) {
          float t1 = (-b1 - sqrt(disc1)) / (2.0 * a1);
          if (t1 > EPSILON && t1 < hit.t) {
            hit.t = t1;
            hit.point = ro + t1 * rd;
            hit.normal = normalize(hit.point - spherePos1);
            hit.material.color = vec3(0.95, 0.95, 1.0);
            hit.material.ior = 1.52; // Glass
            hit.material.transparency = 0.95;
            hit.material.roughness = 0.0;
            hit.material.metallic = 0.0;
            hit.hit = true;
          }
        }
        
        // Check sphere 2 - Colored glass (red tint)
        vec3 oc2 = ro - spherePos2;
        float a2 = dot(rd, rd);
        float b2 = 2.0 * dot(oc2, rd);
        float c2 = dot(oc2, oc2) - 0.6 * 0.6;
        float disc2 = b2 * b2 - 4.0 * a2 * c2;
        
        if (disc2 > 0.0) {
          float t2 = (-b2 - sqrt(disc2)) / (2.0 * a2);
          if (t2 > EPSILON && t2 < hit.t) {
            hit.t = t2;
            hit.point = ro + t2 * rd;
            hit.normal = normalize(hit.point - spherePos2);
            hit.material.color = vec3(1.0, 0.7, 0.7);
            hit.material.ior = 1.6;
            hit.material.transparency = 0.85;
            hit.material.roughness = 0.1;
            hit.material.metallic = 0.0;
            hit.hit = true;
          }
        }
        
        // Check sphere 3 - Blue tinted glass
        vec3 oc3 = ro - spherePos3;
        float a3 = dot(rd, rd);
        float b3 = 2.0 * dot(oc3, rd);
        float c3 = dot(oc3, oc3) - 0.7 * 0.7;
        float disc3 = b3 * b3 - 4.0 * a3 * c3;
        
        if (disc3 > 0.0) {
          float t3 = (-b3 - sqrt(disc3)) / (2.0 * a3);
          if (t3 > EPSILON && t3 < hit.t) {
            hit.t = t3;
            hit.point = ro + t3 * rd;
            hit.normal = normalize(hit.point - spherePos3);
            hit.material.color = vec3(0.7, 0.8, 1.0);
            hit.material.ior = 1.45;
            hit.material.transparency = 0.9;
            hit.material.roughness = 0.05;
            hit.material.metallic = 0.0;
            hit.hit = true;
          }
        }
        
        // Check sphere 4 - Green tinted glass
        vec3 oc4 = ro - spherePos4;
        float a4 = dot(rd, rd);
        float b4 = 2.0 * dot(oc4, rd);
        float c4 = dot(oc4, oc4) - 0.5 * 0.5;
        float disc4 = b4 * b4 - 4.0 * a4 * c4;
        
        if (disc4 > 0.0) {
          float t4 = (-b4 - sqrt(disc4)) / (2.0 * a4);
          if (t4 > EPSILON && t4 < hit.t) {
            hit.t = t4;
            hit.point = ro + t4 * rd;
            hit.normal = normalize(hit.point - spherePos4);
            hit.material.color = vec3(0.7, 1.0, 0.8);
            hit.material.ior = 1.33; // Water-like
            hit.material.transparency = 0.92;
            hit.material.roughness = 0.0;
            hit.material.metallic = 0.0;
            hit.hit = true;
          }
        }
        
        return hit;
      }
      
      // Environment/background sampling
      vec3 sampleEnvironment(vec3 dir) {
        // Procedural sky with subtle gradients
        float y = dir.y * 0.5 + 0.5;
        vec3 skyColor = mix(vec3(0.95, 0.96, 0.98), vec3(0.98, 0.99, 1.0), y);
        
        // Add some subtle noise for interest
        float noise = sin(dir.x * 10.0) * sin(dir.z * 10.0) * 0.02;
        skyColor += noise;
        
        return skyColor;
      }
      
      // Multiple light sources with mouse control
      vec3 calculateLighting(vec3 point, vec3 normal, vec3 viewDir, Material mat) {
        vec3 color = vec3(0.0);
        
        // Main light controlled by mouse
        vec3 lightPos1 = vec3((u_mouse.x - 0.5) * 8.0, 4.0 + (u_mouse.y - 0.5) * 4.0, 3.0);
        vec3 lightColor1 = vec3(1.0, 0.8, 0.6) * (2.0 + u_click * 3.0);
        
        vec3 lightDir1 = normalize(lightPos1 - point);
        float dist1 = length(lightPos1 - point);
        float attenuation1 = 1.0 / (1.0 + 0.1 * dist1 + 0.01 * dist1 * dist1);
        
        float NdotL1 = max(0.0, dot(normal, lightDir1));
        color += lightColor1 * mat.color * NdotL1 * attenuation1;
        
        // Secondary colored lights
        vec3 lightPos2 = vec3(-3.0, 3.0, -2.0);
        vec3 lightColor2 = vec3(0.6, 0.8, 1.0) * 1.5;
        
        vec3 lightDir2 = normalize(lightPos2 - point);
        float dist2 = length(lightPos2 - point);
        float attenuation2 = 1.0 / (1.0 + 0.1 * dist2 + 0.01 * dist2 * dist2);
        
        float NdotL2 = max(0.0, dot(normal, lightDir2));
        color += lightColor2 * mat.color * NdotL2 * attenuation2;
        
        // Third light (warm)
        vec3 lightPos3 = vec3(2.0, 2.0, 4.0);
        vec3 lightColor3 = vec3(1.0, 0.6, 0.4) * 1.2;
        
        vec3 lightDir3 = normalize(lightPos3 - point);
        float dist3 = length(lightPos3 - point);
        float attenuation3 = 1.0 / (1.0 + 0.1 * dist3 + 0.01 * dist3 * dist3);
        
        float NdotL3 = max(0.0, dot(normal, lightDir3));
        color += lightColor3 * mat.color * NdotL3 * attenuation3;
        
        // Ambient lighting
        color += mat.color * vec3(0.2, 0.22, 0.25);
        
        return color;
      }
      
      // Main ray tracing function
      vec3 trace(Ray ray) {
        vec3 color = vec3(0.0);
        vec3 throughput = vec3(1.0);
        
        for (int bounce = 0; bounce < 6; bounce++) {
          Hit hit = raycast(ray);
          
          if (!hit.hit) {
            color += throughput * sampleEnvironment(ray.direction);
            break;
          }
          
          vec3 hitPoint = hit.point;
          vec3 normal = hit.normal;
          Material mat = hit.material;
          
          // Calculate lighting for opaque surfaces
          if (mat.transparency < 0.1) {
            color += throughput * calculateLighting(hitPoint, normal, -ray.direction, mat);
            break;
          }
          
          // Handle glass materials
          vec3 I = ray.direction;
          float F = fresnel(I, normal, mat.ior);
          
          if (bounce >= 5) {
            // Last bounce - just add environment
            color += throughput * sampleEnvironment(reflect(I, normal));
            break;
          }
          
          // Mix reflection and refraction based on Fresnel
          if (F > 0.9) {
            // Mostly reflection
            ray.direction = reflect(I, normal);
            ray.origin = hitPoint + normal * EPSILON;
            throughput *= mat.color * F;
          } else {
            // Mix of reflection and refraction
            vec3 refractDir = refract_ray(I, normal, mat.ior);
            
            if (length(refractDir) > 0.0) {
              // Refraction ray
              ray.direction = refractDir;
              ray.origin = hitPoint - normal * EPSILON;
              throughput *= mat.color * (1.0 - F) * mat.transparency;
            } else {
              // Total internal reflection
              ray.direction = reflect(I, normal);
              ray.origin = hitPoint + normal * EPSILON;
              throughput *= mat.color;
            }
          }
          
          // Attenuate throughput to prevent infinite loops
          if (max(max(throughput.x, throughput.y), throughput.z) < 0.01) {
            break;
          }
        }
        
        return color;
      }
      
      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // Camera setup
        vec3 ro = vec3(0.0, 0.0, 6.0);
        vec3 ta = vec3(0.0, 0.0, 0.0);
        
        // Slight camera movement
        ro.x += sin(u_time * 0.1) * 0.5;
        ro.y += cos(u_time * 0.15) * 0.3;
        
        vec3 ww = normalize(ta - ro);
        vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
        vec3 vv = normalize(cross(uu, ww));
        
        vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.8 * ww);
        
        Ray ray;
        ray.origin = ro;
        ray.direction = rd;
        
        // Single sample for performance
        vec3 color = trace(ray);
        
        // Post-processing
        // Tone mapping
        color = color / (color + vec3(1.0));
        
        // Gamma correction
        color = pow(color, vec3(1.0/2.2));
        
        // Subtle vignette
        float vignette = smoothstep(1.2, 0.3, length(uv));
        color *= 0.3 + 0.7 * vignette;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(gl: WebGL2RenderingContext | WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if(shader === null) {
        console.error('Failed to create shader of type:', type);
        return null;
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    }

    function createProgram(gl: WebGL2RenderingContext | WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram();
      if(program === null) {
        console.error('Failed to create program');
        return null;
      }
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      
      return program;
    }

    // Create shaders and program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) {
      console.error('Failed to create shaders');
      return;
    }
    
    const program = createProgram(gl, vertexShader, fragmentShader);
    
    if (!program) {
      console.error('Failed to create program');
      return;
    }

    // Get attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse');
    const clickUniformLocation = gl.getUniformLocation(program, 'u_click');

    // Create a buffer for the quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW);

    function resizeCanvas() {
      if (canvas === null  || gl === null) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function render() {
      if (canvas === null  || gl === null) return;

      resizeCanvas();
      
      // Animate click intensity decay
      setClickIntensity(prev => prev * 0.95);
      
      gl.useProgram(program);
      
      // Set uniforms
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, performance.now() * 0.001);
      gl.uniform2f(mouseUniformLocation, mouse.x, mouse.y);
      gl.uniform1f(clickUniformLocation, clickIntensity);
      
      // Set up the attribute
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
      
      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      animationFrameRef.current = requestAnimationFrame(render);
    }

    // Handle window resize
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    // Start the animation
    render();

    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 100);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mouse, clickIntensity]);

  // Particle system effect
  useEffect(() => {
    const particleCanvas = particleCanvasRef.current;
    if (!particleCanvas) return;

    const ctx = particleCanvas.getContext('2d');
    if (!ctx) return;

    const resizeParticleCanvas = () => {
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
    };

    resizeParticleCanvas();
    window.addEventListener('resize', resizeParticleCanvas);

    // Create initial particles
    const createParticle = (x?: number, y?: number): Particle => {
      return {
        x: x ?? Math.random() * particleCanvas.width,
        y: y ?? Math.random() * particleCanvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: 1,
        maxLife: Math.random() * 200 + 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      };
    };

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particlesRef.current.push(createParticle());
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        // Wrap around screen
        if (particle.x < 0) particle.x = particleCanvas.width;
        if (particle.x > particleCanvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = particleCanvas.height;
        if (particle.y > particleCanvas.height) particle.y = 0;

        // Draw particle
        const lifeRatio = particle.life / particle.maxLife;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * lifeRatio})`;
        ctx.fill();

        // Draw connections to nearby particles
        particlesRef.current.forEach(other => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100) * lifeRatio})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        return particle.life > 0;
      });

      // Add new particles
      if (particlesRef.current.length < 50) {
        particlesRef.current.push(createParticle());
      }

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      window.removeEventListener('resize', resizeParticleCanvas);
      particlesRef.current = [];
    };
  }, []);

  // Mouse tracking
  const handleMouseMove = (event: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const newMouse: Vector2 = {
        x: (event.clientX - rect.left) / rect.width,
        y: 1.0 - (event.clientY - rect.top) / rect.height
      };
      setMouse(newMouse);

      // Update card 3D effect
      updateCardEffect(newMouse);
    }
  };

  const handleMouseDown = () => {
    setClickIntensity(1.0);
  };

  const handleMouseUp = () => {
    setClickIntensity(0.0);
  };

  // 3D effect on the card
  const updateCardEffect = (mousePos: Vector2) => {
    if (!cardRef.current) return;

    const rotateX = (mousePos.y - 0.5) * 10; // Reduced rotation for subtlety
    const rotateY = (mousePos.x - 0.5) * 10;

    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg)
      translateZ(10px)
    `;
  };

  const technologies = ['Three.js', 'WebGL', 'Unreal Engine', 'React', 'AWS', 'Node.js'];

  return (
    <div className="relative h-screen overflow-hidden" role="banner">
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ cursor: 'crosshair' }}
        aria-label="Interactive 3D background with glass spheres"
      />

      {/* Particle System Canvas */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
        aria-hidden="true"
      />

      {/* Overlay UI - Scroll Indicator */}
      <div className={`absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <a href="#portfolio-section" aria-label="Scroll to portfolio section" className="group">
          <div className="relative">
            <ChevronsDown
              scale={10}
              className="w-16 h-16 md:w-24 md:h-24 text-white/40 hover:text-white transition-all duration-300 cursor-pointer animate-float group-hover:animate-bounce drop-shadow-lg"
            />
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all duration-300"></div>
          </div>
        </a>
      </div>
      
      {/* <div className="absolute bottom-6 right-6 text-gray-700 text-xs text-right bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
        <div>Mouse: Light Position</div>
        <div>Move: Dynamic Lighting</div>
        <div>Click: Color Intensity</div>
      </div> */}

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full pointer-events-none px-4">
        <div
          ref={cardRef}
          className={`transition-all duration-1000 ease-out ${
            isLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="bg-white/30 backdrop-blur-xl shadow-2xl border border-white/20 rounded-2xl p-6 md:p-8 text-center space-y-4 md:space-y-6 max-w-2xl hover:shadow-3xl transition-shadow duration-300">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transform: 'translateZ(40px)' }}
            >
              Mohammed Sawad
            </h1>
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transform: 'translateZ(30px)' }}
            >
              Senior Software Architect | Interactive 3D & WebGL Systems | Marketing Technology
            </p>
            <div
              className={`flex flex-wrap justify-center gap-2 md:gap-3 transition-all duration-700 delay-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transform: 'translateZ(20px)' }}
            >
              {technologies.map((tech, index) => (
                <span
                  key={tech}
                  className={`group relative bg-white/40 backdrop-blur-sm text-gray-700 text-xs md:text-sm font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-full hover:scale-110 hover:bg-white/60 transition-all duration-300 cursor-pointer border border-white/30 hover:border-white/50 hover:shadow-lg pointer-events-auto ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  }`}
                  style={{
                    transitionDelay: `${800 + index * 100}ms`,
                  }}
                >
                  {tech}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;