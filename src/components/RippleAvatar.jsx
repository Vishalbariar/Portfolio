import { useState } from 'react'
import profile from '../assets/VishalImage.jpeg'

// Style shared by every ripple ring
const ringClass =
  'pointer-events-none absolute inset-0 rounded-full border-2 border-sky-200/60 shadow-[0_0_15px_rgba(186,230,253,0.4)] motion-reduce:hidden'

function RippleAvatar() {
  const [bursts, setBursts] = useState([])

  // On click / tap: send one ripple outward from the photo
  const addBurst = () => {
    const id = performance.now()
    setBursts((prev) => [...prev.slice(-5), id]) // max 6 at once
  }

  // Remove a burst ring once its animation finishes
  const removeBurst = (id) => {
    setBursts((prev) => prev.filter((b) => b !== id))
  }

  return (
    <div className="group relative h-56 w-56 sm:h-72 sm:w-72">
      {/* Spinning glow ring */}
      <div className="absolute -inset-2 animate-orbit rounded-full bg-[conic-gradient(#ffffff,#cbd5e1,#7dd3fc,#e2e8f0,#ffffff)] opacity-70 blur-md transition group-hover:opacity-100 group-hover:blur-lg motion-reduce:animate-none" />

      {/* Hover: 4 rings rippling outward, evenly spaced in time */}
      {[0, 0.45, 0.9, 1.35].map((delay) => (
        <span
          key={delay}
          className={`${ringClass} opacity-0 group-hover:animate-wave`}
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* Click / tap: one-time burst ripples */}
      {bursts.map((id) => (
        <span
          key={id}
          onAnimationEnd={() => removeBurst(id)}
          className={ringClass}
          style={{ animation: 'wave 1.2s ease-out forwards' }}
        />
      ))}

      {/* Photo (no effects on the face) */}
      <div
        onPointerDown={addBurst}
        className="relative h-full w-full cursor-pointer overflow-hidden rounded-full border border-white/20 bg-black/70 transition duration-300 group-hover:scale-105 group-active:scale-95"
      >
        <img
          src={profile}
          alt="Vishal Bariar"
          draggable="false"
          className="h-full w-full object-cover object-[50%_28%]"
        />
      </div>
    </div>
  )
}

export default RippleAvatar