# Portfolio Website

A modern, interactive portfolio website built with Next.js, Three.js, and shadcn/ui. Features a 3D interactive hero section, project showcase, and dark mode support.

## Features

- 🎨 Interactive 3D Hero Section with Three.js
- 📱 Responsive Design
- 🌓 Dark Mode Support
- ⚡ Performance Optimized
- 💼 Project Showcase
- 📝 Contact Form
- 📊 Resume Section

## Tech Stack

- Next.js 13+
- TypeScript
- Three.js / React Three Fiber
- Tailwind CSS
- shadcn/ui Components
- next-themes for Dark Mode

## Prerequisites

- Node.js 16+ 
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/msawad08/profolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/
│   ├── HeroSection.tsx       # Interactive 3D hero section
│   ├── HomePage.tsx          # Main home page component
│   ├── Layout.tsx           # Main layout with navigation
│   ├── PortfolioSection.tsx # Project showcase
│   ├── ContactSection.tsx   # Contact form
│   └── ui/                  # shadcn/ui components
├── pages/
│   └── index.tsx            # Home page route
├── types/
│   └── index.ts            # TypeScript interfaces
└── styles/
    └── globals.css         # Global styles
```

## Key Components

- **HeroSection**: Interactive 3D background with particle system
- **PortfolioSection**: Showcase of projects with filtering
- **ContactSection**: Contact form with validation
- **Layout**: Main layout with dark mode toggle

## Customization

### Styling
The project uses Tailwind CSS for styling. You can modify the theme in:
```js
// tailwind.config.js
```

### Content
Update your portfolio content in:
```typescript
// components/PortfolioSection.tsx
const projects = [...]
```


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Mohammed Sawad - msawad08@gmail.com

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the UI components
- [Three.js](https://threejs.org/) for 3D graphics
- [Next.js](https://nextjs.org/) for the framework