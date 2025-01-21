import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Linkedin, Github, MapPin, Phone } from 'lucide-react';

const ResumeSection = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Mohammed Sawad</h1>
        <p className="text-xl text-muted-foreground">
          Senior Software Engineer - 3D Interactive Applications & Game Development
        </p>
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin size={16} /> Bangalore - 560068
          </div>
          <div className="flex items-center gap-1">
            <Phone size={16} /> +91 8431713052
          </div>
          <div className="flex items-center gap-1">
            <Mail size={16} /> msawad08@gmail.com
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <a href="https://linkedin.com/in/mohammed-sawad" className="flex items-center gap-1 text-primary hover:text-primary/80">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href="https://github.com/msawad08" className="flex items-center gap-1 text-primary hover:text-primary/80">
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Professional Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Senior Software Developer</h3>
                <p className="text-primary">Omnicom Global Solution, Bangalore</p>
              </div>
              <span className="text-sm text-muted-foreground">May 2023 - Present</span>
            </div>
            <ul className="mt-2 space-y-2 text-sm list-disc list-inside">
              <li>Led development of Unreal Engine-based 3D rendering application</li>
              <li>Built high-performance 3D product configurators using PlayCanvas/Three.js</li>
              <li>Developed custom editor tools based on Three.js</li>
              <li>Collaborated with clients including Audi, Nissan, Infiniti, CNH, HP, and Schneider Electric</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Software Development Engineer II</h3>
                <p className="text-primary">HomeLane, Bangalore</p>
              </div>
              <span className="text-sm text-muted-foreground">November 2020 - April 2023</span>
            </div>
            <ul className="mt-2 space-y-2 text-sm list-disc list-inside">
              <li>Created VR experiences for home interior visualization using Unreal Engine</li>
              <li>Developed 3D interior designer application using THREE.js and React</li>
              <li>Built custom optimization systems for materials and lighting</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Software Engineer</h3>
                <p className="text-primary">Izmo Ltd, Bangalore</p>
              </div>
              <span className="text-sm text-muted-foreground">February 2019 - November 2020</span>
            </div>
            <ul className="mt-2 space-y-2 text-sm list-disc list-inside">
              <li>Developed 3D Car Visualizer using Three.js and React</li>
              <li>Optimized rendering performance through advanced techniques</li>
              <li>Built User Friendly Tool based on Three.js to create hotspots, animations and variants</li>
              <li>Deployed visualizer for Nissan, Honda, and Peugeot</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Game Developer</h3>
                <p className="text-primary">Juego Studios, Bangalore</p>
              </div>
              <span className="text-sm text-muted-foreground">July 2017 - February 2019</span>
            </div>
            <ul className="mt-2 space-y-2 text-sm list-disc list-inside">
              <li>Developed games using Unity, THREE.js & PlayCanvas</li>
              <li>Created 3D visualization system for geographic data</li>
              <li>Implemented multi-threading solutions using Web Workers</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Game Engines</h4>
              <div className="flex flex-wrap gap-2">
                {['Unreal Engine 5 (C++ & Blueprints)', 'Unity'].map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Web 3D</h4>
              <div className="flex flex-wrap gap-2">
                {['Three.js', 'PlayCanvas', 'WebGL', 'GLSL'].map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Programming</h4>
              <div className="flex flex-wrap gap-2">
                {['C++', 'C#', 'TypeScript', 'Python'].map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Interactive 3d Applications',
                  'Shaders and Automations',
                  'AR/ VR Development (WebXR, Unreal)',
                ].map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <h3 className="text-lg font-semibold">Bachelor of Engineering (CSE)</h3>
            <p className="text-primary">Bearys Institute Of Technology, Mangalore</p>
            <p className="text-sm text-muted-foreground">2013 - 2017</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeSection;