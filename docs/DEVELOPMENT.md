# 🛠️ Development Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Architecture Overview](#architecture-overview)
- [File Structure](#file-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Deployment Process](#deployment-process)
- [Contributing Guidelines](#contributing-guidelines)

## Prerequisites

### Required Tools
- **Git** (latest version)
- **Modern Web Browser** (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Text Editor/IDE** (VS Code recommended with extensions)
- **Local Server** (optional but recommended)

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "ms-vscode.vscode-json",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.live-server",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-css-peek"
  ]
}
```

### Browser Developer Tools
- **Chrome DevTools** - Primary development browser
- **Firefox Developer Edition** - Cross-browser testing
- **Safari Web Inspector** - macOS/iOS compatibility

## Project Setup

### 1. Clone Repository
```bash
git clone https://github.com/driizzyy/Webhook-Embed-Creator.git
cd Webhook-Embed-Creator
```

### 2. Development Environment
```bash
# Option 1: Python (built-in)
python -m http.server 8000

# Option 2: Node.js (if available)
npx serve . --port 8000

# Option 3: PHP (if available)
php -S localhost:8000

# Option 4: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

### 3. Access Development Server
- **Main Site**: http://localhost:8000
- **Creator Tool**: http://localhost:8000/src/creator.html
- **Documentation**: http://localhost:8000/src/docs.html

## Architecture Overview

### Technology Stack
```
Frontend Framework: Vanilla JavaScript (ES6+)
Styling: CSS3 (Grid, Flexbox, Custom Properties)
Build Process: None (Direct file serving)
Deployment: GitHub Pages (Static hosting)
Dependencies: Zero external runtime dependencies
```

### Core Principles
1. **Zero Dependencies** - No external libraries or frameworks
2. **Progressive Enhancement** - Works without JavaScript for basic content
3. **Mobile First** - Responsive design from smallest screens up
4. **Accessibility** - WCAG 2.1 AA compliance
5. **Performance** - <2s load time on 3G networks

### Design Patterns
- **Module Pattern** - Each JS file is a self-contained module
- **Observer Pattern** - Event-driven communication between components
- **Factory Pattern** - Template and embed creation systems
- **Singleton Pattern** - Global state management

## File Structure

```
webhook-creator/
├── 📄 index.html              # Landing page (root)
├── 📄 README.md               # Project documentation (root)
├── 📄 LICENSE                 # MIT license (root)
│
├── 📁 src/                    # Source files
│   ├── 🎨 creator.html        # Main embed creator interface
│   ├── 📚 docs.html           # User documentation
│   ├── 🎯 examples.html       # Template library
│   ├── 🔧 api.html            # API documentation
│   │
│   ├── 📁 css/                # Stylesheets
│   │   ├── main.css           # Global styles and variables
│   │   ├── creator.css        # Creator interface styles
│   │   ├── docs.css           # Documentation page styles
│   │   ├── examples.css       # Examples page styles
│   │   ├── api.css            # API documentation styles
│   │   └── animations.css     # Animation definitions
│   │
│   ├── 📁 js/                 # JavaScript modules
│   │   ├── main.js            # Core utilities and shared functions
│   │   ├── creator.js         # Embed creation logic
│   │   ├── docs.js            # Documentation interactivity
│   │   ├── examples.js        # Template management
│   │   ├── api.js             # API documentation features
│   │   ├── animations.js      # Animation controllers
│   │   └── discord-preview.js # Discord embed preview system
│   │
│   └── 📁 assets/             # Static assets
│       └── favicon.svg        # Site favicon
│
├── 📁 assets/                 # Configuration and meta files
│   ├── 404.html               # Custom 404 error page
│   ├── robots.txt             # Search engine directives
│   └── sitemap.xml            # Site structure for SEO
│
├── 📁 config/                 # Build and deployment configuration
│   └── _config.yml            # Jekyll/GitHub Pages config
│
├── 📁 docs/                   # Development documentation
│   ├── DEVELOPMENT.md         # This file
│   └── FEATURES.md            # Feature specifications
│
└── 📁 .github/               # GitHub-specific configuration
    └── workflows/             # Automated CI/CD workflows
        └── deploy.yml         # GitHub Pages deployment
```

### File Naming Conventions
- **HTML**: kebab-case (e.g., `api-docs.html`)
- **CSS**: kebab-case (e.g., `discord-preview.css`)
- **JavaScript**: kebab-case (e.g., `embed-creator.js`)
- **Assets**: descriptive names (e.g., `discord-logo.svg`)
    │   ├── animations.js   # Animation controllers
    │   └── discord-preview.js # Preview system
    └── assets/             # Static assets
        ├── favicon.svg     # Site favicon
        └── preview.png     # Social media preview image
```

## Features

- ✨ Real-time Discord embed preview
- 🎨 Advanced customization options
- 📱 Mobile-responsive design
- 🚀 Direct webhook integration
- 💾 Template save/load system
- 📤 JSON export functionality
- 🌙 Light/dark theme toggle
- ⚡ Professional animations

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No external dependencies
- **Font Awesome** - Icon library
- **Google Fonts** - Inter typeface

## Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## Local Development

1. Clone the repository
2. Open `index.html` in a web browser
3. Navigate to `src/creator.html` for the embed creator

For best results, serve files through a local web server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
