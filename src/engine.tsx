import { useEffect, useRef, useState } from 'react';
import type { ReactNode, CSSProperties } from 'react';

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
/** opacity window: fades in before a, out after b */
export const win = (p: number, a: number, b: number, f = 0.04) => Math.min(seg(p, a - f, a), 1 - seg(p, b, b + f));
export const RM = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const rnd = (seed: number) => { const x = Math.sin(seed * 9301 + 49297) * 233280; return x - Math.floor(x); };

// One shared RAF and scroll subscription for every pinned scene.
const sceneSubscribers = new Set<() => void>();
let sceneFrame = 0;
function scheduleSceneFrame() {
  if (sceneFrame) return;
  sceneFrame = requestAnimationFrame(() => {
    sceneFrame = 0;
    sceneSubscribers.forEach(update => update());
  });
}
function subscribeScene(update: () => void) {
  sceneSubscribers.add(update);
  if (sceneSubscribers.size === 1) {
    window.addEventListener('scroll', scheduleSceneFrame, { passive: true });
    window.addEventListener('resize', scheduleSceneFrame);
  }
  scheduleSceneFrame();
  return () => {
    sceneSubscribers.delete(update);
    if (sceneSubscribers.size === 0) {
      window.removeEventListener('scroll', scheduleSceneFrame);
      window.removeEventListener('resize', scheduleSceneFrame);
      if (sceneFrame) cancelAnimationFrame(sceneFrame);
      sceneFrame = 0;
    }
  };
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const ORDINALS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
function sceneFolio(label: string) {
  const chapter = label.match(/^Chapter (one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve):\s*(.+)$/i);
  if (chapter) {
    const index = ORDINALS.indexOf(chapter[1].toLowerCase());
    return { number: ROMAN[index], title: chapter[2] };
  }
  if (/final scene/i.test(label)) return { number: 'XIII', title: 'The epilogue' };
  if (/^the end$/i.test(label)) return { number: '✦', title: 'Coda' };
  return { number: '✦', title: label };
}
function SceneFolio({ label }: { label: string }) {
  const meta = sceneFolio(label);
  return (
    <div className="scene-folio absolute left-4 top-4 z-10 flex items-center" aria-hidden="true">
      <span className="scene-folio-number font-serif">{meta.number}</span>
      <span className="scene-folio-divider" />
      <span className="scene-folio-title font-serif">{meta.title}</span>
      <span className="scene-folio-spark" aria-hidden="true">✦</span>
    </div>
  );
}

/** Pinned scroll scene: the section is `vh` tall, the painting stays fixed and receives progress 0..1 */
export function Scene({ vh, bg, label, children }: { vh: number; bg?: string; label: string; children: (p: number) => ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [st, setSt] = useState({ p: 0, near: false });
  const nearRef = useRef(false);
  const lastProgress = useRef(-1);
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const near = r.bottom > 0 && r.top < window.innerHeight;
      // Far-away scenes stay asleep; only the entering, active and leaving scene do work.
      if (!near && !nearRef.current) return;
      const total = Math.max(1, r.height - window.innerHeight);
      const p = clamp(-r.top / total);
      if (near === nearRef.current && Math.abs(lastProgress.current - p) < 0.000001) return;
      nearRef.current = near;
      lastProgress.current = p;
      setSt({ p, near });
    };
    return subscribeScene(update);
  }, []);
  return (
    <section ref={ref} aria-label={label} style={{ height: vh + 'vh' }} className="relative">
      <div className="scene-stage sticky top-0 h-screen w-full overflow-hidden" style={{ background: bg }}>
        {st.near && <>{children(st.p)}<SceneFolio label={label} /></>}
      </div>
    </section>
  );
}

export type Cam = { x: number; y: number; z: number; r?: number };
export const camLerp = (a: Cam, b: Cam, t: number): Cam => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t), r: lerp(a.r ?? 0, b.r ?? 0, t) });

/** The camera. Portrait screens get a wider framing so the composition recomposes vertically. */
export function Stage({ cam = { x: 800, y: 450, z: 1 }, defs, children, label, onTop }: { cam?: Cam; defs?: ReactNode; children: ReactNode; label?: string; onTop?: ReactNode }) {
  const k = typeof window !== 'undefined' ? clamp(window.innerWidth / window.innerHeight / (16 / 9), 0.5, 1) : 1;
  const z = cam.z * k;
  const m = RM ? 0.25 : 1;
  const cx = lerp(800, cam.x, m), cy = lerp(450, cam.y, m), zz = lerp(k, z, m);
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label={label}>
      {defs && <defs>{defs}</defs>}
      <g transform={`translate(800 450) rotate(${(cam.r ?? 0) * m}) scale(${zz}) translate(${-cx} ${-cy})`}>{children}</g>
      <rect x="0" y="0" width="1600" height="900" fill="url(#scene-wash)" pointerEvents="none" />
      <rect x="0" y="0" width="1600" height="900" fill="url(#scene-bloom)" pointerEvents="none" />
      {onTop}
    </svg>
  );
}

export function Grad({ id, stops, x2 = 0, y2 = 1 }: { id: string; stops: string[]; x2?: number; y2?: number }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>
      {stops.map((c, i) => <stop key={i} offset={i / (stops.length - 1)} stopColor={c} />)}
    </linearGradient>
  );
}

type CapProps = { o: number; children: ReactNode; pos?: 'top' | 'center' | 'bottom' | 'upper'; size?: 'sm' | 'md' | 'lg' | 'xl'; serif?: boolean; color?: string; glow?: string; style?: CSSProperties };
/** Text placed into the painting with a handwriting-like reveal */
export function Caption({ o, children, pos = 'bottom', size = 'md', serif, color = '#3a2c26', glow = 'rgba(255,248,235,.85)', style }: CapProps) {
  if (o <= 0.001) return null;
  const top = pos === 'top' ? '9%' : pos === 'upper' ? '22%' : pos === 'center' ? '42%' : '76%';
  const fs = { sm: 'clamp(20px,2.4vw,30px)', md: 'clamp(26px,3.4vw,44px)', lg: 'clamp(34px,5vw,68px)', xl: 'clamp(40px,7vw,104px)' }[size];
  const reveal = ease(clamp(o * 1.15));
  return (
    <div className={`story-caption story-caption-${pos} story-caption-${size} pointer-events-none absolute left-0 right-0 flex justify-center px-6 text-center`} style={{ top, ...style }}>
      <p className={`story-caption-text ${serif ? 'font-serif story-caption-literary' : 'font-hand'}`}
        style={{ fontSize: fs, color, lineHeight: 1.15, maxWidth: 900, letterSpacing: serif ? '0.075em' : 0, opacity: Math.min(1, o * 1.4),
          clipPath: `inset(-20% ${(1 - reveal) * 100}% -20% 0)`,
          textShadow: `0 1px 0 rgba(255,248,235,.45), 0 3px 14px rgba(35,24,18,.2), 0 0 18px ${glow}`,
          transform: `translateY(${(1 - o) * 6}px) rotate(${serif ? 0 : -1}deg)`, margin: 0 }}>
        {children}
      </p>
    </div>
  );
}

/** Global SVG filters + paper grain, used by every painting */
export function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <filter id="wob" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="3.5" />
        </filter>
        <filter id="wc" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="8" />
          <feDisplacementMap in="SourceGraphic" scale="8" />
        </filter>
        <filter id="soft"><feGaussianBlur stdDeviation="8" /></filter>
        <radialGradient id="glow"><stop offset="0" stopColor="#fff6d8" stopOpacity=".95" /><stop offset="1" stopColor="#fff6d8" stopOpacity="0" /></radialGradient>
        <radialGradient id="warmglow"><stop offset="0" stopColor="#ffd28a" stopOpacity=".8" /><stop offset="1" stopColor="#ffb060" stopOpacity="0" /></radialGradient>
        <radialGradient id="scene-wash" cx="50%" cy="42%" r="76%">
          <stop offset="0" stopColor="#fff5df" stopOpacity=".11" />
          <stop offset=".52" stopColor="#f7e5c9" stopOpacity=".035" />
          <stop offset="1" stopColor="#263047" stopOpacity=".13" />
        </radialGradient>
        <radialGradient id="scene-bloom" cx="72%" cy="16%" r="72%">
          <stop offset="0" stopColor="#ffe1ae" stopOpacity=".12" />
          <stop offset=".48" stopColor="#f2c995" stopOpacity=".035" />
          <stop offset="1" stopColor="#f2c995" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const grain = `url("data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .36  0 0 0 0 .28  0 0 0 .55 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>')}")`;
export function PaperOverlay() {
  return (
    <>
      <div aria-hidden className="paper-light pointer-events-none fixed inset-0 z-40" />
      <div aria-hidden className="paper-grain pointer-events-none fixed inset-0 z-40" style={{ backgroundImage: grain, mixBlendMode: 'multiply', opacity: 0.065 }} />
      <div aria-hidden className="paper-vignette pointer-events-none fixed inset-0 z-40" style={{ background: 'radial-gradient(ellipse at center, transparent 56%, rgba(60,40,25,.08) 82%, rgba(60,40,25,.18) 100%)' }} />
    </>
  );
}
