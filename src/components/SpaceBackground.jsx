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
    float t = uTime * 0.08;

    // Parallax: gas moves opposite to the pointer, up when scrolling,
    // and slowly drifts downward (light falling toward you)
    vec2 gp = p + uPointer * 0.08 - vec2(0.0, uScrollMove * 0.35) + vec2(0.0, t * 0.6);

    // Desktop (wide screen): light behind the avatar on the right
    // Phone (tall screen): light at the top centre, above the avatar
    float sideX = uAspect > 1.0 ? uAspect * 0.25 : 0.0;
    vec2 source = vec2(sideX + uPointer.x * 0.25, 0.6 + uPointer.y * 0.06);
    vec2 d = p - source;
    float dist = length(d);
    float angle = atan(d.x, -d.y) + sin(uTime * 0.25) * 0.08; // rays sway

    float pulse = 0.85 + 0.15 * sin(uTime * 0.9); // breathing glow

    vec3 cyan    = vec3(0.10, 0.70, 1.00);
    vec3 magenta = vec3(0.85, 0.20, 0.95);
    vec3 orange  = vec3(1.00, 0.45, 0.12);
    vec3 warm    = vec3(1.00, 0.93, 0.80);

    // 1. Swirling nebula gas
    vec2 q = vec2(fbm(gp * 2.0 + t), fbm(gp * 2.0 - t + 5.2));
    float gas = fbm(gp * 2.5 + q * 1.8 + t * 0.6);

    vec3 gasColor = mix(cyan, magenta, smoothstep(0.3, 0.7, q.x));
    gasColor = mix(gasColor, orange, smoothstep(0.55, 0.8, q.y));
    float density = smoothstep(0.4, 0.85, gas);
    float lit = exp(-dist * 1.3);
    vec3 col = gasColor * density * (0.2 + 1.4 * lit * pulse);

    // 2. Light rays pouring down (shimmering)
    float rays = fbm(vec2(angle * 9.0, uTime * 0.3));
    rays = pow(rays, 3.0) * 4.0;
    float cone = smoothstep(1.4, 0.1, abs(angle));
    col += warm * rays * cone * exp(-dist * 1.1) * 0.45 * pulse;

    // 3. Brilliant glowing core (breathing)
    col += warm * exp(-dist * 7.0) * 2.0 * pulse;
    col += magenta * exp(-dist * 2.5) * 0.25;
    col += cyan * exp(-dist * 4.0) * 0.2;

    // Dim as the user scrolls down
    col *= 1.0 - uScroll * 0.55;

    // Tone mapping: soft glow instead of flat white
    col = 1.0 - exp(-col * 1.5);

    gl_FragColor = vec4(col, 1.0);
  }
`

/* ---------- REACT COMPONENTS ---------- */

function CosmicLight() {
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

    // Smoothly follow the pointer
    u.uPointer.value.x = MathUtils.lerp(u.uPointer.value.x, state.pointer.x, 0.05)
    u.uPointer.value.y = MathUtils.lerp(u.uPointer.value.y, state.pointer.y, 0.05)

    // Scroll: dimming (capped at 1) and smooth parallax movement
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

      {/* Light dust drifting toward you, near the light */}
      <Sparkles count={100} scale={[12, 6, 6]} position={[0, 3, 2]} size={4} speed={0.5} color="#fff7e0" />

      {/* Coloured glowing particles */}
      <Sparkles count={70} scale={[20, 12, 6]} size={6} speed={0.3} color="#7dd3fc" />
      <Sparkles count={50} scale={[20, 12, 6]} size={7} speed={0.25} color="#e879f9" />
      <Sparkles count={50} scale={[20, 12, 6]} size={5} speed={0.35} color="#fdba74" />
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
        <CosmicLight />
        <StarField />
      </Canvas>
    </div>
  )
}

export default SpaceBackground