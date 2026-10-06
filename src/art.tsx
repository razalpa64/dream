import type { ReactNode } from 'react';
import { rnd } from './engine';

export const INK = '#3a2c26';

export type Kind = 'razal' | 'julian' | 'girl' | 'boy';
type PP = {
  x: number; y: number; s?: number; kind: Kind; age?: number; walk?: number; flip?: boolean;
  armL?: number; armR?: number; outfit?: string; sit?: boolean; lean?: number; o?: number;
  holdR?: ReactNode; holdL?: ReactNode; cap?: boolean; veil?: boolean; label?: string;
};

/** Hand-drawn character. Feet at (x,y). Arm angles: 0 = hanging, negative = forward. */
export function Person({ x, y, s = 1, kind, age = 0, walk, flip, armL = 6, armR = -6, outfit, sit, lean = 0, o = 1, holdR, holdL, cap, veil, label }: PP) {
  if (o <= 0.01) return null;
  const fem = kind === 'julian' || kind === 'girl';
  const skin = fem ? '#d9a77f' : '#b88461';
  const hair = age > 0.62 ? '#dcd6cc' : age > 0.38 ? '#8a7d74' : fem ? '#2c1d17' : '#221813';
  const cloth = outfit ?? (kind === 'julian' ? '#c97a6d' : kind === 'razal' ? '#5d7b8a' : kind === 'girl' ? '#e0a64f' : '#6f8f5e');
  const pants = kind === 'boy' ? '#4c5a6e' : '#3e3a44';
  const sw = walk !== undefined ? Math.sin(walk) * 24 : 0;
  const stoop = age * 7 + lean;
  const arm = (side: number, ang: number, hold?: ReactNode) => (
    <g transform={`translate(${side * 13} -128) rotate(${ang})`}>
      <path d="M0 0 Q2 24 0 46" stroke={cloth} strokeWidth="8" strokeLinecap="round" fill="none" />
      <circle cy="48" r="4.5" fill={skin} stroke={INK} strokeWidth="1" />
      {hold && <g transform="translate(0 50)">{hold}</g>}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * s} ${s})`} opacity={o} filter="url(#wob)" aria-label={label}>
      <ellipse cx="0" cy="2" rx="26" ry="5" fill="#2a1e18" opacity=".15" />
      {sit ? (
        <g stroke={fem ? skin : pants} strokeWidth={fem ? 6 : 10} strokeLinecap="round" fill="none">
          <path d="M-4 -76 L26 -74 L26 -38" /><path d="M6 -76 L34 -73 L36 -38" />
        </g>
      ) : (
        <g stroke={fem ? skin : pants} strokeWidth={fem ? 6 : 10} strokeLinecap="round">
          <g transform={`translate(-5 -80) rotate(${sw})`}><line x1="0" y1="0" x2="0" y2="76" /><ellipse cx="4" cy="78" rx="8" ry="3.5" fill={INK} stroke="none" /></g>
          <g transform={`translate(5 -80) rotate(${-sw})`}><line x1="0" y1="0" x2="0" y2="76" /><ellipse cx="4" cy="78" rx="8" ry="3.5" fill={INK} stroke="none" /></g>
        </g>
      )}
      <g transform={`translate(0 -80) rotate(${stoop}) translate(0 80)`} className="breathe">
        {arm(-1, armL, holdL)}
        {fem && <path d="M-15 -150 Q-20 -172 0 -168 Q20 -172 16 -150 L19 -116 Q0 -108 -19 -116Z" fill={hair} stroke={INK} strokeWidth="1.2" />}
        {fem ? (
          <path d={sit ? 'M-12 -132 L12 -132 L18 -80 L34 -78 L34 -66 L-14 -68Z' : 'M-12 -132 L12 -132 L27 -60 Q0 -54 -27 -60Z'} fill={cloth} stroke={INK} strokeWidth="1.5" />
        ) : (
          <path d="M-15 -134 L15 -134 L14 -80 L-14 -80Z" fill={cloth} stroke={INK} strokeWidth="1.5" />
        )}
        {veil && <path d="M-16 -160 Q-30 -120 -34 -70 L-14 -74 Q-10 -120 -6 -158Z" fill="#fffaf0" opacity=".75" />}
        <rect x="-3.5" y="-140" width="7" height="8" fill={skin} />
        <circle cx="0" cy="-151" r="14.5" fill={skin} stroke={INK} strokeWidth="1.4" />
        {fem
          ? <path d="M-15 -150 Q-8 -172 10 -166 Q18 -160 15 -148 Q4 -160 -15 -150Z" fill={hair} stroke={INK} strokeWidth="1" />
          : <path d="M-15 -148 Q-14 -170 3 -168 Q17 -166 15 -150 Q6 -160 -15 -148Z" fill={hair} stroke={INK} strokeWidth="1" />}
        {age > 0.6 && fem && <circle cx="-8" cy="-166" r="7" fill={hair} stroke={INK} strokeWidth="1" />}
        <circle cx="5" cy="-152" r="1.4" fill={INK} /><circle cx="11" cy="-152" r="1.3" fill={INK} />
        <circle cx="10" cy="-145" r="3" fill="#e0786a" opacity=".35" />
        <path d="M5 -144 Q8.5 -141 12 -144" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {age > 0.6 && <g stroke={INK} strokeWidth="1" fill="none"><circle cx="5" cy="-152" r="3.5" /><circle cx="12" cy="-152" r="3.5" /></g>}
        {cap && <g><path d="M-18 -166 L4 -174 L24 -166 L2 -159Z" fill="#2d3442" stroke={INK} /><line x1="22" y1="-166" x2="24" y2="-152" stroke="#e1b64a" strokeWidth="1.5" /></g>}
        {arm(1, armR, holdR)}
      </g>
    </g>
  );
}

export const Bouquet = ({ s = 1 }: { s?: number }) => (
  <g transform={`scale(${s})`}>
    <path d="M0 0 L-6 -22 M0 0 L0 -26 M0 0 L7 -22" stroke="#5f7a4c" strokeWidth="2" />
    <circle cx="-7" cy="-26" r="6" fill="#d9766c" /><circle cx="1" cy="-31" r="6.5" fill="#f0c3b5" /><circle cx="8" cy="-25" r="6" fill="#e3a14a" />
    <path d="M-6 -6 L6 -6 L3 6 L-3 6Z" fill="#efe1c4" stroke={INK} strokeWidth=".8" />
  </g>
);
export const Cup = ({ x = 0, y = 0, s = 1, c = '#f4ead8', steam = true }: { x?: number; y?: number; s?: number; c?: string; steam?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {steam && <path className="bob" d="M-3 -16 Q-8 -26 -2 -34 Q4 -42 -1 -52" stroke="#fff" strokeWidth="2" fill="none" opacity=".7" />}
    <path d="M-9 -12 L9 -12 L7 0 L-7 0Z" fill={c} stroke={INK} strokeWidth="1.2" />
    <path d="M9 -9 Q15 -7 8 -3" stroke={INK} fill="none" strokeWidth="1.2" />
  </g>
);

export function Tree({ x, y, s = 1, c = ['#6f8f5c', '#a2b37a', '#4f6f4c'], o = 1, trunk = '#6b4a35' }: { x: number; y: number; s?: number; c?: string[]; o?: number; trunk?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d="M-10 0 Q-6 -60 -4 -110 L4 -110 Q8 -60 12 0Z M0 -80 Q-20 -100 -34 -112 M2 -90 Q22 -110 34 -118" fill={trunk} stroke={trunk} strokeWidth="5" strokeLinecap="round" />
      <g filter="url(#wc)">
        <circle cx="-40" cy="-130" r="52" fill={c[0]} opacity=".85" />
        <circle cx="38" cy="-140" r="56" fill={c[2]} opacity=".8" />
        <circle cx="0" cy="-185" r="60" fill={c[1]} opacity=".85" />
        <circle cx="-10" cy="-140" r="40" fill={c[1]} opacity=".55" />
      </g>
    </g>
  );
}
export const Cloud = ({ x, y, s = 1, o = 0.9, c = '#fffaf0' }: { x: number; y: number; s?: number; o?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o} filter="url(#wc)">
    <ellipse cx="0" cy="0" rx="90" ry="34" fill={c} /><ellipse cx="-50" cy="-14" rx="46" ry="34" fill={c} />
    <ellipse cx="34" cy="-26" rx="56" ry="44" fill={c} /><ellipse cx="80" cy="-4" rx="40" ry="26" fill={c} />
  </g>
);
export function Flower({ x, y, s = 1, c = '#d9766c', b = 1, stem = true }: { x: number; y: number; s?: number; c?: string; b?: number; stem?: boolean }) {
  if (b <= 0.01) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="sway">
        {stem && <path d="M0 0 Q-4 -18 0 -36" stroke="#5f7a4c" strokeWidth="2.2" fill="none" />}
        {stem && <path d="M-1 -16 Q-12 -20 -14 -12 Q-6 -10 -1 -16" fill="#7c9a5e" />}
        <g transform={`translate(0 -38) scale(${b})`}>
          {[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx="0" cy="-7" rx="5" ry="8" fill={c} opacity=".9" transform={`rotate(${a})`} />)}
          <circle r="3.5" fill="#f0c55a" />
        </g>
      </g>
    </g>
  );
}
export const Heart = ({ x, y, s = 1, c = '#c9564b', fill = false, o = 1 }: { x: number; y: number; s?: number; c?: string; fill?: boolean; o?: number }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} opacity={o} d="M0 6 C-4 -4 -18 -6 -16 6 C-14 14 -4 18 0 24 C4 18 14 14 16 6 C18 -6 4 -4 0 6Z" fill={fill ? c : 'none'} stroke={c} strokeWidth={2 / s} strokeLinejoin="round" />
);
export const Star = ({ x, y, s = 1, d = 0, c = '#fff4cf' }: { x: number; y: number; s?: number; d?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><path className="twinkle" style={{ animationDelay: `${d}s` }} d="M0 -8 Q1 -1 8 0 Q1 1 0 8 Q-1 1 -8 0 Q-1 -1 0 -8Z" fill={c} /></g>
);
export function Stars({ n = 60, w = 1600, h = 500, x0 = 0, y0 = 0, seed = 1, c }: { n?: number; w?: number; h?: number; x0?: number; y0?: number; seed?: number; c?: string }) {
  return <g>{Array.from({ length: n }, (_, i) => <Star key={i} x={x0 + rnd(seed + i) * w} y={y0 + rnd(seed + i * 7.3) * h} s={0.4 + rnd(i * 3.1 + seed) * 0.9} d={rnd(i + seed * 2) * 3} c={c} />)}</g>;
}
export const Bird = ({ x, y, s = 1, c = INK }: { x: number; y: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><path className="flap" d="M-12 0 Q-6 -8 0 0 Q6 -8 12 0" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" /></g>
);
export const Birds = ({ y = 160, s = 1, c }: { y?: number; s?: number; c?: string }) => (
  <g className="birdcross"><Bird x={0} y={y} s={s} c={c} /><Bird x={40} y={y - 22} s={s * 0.8} c={c} /><Bird x={70} y={y + 8} s={s * 0.7} c={c} /></g>
);
export const Plane = ({ x, y, s = 1, r = 0, c = '#f7efe1' }: { x: number; y: number; s?: number; r?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} filter="url(#wob)">
    <path d="M-60 0 Q-50 -10 40 -8 Q62 -6 64 0 Q62 6 40 8 Q-50 10 -60 0Z" fill={c} stroke={INK} strokeWidth="2" />
    <path d="M-8 -6 L-30 -40 L-18 -40 L14 -6Z M-8 6 L-26 34 L-14 34 L12 6Z M-52 -2 L-62 -24 L-54 -24 L-40 -4Z" fill={c} stroke={INK} strokeWidth="2" />
    {[0, 1, 2, 3, 4].map(i => <circle key={i} cx={-20 + i * 11} cy="-2" r="2" fill="#7fa0b8" />)}
  </g>
);
export const Moon = ({ x, y, r = 50 }: { x: number; y: number; r?: number }) => (
  <g><circle cx={x} cy={y} r={r * 3} fill="url(#glow)" opacity=".35" /><circle cx={x} cy={y} r={r} fill="#f8eccb" filter="url(#wc)" /><circle cx={x - r * 0.3} cy={y - r * 0.2} r={r * 0.18} fill="#e8d7ad" opacity=".7" /><circle cx={x + r * 0.25} cy={y + r * 0.3} r={r * 0.12} fill="#e8d7ad" opacity=".7" /></g>
);
export const Bench = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#wob)">
    <rect x="-120" y="-92" width="240" height="10" rx="3" fill="#8a5c3c" stroke={INK} /><rect x="-120" y="-76" width="240" height="10" rx="3" fill="#8a5c3c" stroke={INK} />
    <rect x="-126" y="-40" width="252" height="10" rx="3" fill="#9a6a45" stroke={INK} />
    <path d="M-108 -30 L-112 0 M108 -30 L112 0 M-104 -92 L-108 -30 M104 -92 L108 -30" stroke={INK} strokeWidth="5" />
  </g>
);
export const Ring = ({ x, y, s = 1, glow = 1 }: { x: number; y: number; s?: number; glow?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r="40" fill="url(#glow)" opacity={glow} />
    <circle r="9" fill="none" stroke="#e1b64a" strokeWidth="3" /><path d="M-4 -10 L0 -18 L4 -10Z" fill="#eaf6ff" stroke="#9fc3d8" />
    <Star x={10} y={-18} s={0.8} c="#fff" />
  </g>
);
export const Leaf = ({ x, y, s = 1, c = '#d08a3a', r = 0 }: { x: number; y: number; s?: number; c?: string; r?: number }) => (
  <path transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} d="M0 0 Q10 -12 0 -26 Q-10 -12 0 0Z M0 0 L0 -24" fill={c} stroke="#7a4a22" strokeWidth=".8" />
);
export function House({ x, y, s = 1, lit = 1, wall = '#e8d3b0', roof = '#a85a3e' }: { x: number; y: number; s?: number; lit?: number; wall?: string; roof?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#wob)">
      <rect x="-50" y="-60" width="100" height="60" fill={wall} stroke={INK} strokeWidth="1.5" />
      <path d="M-62 -58 L0 -104 L62 -58Z" fill={roof} stroke={INK} strokeWidth="1.5" />
      <rect x="-34" y="-44" width="20" height="18" fill="#ffd68a" opacity={0.25 + lit * 0.75} stroke={INK} />
      <rect x="14" y="-44" width="20" height="18" fill="#ffd68a" opacity={0.25 + lit * 0.75} stroke={INK} />
      <rect x="-9" y="-28" width="18" height="28" fill="#7a5038" stroke={INK} />
      {lit > 0.3 && <circle cx="0" cy="-35" r="80" fill="url(#warmglow)" opacity={lit * 0.35} />}
    </g>
  );
}
export function Particles({ kind, n = 18, seed = 1, w = 1600 }: { kind: 'leaf' | 'petal' | 'snow' | 'rain'; n?: number; seed?: number; w?: number }) {
  return (
    <g>{Array.from({ length: n }, (_, i) => {
      const x = rnd(seed + i * 1.7) * w, dur = kind === 'rain' ? 0.9 + rnd(i) * 0.5 : 8 + rnd(i * 2.3) * 8;
      const style = { animationDuration: `${dur}s`, animationDelay: `${-rnd(i * 5.1 + seed) * dur}s`, ['--dx' as string]: kind === 'rain' ? '-40px' : `${(rnd(i * 4) - 0.3) * 200}px` };
      return (
        <g key={i} transform={`translate(${x} 0)`}><g className="fall" style={style}>
          {kind === 'leaf' && <Leaf x={0} y={0} s={0.7 + rnd(i) * 0.5} c={['#d08a3a', '#b8582f', '#e0b04a'][i % 3]} />}
          {kind === 'petal' && <ellipse rx="5" ry="3" fill="#f2bfc0" />}
          {kind === 'snow' && <circle r={2 + rnd(i) * 3} fill="#fff" opacity=".9" />}
          {kind === 'rain' && <line x1="0" y1="0" x2="-6" y2="26" stroke="#cfe0ec" strokeWidth="1.5" opacity=".7" />}
        </g></g>
      );
    })}</g>
  );
}
export const Hills = ({ y, c, amp = 40, seed = 1, x0 = -1200, w = 4000, o = 1 }: { y: number; c: string; amp?: number; seed?: number; x0?: number; w?: number; o?: number }) => {
  let d = `M${x0} 3000 L${x0} ${y}`;
  for (let i = 0; i <= 20; i++) d += ` Q${x0 + (i - 0.5) * (w / 20)} ${y - amp * (0.4 + rnd(seed + i))} ${x0 + i * (w / 20)} ${y + (rnd(i + seed * 3) - 0.5) * amp * 0.4}`;
  d += ` L${x0 + w} 3000Z`;
  return <path d={d} fill={c} opacity={o} filter="url(#wc)" />;
};
export const Sky = ({ fill }: { fill: string }) => <rect x="-3000" y="-2000" width="9000" height="5000" fill={fill} />;
export const Lamp = ({ x, y, on = 1 }: { x: number; y: number; on?: number }) => (
  <g transform={`translate(${x} ${y})`}><circle cy="-170" r="70" fill="url(#warmglow)" opacity={on * 0.7} /><line x1="0" y1="0" x2="0" y2="-160" stroke={INK} strokeWidth="5" /><path d="M-12 -160 L12 -160 L8 -182 L-8 -182Z" fill="#ffe2a0" stroke={INK} /></g>
);
export const Suitcase = ({ x, y, s = 1, c = '#a8643f' }: { x: number; y: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} filter="url(#wob)">
    <path d="M-6 -46 L-6 -62 L6 -62 L6 -46" stroke={INK} strokeWidth="3" fill="none" />
    <rect x="-18" y="-46" width="36" height="42" rx="5" fill={c} stroke={INK} strokeWidth="1.5" />
    <line x1="-8" y1="-46" x2="-8" y2="-4" stroke="#7a4a2c" /><line x1="8" y1="-46" x2="8" y2="-4" stroke="#7a4a2c" />
    <circle cx="-12" cy="-1" r="3" fill={INK} /><circle cx="12" cy="-1" r="3" fill={INK} />
  </g>
);
export const GradCap = ({ x, y, s = 1, r = 0 }: { x: number; y: number; s?: number; r?: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}><path d="M-22 0 L0 -10 L22 0 L0 10Z" fill="#2d3442" stroke={INK} /><path d="M-10 4 L-10 12 Q0 18 10 12 L10 4" fill="#2d3442" /><line x1="18" y1="1" x2="20" y2="16" stroke="#e1b64a" strokeWidth="2" /></g>
);
