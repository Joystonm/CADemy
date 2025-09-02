# CADemy - Making 3D design education free, fun and accessible for everyone.

CADemy is an interactive web-based application designed to teach 3D modeling and Computer-Aided Design (CAD) concepts through hands-on practice and progressive challenges.

## Features

- **Interactive 3D Environment**: Work with real 3D objects using professional-grade tools
- **Progressive Learning**: Start with basic shapes and advance to complex assemblies
- **Challenge-based Learning**: Learn through practical challenges that simulate real-world tasks
- **Real-time Feedback**: Get instant feedback with helpful hints and suggestions
- **Boolean Operations**: Learn CSG operations like union, subtract, and intersect
- **Transform Controls**: Move, rotate, and scale objects with precision

## Technology Stack

- **React** - User interface and component management
- **Three.js** - 3D graphics and rendering
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **Tailwind CSS** - Responsive and modern styling
- **Webpack** - Module bundling and development server

## Project Structure

```
├── public/                   # Static assets
├── src/
│   ├── assets/              # Images, icons, sounds
│   ├── components/          # Reusable UI components
│   ├── scenes/              # Different application scenes
│   ├── three/               # Three.js-specific functionality
│   ├── data/                # Challenge data and presets
│   ├── hooks/               # Custom React hooks
│   ├── context/             # Global state management
│   ├── styles/              # CSS and styling
│   ├── pages/               # Route-level components
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Application entry point
│   └── router.jsx           # Routing configuration
├── package.json
├── webpack.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CADemy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the project for production
- `npm run dev` - Start development server with auto-open

## Usage

### Playground Mode
- Access the free-form modeling environment
- Add primitive shapes (cubes, spheres, cylinders, cones)
- Transform objects using move, rotate, and scale tools
- Experiment with boolean operations

### Challenge Mode
- Complete structured learning challenges
- Follow step-by-step objectives
- Receive real-time feedback on your progress
- Unlock new challenges as you advance

### Tutorial Mode
- Learn the basics through guided tutorials
- Interactive step-by-step instructions
- Practice fundamental CAD concepts

## Key Components

### Three.js Integration
- `CanvasWrapper.jsx` - Main 3D canvas component
- `ObjectFactory.js` - Creates primitive 3D shapes
- `TransformControls.js` - Handles object transformations
- `BooleanOperations.js` - CSG operations (union, subtract, intersect)
- `SceneUtils.js` - Utility functions for scene management

### UI Components
- `Navbar.jsx` - Main navigation
- `Sidebar.jsx` - Tool selection panel
- `ObjectPanel.jsx` - Shape library
- `PropertiesPanel.jsx` - Object property editor
- `Toolbar.jsx` - Quick action buttons

### State Management
- `AppContext.jsx` - Global application state
- `SceneContext.jsx` - 3D scene state management
- `useCADControls.js` - Custom hook for CAD operations

