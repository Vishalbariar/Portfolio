import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-4 z-50 animate-fade-down px-4">
      {/* Floating glass pill */}
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/15 bg-white/5 py-2 pl-6 pr-2 shadow-[0_0_30px_rgba(186,230,253,0.08)] backdrop-blur-xl">
        {/* Logo */}
        <a
          href="#home"
          className="bg-linear-to-r from-white via-slate-200 to-sky-300 bg-clip-text text-lg font-bold text-transparent"
        >
          Vishal Bariar
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white active:scale-95"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA button */}
        <a
          href="#contact"
          className="hidden rounded-full bg-linear-to-r from-white via-slate-200 to-sky-200 px-5 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-sky-200/20 transition hover:shadow-sky-200/50 active:scale-95 md:inline-block"
        >
          Hire Me
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-200 transition hover:bg-white/10 active:scale-90 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu: a glass card below the pill */}
      {isOpen && (
        <ul className="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-3xl border border-white/15 bg-black/70 p-3 backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl px-4 py-3 text-slate-200 transition hover:bg-white/10 hover:text-white active:bg-white/20"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-1 block rounded-2xl bg-linear-to-r from-white via-slate-200 to-sky-200 px-4 py-3 text-center font-semibold text-slate-950 active:scale-95"
            >
              Hire Me
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}

export default Navbar