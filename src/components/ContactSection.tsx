import React, { useState, useEffect, useRef } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { trackEvent, trackPageView, submitContactForm } from '../lib/firebase';
import * as THREE from 'three';
import Card3D from '@/components/3d/3dCard.tsx';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Track contact section view
    trackPageView('Contact Section');
    trackEvent('contact_section_viewed', {
      timestamp: new Date().toISOString()
    });

    // Setup 3D background
    if (!backgroundRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(backgroundRef.current.clientWidth, backgroundRef.current.clientHeight);
    backgroundRef.current.appendChild(renderer.domElement);

    // Create wave mesh
    const geometry = new THREE.PlaneGeometry(30, 30, 50, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0x4060ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });

    // const mesh = new THREE.Mesh(geometry, material);
    // mesh.rotation.x = -Math.PI / 2;
    // mesh.position.y = -5;
    // scene.add(mesh);

    // Add some lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Camera position
    camera.position.z = 15;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);

    // Animation
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame += 0.03;

      // Animate vertices for wave effect
      const positions = geometry.attributes.position;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);

        // Create wave pattern
        const y = Math.sin((x + frame) * 0.3) * Math.cos((z + frame) * 0.3) * 1.5;

        positions.setY(i, y);
      }

      positions.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!backgroundRef.current) return;

      camera.aspect = backgroundRef.current.clientWidth / backgroundRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(backgroundRef.current.clientWidth, backgroundRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (backgroundRef.current && backgroundRef.current.contains(renderer.domElement)) {
        backgroundRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Track when users start filling out the form
    if (value && value.length === 1) {
      trackEvent('contact_form_field_started', {
        field_name: name
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Submit contact form using the utility function from lib/firebase
      const result = await submitContactForm(formData);

      // Additional tracking for successful submission
      trackEvent('contact_form_success', {
        email_domain: formData.email.split('@')[1],
        message_length: formData.message.length
      });

      console.log('Form submitted with ID:', result.id);

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.'
      });
    } catch (error) {
      console.error('Error submitting form:', error);

      // Track form submission errors
      trackEvent('contact_form_error', {
        error_message: (error as Error).message
      });

      setSubmitStatus({
        success: false,
        message: 'There was an error submitting your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Track social link clicks
  const trackSocialClick = (platform: string) => {
    trackEvent('social_link_clicked', {
      platform: platform,
      source: 'contact_section'
    });
  };

  return (
      <div className="relative min-h-[600px]">
        {/* 3D Background */}
        <div
            ref={backgroundRef}
            className="absolute inset-0 -z-10"
            style={{ height: '100%' }}
        />

        <div className="container mx-auto px-4 py-16 space-y-8 relative z-10">
          <div className="text-center space-y-4 bg-background/60 backdrop-blur-md p-6 rounded-lg transform hover:scale-105 transition-all duration-300" style={{ transformStyle: 'preserve-3d' }}>
            <h2 className="text-3xl font-bold" style={{ transform: 'translateZ(40px)' }}>Get in Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto" style={{ transform: 'translateZ(30px)' }}>
              Feel free to reach out for collaborations, opportunities, or just to say hello!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card3D id="contact-info" className="h-full">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 transform hover:translate-x-2 transition-transform">
                    <Mail className="h-5 w-5 text-primary" />
                    <a
                        href="mailto:msawad08@gmail.com"
                        className="hover:text-primary transition-colors"
                        onClick={() => trackSocialClick('email')}
                    >
                      msawad08@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 transform hover:translate-x-2 transition-transform">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+91 8431713052</span>
                  </div>
                  <div className="flex items-center gap-3 transform hover:translate-x-2 transition-transform">
                    <Linkedin className="h-5 w-5 text-primary" />
                    <a
                        href="https://linkedin.com/in/mohammed-sawad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                        onClick={() => trackSocialClick('linkedin')}
                    >
                      linkedin.com/in/mohammed-sawad
                    </a>
                  </div>
                  <div className="flex items-center gap-3 transform hover:translate-x-2 transition-transform">
                    <Github className="h-5 w-5 text-primary" />
                    <a
                        href="https://github.com/msawad08"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                        onClick={() => trackSocialClick('github')}
                    >
                      github.com/msawad08
                    </a>
                  </div>
                </div>
              </div>
            </Card3D>

            <Card3D id="contact-form" className="h-full">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Send a Message</h3>

                {submitStatus && (
                    <Alert
                        className={`${
                            submitStatus.success
                                ? 'bg-green-50 text-green-800 border-green-500'
                                : 'bg-red-50 text-red-800 border-red-500'
                        }`}
                    >
                      <AlertDescription>{submitStatus.message}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        disabled={isSubmitting}
                        className="transition-all focus:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                        disabled={isSubmitting}
                        className="transition-all focus:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        required
                        rows={4}
                        disabled={isSubmitting}
                        className="transition-all focus:scale-105"
                    />
                  </div>
                  <Button
                      type="submit"
                      className="w-full relative overflow-hidden group"
                      disabled={isSubmitting}
                      onClick={() => trackEvent('contact_form_submit_clicked', {})}
                  >
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </form>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
  );
};

export default ContactSection;