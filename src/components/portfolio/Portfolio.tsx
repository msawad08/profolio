import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types';
import Emporio from "../../assets/preview/emporio.png"
import Happs from "../../assets/preview/happs.png"
import Spacecaft from "../../assets/preview/spacecraft.png"

const projects: Project[] = [
  {
    "title": "Web-Based Unreal Self-Service Rendering Tool",
    "description": "A web-based tool for product configuration and scene settings with advanced rendering capabilities, running on Unreal Engine and streamed to a web frontend for easy control.",
    // "image": "UnrealTool",
    "technologies": ["Unreal", "Blueprint", "C++", "React", "Node.js", "Shadcn"],
    "features": [
      "Product configuration and scene settings",
      "Post-processing controls and time-of-day settings",
      "Backdrop and HDRI background support",
      "Preset and custom free cam animation with a timeline",
      "Rendering still images and videos in multiple formats and settings",
      "Web UI for intuitive control of all features",
      "Unreal Engine application streamed directly to the web frontend"
    ]
  },
  {
    "title": "Three.js-Based In-House WebGL Framework & Editor",
    "description": "A customized WebGL framework and editor forked from the open-source NunuStudio, enhanced with multiple features to simplify and automate workflows for organizational WebGL projects.",
    "technologies": ["Three.js", "WebGL", "GLSL"],
    "features": [
      "Easy UI for creating hotspots, animations, and configurations like color selection, accessory selection, and variants",
      "JSON generation based on project files for configurations to dynamically generate corresponding UI",
      "Seamless integration between UI and WebGL projects",
      "Upgraded to support the latest Three.js version",
      "Custom material and node-based shader support by modifying the Three.js version",
      "Streamlined workflows to enhance productivity and usability for WebGL projects"
    ]
  },
  {
    title: "Interior Design Application",
    description: "In-house 2D & 3D interior design application used by interior designers at HomeLane for customer presentations with real-time pricing and production document generation.",
    image: Spacecaft,
    technologies: ["Three.js", "React", "WebGL", "GLSL"],
    features: [
      "Dynamic mesh generation for connecting modules",
      "Auto placement system for modules",
      "2D document generation for production",
      "Optimized materials and textures",
      "Progressive shadow generation",
      "Real-time pricing integration"
    ]
  },
  {
    title: "3D Virtual Showroom",
    description: "Interactive 3D showroom for car and product visualization with advanced configuration options and realistic renders.",
    technologies: ["Three.js", "GLSL", "Custom Shaders", "WebGL"],
    image: Emporio,
    features: [
      "Material transition animations",
      "Custom lighting effects",
      "Water droplet simulations",
      "Custom GLSL shaders",
      "Configuration system with JSON export",
      "Optimized materials and textures"
    ]
  },
  {
    title: "3D Data Visualization Map",
    description: "Dynamically generated geo-mapped data visualization system that provides comprehensive urban area data including roads, buildings, trees, roofs and other elements, with optimized performance and VR capabilities.",
    technologies: ["Three.js", "GLSL", "WebVR", "Web Workers", "Custom Shaders"],
    image: Happs,  // You'll need to specify an image variable name here
    features: [
        "Dynamic generation of buildings, trees & monuments from geo JSON data",
        "Intelligent roof & window generation algorithm based on building parameters",
        "Custom GLSL shader for height-based terrain generation",
        "WebVR view and configurable 360-degree video path generation",
        "Merged geometries for performance optimization",
        "Vector color implementation replacing multi-materials",
        "Complex calculations offloaded to Web Workers",
        "Level of Detail (LOD) implementation",
        "Optimized Three.js library with reduced overhead"
    ]
},
  
];

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      {project.image && <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-80 object-cover"
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
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Showcasing my work in 3D interactive applications, WebGL development, and game engineering.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
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
    </div>
  );
};

export default PortfolioSection;