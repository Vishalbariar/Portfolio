function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 px-4 py-8 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-slate-400 sm:flex-row">
        <p>© {new Date().getFullYear()} Vishal Bariar. All rights reserved.</p>
        <p>Built with React, Tailwind CSS and Three.js</p>
      </div>
    </footer>
  )
}

export default Footer