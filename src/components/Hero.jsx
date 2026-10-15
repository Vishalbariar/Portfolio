import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiLeetcode, SiKaggle } from 'react-icons/si'
import RippleAvatar from './RippleAvatar'

const roles = [
  'Full-Stack Developer',
  'Machine Learning Enthusiast',
  'ECE Undergrad at NIET',
  'Problem Solver',
]

const stats = [
  { value: '9.2', label: '2nd Year YGPA' },
  { value: '2', label: 'Internships' },
  { value: '165+', label: 'LeetCode solved' },
  { value: 'SIH', label: '2026 Participant' },
]

const socials = [
  { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/Vishalbariar' },
  { Icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/vishal-bariar-431772349' },
  { Icon: SiLeetcode, label: 'LeetCode', href: 'https://leetcode.com/u/qaAvmg8NQf' },
  { Icon: SiKaggle, label: 'Kaggle', href: 'https://www.kaggle.com/vishalbariar' },
]

// Types a word letter by letter, pauses, deletes it, then moves to the next word
function useTypewriter(words, typeSpeed = 80, deleteSpeed = 40, pause = 1600) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      timeout = setTimeout(() => {
        setDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      }, 300)
    } else {
      timeout = setTimeout(() => {
        setText(current.slice(0, text.length + (deleting ? -1 : 1)))
      }, deleting ? deleteSpeed : typeSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause])

  return text
}

function Hero() {
  const typedRole = useTypewriter(roles)

  return (
    <section id="home" className="flex min-h-screen items-center pb-16 pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
        {/* Text */}
        <div className="relative isolate text-center md:text-left">
          {/* Soft dark halo behind the text, for readability */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-black/50 blur-3xl"
          />

          {/* Availability badge */}
          <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-200 backdrop-blur [animation-delay:100ms]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Open to internships & opportunities
          </span>

          {/* Name */}
          <h1 className="mt-5 animate-fade-up bg-linear-to-r from-white via-slate-200 to-sky-300 bg-clip-text text-5xl font-bold text-transparent drop-shadow-[0_0_25px_rgba(186,230,253,0.45)] [animation-delay:250ms] sm:text-6xl lg:text-7xl">
            Vishal Bariar
          </h1>

          {/* Typing role */}
          <h2 className="mt-4 min-h-[2rem] animate-fade-up text-xl font-semibold text-slate-200 [animation-delay:400ms] sm:text-2xl">
            <span className="sr-only">{roles.join(', ')}</span>
            <span aria-hidden="true">
              {typedRole}
              <span className="ml-1 inline-block h-6 w-0.5 animate-pulse bg-sky-300 align-middle" />
            </span>
          </h2>

          {/* Tagline */}
          <p className="mx-auto mt-6 max-w-lg animate-fade-up leading-relaxed text-slate-300 [animation-delay:550ms] md:mx-0">
            B.Tech ECE student at NIET building full-stack web apps and machine
            learning models, from a YOLO-powered mine rescue system for Smart
            India Hackathon 2026 to responsive websites for real clients.
          </p>

          {/* Stats: each card appears a little after the previous one */}
          <div className="mx-auto mt-8 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4 md:mx-0">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-200/40"
                style={{ animationDelay: `${700 + i * 100}ms` }}
              >
                <p className="text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(186,230,253,0.5)]">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex animate-fade-up flex-col justify-center gap-4 [animation-delay:1100ms] sm:flex-row md:justify-start">
            <a
              href="#projects"
              className="rounded-full bg-linear-to-r from-white via-slate-200 to-sky-200 px-7 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-200/30 transition hover:scale-105 hover:shadow-sky-200/60 active:scale-95"
            >
              View My Work
            </a>
            <a
              href="/Vishal_Bariar_Resume.pdf"
              download
              className="rounded-full border border-white/25 bg-white/5 px-7 py-3 font-semibold text-white backdrop-blur transition hover:scale-105 hover:border-sky-300/60 hover:bg-white/10 active:scale-95"
            >
              Download Resume ↓
            </a>
          </div>

          {/* Social icons */}
          <div className="mt-8 flex animate-fade-up justify-center gap-3 [animation-delay:1250ms] md:justify-start">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-slate-300 backdrop-blur transition hover:-translate-y-1 hover:border-sky-200/60 hover:text-white hover:shadow-[0_0_16px_rgba(125,211,252,0.4)] active:scale-90"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Photo: zooms in from a soft blur */}
        <div className="order-first flex animate-zoom-in justify-center [animation-delay:200ms] md:order-last md:justify-end">
          <RippleAvatar />
        </div>
      </div>
    </section>
  )
}

export default Hero