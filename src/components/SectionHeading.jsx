function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <span className="text-sm font-medium uppercase tracking-[0.3em] text-sky-200/80">
        {label}
      </span>
      <h2 className="mt-3 bg-linear-to-r from-white via-slate-200 to-sky-300 bg-clip-text text-4xl font-bold text-transparent drop-shadow-[0_0_20px_rgba(186,230,253,0.3)] sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-slate-400">{subtitle}</p>}
    </div>
  )
}

export default SectionHeading