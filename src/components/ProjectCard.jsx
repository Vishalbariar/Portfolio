import { useRef } from 'react'

function ProjectCard({ project, featured = false }) {
  const cardRef = useRef()

  // Tilt the card toward the cursor and move the spotlight
  const handleMove = (e) => {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width // 0 (left) → 1 (right)
    const y = (e.clientY - rect.top) / rect.height // 0 (top) → 1 (bottom)
    const tilt = featured ? 4 : 8 // big card tilts less

    card.style.transform = `rotateX(${(0.5 - y) * tilt}deg) rotateY(${(x - 0.5) * tilt}deg)`
    card.style.setProperty('--x', `${x * 100}%`)
    card.style.setProperty('--y', `${y * 100}%`)
  }

  const handleLeave = () => {
    cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div className="h-full [perspective:1000px]">
      <article
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-200 ease-out hover:border-sky-200/40 hover:shadow-[0_0_40px_rgba(125,211,252,0.15)] sm:p-8"
      >
        {/* Spotlight that follows the cursor */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(186, 230, 253, 0.12), transparent 60%)',
          }}
        />

        {/* Glowing top edge */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-sky-200/60 to-transparent" />

        <div className="relative">
          {/* Icon + badge */}
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
              {project.icon}
            </span>
            <span className="rounded-full border border-sky-200/30 bg-sky-200/10 px-3 py-1 text-xs font-medium text-sky-100">
              {project.badge}
            </span>
          </div>

          {/* Title + description */}
          <h3 className={`mt-5 font-semibold text-white ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            {project.title}
          </h3>
          <p className={`mt-3 leading-relaxed text-slate-300 ${featured ? 'max-w-3xl' : 'text-sm'}`}>
            {project.description}
          </p>

          {/* Key numbers */}
          {project.stats?.length > 0 && (
            <div className={`mt-5 grid grid-cols-2 gap-3 ${featured ? 'sm:grid-cols-3 sm:max-w-xl' : ''}`}>
              {project.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  <p className="text-lg font-bold text-white drop-shadow-[0_0_10px_rgba(186,230,253,0.5)]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tech tags */}
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                {tag}
              </li>
            ))}
          </ul>

          {/* Links (only shown if you add them in projects.js) */}
          {(project.github || project.live) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-white transition hover:border-sky-200/60 hover:bg-white/10 active:scale-95"
                >
                  GitHub ↗
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-linear-to-r from-white via-slate-200 to-sky-200 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:shadow-[0_0_16px_rgba(186,230,253,0.5)] active:scale-95"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

export default ProjectCard