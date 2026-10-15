export const projects = [
  {
    title: 'MARS: Mine Rescue AI System',
    icon: '⛏️',
    badge: 'Smart India Hackathon 2026',
    categories: ['ML', 'Electronics', 'Web'],
    featured: true,
    description:
      'An AI system that helps rescue teams in mines by detecting people, fire, smoke and vehicles. I fine-tuned a YOLO11n model on 12,440 labelled images across 6 classes, deployed it on a Raspberry Pi, and built a web dashboard that fetches live data from the Pi.',
    stats: [
      { value: '82.2%', label: 'mAP50' },
      { value: '81.3%', label: 'Precision' },
      { value: '12,440', label: 'Training images' },
    ],
    tags: ['YOLO11', 'Python', 'Raspberry Pi', 'HTML', 'CSS', 'JavaScript'],
    github: '',
    live: '',
  },
  {
    title: 'Sakthi Dental Clinic Website',
    icon: '🦷',
    badge: 'Internship · ShadowFox',
    categories: ['Web'],
    description:
      'A responsive multi-page website for a real dental clinic client: Home, About, Treatments, FAQ and Contact pages, with a contact form that validates required fields and email format.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    github: '',
    live: '',
  },
  {
    title: 'Customer Churn Prediction',
    icon: '📉',
    badge: 'Internship · CodSoft',
    categories: ['ML'],
    description:
      'Predicts which bank customers are likely to leave. I compared 6 models on 10,000 customers, and Gradient Boosting performed best.',
    stats: [
      { value: '86.7%', label: 'Accuracy' },
      { value: '6', label: 'Models compared' },
    ],
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Gradient Boosting'],
    github: '',
    live: '',
  },
  {
    title: 'Credit Card Fraud Detection',
    icon: '💳',
    badge: 'Internship · CodSoft',
    categories: ['ML'],
    description:
      'Detects fraud in 1.85 million transactions where only 0.5% were fraudulent. I engineered new features from date and time columns to catch the rare fraud cases.',
    stats: [
      { value: '0.82', label: 'F1 on fraud' },
      { value: '1.85M', label: 'Transactions' },
    ],
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Feature Engineering'],
    github: '',
    live: '',
  },
  {
    title: 'Movie Genre Classifier',
    icon: '🎬',
    badge: 'Internship · CodSoft',
    categories: ['ML'],
    description:
      'Classifies movie plots into 27 genres using natural language processing, trained on more than 54,000 plot summaries.',
    stats: [
      { value: '54K+', label: 'Plots' },
      { value: '27', label: 'Genres' },
    ],
    tags: ['Python', 'NLTK', 'TF-IDF', 'Naive Bayes'],
    github: '',
    live: '',
  },
  {
    title: 'DRA-Based MIMO Antenna',
    icon: '📡',
    badge: 'Ongoing',
    categories: ['Electronics'],
    description:
      'Designing a dielectric resonator antenna based MIMO system and analysing its S-parameters, gain, bandwidth and isolation.',
    tags: ['CST Studio Suite', 'KiCad', 'Antenna Design'],
    github: '',
    live: '',
  },
  {
    title: 'Shopping Kart',
    icon: '🛒',
    badge: 'Python · OOP',
    categories: ['Software'],
    description:
      'A console shopping cart app built with Product, Cart, User and Order classes, applying encapsulation, inheritance and polymorphism.',
    tags: ['Python', 'OOP'],
    github: '',
    live: '',
  },
  {
    title: 'Cosmic Portfolio',
    icon: '🌌',
    badge: 'This website',
    categories: ['Web'],
    description:
      "The site you're on: a responsive React portfolio with a real-time WebGL shader background, 3D stars and interactive touch effects.",
    tags: ['React', 'Tailwind CSS', 'Three.js', 'GLSL'],
    github: '',
    live: '',
  },
]