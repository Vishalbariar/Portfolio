import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'
import { MathUtils, Vector2 } from 'three'

/* ---------- SHADERS (run on the graphics card) ---------- */

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// Calm, professional space: deep navy, faint haze, two soft glows
const fragmentShader = `
  uniform float uTime;
  uniform float uAspect;
  uniform vec2 uPointer;
  uniform float uScroll;
  uniform float uScrollMove;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
    float t = uTime * 0.03;

    // 1. Base: deep navy at the top, fading to black at the bottom
    vec3 col = mix(vec3(0.0, 0.0, 0.01), vec3(0.02, 0.04, 0.08), vUv.y);

    // 2. Very faint drifting haze (moves with pointer and scroll)
    vec2 gp = p * 1.5 + uPointer * 0.05 - vec2(0.0, uScrollMove * 0.3);
    vec2 q = vec2(fbm(gp + t), fbm(gp - t + 4.0));
    float haze = fbm(gp + q * 1.2 + t * 0.5);
    col += vec3(0.25, 0.4, 0.6) * smoothstep(0.45, 0.9, haze) * 0.12;

    // 3. Two soft glows that drift slowly and lean toward the pointer
    vec2 g1 = vec2(-0.45 * uAspect + sin(t * 2.0) * 0.1, 0.35) + uPointer * 0.06;
    vec2 g2 = vec2(0.45 * uAspect + cos(t * 1.7) * 0.1, -0.1) + uPointer * 0.04;
    col += vec3(0.35, 0.55, 0.85) * exp(-length(p - g1) * 3.0) * 0.18;
    col += vec3(0.55, 0.65, 0.85) * exp(-length(p - g2) * 3.5) * 0.10;

    // 4. Darker edges (vignette) and slight dimming on scroll
    col *= smoothstep(1.6, 0.2, length(p));
    col *= 1.0 - uScroll * 0.3;

    gl_FragColor = vec4(col, 1.0);
  }
`

/* ---------- REACT COMPONENTS ---------- */

function CalmSpace() {
  const materialRef = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uPointer: { value: new Vector2(0, 0) },
      uScroll: { value: 0 },
      uScrollMove: { value: 0 },
    }),
    []
  )

  useFrame((state) => {
    const u = materialRef.current.uniforms
    const scrollAmount = window.scrollY / window.innerHeight

    u.uTime.value = state.clock.elapsedTime
    u.uAspect.value = state.size.width / state.size.height
    u.uPointer.value.x = MathUtils.lerp(u.uPointer.value.x, state.pointer.x, 0.05)
    u.uPointer.value.y = MathUtils.lerp(u.uPointer.value.y, state.pointer.y, 0.05)
    u.uScroll.value = Math.min(scrollAmount, 1)
    u.uScrollMove.value = MathUtils.lerp(u.uScrollMove.value, scrollAmount, 0.1)
  })

  return (
    <mesh renderOrder={-1} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

function StarField() {
  const tiltRef = useRef()
  const spinRef = useRef()

  useFrame((state, delta) => {
    spinRef.current.rotation.y += delta * 0.03

    const scrollTilt = window.scrollY * 0.0004
    tiltRef.current.rotation.x = MathUtils.lerp(tiltRef.current.rotation.x, state.pointer.y * 0.2 + scrollTilt, 0.05)
    tiltRef.current.rotation.y = MathUtils.lerp(tiltRef.current.rotation.y, state.pointer.x * 0.2, 0.05)
  })

  return (
    <group ref={tiltRef}>
      <group ref={spinRef}>
        <Stars radius={80} depth={60} count={5000} factor={4} saturation={0} fade speed={1.5} />
      </group>

      {/* Silver and soft-blue sparkles (matching the site's colours) */}
      <Sparkles count={70} scale={[20, 12, 6]} size={4} speed={0.25} color="#e2e8f0" />
      <Sparkles count={40} scale={[20, 12, 6]} size={5} speed={0.3} color="#7dd3fc" />
    </group>
  )
}

function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
      >
        <CalmSpace />
        <StarField />
      </Canvas>
    </div>
  )
}

export default SpaceBackground