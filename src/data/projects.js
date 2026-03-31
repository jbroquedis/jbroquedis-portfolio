export const projects = {
  // ===== ABOUT SECTION PROJECTS (10) =====
  'about-project-1': {
    name: 'Professional Journey',
    category: 'about',
    description: 'Chronicling my journey from architecture student to computational design specialist',
    year: '2025',
    type: 'portfolio-showcase',
    tags: ['career', 'journey', 'portfolio', 'professional'],
    thumbnailPath: '/projects/about/about-project-1/thumbnail/',
    contentPath: '/projects/about/about-project-1/portfolio-content/',
    galleryPath: '/projects/about/about-project-1/gallery/',
    content: {
      type: 'mixed', // images, videos, documents
      hasVideo: true,
      hasDocuments: true
    }
  },
  'about-project-2': {
    name: 'Educational Background',
    category: 'about',
    description: 'Academic achievements and educational milestones in architecture and computational design',
    year: '2024',
    type: 'educational-showcase',
    tags: ['education', 'academic', 'university', 'achievements'],
    thumbnailPath: '/projects/about/about-project-2/thumbnail/',
    contentPath: '/projects/about/about-project-2/portfolio-content/',
    galleryPath: '/projects/about/about-project-2/gallery/'
  },
  'about-project-3': {
    name: 'Design Philosophy',
    category: 'about',
    description: 'Core principles and methodologies that guide my design approach',
    year: '2025',
    type: 'philosophy-showcase',
    tags: ['philosophy', 'methodology', 'principles', 'approach'],
    thumbnailPath: '/projects/about/about-project-3/thumbnail/',
    contentPath: '/projects/about/about-project-3/portfolio-content/',
    galleryPath: '/projects/about/about-project-3/gallery/'
  },
  'about-project-4': {
    name: 'Technical Skills',
    category: 'about',
    description: 'Comprehensive overview of technical skills and software proficiencies',
    year: '2025',
    type: 'skills-showcase',
    tags: ['skills', 'technical', 'software', 'proficiency'],
    thumbnailPath: '/projects/about/about-project-4/thumbnail/',
    contentPath: '/projects/about/about-project-4/portfolio-content/',
    galleryPath: '/projects/about/about-project-4/gallery/'
  },
  'about-project-5': {
    name: 'Awards & Recognition',
    category: 'about',
    description: 'Professional awards, competitions, and industry recognition',
    year: '2024',
    type: 'achievements-showcase',
    tags: ['awards', 'recognition', 'competitions', 'achievements'],
    thumbnailPath: '/projects/about/about-project-5/thumbnail/',
    contentPath: '/projects/about/about-project-5/portfolio-content/',
    galleryPath: '/projects/about/about-project-5/gallery/'
  },
  'about-project-6': {
    name: 'Research Interests',
    category: 'about',
    description: 'Current research areas and future directions in computational design',
    year: '2025',
    type: 'research-showcase',
    tags: ['research', 'interests', 'future', 'innovation'],
    thumbnailPath: '/projects/about/about-project-6/thumbnail/',
    contentPath: '/projects/about/about-project-6/portfolio-content/',
    galleryPath: '/projects/about/about-project-6/gallery/'
  },
  'about-project-7': {
    name: 'Collaboration History',
    category: 'about',
    description: 'Notable collaborations with firms, institutions, and fellow designers',
    year: '2024',
    type: 'collaboration-showcase',
    tags: ['collaboration', 'partnerships', 'teamwork', 'network'],
    thumbnailPath: '/projects/about/about-project-7/thumbnail/',
    contentPath: '/projects/about/about-project-7/portfolio-content/',
    galleryPath: '/projects/about/about-project-7/gallery/'
  },
  'about-project-8': {
    name: 'Publications & Talks',
    category: 'about',
    description: 'Academic publications, conference presentations, and thought leadership',
    year: '2024',
    type: 'publications-showcase',
    tags: ['publications', 'talks', 'conferences', 'thought-leadership'],
    thumbnailPath: '/projects/about/about-project-8/thumbnail/',
    contentPath: '/projects/about/about-project-8/portfolio-content/',
    galleryPath: '/projects/about/about-project-8/gallery/'
  },
  'about-project-9': {
    name: 'Creative Process',
    category: 'about',
    description: 'Behind-the-scenes look at my creative process and design methodology',
    year: '2025',
    type: 'process-showcase',
    tags: ['process', 'creativity', 'methodology', 'workflow'],
    thumbnailPath: '/projects/about/about-project-9/thumbnail/',
    contentPath: '/projects/about/about-project-9/portfolio-content/',
    galleryPath: '/projects/about/about-project-9/gallery/'
  },
  'about-project-10': {
    name: 'Vision & Goals',
    category: 'about',
    description: 'Future aspirations and long-term vision for computational architecture',
    year: '2025',
    type: 'vision-showcase',
    tags: ['vision', 'goals', 'future', 'aspirations'],
    thumbnailPath: '/projects/about/about-project-10/thumbnail/',
    contentPath: '/projects/about/about-project-10/portfolio-content/',
    galleryPath: '/projects/about/about-project-10/gallery/'
  },

  // ===== COMPUTATIONAL DESIGN PROJECTS (10) =====
  'computational-design-project-1': {
    name: 'Parametric Form Generator',
    category: 'computational-design',
    description: 'AI-powered tool for generating architectural forms based on environmental data',
    year: '2024',
    type: 'web-app',
    technologies: ['Vue.js', 'Three.js', 'Python', 'Machine Learning'],
    tags: ['parametric', 'AI', 'generative', 'environmental'],
    thumbnailPath: '/projects/computational-design/computational-design-project-1/thumbnail/',
    appEmbeddingPath: '/projects/computational-design/computational-design-project-1/app-embedding/',
    galleryPath: '/projects/computational-design/computational-design-project-1/gallery/',
    liveUrl: 'https://parametric-generator.jbroquedis.xyz',
    githubUrl: 'https://github.com/jbroquedis/parametric-generator'
  },
  'computational-design-project-2': {
    name: 'Climate Responsive Optimizer',
    category: 'computational-design',
    description: 'Algorithm that optimizes building orientation and form based on climate data',
    year: '2024',
    type: 'grasshopper-plugin',
    technologies: ['Grasshopper', 'Python', 'Climate APIs', 'Rhino'],
    tags: ['climate', 'optimization', 'responsive', 'algorithm'],
    thumbnailPath: '/projects/computational-design/computational-design-project-2/thumbnail/',
    appEmbeddingPath: '/projects/computational-design/computational-design-project-2/app-embedding/',
    galleryPath: '/projects/computational-design/computational-design-project-2/gallery/',
    githubUrl: 'https://github.com/jbroquedis/climate-optimizer'
  },
  'computational-design-project-3': {
    name: 'Structural Growth Simulator',
    category: 'computational-design',
    description: 'Biomimetic structural optimization inspired by plant growth patterns',
    year: '2023',
    type: 'research-tool',
    technologies: ['Processing', 'Java', 'Growth Algorithms', 'Physics Engine'],
    tags: ['biomimetic', 'simulation', 'structure', 'growth'],
    thumbnailPath: '/projects/computational-design/computational-design-project-3/thumbnail/',
    appEmbeddingPath: '/projects/computational-design/computational-design-project-3/app-embedding/',
    galleryPath: '/projects/computational-design/computational-design-project-3/gallery/',
    videoUrl: 'https://vimeo.com/growth-simulator-demo'
  },
  'computational-design-project-4': {
    name: 'Space Planning AI',
    category: 'computational-design',
    description: 'Machine learning model for automatic space planning and layout optimization',
    year: '2024',
    type: 'ai-model',
    technologies: ['TensorFlow', 'Python', 'React', 'REST API'],
    tags: ['AI', 'space-planning', 'optimization', 'machine-learning'],
    thumbnailPath: '/projects/computational-design/computational-design-project-4/thumbnail/',
    appEmbeddingPath: '/projects/computational-design/computational-design-project-4/app-embedding/',
    galleryPath: '/projects/computational-design/computational-design-project-4/gallery/',
    liveUrl: 'https://space-ai.jbroquedis.xyz'
  },
  'computational-design-project-5': {
    name: 'Material Performance Analyzer',
    category: 'computational-design',
    description: 'Tool for analyzing and optimizing material performance in architectural applications',
    year: '2024',
    type: 'analysis-tool',
    technologies: ['Python', 'MaterialDB APIs', 'Data Visualization'],
    tags: ['materials', 'performance', 'analysis', 'optimization'],
    thumbnailPath: '/projects/computational-design/computational-design-project-5/thumbnail/',
    appEmbeddingPath: '/projects/computational-design/computational-design-project-5/app-embedding/',
    galleryPath: '/projects/computational-design/computational-design-project-5/gallery/'
  },
  'computational-design-project-6': {
    name: 'Daylight Optimization Engine',
    category: 'computational-design',
    description: 'Computational tool for optimizing natural lighting in architectural spaces',
    year: '2024',
    type: 'simulation-engine',
    technologies: ['Radiance', 'Python', 'Solar Analysis', 'Lighting Simulation'],
    tags: ['daylight', 'optimization', 'simulation', 'lighting'],
    thumbnailPath: '/projects/computational-design/computational-design-project-6/thumbnail/',
    appEmbeddingPath: '/projects/computational-design/computational-design-project-6/app-embedding/',
    galleryPath: '/projects/computational-design/computational-design-project-6/gallery/'
  },
  'computational-design-project-7': {
    name: 'Acoustic Environment Modeler',
    category: 'computational-design',
    description: 'Advanced acoustic modeling and optimization for architectural spaces',
    year: '2023',
    type: 'modeling-tool',
    technologies: ['MATLAB', 'Acoustic Simulation', 'Python', 'Signal Processing'],
    tags: ['acoustics', 'modeling', 'simulation', 'environment'],
    thumbnailPath: '/projects/computational-design/computational-design-project-7/thumbnail/',
    appEmbeddingPath: '/projects/computational-design/computational-design-project-7/app-embedding/',
    galleryPath: '/projects/computational-design/computational-design-project-7/gallery/'
  },
  'computational-design-project-8': {
    name: 'Wind Flow Analyzer',
    category: 'computational-design',
    description: 'CFD-based tool for analyzing wind patterns around architectural forms',
    year: '2024',
    type: 'analysis-software',
    technologies: ['OpenFOAM', 'Python', 'CFD', 'ParaView'],
    tags: ['wind', 'CFD', 'analysis', 'fluid-dynamics'],
    thumbnailPath: '/projects/computational-design/computational-design-project-8/thumbnail/',
    appEmbeddingPath: '/projects/computational-design/computational-design-project-8/app-embedding/',
    galleryPath: '/projects/computational-design/computational-design-project-8/gallery/'
  },
  'computational-design-project-9': {
    name: 'Generative Floor Plan System',
    category: 'computational-design',
    description: 'AI-driven system for generating optimized floor plan layouts',
    year: '2024',
    type: 'generative-system',
    technologies: ['GANs', 'Python', 'AutoCAD API', 'Deep Learning'],
    tags: ['generative', 'floor-plans', 'AI', 'layout-optimization'],
    thumbnailPath: '/projects/computational-design/computational-design-project-9/thumbnail/',
    appEmbeddingPath: '/projects/computational-design/computational-design-project-9/app-embedding/',
    galleryPath: '/projects/computational-design/computational-design-project-9/gallery/'
  },
  'computational-design-project-10': {
    name: 'Facade Performance Optimizer',
    category: 'computational-design',
    description: 'Multi-objective optimization for high-performance building facades',
    year: '2024',
    type: 'optimization-tool',
    technologies: ['Genetic Algorithms', 'Python', 'EnergyPlus', 'Pareto Optimization'],
    tags: ['facade', 'performance', 'optimization', 'multi-objective'],
    thumbnailPath: '/projects/computational-design/computational-design-project-10/thumbnail/',
    appEmbeddingPath: '/projects/computational-design/computational-design-project-10/app-embedding/',
    galleryPath: '/projects/computational-design/computational-design-project-10/gallery/'
  },

  // ===== EXPERIMENTAL PROJECTS (10) =====
  'experimental-project-1': {
    name: 'Neo Inca City',
    category: 'experimental',
    description: 'Interactive visualization of quantum-inspired architectural forms and spatial relationships',
    year: '2024',
    type: 'interactive-experiment',
    technologies: ['Three.js', 'WebGL', 'Quantum Physics', 'Particle Systems'],
    tags: ['quantum', 'interactive', 'visualization', 'experimental'],
    thumbnailPath: '/projects/experimental/experimental-project-1/thumbnail/',
    appEmbeddingPath: '/projects/experimental/experimental-project-1/app-embedding/',
    galleryPath: '/projects/experimental/experimental-project-1/gallery/'
  },
  'experimental-project-2': {
    name: 'Domes',
    category: 'experimental',
    description: 'Machine learning experiment mapping human emotions to architectural spatial qualities',
    year: '2024',
    type: 'ai-experiment',
    technologies: ['TensorFlow', 'Emotion Recognition', 'Spatial Analysis', 'Data Visualization'],
    tags: ['AI', 'emotion', 'mapping', 'spatial'],
    thumbnailPath: '/projects/experimental/experimental-project-2/thumbnail/',
    appEmbeddingPath: '/projects/experimental/experimental-project-2/app-embedding/',
    galleryPath: '/projects/experimental/experimental-project-2/gallery/'
  },
  'experimental-project-3': {
    name: 'Sonic Space Generator',
    category: 'experimental',
    description: 'Generative system creating architectural spaces based on sound frequencies and musical patterns',
    year: '2024',
    type: 'generative-experiment',
    technologies: ['Web Audio API', 'FFT Analysis', 'Procedural Generation', 'Sound Design'],
    tags: ['sonic', 'generative', 'music', 'frequency'],
    thumbnailPath: '/projects/experimental/experimental-project-3/thumbnail/',
    appEmbeddingPath: '/projects/experimental/experimental-project-3/app-embedding/',
    galleryPath: '/projects/experimental/experimental-project-3/gallery/'
  },
  'experimental-project-4': {
    name: 'Biometric Response Pavilion',
    category: 'experimental',
    description: 'Prototype exploring how architectural spaces can respond to human biometric data',
    year: '2024',
    type: 'responsive-experiment',
    technologies: ['Biometric Sensors', 'Real-time Processing', 'Actuators', 'Arduino'],
    tags: ['biometric', 'responsive', 'prototype', 'human-centered'],
    thumbnailPath: '/projects/experimental/experimental-project-4/thumbnail/',
    appEmbeddingPath: '/projects/experimental/experimental-project-4/app-embedding/',
    galleryPath: '/projects/experimental/experimental-project-4/gallery/'
  },
  'experimental-project-5': {
    name: 'Temporal Architecture Simulator',
    category: 'experimental',
    description: 'Interactive simulation exploring how buildings evolve and decay over different time scales',
    year: '2024',
    type: 'simulation-experiment',
    technologies: ['Physics Simulation', 'Time Manipulation', 'Procedural Decay', 'WebGL'],
    tags: ['temporal', 'simulation', 'decay', 'time'],
    thumbnailPath: '/projects/experimental/experimental-project-5/thumbnail/',
    appEmbeddingPath: '/projects/experimental/experimental-project-5/app-embedding/',
    galleryPath: '/projects/experimental/experimental-project-5/gallery/'
  },
  'experimental-project-6': {
    name: 'Swarm Intelligence Builder',
    category: 'experimental',
    description: 'Collective intelligence system where virtual agents collaboratively design architectural structures',
    year: '2024',
    type: 'swarm-experiment',
    technologies: ['Swarm Algorithms', 'Collective Intelligence', 'Multi-Agent Systems', 'Emergence'],
    tags: ['swarm', 'collective', 'intelligence', 'emergence'],
    thumbnailPath: '/projects/experimental/experimental-project-6/thumbnail/',
    appEmbeddingPath: '/projects/experimental/experimental-project-6/app-embedding/',
    galleryPath: '/projects/experimental/experimental-project-6/gallery/'
  },
  'experimental-project-7': {
    name: 'Memory Palace Generator',
    category: 'experimental',
    description: 'Procedural system generating personalized architectural mnemonics for memory enhancement',
    year: '2024',
    type: 'cognitive-experiment',
    technologies: ['Cognitive Science', 'Procedural Generation', 'Memory Research', 'Spatial Cognition'],
    tags: ['memory', 'cognitive', 'mnemonic', 'procedural'],
    thumbnailPath: '/projects/experimental/experimental-project-7/thumbnail/',
    appEmbeddingPath: '/projects/experimental/experimental-project-7/app-embedding/',
    galleryPath: '/projects/experimental/experimental-project-7/gallery/'
  },
  'experimental-project-8': {
    name: 'Gravity-Defying Structures',
    category: 'experimental',
    description: 'Physics-bending architectural experiments exploring impossible geometries and spatial paradoxes',
    year: '2024',
    type: 'physics-experiment',
    technologies: ['Non-Euclidean Geometry', 'Impossible Objects', 'Optical Illusions', 'Spatial Paradoxes'],
    tags: ['gravity', 'impossible', 'paradox', 'geometry'],
    thumbnailPath: '/projects/experimental/experimental-project-8/thumbnail/',
    appEmbeddingPath: '/projects/experimental/experimental-project-8/app-embedding/',
    galleryPath: '/projects/experimental/experimental-project-8/gallery/'
  },
  'experimental-project-9': {
    name: 'Dream Architecture Interpreter',
    category: 'experimental',
    description: 'AI system translating dream descriptions into navigable architectural spaces',
    year: '2024',
    type: 'interpretation-experiment',
    technologies: ['Natural Language Processing', 'Dream Analysis', 'Spatial Translation', 'VR'],
    tags: ['dreams', 'interpretation', 'NLP', 'spatial'],
    thumbnailPath: '/projects/experimental/experimental-project-9/thumbnail/',
    appEmbeddingPath: '/projects/experimental/experimental-project-9/app-embedding/',
    galleryPath: '/projects/experimental/experimental-project-9/gallery/'
  },
  'experimental-project-10': {
    name: 'Evolutionary Architecture Lab',
    category: 'experimental',
    description: 'Genetic algorithm playground for evolving architectural forms through iterative selection',
    year: '2024',
    type: 'evolutionary-experiment',
    technologies: ['Genetic Algorithms', 'Evolutionary Computation', 'Fitness Functions', 'Selection Pressure'],
    tags: ['evolution', 'genetic', 'selection', 'iteration'],
    thumbnailPath: '/projects/experimental/experimental-project-10/thumbnail/',
    appEmbeddingPath: '/projects/experimental/experimental-project-10/app-embedding/',
    galleryPath: '/projects/experimental/experimental-project-10/gallery/'
  },

  // ===== DATA MANAGEMENT PROJECTS (6) =====
  'data-management-project-1': {
    name: 'Urban Metrics Dashboard',
    category: 'data-management',
    description: 'Interactive dashboard aggregating city-scale data: traffic, energy, population density, and environmental sensors',
    year: '2024',
    type: 'dashboard',
    technologies: ['D3.js', 'Python', 'PostgreSQL', 'FastAPI'],
    tags: ['dashboard', 'urban', 'visualization', 'sensors'],
    thumbnailPath: '/projects/data-management/data-management-project-1/thumbnail/',
    appEmbeddingPath: '/projects/data-management/data-management-project-1/app-embedding/',
    galleryPath: '/projects/data-management/data-management-project-1/gallery/'
  },
  'data-management-project-2': {
    name: 'BIM Data Pipeline',
    category: 'data-management',
    description: 'Automated ETL pipeline extracting structured data from Revit models into a queryable data warehouse',
    year: '2024',
    type: 'etl-pipeline',
    technologies: ['Speckle', 'dbt', 'BigQuery', 'Python', 'Revit API'],
    tags: ['BIM', 'ETL', 'pipeline', 'data-warehouse'],
    thumbnailPath: '/projects/data-management/data-management-project-2/thumbnail/',
    appEmbeddingPath: '/projects/data-management/data-management-project-2/app-embedding/',
    galleryPath: '/projects/data-management/data-management-project-2/gallery/'
  },
  'data-management-project-3': {
    name: 'Climate Data Explorer',
    category: 'data-management',
    description: 'Multi-source climate and weather data aggregation tool for site analysis and passive design decisions',
    year: '2023',
    type: 'data-explorer',
    technologies: ['Python', 'Pandas', 'Plotly', 'ERA5 API', 'SQLite'],
    tags: ['climate', 'weather', 'site-analysis', 'passive-design'],
    thumbnailPath: '/projects/data-management/data-management-project-3/thumbnail/',
    appEmbeddingPath: '/projects/data-management/data-management-project-3/app-embedding/',
    galleryPath: '/projects/data-management/data-management-project-3/gallery/'
  },
  'data-management-project-4': {
    name: 'Construction Cost Tracker',
    category: 'data-management',
    description: 'Real-time cost management system linking BIM quantity takeoffs to live supplier pricing databases',
    year: '2024',
    type: 'management-system',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'REST APIs'],
    tags: ['cost', 'construction', 'BIM', 'real-time'],
    thumbnailPath: '/projects/data-management/data-management-project-4/thumbnail/',
    appEmbeddingPath: '/projects/data-management/data-management-project-4/app-embedding/',
    galleryPath: '/projects/data-management/data-management-project-4/gallery/'
  },
  'data-management-project-5': {
    name: 'Sensor Network Monitor',
    category: 'data-management',
    description: 'IoT sensor network management platform for monitoring interior environmental conditions across multiple buildings',
    year: '2024',
    type: 'iot-platform',
    technologies: ['MQTT', 'InfluxDB', 'Grafana', 'Python', 'Raspberry Pi'],
    tags: ['IoT', 'sensors', 'monitoring', 'environment'],
    thumbnailPath: '/projects/data-management/data-management-project-5/thumbnail/',
    appEmbeddingPath: '/projects/data-management/data-management-project-5/app-embedding/',
    galleryPath: '/projects/data-management/data-management-project-5/gallery/'
  },
  'data-management-project-6': {
    name: 'Project Data Catalog',
    category: 'data-management',
    description: 'Structured metadata catalog and search system for architecture office project archives',
    year: '2025',
    type: 'data-catalog',
    technologies: ['ElasticSearch', 'Python', 'FastAPI', 'Vue.js'],
    tags: ['catalog', 'metadata', 'search', 'archive'],
    thumbnailPath: '/projects/data-management/data-management-project-6/thumbnail/',
    appEmbeddingPath: '/projects/data-management/data-management-project-6/app-embedding/',
    galleryPath: '/projects/data-management/data-management-project-6/gallery/'
  },

  // ===== ARCHITECTURE PROJECTS (10) =====
  'architecture-project-1': {
    name: 'Floating Research Pod',
    category: 'architecture',
    description: 'A futuristic floating research facility designed for marine biology studies',
    year: '2024',
    location: 'Conceptual',
    type: 'research-facility',
    tags: ['floating', 'marine', 'research', 'sustainable'],
    thumbnailPath: '/projects/architecture/architecture-project-1/thumbnail/',
    speckleModelPath: '/projects/architecture/architecture-project-1/speckle-model/',
    galleryPath: '/projects/architecture/architecture-project-1/gallery/',
    speckleResource: {
      embedUrl: 'https://app.speckle.systems/projects/786043c70b/models/572134268c#savedView=%7B%22id%22%3A%22f51552dea5%22%7D',
      streamId: '786043c70b',
      modelId: '572134268c'
    }
  },
  'architecture-project-2': {
    name: 'Desert Retreat Center',
    category: 'architecture',
    description: 'Sustainable desert architecture integrating passive cooling strategies',
    year: '2024',
    location: 'Morocco',
    type: 'retreat-center',
    tags: ['desert', 'sustainable', 'passive-cooling', 'retreat'],
    thumbnailPath: '/projects/architecture/architecture-project-2/thumbnail/',
    speckleModelPath: '/projects/architecture/architecture-project-2/speckle-model/',
    galleryPath: '/projects/architecture/architecture-project-2/gallery/',
    speckleResource: {
      streamId: 'defd4b8a79',
      objectId: '2b4e93bd32'
    }
  },
  'architecture-project-3': {
    name: 'Cliffside Observatory',
    category: 'architecture',
    description: 'Minimalist observatory pavilion carved into natural cliff formations',
    year: '2023',
    location: 'Norway',
    type: 'observatory',
    tags: ['cliffside', 'minimalist', 'natural', 'observatory'],
    thumbnailPath: '/projects/architecture/architecture-project-3/thumbnail/',
    speckleModelPath: '/projects/architecture/architecture-project-3/speckle-model/',
    galleryPath: '/projects/architecture/architecture-project-3/gallery/',
    speckleResource: {
      streamId: 'abc123xyz456'
    }
  },
  'architecture-project-4': {
    name: 'Urban Canopy System',
    category: 'architecture',
    description: 'Adaptive urban shelter system responding to environmental conditions',
    year: '2024',
    location: 'Barcelona',
    type: 'urban-infrastructure',
    tags: ['urban', 'adaptive', 'canopy', 'responsive'],
    thumbnailPath: '/projects/architecture/architecture-project-4/thumbnail/',
    speckleModelPath: '/projects/architecture/architecture-project-4/speckle-model/',
    galleryPath: '/projects/architecture/architecture-project-4/gallery/',
    speckleResource: {
      streamId: 'urban-canopy-2024'
    }
  },
  'architecture-project-5': {
    name: 'Biomimetic Tower',
    category: 'architecture',
    description: 'High-rise inspired by natural growth patterns and structural efficiency',
    year: '2024',
    location: 'Singapore',
    type: 'high-rise',
    tags: ['biomimetic', 'tower', 'growth-patterns', 'efficiency'],
    thumbnailPath: '/projects/architecture/architecture-project-5/thumbnail/',
    speckleModelPath: '/projects/architecture/architecture-project-5/speckle-model/',
    galleryPath: '/projects/architecture/architecture-project-5/gallery/',
    speckleResource: {
      streamId: 'biomimetic-tower-sg'
    }
  },
  'architecture-project-6': {
    name: 'Automotora Autocastillo La Serena',
    category: 'architecture',
    description: 'Coastal research station adapting to tidal movements and sea level changes',
    year: '2024-25',
    location: 'La Serena, Coquimbo, Chile',
    type: 'Serviteca y Bodega Automotriz',
    tags: ['tidal', 'coastal', 'adaptive', 'research'],
    thumbnailPath: '/projects/architecture/architecture-project-6/thumbnail/',
    speckleModelPath: '/projects/architecture/architecture-project-6/speckle-model/',
    galleryPath: '/projects/architecture/architecture-project-6/gallery/',
    speckleResource: {
      embedUrl: 'https://app.speckle.systems/projects/786043c70b/models/d2b690d6a0#savedView=%7B%22id%22%3A%22efeda832c8%22%7D',
      streamId: '786043c70b',
      modelId: 'd2b690d6a0'
    }
  },
  'architecture-project-7': {
    name: 'Molagros del Cerro Grande, Etapa 2',
    category: 'architecture',
    description: 'Elevated walkway system for rainforest research and ecotourism',
    year: '2022',
    location: 'El Milagro, La Serena, Chile.',
    type: 'bridge-structure',
    tags: ['forest', 'canopy', 'bridge', 'ecotourism'],
    thumbnailPath: '/projects/architecture/architecture-project-7/thumbnail/',
    speckleModelPath: '/projects/architecture/architecture-project-7/speckle-model/',
    galleryPath: '/projects/architecture/architecture-project-7/gallery/',
    speckleResource: {
      embedUrl: 'https://app.speckle.systems/projects/786043c70b/models/38fada468a#savedView=%7B%22id%22%3A%22bf553db417%22%7D',
      streamId: '786043c70b',
      modelId: '38fada468a'
    }
  },
  'architecture-project-8': {
    name: 'Glacier Monitoring Hub',
    category: 'architecture',
    description: 'Arctic research facility designed for extreme weather conditions',
    year: '2023',
    location: 'Greenland',
    type: 'research-facility',
    tags: ['arctic', 'glacier', 'monitoring', 'extreme-weather'],
    thumbnailPath: '/projects/architecture/architecture-project-8/thumbnail/',
    speckleModelPath: '/projects/architecture/architecture-project-8/speckle-model/',
    galleryPath: '/projects/architecture/architecture-project-8/gallery/',
    speckleResource: {
      streamId: 'glacier-hub-gl'
    }
  },
  'architecture-project-9': {
    name: 'Café La Taza',
    category: 'architecture',
    description: 'Subterranean botanical research center with controlled environments',
    year: '2025',
    location: 'Iceland',
    type: 'botanical-center',
    tags: ['underground', 'botanical', 'controlled-environment', 'research'],
    thumbnailPath: '/projects/architecture/architecture-project-9/thumbnail/',
    speckleModelPath: '/projects/architecture/architecture-project-9/speckle-model/',
    galleryPath: '/projects/architecture/architecture-project-9/gallery/',
    speckleResource: {
      embedUrl: 'https://app.speckle.systems/projects/786043c70b/models/3faf3dd5f3#savedView=%7B%22id%22%3A%22533de600c0%22%7D',
      streamId: '786043c70b',
      modelId: '3faf3dd5f3'
    }
  },
  'architecture-project-10': {
    name: 'Floating Solar Farm Hub',
    category: 'architecture',
    description: 'Offshore renewable energy platform with research and maintenance facilities',
    year: '2024',
    location: 'North Sea',
    type: 'energy-infrastructure',
    tags: ['floating', 'solar', 'renewable', 'offshore'],
    thumbnailPath: '/projects/architecture/architecture-project-10/thumbnail/',
    speckleModelPath: '/projects/architecture/architecture-project-10/speckle-model/',
    galleryPath: '/projects/architecture/architecture-project-10/gallery/',
    speckleResource: {
      streamId: 'solar-farm-hub-ns'
    }
  }
}
