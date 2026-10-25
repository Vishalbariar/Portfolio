import { FiCode, FiTarget, FiCloud, FiLayers } from 'react-icons/fi'
import GlassCard from './GlassCard'
import SectionHeading from './SectionHeading'

const focusAreas = [
  {
    Icon: FiCode,
    title: 'Software Development',
    text: 'Building clean, reliable applications from idea to working product.',
  },
  {
    Icon: FiTarget,
    title: 'DSA & Problem Solving',
    text: 'Sharpening logic and efficiency with data structures and algorithms.',
  },
  {
    Icon: FiCloud,
    title: 'Cloud Computing',
    text: 'Learning how modern applications are deployed and scaled.',
  },
  {
    Icon: FiLayers,
    title: 'System Design',
    text: 'Especially Low-Level Design: how scalable systems are structured.',
  },
]

const education = [
  {
    level: 'B.Tech',
    place: 'Noida Institute of Engineering and Technology',
    detail: 'Electronics and Communication Engineering · 2024 – 2028',
  },
  {
    level: 'Class XII',
    place: 'Himalayan Residential School, Patna',
    detail: 'Completed 2023',
  },
  {
    level: 'Class X',
    place: "St. Paul's High School",
    detail: 'Completed 2021',
  },
]

function About() {
  return (
    <section id="about" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="01"
          label="About me"
          title="Who I Am"
          subtitle="Software engineer in the making, with a soft spot for electronics."
        />

        <div className="grid gap-6 md:grid-cols-5">
          {/* Main bio */}
          <GlassCard className="md:col-span-3">
            <h3 className="text-xl font-semibold text-white">Aspiring Software Engineer</h3>

            <p className="mt-4 leading-relaxed text-slate-300">
              I love problem-solving and exploring emerging technologies. I'm
              proficient in C++ and Python, with working knowledge of C and Java,
              and I've built several Machine Learning models that gave me hands-on
              experience with data-driven, analytical thinking.
            </p>

            <p className="mt-4 leading-relaxed text-slate-300">
              I'm fascinated by how scalable systems are built, and I keep
              strengthening my core Computer Science foundations: Operating
              Systems, Computer Networks and DBMS. I'm also building for the web
              with React, Tailwind CSS and Three.js, including this portfolio.
            </p>

            <p className="mt-4 leading-relaxed text-slate-300">
              Beyond software, I enjoy electronics and embedded systems, from
              Verilog, microprocessors and Arduino to antenna design and
              simulation.
            </p>
          </GlassCard>

          {/* Side cards */}
          <div className="flex flex-col gap-6 md:col-span-2">
            <GlassCard className="flex-1">
              <p className="text-xs font-medium uppercase tracking-widest text-sky-200/80">
                Currently building
              </p>
              <h4 className="mt-2 font-semibold text-white">DRA-based MIMO Antenna</h4>
              <p className="mt-2 text-sm text-slate-400">
                Designing a dielectric resonator antenna, with plans to bring
                Machine Learning into the design process.
              </p>
            </GlassCard>

            <GlassCard className="flex-1">
              <p className="text-xs font-medium uppercase tracking-widest text-sky-200/80">
                Beyond tech
              </p>
              <p className="mt-2 text-sm text-slate-400">
                I sharpen my communication through books, novels and movies,
                because great engineers also explain their ideas clearly.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* Education timeline */}
        <GlassCard className="mt-6">
          <p className="text-xs font-medium uppercase tracking-widest text-sky-200/80">
            Education
          </p>

          <div className="relative mt-6">
            {/* Line of light: vertical on phones, horizontal on desktop */}
            <div className="pointer-events-none absolute bottom-2 left-[7px] top-2 w-px bg-linear-to-b from-sky-200/70 via-sky-200/30 to-transparent md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto md:bg-linear-to-r" />

            <ol className="grid gap-8 md:grid-cols-3">
              {education.map((item) => (
                <li key={item.level} className="relative pl-8 md:pl-0 md:pt-8">
                  <span className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-sky-200 bg-black shadow-[0_0_12px_rgba(186,230,253,0.8)] md:top-0" />
                  <p className="text-xs font-medium uppercase tracking-widest text-sky-200/80">
                    {item.level}
                  </p>
                  <h4 className="mt-1 font-semibold text-white">{item.place}</h4>
                  <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </GlassCard>

        {/* Focus areas */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area) => (
            <GlassCard key={area.title}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sky-200">
                <area.Icon aria-hidden="true" className="text-xl" />
              </span>
              <h4 className="mt-4 font-semibold text-white">{area.title}</h4>
              <p className="mt-2 text-sm text-slate-400">{area.text}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About