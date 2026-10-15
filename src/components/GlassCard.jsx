function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`group relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-200/40 hover:bg-white/8 hover:shadow-[0_0_40px_rgba(125,211,252,0.15)] active:scale-[0.98] ${className}`}
    >
      {/* Glowing line along the top edge */}
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-sky-200/60 to-transparent transition-opacity duration-300 group-hover:via-sky-200" />
      {children}
    </div>
  )
}

export default GlassCard