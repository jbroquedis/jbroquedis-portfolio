# 📁 PROJECT FOLDER STRUCTURE GUIDE

## Where to Add Your Content

### 🏗️ **ARCHITECTURE PROJECTS**
**Location**: `public/projects/architecture/`

**Each project has this structure**:
```
architecture-project-1/
├── thumbnail/
│   └── thumb.jpg          ← Main thumbnail (200x120px recommended)
├── speckle-model/
│   └── model-info.json    ← Speckle URLs and metadata
└── gallery/
    ├── image1.jpg         ← Gallery images (any resolution)
    ├── image2.jpg
    ├── image3.jpg
    └── ...
```

**Available Projects**: `architecture-project-1` through `architecture-project-10`

### 💻 **COMPUTATIONAL DESIGN PROJECTS**
**Location**: `public/projects/computational-design/`

**Each project has this structure**:
```
computational-design-project-1/
├── thumbnail/
│   └── thumb.jpg          ← App/tool thumbnail
├── app-embedding/
│   ├── app-url.txt        ← Live URL for embedding
│   ├── demo-video.mp4     ← Demo video (optional)
│   └── screenshots/       ← App screenshots
└── gallery/
    ├── interface1.jpg     ← Interface screenshots
    ├── results1.jpg       ← Results/outputs
    └── workflow.gif       ← Process animations
```

**Available Projects**: `computational-design-project-1` through `computational-design-project-10`

### 👤 **ABOUT PROJECTS** (No bottom slider)
**Location**: `public/projects/about/`

**Each project has this structure**:
```
about-project-1/
├── thumbnail/
│   └── thumb.jpg          ← Portfolio item thumbnail
├── portfolio-content/
│   ├── cv.pdf             ← Documents
│   ├── portfolio.pdf      ← Portfolio files
│   └── videos/            ← Personal videos
└── gallery/
    ├── achievement1.jpg   ← Awards, certificates
    ├── work-process.jpg   ← Behind-the-scenes
    └── team-photos.jpg    ← Collaboration photos
```

**Available Projects**: `about-project-1` through `about-project-10`

## 🎯 **QUICK START - TEST WITH ONE PROJECT**

### Start with Architecture Project 1:

1. **Add thumbnail**:
   ```
   public/projects/architecture/architecture-project-1/thumbnail/thumb.jpg
   ```

2. **Add gallery images**:
   ```
   public/projects/architecture/architecture-project-1/gallery/image1.jpg
   public/projects/architecture/architecture-project-1/gallery/image2.jpg
   ```

3. **Result**: 
   - Thumbnail appears in bottom slider on Architecture page
   - Gallery images show in right sidebar when project is selected
   - Speckle model loads (if URL is configured in projects.js)

## 📝 **CURRENT PROJECT NAMES**

### Architecture:
- `architecture-project-1`: "Floating Research Pod"
- `architecture-project-2`: "Desert Retreat Center"
- `architecture-project-3`: "Cliffside Observatory"
- `architecture-project-4`: "Urban Canopy System"
- `architecture-project-5`: "Biomimetic Tower"
- `architecture-project-6`: "Tidal Research Station"
- `architecture-project-7`: "Forest Canopy Bridge"
- `architecture-project-8`: "Glacier Monitoring Hub"
- `architecture-project-9`: "Underground Botanical Garden"
- `architecture-project-10`: "Floating Solar Farm Hub"

### Computational Design:
- `computational-design-project-1`: "Parametric Form Generator"
- `computational-design-project-2`: "Climate Responsive Optimizer"
- `computational-design-project-3`: "Structural Growth Simulator"
- And 7 more...

## 🔧 **CURRENT STATUS**

✅ **Working Now**:
- Architecture page: Shows architecture projects in bottom slider
- Computational Design page: Shows computational design projects in bottom slider  
- About page: No bottom slider (clean portfolio view)
- Folder structure created and routed correctly

🎯 **Ready for Content**:
- Start adding images to test the system
- All paths are configured and ready
- Speckle models will load when configured

---

**Next Step**: Add a thumbnail and some gallery images to `architecture-project-1` to see it working!