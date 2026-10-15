import GlassCard from './GlassCard'
import SectionHeading from './SectionHeading'

const skillGroups = [
  {
    icon: '⌨️',
    title: 'Languages',
    skills: ['C++', 'Python', 'C', 'Java', 'JavaScript', 'Verilog'],
    strong: ['C++', 'Python'],
  },
  {
    icon: '🎨',
    title: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Three.js'],
    strong: ['React.js'],
  },
  {
    icon: '🗄️',
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    strong: [],
  },
  {
    icon: '🤖',
    title: 'Machine Learning',
    skills: [
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'NLTK',
      'OpenCV',
      'YOLO11',
      'NLP',
      'Computer Vision',
    ],
    strong: ['Scikit-learn', 'YOLO11'],
    wide: true,
  },
  {
    icon: '🧠',
    title: 'CS Core',
    skills: [
      'Data Structures & Algorithms',
      'OOP',
      'Operating Systems',
      'DBMS',
      'Computer Networks',
    ],
    strong: ['Data Structures & Algorithms'],
  },
  {
    icon: '🔌',
    title: 'Embedded & EDA',
    skills: [
      'Raspberry Pi',
      'Arduino Uno',
      'STM32',
      'Keil',
      'Proteus',
      'Vivado',
      'KiCad',
      'CST Studio Suite',
    ],
    strong: ['Raspberry Pi'],
    wide: true,
  },
  {
    icon: '🛠️',
    title: 'Tools & Cloud',
    skills: [
      'Git',
      'GitHub',
      'Oracle Cloud (OCI)',
      'VS Code',
      'MS Excel',
      'MS Word',
      'MS PowerPoint',
    ],
    strong: ['Git'],
  },
]

function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Skills"
          title="What I Work With"
          subtitle="From full-stack web apps to ML models and circuits. Glowing chips mark my strongest tools."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <GlassCard key={group.title} className={group.wide ? 'lg:col-span-2' : ''}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
                  {group.icon}
                </span>
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const isStrong = group.strong.includes(skill)

                  return (
                    <li
                      key={skill}
                      className={`rounded-full border px-3 py-1 text-sm transition duration-300 hover:-translate-y-0.5 ${
                        isStrong
                          ? 'border-sky-200/60 bg-sky-200/10 font-medium text-white shadow-[0_0_14px_rgba(125,211,252,0.35)]'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:border-sky-200/50 hover:text-white hover:shadow-[0_0_12px_rgba(125,211,252,0.3)]'
                      }`}
                    >
                      {skill}
                    </li>
                  )
                })}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills