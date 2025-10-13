import { Badge } from '@/components/ui/badge';
import Card3D from '@/components/3d/3dCard.tsx';

interface ResumeSectionProps {
  onSocialClick?: (platform: string) => void;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ }) => {

  return (
    <section className="max-w-4xl mx-auto space-y-8 relative z-10" aria-labelledby="resume-heading">
      <div className="text-center space-y-4 p-4 md:p-6 bg-background/80 backdrop-blur-sm rounded-lg transform transition-transform hover:scale-105 duration-300" style={{ transformStyle: 'preserve-3d' }}>
        <h1 id="resume-heading" className="text-3xl md:text-4xl font-bold" style={{ transform: 'translateZ(40px)' }}>Resume</h1>
        {/* <p className="text-xl text-muted-foreground" style={{ transform: 'translateZ(30px)' }}>
          Senior Software Engineer - 3D Interactive Applications & Game Development
        </p> */}
      </div>

      <Card3D title="Professional Experience" id="experience" className="my-8">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Senior Software Developer (Interactive 3D)</h3>
                <p className="text-primary">Omnicom Media Group, Bangalore</p>
              </div>
              <span className="text-sm text-muted-foreground">May 2023 - Present</span>
            </div>
            <div className="mt-2 space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Next-Generation 3D Marketing Platform with AI Integration</h4>
                <ul className="mt-1 space-y-1 text-sm list-disc list-inside ml-2">
                  <li>Designed web-based Unreal Engine rendering platform reducing content turnaround time by 50%, targeting $2M+ in annual efficiency savings</li>
                  <li>Built custom React frontend with Pixel Streaming and REST APIs, achieving 99.9% uptime</li>
                  <li>Integrated generative AI modules for texture generation, improving designer productivity by 60%</li>
                  <li>Architected Node.js orchestration layer managing cloud GPU rendering jobs for photorealistic renders</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Enterprise WebGL Framework & Editor Development</h4>
                <ul className="mt-1 space-y-1 text-sm list-disc list-inside ml-2">
                  <li>Spearheaded custom WebGL framework on Three.js, enabling 40% faster delivery of interactive 3D content</li>
                  <li>Developed web-based 3D Editor using Electron and React for designers to create interactive scenes without coding</li>
                  <li>Implemented modular engine with scene graph management, improving load times by 2× and reducing memory usage by 30%</li>
                  <li>Optimized rendering pipeline with geometry batching, supporting large models at consistent 60fps</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Software Development Engineer 2</h3>
                <p className="text-primary">Homelane, Bangalore</p>
              </div>
              <span className="text-sm text-muted-foreground">November 2020 - April 2023</span>
            </div>
            <div className="mt-2 space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-700">SpaceCraft Interior Design Platform</h4>
                <ul className="mt-1 space-y-1 text-sm list-disc list-inside ml-2">
                  <li>Led development of flagship interior design platform with real-time photorealistic 3D visualization, serving 50,000+ customers monthly</li>
                  <li>Engineered 3D rendering engine using Three.js with PBR shaders, reducing in-person meetings by 80%</li>
                  <li>Designed collaborative editing system for real-time interaction in shared 3D scenes</li>
                  <li>Optimized rendering with dynamic lightmapping and frustum culling, reducing load time by 35%</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Enterprise 3D Asset Pipeline & Performance Framework</h4>
                <ul className="mt-1 space-y-1 text-sm list-disc list-inside ml-2">
                  <li>Architected WebGL toolkit with CAD to glTF/OBJ conversion pipeline</li>
                  <li>Implemented Draco compression and texture atlas generation, reducing asset sizes by 40%</li>
                  <li>Developed custom GLSL shaders for realistic materials with cross-browser consistency</li>
                  <li>Mentored team of 8 engineers, improving code quality metrics by 45%</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Software Engineer</h3>
                <p className="text-primary">IZMO LTD, Bangalore</p>
              </div>
              <span className="text-sm text-muted-foreground">February 2019 - November 2020</span>
            </div>
            <div className="mt-2 space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Interactive 3D Automotive Showcase Platform</h4>
                <ul className="mt-1 space-y-1 text-sm list-disc list-inside ml-2">
                  <li>Designed generalized 3D configurator supporting multiple accessories, materials, animations, and hotspots</li>
                  <li>Engineered configuration file system enabling easy element addition without code changes, reducing deployment time by 70%</li>
                  <li>Created user-friendly 3D editor for artists to create configuration files, streamlining content creation by 60%</li>
                  <li>Integrated 3D configurator with backend systems and React frontend for seamless communication</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">Associate Software Developer</h3>
                <p className="text-primary">Juego Studios Pvt Ltd, Bangalore</p>
              </div>
              <span className="text-sm text-muted-foreground">July 2017 - February 2019</span>
            </div>
            <div className="mt-2 space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-700">Real-time Geo-Mapping Application & Game Development</h4>
                <ul className="mt-1 space-y-1 text-sm list-disc list-inside ml-2">
                  <li>Developed dynamic web application providing real-time geo-mapped data visualization with WebVR support</li>
                  <li>Implemented intelligent algorithms for building, roof, and window generation from GeoJSON data</li>
                  <li>Created custom GLSL shaders for height-based terrain generation with merged geometries for optimization</li>
                  <li>Built interactive games using Unity3D, Three.js, and PlayCanvas with Web Workers for multi-threading</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card3D>

      <Card3D title="Technical Skills" id="skills" className="my-8">
        <div className="space-y-4">
          <div className="">
            <h4 className="font-semibold mb-2">3D Graphics & WebGL</h4>
            <div className="flex flex-wrap gap-2">
              {['Three.js', 'WebGL API', 'GLSL Shaders', 'PBR', 'Unreal Engine (C++ & Blueprint)', 'Unity3D (C#)', 'PlayCanvas', 'OpenGL'].map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="">
            <h4 className="font-semibold mb-2">Frontend Development</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5/CSS3', 'Tailwind CSS'].map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="">
            <h4 className="font-semibold mb-2">Backend & APIs</h4>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'NestJS', 'Express.js', 'RESTful API', 'Microservices', 'Real-time Systems'].map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="">
            <h4 className="font-semibold mb-2">Cloud & DevOps</h4>
            <div className="flex flex-wrap gap-2">
              {['AWS (ECS, EC2, Lambda, S3, RDS)', 'Docker', 'CI/CD', 'Infrastructure as Code', 'Performance Monitoring'].map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="">
            <h4 className="font-semibold mb-2">Mobile Development</h4>
            <div className="flex flex-wrap gap-2">
              {['Flutter', 'React Native', 'Native Android (Java)', 'Native iOS (Swift, Objective-C)'].map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="">
            <h4 className="font-semibold mb-2">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'System Architecture Design',
                'Performance Optimization',
                '3D Asset Pipeline Automation',
                'Real-time Rendering',
                'Cross-platform Development',
                'AI/Graphics Integration'
              ].map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card3D>

      <Card3D title="Education" id="education" className="my-8">
        <div className="">
          <h3 className="text-lg font-semibold">Bachelor of Engineering (CSE)</h3>
          <p className="text-primary">Bearys Institute Of Technology, Mangalore</p>
          <p className="text-sm text-muted-foreground">August 2013 - June 2017</p>
          <p className="text-sm mt-2">Specialized coursework in computer graphics, algorithms, and software engineering principles.</p>
        </div>
      </Card3D>

      <Card3D title="Key Achievements" id="achievements" className="my-8">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">💡</span>
            <div>
              <h4 className="font-semibold text-sm">Performance Leadership</h4>
              <p className="text-sm text-muted-foreground">Improved system performance by 40% through optimized rendering pipelines and asset compression</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">📈</span>
            <div>
              <h4 className="font-semibold text-sm">Scalability Success</h4>
              <p className="text-sm text-muted-foreground">Designed systems serving 50,000+ monthly users with 99.9% uptime</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">💰</span>
            <div>
              <h4 className="font-semibold text-sm">$2M+ Annual Cost Savings</h4>
              <p className="text-sm text-muted-foreground">Architected AI-integrated 3D platform reducing content production time by 50%</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">👥</span>
            <div>
              <h4 className="font-semibold text-sm">Team Impact</h4>
              <p className="text-sm text-muted-foreground">Led and mentored cross-functional teams of 15+ engineers across multiple projects</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary font-bold text-lg mt-0.5">🚀</span>
            <div>
              <h4 className="font-semibold text-sm">Innovation Driver</h4>
              <p className="text-sm text-muted-foreground">Integrated cutting-edge AI technologies with 3D graphics workflows</p>
            </div>
          </div>
        </div>
      </Card3D>
    </section>
  );
};

export default ResumeSection;