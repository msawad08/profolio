import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types';
import Emporio from "../../assets/preview/emporio.png"
import Happs from "../../assets/preview/happs.png"
import Spacecraft from "../../assets/preview/spacecraft.png"
import TreeWorld from "../../assets/preview/PortfolioWeb2020_TreeWorld-1.avif"
import ArNail from "../../assets/preview/PortfolioWeb2020_ARNail.avif"



const projects: Project[] = [
  {
    "title": "Web-Based Unreal Self-Service Rendering Tool with Generative AI Integration",
    "description": "A comprehensive web-based platform enabling users to configure products and scene settings with advanced rendering capabilities, powered by Unreal Engine. The tool offers intuitive control through a web frontend and incorporates Generative AI for dynamic props and background generation.",
    "technologies": ["Unreal Engine", "Blueprint", "C++", "React", "Node.js", "Shadcn", "Generative AI"],
    "features": [
      "Interactive product configuration and scene customization.",
      "Advanced post-processing controls and adjustable time-of-day settings.",
      "Support for backdrop and HDRI background integration.",
      "Preset and customizable free camera animations with timeline control.",
      "Rendering of high-quality still images and videos in various formats.",
      "User-friendly web interface for seamless feature control.",
      "Real-time streaming of the Unreal Engine application to the web frontend.",
      "Generative AI integration for dynamic props and background creation."
    ]
  },
  {
    "title": "In-House WebGL Framework & Editor Based on Three.js",
    "description": "A customized WebGL framework and editor, forked from the open-source NunuStudio, enhanced with features to streamline and automate workflows for organizational WebGL projects.",
    "technologies": ["Three.js", "WebGL", "GLSL"],
    "features": [
      "User-friendly interface for creating hotspots, animations, and configurations such as color and accessory selection, and variants.",
      "Automated JSON generation from project files to dynamically create corresponding UI elements.",
      "Seamless integration between user interfaces and WebGL projects.",
      "Upgraded to support the latest version of Three.js.",
      "Custom material and node-based shader support through modifications to the Three.js framework.",
      "Streamlined workflows to enhance productivity and usability in WebGL projects."
    ]
  },
  {
    "title": "SpaceCraft - Comprehensive Interior Design Platform",
    "description": "An in-house 2D and 3D interior design application utilized by HomeLane's designers to create personalized home interiors, offering real-time pricing and seamless production document generation.",
    "image": Spacecraft,  // Replace with the actual image variable or URL
    "technologies": ["Three.js", "React", "WebGL", "GLSL"],
    "features": [
      "Dynamic mesh generation for seamless module connectivity",
      "Automated module placement system for efficient design workflows",
      "Automated 2D document generation facilitating accurate production processes",
      "Optimized materials and textures ensuring high-quality visualizations",
      "Progressive shadow generation for enhanced depth and realism",
      "Real-time pricing integration providing immediate budget insights"
    ]
  },
  {
    "title": "3D Virtual Showroom",
    "description": "An interactive 3D platform for immersive car and product visualization, offering advanced customization options and photorealistic renders.",
    "technologies": ["Three.js", "GLSL", "Custom Shaders", "WebGL"],
    "image": Emporio,  // Replace with the actual image variable or URL
    "features": [
      "Seamless material transition animations",
      "Sophisticated custom lighting effects",
      "Realistic water droplet simulations",
      "Advanced GLSL shaders for enhanced visual fidelity",
      "Comprehensive configuration system with JSON export capabilities",
      "Optimized materials and textures for improved performance"
    ]
  },
  {
    "title": "Real-time Geo-Mapping Application",
    "description": "A dynamic web application that provides real-time geo-mapped data visualization, enabling users to interact with urban area data, including roads, buildings, and natural elements, optimized for performance and virtual reality experiences.",
    "technologies": ["Three.js", "GLSL", "WebVR", "Web Workers", "Custom Shaders"],
    "image": Happs,  // Replace with the actual image variable or URL
    "features": [
      "Dynamic generation of buildings, trees, and monuments from GeoJSON data.",
      "Intelligent algorithms for roof and window generation based on building parameters.",
      "Custom GLSL shaders for height-based terrain generation.",
      "WebVR support with configurable 360-degree video path generation.",
      "Merged geometries for optimized performance.",
      "Vector color implementation replacing multi-materials.",
      "Offloading complex calculations to Web Workers.",
      "Level of Detail (LOD) implementation for efficient rendering.",
      "Optimized Three.js library with reduced overhead."
    ]
  },
  {
    "title": "AR Nail - Augmented Reality Nail Coloring App",
    "description": "An innovative mobile application that utilizes augmented reality to allow users to preview and customize nail colors and designs in real-time, enhancing the personal grooming experience.",
    "technologies": ["Augmented Reality", "Unity3D", "Vuforia", "OpenCV", "iOS", "Android"],
    "image": ArNail,  // Replace with the actual image variable or URL
    "features": [
      "Real-time AR visualization of nail colors and art",
      "Extensive library of nail polish shades and patterns",
      "Customizable nail art designs with user-defined patterns",
      "Social media integration for sharing designs",
      "User-friendly interface with intuitive controls",
      "High-fidelity hand tracking and nail detection",
      "Personalized recommendations based on user preferences",
      "Virtual try-on feature with realistic lighting effects",
      "In-app tutorials and tips for nail care"
    ]
  },
  {
    "title": "Tree World - Fantasy Game for Toddlers",
    "description": "A mobile simulation game where players nurture and expand a magical tree, collect unique creatures known as Critters, and manage resources to create a thriving ecosystem.",
    "technologies": ["Unity3D", "C#", "iOS", "Android"],
    "image": TreeWorld,  // Replace with the actual image variable or URL
    "features": [
      "Discovery and collection of diverse Critters, each with unique appearances and abilities.",
      "Resource management system balancing food and energy to maintain Critter well-being.",
      "Customization options for decorating and personalizing the magical tree.",
      "Social features enabling visits to friends' trees, Critter trading, and event participation.",
      "Regular content updates introducing new Critters, items, and features."
    ]
  }
  
];

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all" role="listitem">
      {project.image && <img
        src={project.image}
        alt={`Screenshot of ${project.title} project`}
        className="w-full h-80 object-cover"
        loading="lazy"
      />}
      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <Badge key={techIndex} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              {project.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="text-sm text-muted-foreground">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PortfolioSection: React.FC = () => {
  return (
    <section id="portfolio-section" className="space-y-6 md:space-y-8" aria-labelledby="portfolio-heading">
      <div className="text-center px-4">
        <h1 id="portfolio-heading" className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Portfolio</h1>
        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Showcasing enterprise-scale 3D interactive applications, WebGL frameworks, and real-time rendering systems that drive business impact.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2" role="list">
        {projects.map((project, index) => (
          <div
            key={index}
            className={
              index === projects.length - 1 && projects.length % 2 !== 0
                ? "md:col-span-2 flex justify-center"
                : ""
            }
          >
            <div className={
              index === projects.length - 1 && projects.length % 2 !== 0
                ? "w-full md:w-1/2"
                : "w-full"
            }>
              <ProjectCard project={project} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;