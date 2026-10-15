import { useState } from 'react'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const filters = ['All', 'Web', 'ML', 'Electronics', 'Software']

function Projects() {
  const [active, setActive] = useState('All')

  // Keep only the projects that match the selected filter
  const visible =
    active === 'All' ? projects : projects.filter((p) => p.categories.includes(active))

  const featured = visible.find((p) => p.featured)
  const others = visible.filter((p) => !p.featured)

  return (
    <section id="projects" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Projects"
          title="Things I've Built"
          subtitle="From a hackathon AI system to client websites and machine learning models."
        />

        {/* Filter buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              aria-pressed={active === filter}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition active:scale-95 ${
                active === filter
                  ? 'border-sky-200/70 bg-sky-200/15 text-white shadow-[0_0_16px_rgba(125,211,252,0.35)]'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-sky-200/40 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Featured project */}
        {featured && (
          <div className="mb-6">
            <ProjectCard project={featured} featured />
          </div>
        )}

        {/* Other projects */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {others.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects