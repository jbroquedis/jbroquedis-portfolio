# JBroquedis - Futuristic Architecture Portfolio

A cutting-edge, avant-garde portfolio website showcasing architectural and computational design projects with a futuristic aesthetic.

## ✨ Features

### 🎨 Futuristic Design
- **Glassmorphism Effects**: Translucent panels with backdrop blur
- **Particle Backgrounds**: Animated particle systems for depth
- **Glowing Elements**: Subtle neon glows and shadows
- **Modern Typography**: Inter font family for clean, modern text
- **Responsive Design**: Optimized for all device sizes

### 🏗️ Architecture
- **Vue 3 Composition API**: Modern reactive framework
- **Vue Router**: Client-side navigation
- **Vite**: Fast development and building
- **Three.js**: 3D visualizations and effects

### 📱 Navigation Structure
- **About**: Personal introduction with animated profile
- **Computational Design**: App embeddings and interactive projects
- **Architecture**: Speckle model integration with image galleries
- **Contact**: Modern contact form with glassmorphism

### 🎯 Project Organization
```
public/
├── project-images/
│   ├── architecture/          # Architecture project images
│   └── computational-design/  # Computational design screenshots
├── speckle-models/           # 3D model files
└── project-apps/             # Embedded applications
```

## 🚀 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
cd portfolio
npm install
```

### Development Server
```bash
npm run dev
```
Visit `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 🌐 Deployment to jbroquedis.xyz

### Option 1: Static Hosting (Recommended)
```bash
# Build the project
npm run build

# Upload dist/ folder contents to your web server
# Point domain to the uploaded files
```

### Option 2: Vercel (Easy deployment)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 3: Netlify
```bash
# Build
npm run build

# Drag and drop dist/ folder to Netlify dashboard
# Or connect GitHub repository for auto-deployment
```

### Domain Configuration
1. Point `jbroquedis.xyz` to your hosting provider
2. Configure DNS A records or CNAME
3. Enable HTTPS/SSL certificate
4. Update any absolute URLs in the project if needed

## 📁 Project Structure

```
src/
├── components/
│   ├── TopBar.vue           # Main navigation
│   ├── ProjectSlider.vue    # Bottom project carousel  
│   ├── SplitPanel.vue       # Resizable split layout
│   └── ImageScroller.vue    # Vertical image gallery
├── pages/
│   ├── Home.vue             # About page
│   ├── ComputationalDesign.vue
│   ├── Architecture.vue
│   └── Contact.vue
├── data/
│   └── projects.js          # Project metadata
├── router.js                # Route configuration
├── style.css               # Global futuristic styles
└── main.js                 # App initialization
```

## 🎨 Design System

### Color Palette
- **Primary**: `#0a0a0a` - Deep black background
- **Secondary**: `#1a1a1a` - Dark secondary background  
- **Green Accent**: `#22c55e` - Bright green for highlights
- **Orange Accent**: `#f97316` - Vibrant orange for actions
- **Blue Accent**: `#3b82f6` - Cool blue for navigation
- **Text**: `#e5e5e5` - Light gray for readability

### Effects
- **Glassmorphism**: `backdrop-filter: blur(20px)`
- **Glow**: `text-shadow: 0 0 20px rgba(color, 0.5)`
- **Gradient Backgrounds**: Multi-layer radial gradients
- **Smooth Animations**: `cubic-bezier(0.4, 0, 0.2, 1)`

## 📋 Content Management

### Adding Architecture Projects
1. Add project data to `src/data/projects.js`
2. Upload images to `public/project-images/architecture/projectX/`
3. Configure Speckle embed URLs or model IDs
4. Update project metadata (name, description, year, etc.)

### Adding Computational Design Projects  
1. Add project to `src/data/projects.js` with category `computational-design`
2. Include `githubUrl`, `liveUrl`, or `embedUrl` for interactive content
3. Upload screenshots to `public/project-images/computational-design/projectX/`
4. Specify technologies and project type

### Speckle Integration
Projects support multiple Speckle resource types:
- `embedUrl`: Direct iframe embedding
- `streamId`: Speckle stream identifier  
- `objectId`: Specific object within stream

## 🔧 Customization

### Adding New Sections
1. Create new Vue component in `src/pages/`
2. Add route to `src/router.js`
3. Update navigation in `src/components/TopBar.vue`
4. Style with glassmorphism utilities from `src/style.css`

### Modifying Visual Effects
- Global effects: `src/style.css`
- Component-specific: Individual `.vue` files
- Animation utilities: CSS custom properties in `:root`

## 📱 Browser Support
- Chrome 88+
- Firefox 87+  
- Safari 14+
- Edge 88+

*Requires `backdrop-filter` support for glassmorphism effects*

## 🔍 SEO & Performance
- Optimized images and assets
- Semantic HTML structure
- Fast Vite build system
- Minimal JavaScript bundle
- Progressive enhancement

## 📄 License
Private portfolio project for Joaquin Broquedis.

---

**Live Site**: [jbroquedis.xyz](https://jbroquedis.xyz)
**Repository**: Private development repository
