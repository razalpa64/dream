import { useState } from 'react';
import { story } from './story';
import { Scene, Stage, Caption, Grad, seg, lerp, ease, win, camLerp, rnd } from './engine';
import type { Cam } from './engine';
import { Bird, Person, SeatedPerson, Chair, benchSeatY, Cup, Tree, Cloud, Flower, Heart, Stars, Birds, Plane, Moon, Bench, Ring, House, Particles, Hills, Sky, Lamp, Suitcase, GradCap, Leaf, INK } from './art';

const C = story.chapters;
const ROOM = (x: number, y: number, w: number, h: number, c: string) => <rect x={x} y={y} width={w} height={h} fill={c} stroke={INK} strokeWidth="6" />;

/* ───────────────────────── 6. WEDDING ───────────────────────── */
export function Wedding() {
  const L = C.wedding.lines;
  return (
    <Scene vh={C.wedding.vh} label="Chapter six: the wedding" bg="#f4ecd8">
      {p => {
        const walkIn = ease(seg(p, 0.04, 0.3)), dance = seg(p, 0.5, 0.72), away = ease(seg(p, 0.74, 1));
        const baseX = p < 0.74 ? lerp(150, 800, walkIn) : lerp(800, 1900, away);
        const ang = dance * Math.PI * 4;
        const dx = Math.sin(ang) * 14 * Math.sin(dance * Math.PI);
        const face = p > 0.3 && p < 0.74;
        const cam: Cam = p < 0.3 ? { x: lerp(500, 800, walkIn), y: 560, z: 1.25 } : p < 0.74 ? { x: 800, y: lerp(560, 640, seg(p, 0.3, 0.5)), z: lerp(1.25, 1.9, seg(p, 0.3, 0.5)), r: Math.sin(dance * Math.PI * 2) * 2 } : { x: lerp(800, 1700, away), y: lerp(640, 560, away), z: lerp(1.9, 1.2, seg(p, 0.74, 0.85)) };
        const ringO = win(p, 0.34, 0.5, 0.03);
        return (
          <>
            <Stage cam={cam} label="A garden wedding with an arch of flowers, candles and guests; Razal and Julian exchange rings and dance" defs={<Grad id="wsky" stops={['#f6ead0', '#fbf4e4', '#e4ecd6']} />}>
              <Sky fill="url(#wsky)" />
              <circle cx="1200" cy="200" r="300" fill="url(#glow)" />
              <Hills y={560} c="#c9d6b0" seed={4} amp={40} />
              {[-300, 0, 1500, 1800, 2200].map(x => <Tree key={x} x={x} y={660} s={1.5} c={['#9db57d', '#c3cf93', '#82a06c']} />)}
              <path d="M-400 200 Q400 300 1200 180 Q1800 120 2400 220" stroke="#8a6447" strokeWidth="1.5" fill="none" />
              {Array.from({ length: 30 }, (_, k) => <circle key={k} cx={-400 + k * 95} cy={200 + Math.sin(k * 0.6) * 40 + 30} r="6" fill="#ffe7a8" className="twinkle" style={{ animationDelay: `${k * 0.2}s` }} />)}
              <rect x="-2000" y="660" width="7000" height="3000" fill="#b9c78f" />
              <path d="M-400 700 L2600 700 L2600 760 L-400 760Z" fill="#efe3c8" opacity=".9" />
              {Array.from({ length: 40 }, (_, k) => <ellipse key={k} cx={-300 + k * 70} cy={720 + (k % 3) * 12} rx="5" ry="3" fill="#f2bfc0" />)}
              {[0, 1].map(row => Array.from({ length: 6 }, (_, k) => <g key={`${row}${k}`} opacity=".55"><ellipse cx={200 + k * 110 + (k > 2 ? 520 : 0)} cy={row ? 840 : 640} rx="22" ry="30" fill={['#c9b8a2', '#a6b0a0', '#d0b4a8'][k % 3]} /><circle cx={200 + k * 110 + (k > 2 ? 520 : 0)} cy={row ? 800 : 600} r="13" fill="#b89a82" /></g>))}
              <g transform="translate(800 740)" filter="url(#wob)">
                <path d="M-170 0 L-170 -300 Q0 -440 170 -300 L170 0" stroke="#8a6447" strokeWidth="10" fill="none" />
                {Array.from({ length: 26 }, (_, k) => { const t = k / 25, a = Math.PI * t; return <Flower key={k} x={-170 * Math.cos(a) * 1.0} y={-300 - Math.sin(a) * 120 + 38} s={1.2} c={['#f6efe2', '#f0c3b5', '#e8c35a'][k % 3]} stem={false} />; })}
                {[-170, 170].map(x => [0, 1, 2, 3, 4].map(k => <Flower key={`${x}${k}`} x={x} y={-k * 60 + 30} s={1.1} c={k % 2 ? '#f0c3b5' : '#f6efe2'} stem={false} />))}
              </g>
              {[560, 1040, 480, 1120].map((x, k) => <g key={k} transform={`translate(${x} ${k > 1 ? 790 : 720})`}><rect x="-6" y="-40" width="12" height="40" fill="#f7eedc" stroke={INK} /><ellipse cy="-48" rx="5" ry="9" fill="#f3b54a" className="twinkle" /><circle cy="-48" r="30" fill="url(#warmglow)" /></g>)}
              <Person x={baseX - 34 + dx} y={760} s={1.2} kind="razal" outfit="#3e4a5c" walk={(p > 0.04 && p < 0.3) || p > 0.74 ? p * 120 : undefined} armR={face ? -80 : -28} />
              <Person x={baseX + 34 - dx} y={760} s={1.15} kind="julian" outfit="#fbf5ea" veil flip={face} walk={(p > 0.04 && p < 0.3) || p > 0.74 ? p * 120 + 3 : undefined} armL={face ? 6 : 28} armR={face ? -80 : -6} />
              {ringO > 0 && <Ring x={800} y={620} s={1.4} glow={ringO} />}
              {dance > 0 && dance < 1 && <g opacity={Math.sin(dance * Math.PI)}>{[0, 1, 2].map(k => <text key={k} x={720 + k * 70} y={480 - k * 30} fontSize="40" fill="#8a6447" className="bob">♪</text>)}</g>}
              {Array.from({ length: 10 }, (_, k) => <Flower key={k} x={1300 + k * 90} y={760 + (k % 2) * 20} s={1.2} c={['#d9766c', '#e8c35a', '#f0c3b5'][k % 3]} b={seg(p, 0.78 + k * 0.015, 0.83 + k * 0.015)} />)}
              <Particles kind="petal" n={16} seed={2} w={2400} />
            </Stage>
            <Caption o={win(p, 0.36, 0.48, 0.03)} pos="top" size="sm">I do. In every lifetime.</Caption>
            <Caption o={win(p, 0.76, 0.86, 0.03)} pos="top">{L[0]}</Caption>
            <Caption o={win(p, 0.88, 1.2, 0.03)} pos="top">{L[1]}</Caption>
          </>
        );
      }}
    </Scene>
  );
}

/* ───────────────────────── 7. OUR HOME ───────────────────────── */
const ROOMS: Record<string, Cam> = { bedroom: { x: 450, y: 300, z: 2 }, kitchen: { x: 450, y: 680, z: 2 }, living: { x: 1050, y: 680, z: 1.9 }, balcony: { x: 1560, y: 300, z: 2 }, garden: { x: 1820, y: 680, z: 1.9 } };
function HomeInterior({ t, onRoom }: { t: number; onRoom: (id: string) => void }) {
  const R = (id: string, label: string) => ({ onClick: () => onRoom(id), style: { cursor: 'pointer' }, role: 'button', 'aria-label': label, tabIndex: 0, onKeyDown: (e: { key: string }) => { if (e.key === 'Enter') onRoom(id); } });
  return (
    <g>
      <rect x="-2000" y="-2000" width="7000" height="5000" fill="#c9dbe0" />
      <Cloud x={1700} y={100} o={0.8} /><Sun x={2100} y={150} />
      <rect x="-2000" y="860" width="7000" height="3000" fill="#9fb67c" />
      <path d="M160 100 L800 -150 L1440 100Z" fill="#a85a3e" stroke={INK} strokeWidth="6" />
      <g {...R('bedroom', 'Bedroom')}>{ROOM(200, 100, 500, 380, '#f1dfc4')}
        <rect x="260" y="150" width="140" height="130" fill="#ffe7b0" stroke={INK} strokeWidth="4" /><circle cx="330" cy="215" r="140" fill="url(#glow)" opacity=".6" />
        <rect x="380" y="360" width="280" height="80" rx="10" fill="#e6b3a5" stroke={INK} strokeWidth="2" /><rect x="380" y="330" width="60" height="40" rx="12" fill="#fbf4e4" stroke={INK} />
        <circle cx="440" cy="345" r="14" fill="#b88461" /><circle cx="475" cy="350" r="14" fill="#d9a77f" /><path d="M426 338 Q440 324 454 338" fill="#221813" /><path d="M461 345 Q476 326 490 344 L492 362 L460 362Z" fill="#2c1d17" />
        <Cup x={620} y={330} s={1.3} /></g>
      <g {...R('kitchen', 'Kitchen')}>{ROOM(200, 480, 500, 380, '#f3e3c6')}
        <rect x="200" y="740" width="500" height="120" fill="#b88a63" stroke={INK} strokeWidth="3" /><rect x="260" y="560" width="300" height="20" fill="#8a6447" />
        {[0, 1, 2].map(k => <circle key={k} cx={290 + k * 50} cy="550" r="14" fill={['#d9766c', '#e8c35a', '#7c9a5e'][k]} />)}
        <path d="M560 700 l60 0 l-6 40 l-48 0z" fill="#5d6e78" stroke={INK} /><path className="bob" d="M580 690 q-10 -20 0 -40 M600 690 q10 -20 0 -40" stroke="#fff" strokeWidth="3" fill="none" />
        <Person x={420} y={850} s={0.95} kind="razal" armR={-70} outfit="#7c8f6a" /><Person x={500} y={850} s={0.9} kind="julian" flip armR={-60} outfit="#d9a06a" /></g>
      <g {...R('living', 'Living room')}>{ROOM(700, 480, 700, 380, '#ead2b0')}
        <rect x="760" y="540" width="200" height="130" fill="#2a3040" stroke={INK} strokeWidth="5" /><rect x="770" y="550" width="180" height="110" fill="#7fa0b8" opacity={0.5 + 0.3 * Math.sin(t * 60)} />
        <path d="M1000 780 L1340 780 L1340 840 L1000 840Z M1000 720 L1340 720 L1340 790 L1000 790Z" fill="#a85a3e" stroke={INK} strokeWidth="3" />
        <Lamp x={1370} y={860} />
        <SeatedPerson x={1130} seatY={780} floorY={860} s={0.9} kind="razal" flip armR={-30} /><SeatedPerson x={1210} seatY={780} floorY={860} s={0.85} kind="julian" flip lean={-14} />
        <rect x="1180" y="560" width="160" height="110" fill="#f6ecd6" stroke={INK} strokeWidth="4" /><Flower x={1260} y={660} s={1.4} /></g>
      {ROOM(700, 100, 700, 380, '#e9d8c0')}
      {[0, 1, 2, 3, 4, 5].map(k => <rect key={k} x={760 + k * 34} y={150} width="26" height="90" fill={['#a85a3e', '#5d7b8a', '#e8c35a', '#7c9a5e', '#c97a6d', '#8a6447'][k]} stroke={INK} />)}
      <rect x="750" y="240" width="230" height="10" fill="#8a6447" />
      <g transform="translate(1100 300)"><rect x="-80" y="-80" width="200" height="140" fill="#f6ecd6" stroke={INK} strokeWidth="4" /><Heart x={20} y={-40} s={2} c="#c9564b" /><text x="20" y="40" textAnchor="middle" className="font-hand" fontSize="22">R + J</text></g>
      <g {...R('balcony', 'Balcony')}><rect x="1400" y="100" width="340" height="380" fill="#1f2a4a" /><Stars n={30} w={320} h={300} x0={1410} y0={110} seed={6} /><Moon x={1650} y={170} r={30} />
        <path d="M1400 480 L1740 480 M1400 400 L1740 400 M1440 400 L1440 480 M1500 400 L1500 480 M1560 400 L1560 480 M1620 400 L1620 480 M1680 400 L1680 480" stroke={INK} strokeWidth="5" />
        <Person x={1530} y={480} s={0.9} kind="razal" armR={-30} outfit="#3e5664" /><Person x={1590} y={480} s={0.85} kind="julian" flip lean={-6} armR={-20} outfit="#7d5a78" /></g>
      <g {...R('garden', 'Garden')}>{Array.from({ length: 18 }, (_, k) => <Flower key={k} x={1500 + (k % 9) * 70} y={830 + Math.floor(k / 9) * 40} s={1.3} c={['#d9766c', '#e8c35a', '#f0c3b5'][k % 3]} />)}
        <Tree x={2050} y={860} s={1.4} /><Person x={1760} y={860} s={0.95} kind="julian" armR={-50} outfit="#c27d8a" /><Person x={1840} y={860} s={1} kind="razal" flip armR={-70} holdR={<Flower x={0} y={10} s={1} stem />} /></g>
    </g>
  );
}
const Sun = ({ x, y }: { x: number; y: number }) => <g><circle cx={x} cy={y} r="200" fill="url(#glow)" /><circle cx={x} cy={y} r="56" fill="#fbe0a0" filter="url(#wc)" /></g>;

export function Home() {
  const rooms = C.home.rooms;
  const [note, setNote] = useState<string | null>(null);
  return (
    <Scene vh={C.home.vh} label="Chapter seven: our home" bg="#c9dbe0">
      {p => {
        const ext = p < 0.3;
        const rp = seg(p, 0.32, 1) * rooms.length;
        const ri = Math.min(rooms.length - 1, Math.floor(rp)), rq = rp - ri;
        const a = ROOMS[rooms[ri].id], b = ROOMS[rooms[Math.min(rooms.length - 1, ri + 1)].id];
        const cam = ext ? camLerp({ x: 800, y: 520, z: 1 }, { x: 800, y: 600, z: 2.6 }, ease(seg(p, 0.18, 0.3))) : camLerp(camLerp({ x: 950, y: 480, z: 0.85 }, a, ease(seg(p, 0.3, 0.34))), b, ri < rooms.length - 1 ? ease(seg(rq, 0.75, 1)) : 0);
        const key = win(p, 0.08, 0.2);
        return (
          <>
            <Stage cam={cam} label={ext ? 'A small house with lit windows at the end of a flowered garden path' : `Inside our home: ${rooms[ri].caption}`}
              defs={<Grad id="hsky" stops={['#f2c98a', '#f6e1b8', '#d8e2d0']} />}>
              {ext ? (<g>
                <Sky fill="url(#hsky)" /><Sun x={1250} y={260} />
                <Hills y={640} c="#b9c78f" seed={6} /><Tree x={300} y={720} s={1.5} /><Tree x={1350} y={720} s={1.3} />
                <rect x="-2000" y="720" width="6000" height="3000" fill="#9fb67c" />
                <path d="M800 720 Q760 800 820 900 L700 1600 L900 1600 L860 900 Q800 800 840 720Z" fill="#e8d3a8" />
                {Array.from({ length: 16 }, (_, k) => <Flower key={k} x={k % 2 ? 900 + (k * 14) : 700 - k * 14} y={740 + k * 10} s={1} c={['#d9766c', '#e8c35a', '#f0c3b5'][k % 3]} b={seg(p, k * 0.008, 0.05 + k * 0.008)} />)}
                <House x={820} y={720} s={2.4} lit={seg(p, 0, 0.1)} />
                <Person x={720} y={860} s={0.8} kind="razal" outfit="#3e4a5c" armR={-28} /><Person x={760} y={860} s={0.76} kind="julian" outfit="#fbf5ea" armL={28} />
                <Birds y={200} />
              </g>) : <HomeInterior t={p} onRoom={id => setNote(rooms.find(r => r.id === id)?.note ?? null)} />}
            </Stage>
            {key > 0 && <div className="home-opening-title pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 text-center" style={{ opacity: key }}>
              <svg width="120" height="60" viewBox="0 0 120 60" aria-hidden style={{ transform: `rotate(${(1 - key) * -30}deg)` }}><circle cx="24" cy="30" r="16" fill="none" stroke="#b07a2a" strokeWidth="5" /><path d="M40 30 L110 30 M92 30 L92 44 M104 30 L104 40" stroke="#b07a2a" strokeWidth="5" strokeLinecap="round" /><Heart x={24} y={22} s={0.45} c="#c9564b" fill /></svg>
              <h2 className="font-serif m-0" style={{ fontSize: 'clamp(40px,7vw,96px)', letterSpacing: '.1em', color: '#5a3a28', textShadow: '0 0 20px #fff3dc' }}>OUR HOME</h2>
            </div>}
            {!ext && <Caption o={win(rq, 0.1, 0.7, 0.1)} pos="top">{rooms[ri].caption}</Caption>}
            {!ext && <p className="font-hand pointer-events-none absolute bottom-4 left-0 right-0 text-center" style={{ fontSize: 18, color: '#5a3a28', opacity: 0.7 }}>(tap a room)</p>}
            {note && !ext && <button className="font-hand absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2" onClick={() => setNote(null)}
              style={{ background: '#fbf3df', border: `1.5px solid ${INK}`, padding: '22px 30px', fontSize: 'clamp(22px,3vw,32px)', transform: 'translate(-50%,-50%) rotate(-3deg)', boxShadow: '5px 6px 0 rgba(58,44,38,.2)', maxWidth: 420 }}>{note}<br /><span style={{ fontSize: 16, opacity: 0.6 }}>— R ♥</span></button>}
          </>
        );
      }}
    </Scene>
  );
}

/* ───────────────────────── 8. OUR LITTLE FAMILY ───────────────────────── */
const SEASONS = [{ n: 'Spring', c: ['#f2bfc0', '#f7d6d0', '#c9dca8'], g: '#a9c08a' }, { n: 'Summer', c: ['#6f8f5c', '#a2b37a', '#4f6f4c'], g: '#9fb67c' }, { n: 'Autumn', c: ['#d08a3a', '#e0b04a', '#b8582f'], g: '#c4a46a' }, { n: 'Winter', c: ['#e8eef2', '#f6f8fa', '#d4dde4'], g: '#eef2f4' }];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function Window({ x, y, season }: { x: number; y: number; season: number }) {
  const S = SEASONS[season];
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-150" y="-150" width="300" height="260" fill="#cfe0e6" stroke={INK} strokeWidth="8" />
      <rect x="-146" y="40" width="292" height="66" fill={S.g} />
      <Tree x={0} y={60} s={0.7} c={S.c} />
      {season === 3 && <Particles kind="snow" n={10} seed={3} w={280} />}
      <line x1="0" y1="-150" x2="0" y2="110" stroke={INK} strokeWidth="5" /><line x1="-150" y1="-20" x2="150" y2="-20" stroke={INK} strokeWidth="5" />
      <path d="M-170 -170 Q-150 0 -180 120 L-140 120 Q-120 0 -140 -170Z M170 -170 Q150 0 180 120 L140 120 Q120 0 140 -170Z" fill="#c97a6d" opacity=".85" />
    </g>
  );
}
export function Family() {
  const F = C.family;
  return (
    <Scene vh={F.vh} label="Chapter eight: our little family" bg="#efdcbc">
      {p => {
        const season = Math.floor(seg(p, 0, 0.2) * 8) % 4;
        const items = (k: number) => seg(p, 0.2 + k * 0.03, 0.24 + k * 0.03);
        const v = p < 0.58 ? -1 : Math.min(3, Math.floor((p - 0.58) / 0.105));
        const cam = p < 0.2 ? { x: 800, y: 380, z: 1.6 } : p < 0.32 ? camLerp({ x: 800, y: 380, z: 1.6 }, { x: 800, y: 700, z: 1.7 }, ease(seg(p, 0.2, 0.24))) : camLerp({ x: 800, y: 700, z: 1.7 }, { x: 800, y: 580, z: 1.05 }, ease(seg(p, 0.32, 0.38)));
        const kidG = v >= 0 ? 0.5 + v * 0.1 : 0;
        return (
          <>
            <Stage cam={cam} label="A warm family room where seasons pass outside the window and a family grows">
              <rect x="-2000" y="-2000" width="7000" height="5000" fill="#efdcbc" />
              {Array.from({ length: 20 }, (_, k) => <path key={k} d={`M${-200 + k * 100} -400 L${-200 + k * 100} 900`} stroke="#e4cca6" strokeWidth="18" />)}
              <Window x={800} y={360} season={season} />
              {v === 2 ? <g><rect x="-2000" y="-2000" width="7000" height="5000" fill="#1f2a4a" opacity=".55" /><Stars n={20} w={600} h={200} x0={500} y0={240} seed={4} /></g> : null}
              <rect x="-2000" y="780" width="7000" height="3000" fill="#b88a63" />
              {Array.from({ length: 12 }, (_, k) => <line key={k} x1={-200 + k * 180} y1="780" x2={-260 + k * 200} y2="1300" stroke="#9a6f4c" opacity=".5" />)}
              {p < 0.2 && <g transform="translate(1180 520)" filter="url(#wob)"><rect x="-70" y="-90" width="140" height="160" fill="#fbf3df" stroke={INK} strokeWidth="2" /><rect x="-70" y="-90" width="140" height="34" fill="#c9564b" />
                <text x="0" y="-64" textAnchor="middle" fill="#fbf3df" className="font-serif" fontSize="20">{MONTHS[Math.floor(seg(p, 0, 0.2) * 24) % 12]}</text>
                <text x="0" y="30" textAnchor="middle" className="font-serif" fontSize="60" fill={INK}>{1 + Math.floor(seg(p, 0, 0.2) * 700) % 28}</text></g>}
              {p < 0.2 && <text x="800" y="140" textAnchor="middle" className="font-hand" fontSize="40" fill="#5a3a28">{SEASONS[season].n}</text>}
              {p >= 0.2 && p < 0.34 && <g>
                <g opacity={items(0)} transform="translate(700 760)"><path d="M-30 0 Q-34 -24 -14 -26 Q-6 -10 -2 0Z M6 0 Q2 -24 22 -26 Q30 -10 34 0Z" fill="#f2bfc0" stroke={INK} strokeWidth="1.5" /></g>
                <g opacity={items(1)} transform="translate(940 780)"><path d="M-80 0 L-80 -90 M80 0 L80 -90 M-80 -40 L80 -40 M-80 -90 L80 -90" stroke="#8a6447" strokeWidth="5" />{[-60, -30, 0, 30, 60].map(x => <line key={x} x1={x} y1="-90" x2={x} y2="-40" stroke="#8a6447" strokeWidth="3" />)}</g>
                <g opacity={items(2)} transform="translate(580 770)"><circle r="16" fill="#e8c35a" stroke={INK} /><circle cx="-12" cy="-14" r="7" fill="#e8c35a" stroke={INK} /><circle cx="12" cy="-14" r="7" fill="#e8c35a" stroke={INK} /></g>
                <g opacity={items(3)} transform="translate(800 690)"><path d="M0 0 L0 -20 L10 -20 L10 -6 Q22 -6 22 4 L0 4Z" fill="#9fc3d8" stroke={INK} /></g>
              </g>}
              {p >= 0.32 && <g>
                <Person x={720} y={790} s={1.2} kind="razal" outfit="#5d7b8a" armR={p > 0.46 && p < 0.58 ? -70 : -20} holdR={p > 0.46 && p < 0.58 ? <ellipse rx="16" ry="10" fill="#cfe0ec" stroke={INK} /> : undefined} lean={v === 2 ? 8 : 0} />
                <Person x={880} y={790} s={1.15} kind="julian" flip outfit="#c97a6d" armR={p < 0.46 ? -70 : -20} holdR={p < 0.46 ? <ellipse rx="16" ry="10" fill="#f6d6d0" stroke={INK} /> : undefined} lean={v === 2 ? 8 : 0} />
                {p > 0.46 && p < 0.58 && <Person x={970} y={790} s={0.45} kind="girl" walk={p * 200} />}
                {v === 0 && <><Person x={800 + Math.sin(p * 300) * 8} y={790} s={0.38} kind="girl" walk={p * 300} armL={-80} armR={-80} /><text x="800" y="580" textAnchor="middle" className="font-hand" fontSize="28" fill="#5a3a28">one… two…</text></>}
                {v === 1 && <><rect x="680" y="690" width="240" height="14" fill="#8a6447" /><path d="M760 690 L840 690 L836 650 L764 650Z" fill="#f6ecd6" stroke={INK} />{[780, 800, 820].map(x => <g key={x}><line x1={x} y1="650" x2={x} y2="634" stroke="#e8c35a" strokeWidth="3" /><ellipse cx={x} cy="628" rx="3" ry="6" fill="#f3b54a" className="twinkle" /></g>)}
                  <Person x={620} y={790} s={kidG} kind="girl" armL={-150} armR={-150} /><Person x={980} y={790} s={kidG * 0.8} kind="boy" flip armL={-150} armR={-150} />{[0, 1, 2].map(k => <circle key={k} cx={600 + k * 200} cy={480} r="22" fill={['#d9766c', '#e8c35a', '#9fc3d8'][k]} className="bob" />)}</>}
                {v === 2 && <><rect x="560" y="720" width="480" height="60" rx="10" fill="#e6b3a5" stroke={INK} /><circle cx="620" cy="716" r="14" fill="#d9a77f" /><circle cx="980" cy="716" r="12" fill="#b88461" /><Moon x={800} y={300} r={20} /></>}
                {v === 3 && <>
                  <Chair x={620} y={730} s={0.8} floorY={780} /><Chair x={980} y={730} s={kidG * 0.85} floorY={780} />
                  <rect x="600" y="690" width="400" height="14" fill="#8a6447" />
                  <SeatedPerson x={620} seatY={730} floorY={780} s={kidG} kind="girl" armR={-60} />
                  <SeatedPerson x={980} seatY={730} floorY={780} s={kidG * 0.85} kind="boy" flip armR={-60} />
                  {[680, 760, 840, 920].map(x => <Cup key={x} x={x} y={690} steam={x === 760} />)}
                </>}
              </g>}
            </Stage>
            <Caption o={win(p, 0.36, 0.45, 0.03)} pos="top" size="lg" serif color="#5a3a28">{F.daughter}</Caption>
            <Caption o={win(p, 0.49, 0.57, 0.03)} pos="top" size="lg" serif color="#5a3a28">{F.son}</Caption>
            {v >= 0 && <Caption o={win((p - 0.58) / 0.105 - v, 0.15, 0.8, 0.12)} pos="top">{F.captions[v]}</Caption>}
          </>
        );
      }}
    </Scene>
  );
}

/* ───────────────────────── 9. WATCHING THEM GROW ───────────────────────── */
export function Growing() {
  const L = C.growing.lines;
  return (
    <Scene vh={C.growing.vh} label="Chapter nine: watching them grow" bg="#efdcbc">
      {p => {
        const dg = seg(p, 0.02, 0.28), sg = seg(p, 0.3, 0.55);
        const grad = p > 0.58;
        const ds = lerp(0.36, 0.98, dg), ss = lerp(0.32, 1.02, sg);
        const caps = seg(p, 0.84, 0.94);
        const cam = grad ? camLerp({ x: 800, y: 560, z: 1 }, { x: 640, y: 650, z: 1.9 }, ease(seg(p, 0.88, 0.96))) : { x: 800, y: 600, z: 1.35 };
        const marks = [0.36, 0.5, 0.64, 0.78, 0.9, 0.98];
        return (
          <>
            <Stage cam={cam} label={grad ? 'A graduation day; caps fly as Razal and Julian watch proudly' : 'A doorway with pencil height marks as the children grow'}
              defs={<Grad id="gsky" stops={['#bcd6e6', '#eaf1ea']} />}>
              {!grad ? (<g>
                <rect x="-2000" y="-2000" width="7000" height="5000" fill="#efdcbc" />
                {Array.from({ length: 20 }, (_, k) => <path key={k} d={`M${-200 + k * 100} -400 L${-200 + k * 100} 900`} stroke="#e4cca6" strokeWidth="18" />)}
                <rect x="640" y="200" width="320" height="600" fill="#c9a882" stroke="#7a5838" strokeWidth="18" />
                <rect x="660" y="220" width="280" height="580" fill="#d9bc94" />
                {marks.map((m, k) => { const d = (dg > (m - 0.36) / 0.62 - 0.01) ? 1 : 0, s2 = (sg > (m - 0.32) / 0.7 - 0.01) ? 1 : 0; const yy = 800 - 170 * m; return <g key={k}>
                  <g opacity={d}><line x1="632" y1={yy} x2="660" y2={yy} stroke={INK} strokeWidth="2.5" /><text x="626" y={yy + 6} textAnchor="end" className="font-hand" fontSize="20" fill="#7a2f28">{[3, 6, 9, 12, 16, 18][k]} ♡</text></g>
                  <g opacity={s2}><line x1="940" y1={yy + 4} x2="968" y2={yy + 4} stroke={INK} strokeWidth="2.5" /><text x="974" y={yy + 10} className="font-hand" fontSize="20" fill="#3e5664">{[3, 6, 9, 12, 16, 18][k]}</text></g></g>; })}
                <Person x={760} y={800} s={ds} kind="girl" outfit={dg > 0.6 ? '#b46a6a' : '#e0a64f'} age={0} />
                <g opacity={seg(p, 0.29, 0.32)}><Person x={850} y={800} s={ss} kind="boy" flip outfit={sg > 0.6 ? '#4f6b78' : '#6f8f5e'} /></g>
                <rect x="-2000" y="800" width="7000" height="3000" fill="#b88a63" />
                <g opacity={1 - seg(p, 0.1, 0.2)} transform="translate(560 800)"><path d="M-14 0 Q-16 -14 -4 -16 Q0 -6 2 0Z M4 0 Q2 -14 14 -16 Q18 -6 20 0Z" fill="#f2bfc0" stroke={INK} /></g>
                <g opacity={seg(p, 0.12, 0.2) * (1 - seg(p, 0.24, 0.3))} transform="translate(560 800)"><path d="M-20 0 Q-24 -20 -6 -22 Q2 -8 4 0Z M6 0 Q2 -20 22 -22 Q30 -8 32 0Z" fill="#5d6e78" stroke={INK} /></g>
                <g opacity={seg(p, 0.24, 0.3)} transform="translate(560 800)"><path d="M-30 0 Q-34 -22 -8 -24 Q4 -8 6 0Z M8 0 Q4 -22 32 -24 Q42 -8 44 0Z" fill="#2a2420" stroke={INK} /></g>
              </g>) : (<g>
                <Sky fill="url(#gsky)" /><Cloud x={300} y={150} /><Cloud x={1300} y={120} s={1.1} />
                <g transform="translate(800 520)" filter="url(#wob)"><path d="M-420 0 L420 0 L420 -40 L0 -160 L-420 -40Z" fill="#e8dcc6" stroke={INK} strokeWidth="3" />
                  {[-360, -240, -120, 0, 120, 240, 360].map(x => <rect key={x} x={x - 16} y="0" width="32" height="220" fill="#f3eadb" stroke={INK} />)}
                  <rect x="-440" y="220" width="880" height="30" fill="#d8ccb6" stroke={INK} /></g>
                {[-500, 2100].map(x => <Tree key={x} x={x} y={760} s={2} />)}
                <path d="M-200 280 Q800 360 1800 280" stroke="#8a6447" fill="none" />{Array.from({ length: 16 }, (_, k) => <path key={k} d={`M${-100 + k * 120} ${300 + Math.sin(k / 15 * Math.PI) * 30} l20 0 l-10 26z`} fill={['#c9564b', '#e8c35a', '#5d7b8a'][k % 3]} />)}
                <rect x="-2000" y="760" width="7000" height="3000" fill="#a9c08a" />
                <Person x={lerp(980, 1000, seg(p, 0.6, 0.75))} y={770} s={1.15} kind="girl" outfit="#2d3442" cap={!(caps > 0)} armR={p < 0.75 ? -70 : -150} holdR={p < 0.75 ? <rect x="-14" y="-4" width="28" height="8" fill="#f6ecd6" stroke={INK} /> : undefined} />
                <g opacity={seg(p, 0.72, 0.76)}><Person x={1120} y={770} s={1.2} kind="boy" flip outfit="#2d3442" cap={!(caps > 0)} armR={-150} /></g>
                <Person x={560} y={790} s={1.1} kind="razal" age={0.38} outfit="#5d6e5a" armR={-28} armL={win(p, 0.6, 0.9) > 0.5 ? -130 : 6} />
                <Person x={640} y={790} s={1.05} kind="julian" age={0.38} outfit="#b57a8a" armL={28} armR={win(p, 0.6, 0.9) > 0.5 ? -130 : 6} flip={p > 0.93} />
                {caps > 0 && [0, 1, 2, 3, 4, 5].map(k => <GradCap key={k} x={1000 + (k - 2.5) * 70 + caps * (k - 2.5) * 40} y={600 - caps * (360 + k * 30) + caps * caps * 120} s={1.3} r={caps * 360 * (k % 2 ? 1 : -1)} />)}
                <Heart x={600} y={560} s={0.8} c="#c9564b" o={seg(p, 0.94, 0.98)} fill />
              </g>)}
            </Stage>
            <Caption o={win(p, 0.6, 0.72, 0.03)} pos="top" size="lg" serif color="#2d3442">GRADUATION</Caption>
            <Caption o={win(p, 0.75, 0.84, 0.03)} pos="top" size="lg" serif color="#2d3442">OUR SON</Caption>
            <Caption o={win(p, 0.9, 0.95, 0.03)} pos="top">{L[0]}</Caption>
            <Caption o={win(p, 0.95, 1.2, 0.03)} pos="upper">{L[1]}</Caption>
          </>
        );
      }}
    </Scene>
  );
}

/* ───────────────────────── 10. LETTING THEM GO ───────────────────────── */
export function LettingGo() {
  const G = C.lettingGo;
  return (
    <Scene vh={G.vh} label="Chapter ten: letting them go" bg="#f4ecd8">
      {p => {
        const wed = p < 0.38;
        const which = p < 0.16 ? 0 : 1;
        const toys = 1 - seg(p, 0.42, 0.56);
        const cam = wed ? { x: 800, y: 600, z: 1.3 } : camLerp({ x: 800, y: 560, z: 1.0 }, { x: 800, y: 640, z: 1.6 }, ease(seg(p, 0.6, 0.85)));
        return (
          <>
            <Stage cam={cam} label={wed ? 'Their children marry under a flower arch while the family celebrates' : 'The house grows quiet: toys disappear, two cups and two chairs remain'}>
              {wed ? (<g>
                <rect x="-2000" y="-2000" width="7000" height="5000" fill="#f6ead0" /><Sun x={1300} y={180} />
                <Hills y={600} c="#c9d6b0" seed={9} /><rect x="-2000" y="760" width="7000" height="3000" fill="#b9c78f" />
                <g transform="translate(800 770)"><path d="M-150 0 L-150 -260 Q0 -380 150 -260 L150 0" stroke="#8a6447" strokeWidth="9" fill="none" />
                  {Array.from({ length: 18 }, (_, k) => { const a = Math.PI * k / 17; return <Flower key={k} x={-150 * Math.cos(a)} y={-262 - Math.sin(a) * 100 + 38} s={1.1} c={k % 2 ? '#f0c3b5' : '#f6efe2'} stem={false} />; })}</g>
                {which === 0 ? <><Person x={760} y={770} s={1.1} kind="girl" outfit="#fbf5ea" veil armR={-30} /><Person x={840} y={770} s={1.15} kind="razal" outfit="#4a4a5a" flip armR={-30} /></>
                  : <><Person x={760} y={770} s={1.15} kind="boy" outfit="#3e4a5c" armR={-30} /><Person x={840} y={770} s={1.1} kind="julian" outfit="#fbf5ea" veil flip armR={-30} /></>}
                {p > 0.3 ? <g>
                  {[440, 520, 1080, 1160].map((x, k) => <Person key={x} x={x + (k < 2 ? seg(p, 0.3, 0.36) * 200 : -seg(p, 0.3, 0.36) * 200)} y={790} s={1.05} kind={(['razal', 'julian', 'girl', 'boy'] as const)[k]} age={k < 2 ? 0.5 : 0} flip={k >= 2} armR={-100} armL={-100} outfit={['#5d6e5a', '#b57a8a', '#c97a6d', '#4f6b78'][k]} />)}
                  <Heart x={800} y={480} s={1.6} c="#c9564b" fill o={seg(p, 0.33, 0.36)} />
                </g> : <><Person x={520} y={790} s={1.05} kind="razal" age={0.5} outfit="#5d6e5a" armL={-140} armR={-140} /><Person x={600} y={790} s={1.0} kind="julian" age={0.5} outfit="#b57a8a" armR={-40} /></>}
                <Particles kind="petal" n={18} seed={11} />
              </g>) : (<g>
                <rect x="-2000" y="-2000" width="7000" height="5000" fill="#ead2b0" />
                <Window x={800} y={340} season={2} />
                <rect x="-2000" y="780" width="7000" height="3000" fill="#b88a63" />
                <g opacity={toys}>
                  <g transform="translate(300 300)"><rect x="-70" y="-60" width="140" height="110" fill="#fbf3df" stroke={INK} /><House x={0} y={30} s={0.6} /><text x="0" y="-36" textAnchor="middle" className="font-hand" fontSize="16">our home by ♡</text></g>
                  <g transform="translate(1300 300)"><rect x="-70" y="-60" width="140" height="110" fill="#fbf3df" stroke={INK} /><circle cx="30" cy="-20" r="16" fill="#e8c35a" /><Person x={-10} y={40} s={0.35} kind="boy" /></g>
                  <circle cx="420" cy="770" r="20" fill="#d9766c" stroke={INK} /><rect x="1100" y="730" width="50" height="50" fill="#9fc3d8" stroke={INK} /><text x="1125" y="764" textAnchor="middle" fontSize="26" className="font-serif">A</text>
                  <path d="M1220 780 l30 -40 l30 40z" fill="#e8c35a" stroke={INK} />
                </g>
                <rect x="660" y="680" width="280" height="14" fill="#8a6447" /><line x1="700" y1="694" x2="700" y2="780" stroke={INK} strokeWidth="6" /><line x1="900" y1="694" x2="900" y2="780" stroke={INK} strokeWidth="6" />
                <Cup x={770} y={680} s={1.4} /><Cup x={830} y={680} s={1.4} c="#e8c7b0" />
                {[560, 1040].map(x => <g key={x} transform={`translate(${x} 780)`}><path d="M-30 0 L-30 -60 L30 -60 L30 0 M-30 -60 L-30 -130 L30 -130 L30 -60" stroke="#7a5838" strokeWidth="7" fill="none" /></g>)}
                <Person x={720} y={790} s={1.15} kind="razal" age={0.55} armR={-30} outfit="#6b7a68" flip={false} />
                <Person x={880} y={790} s={1.1} kind="julian" age={0.55} flip armR={-30} outfit="#b98a8a" />
              </g>)}
            </Stage>
            <Caption o={win(p, 0.04, 0.14, 0.03)} pos="top" size="sm">Her wedding.</Caption>
            <Caption o={win(p, 0.19, 0.29, 0.03)} pos="top" size="sm">His wedding.</Caption>
            <Caption o={win(p, 0.5, 0.6, 0.03)} pos="top">{G.lines[0]}</Caption>
            <Caption o={win(p, 0.63, 0.7, 0.03)} pos="top">{G.lines[1]}</Caption>
            <Caption o={win(p, 0.72, 0.8, 0.03)} pos="top">{G.lines[2]}</Caption>
            <Caption o={win(p, 0.86, 1.2, 0.03)} pos="top" size="lg" serif>{G.quote}</Caption>
          </>
        );
      }}
    </Scene>
  );
}

/* ───────────────────────── 11. OUR WORLD ───────────────────────── */
function Destination({ id }: { id: string }) {
  const couple = (c: string) => <><Person x={770} y={820} s={0.9} kind="razal" age={0.6} outfit={c} armR={-28} /><Person x={820} y={820} s={0.86} kind="julian" age={0.6} armL={28} outfit="#c97a6d" /></>;
  switch (id) {
    case 'philippines': return <g><rect x="-200" y="-200" width="2000" height="1300" fill="#f6c98a" /><Sun x={1100} y={300} /><rect x="-200" y="520" width="2000" height="300" fill="#5aa0a8" /><path d="M-200 700 Q800 640 1800 720 L1800 1100 L-200 1100Z" fill="#efd9a8" />{[300, 1300].map(x => <g key={x} transform={`translate(${x} 720)`}><path d="M0 0 Q20 -120 50 -240" stroke="#8a6447" strokeWidth="12" fill="none" /><g className="sway">{[-80, -40, 0, 40, 80].map(a => <path key={a} d={`M50 -240 q${a} -20 ${a * 1.5} 40`} stroke="#5f8f50" strokeWidth="10" fill="none" />)}</g></g>)}{couple('#5d7b8a')}</g>;
    case 'india': return <g><rect x="-200" y="-200" width="2000" height="1300" fill="#f3d7b0" /><Sun x={400} y={240} /><g transform="translate(800 640)" fill="#fbf3e6" stroke={INK} strokeWidth="2"><rect x="-260" y="-120" width="520" height="140" /><path d="M-110 -120 Q-110 -300 0 -340 Q110 -300 110 -120Z" /><path d="M0 -340 L0 -380" />{[-330, 330].map(x => <rect key={x} x={x - 12} y="-300" width="24" height="320" />)}<path d="M-50 20 L-50 -70 Q0 -110 50 -70 L50 20" fill="#e6d5be" /></g><rect x="-200" y="660" width="2000" height="80" fill="#8fb0b8" /><rect x="-200" y="740" width="2000" height="500" fill="#c9b08a" />{couple('#a85a3e')}</g>;
    case 'paris': return <g><rect x="-200" y="-200" width="2000" height="1300" fill="#d6dbe0" /><Cloud x={400} y={200} /><g transform="translate(1100 760)" stroke={INK} strokeWidth="3" fill="none"><path d="M-110 0 Q-40 -200 -10 -480 L10 -480 Q40 -200 110 0" fill="#8a7a6a" /><path d="M-70 -120 L70 -120 M-40 -280 L40 -280" /><path d="M-50 0 Q0 -80 50 0" fill="#d6dbe0" /></g>{[0, 1, 2, 3].map(k => <rect key={k} x={-100 + k * 180} y={420 + (k % 2) * 40} width="160" height="400" fill={['#e8dcc6', '#f0e4cf', '#e0d2bb', '#ece0cb'][k]} stroke={INK} />)}<rect x="-200" y="780" width="2000" height="500" fill="#9a9488" /><Lamp x={650} y={800} />{couple('#3e4a5c')}<Particles kind="rain" n={22} seed={8} /></g>;
    case 'japan': return <g><rect x="-200" y="-200" width="2000" height="1300" fill="#f6e1dc" /><path d="M300 600 L800 160 L1300 600Z" fill="#8fa4bf" /><path d="M640 300 L800 160 L960 300 Q880 280 800 320 Q720 280 640 300Z" fill="#fbf7f2" /><rect x="-200" y="600" width="2000" height="600" fill="#b9c78f" /><g transform="translate(400 820)" stroke={INK}><rect x="-120" y="-300" width="22" height="300" fill="#c9564b" /><rect x="98" y="-300" width="22" height="300" fill="#c9564b" /><path d="M-170 -300 Q0 -330 170 -300 L160 -280 L-160 -280Z" fill="#c9564b" /><rect x="-140" y="-250" width="280" height="16" fill="#c9564b" /></g><Tree x={1250} y={820} s={1.6} c={['#f2bfc0', '#f7d6d0', '#eaa8b0']} /><Particles kind="petal" n={24} seed={13} />{couple('#5d6e5a')}</g>;
    case 'alps': return <g><rect x="-200" y="-200" width="2000" height="1300" fill="#cfe0ec" /><path d="M-200 640 L200 220 L500 520 L850 160 L1200 500 L1500 260 L1800 640Z" fill="#8a9fb5" /><path d="M140 290 L200 220 L260 290 Q200 280 140 290Z M780 240 L850 160 L920 240Q850 230 780 240Z M1440 330 L1500 260 L1560 330Z" fill="#fff" /><rect x="-200" y="620" width="2000" height="700" fill="#9fb67c" /><path d="M-200 700 Q800 660 1800 720" stroke={INK} strokeWidth="4" fill="none" /><g transform="translate(400 690)">{[0, 1, 2].map(k => <g key={k}><rect x={k * 150} y="-60" width="140" height="56" rx="8" fill="#c9564b" stroke={INK} />{[0, 1, 2].map(w => <rect key={w} x={k * 150 + 14 + w * 40} y="-48" width="28" height="20" fill="#ffe7b0" />)}</g>)}</g>{[1100, 1300].map(x => <Tree key={x} x={x} y={760} s={0.9} c={['#3f6a4f', '#5a8060', '#2f5a42']} />)}{couple('#7a4a3a')}</g>;
    default: return <g><rect x="-200" y="-200" width="2000" height="1300" fill="#f5c79a" /><Sun x={800} y={260} />{[0, 1, 2, 3, 4, 5, 6].map(k => <rect key={k} x={-100 + k * 260} y={300 + (k % 3) * 40} width="240" height="440" fill={['#e8a46c', '#f0c88a', '#d98a6a', '#efd2a8'][k % 4]} stroke={INK} />)}<rect x="-200" y="700" width="2000" height="500" fill="#4f8a96" />{[0, 1, 2, 3, 4, 5].map(k => <path key={k} d={`M${k * 300} 760 q20 -8 40 0 t40 0`} stroke="#9fd0d4" strokeWidth="3" fill="none" />)}<path d="M700 790 Q800 820 960 780 L940 800 Q800 840 690 800Z" fill="#2a2420" />{couple('#3e4a5c')}<Bird x={500} y={200} /></g>;
  }
}
export function Travel() {
  const T = C.travel, D = T.destinations;
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  return (
    <Scene vh={T.vh} label="Chapter eleven: our world" bg="#e9dcc2">
      {p => {
        const pre = p < 0.1, album = p > 0.9;
        const dp = seg(p, 0.1, 0.9) * D.length, di = Math.min(D.length - 1, Math.floor(dp)), q = dp - di;
        const zin = ease(seg(q, 0, 0.3)), out = seg(q, 0.85, 1);
        const sc = lerp(0.42, 1, zin), rot = lerp(-7, 0, zin) + out * 10;
        return (
          <>
            <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label="A paper table covered with maps, stamps and postcards">
              <rect width="1600" height="900" fill="#e9dcc2" />
              <path d="M100 200 Q400 100 700 250 T1300 200 M200 700 Q600 600 900 720 T1500 650" stroke="#c9b08a" strokeWidth="3" strokeDasharray="10 8" fill="none" />
              {Array.from({ length: 8 }, (_, k) => <g key={k} transform={`translate(${rnd(k) * 1600} ${rnd(k * 3) * 900}) rotate(${rnd(k * 5) * 40 - 20})`} opacity=".4"><rect x="-30" y="-36" width="60" height="72" fill="none" stroke="#b04c3f" strokeWidth="2" strokeDasharray="4 3" /><Heart x={0} y={-10} s={0.8} c="#b04c3f" /></g>)}
              {pre && <g>
                <g transform={`translate(${lerp(-200, 640, ease(seg(p, 0, 0.05)))} 600)`}><Suitcase x={0} y={0} s={4} c="#8a5c3c" /></g>
                <g opacity={seg(p, 0.03, 0.06)} transform="translate(980 520) rotate(8)"><rect x="-70" y="-100" width="140" height="190" rx="8" fill="#5d3a3a" stroke={INK} strokeWidth="2" /><circle cy="-20" r="30" fill="none" stroke="#e1b64a" strokeWidth="3" /><text y="60" textAnchor="middle" fill="#e1b64a" className="font-serif" fontSize="18" letterSpacing="3">PASSPORT</text></g>
                <Plane x={lerp(200, 1500, seg(p, 0.05, 0.1))} y={lerp(300, 150, seg(p, 0.05, 0.1))} s={0.8} r={-8} />
              </g>}
            </svg>
            {!pre && !album && (
              <div className="absolute left-1/2 top-1/2" style={{ width: '100vw', height: '100vh', transform: `translate(calc(-50% + ${out * 110}vw), -50%) rotate(${rot}deg) scale(${sc})`, transition: 'none' }}>
                <div className="absolute inset-0" style={{ background: '#fbf6ea', padding: `${(1 - zin) * 28 + 0}px`, boxShadow: '0 20px 60px rgba(58,44,38,.3)' }}>
                  <div className="relative h-full w-full overflow-hidden">
                    <Stage cam={{ x: 800, y: 500, z: lerp(1.05, 1.2, q) }} label={`${D[di].name}: ${D[di].note}`}><Destination id={D[di].id} /></Stage>
                  </div>
                </div>
                <div className="travel-postmark absolute right-[6%] top-[8%]" style={{ opacity: seg(q, 0.3, 0.4), transform: `rotate(12deg) scale(${lerp(1.6, 1, seg(q, 0.3, 0.4))})` }}>
                  <div className="font-serif flex h-24 w-24 flex-col items-center justify-center rounded-full text-center" style={{ border: '3px double #b04c3f', color: '#b04c3f', fontSize: 14, letterSpacing: 2, background: 'rgba(251,246,234,.6)' }}>{D[di].name.toUpperCase()}<span className="font-hand" style={{ fontSize: 18 }}>R ♥ J</span></div>
                </div>
              </div>
            )}
            {!pre && !album && <Caption o={win(q, 0.35, 0.8, 0.08)} pos="bottom" size="md">{D[di].note}</Caption>}
            <Caption o={win(p, 0.0, 0.08, 0.02)} pos="top">{T.lines[0]}</Caption>
            {album && (
              <div className="absolute inset-0 flex flex-wrap content-center items-center justify-center gap-4 p-6 pt-[22vh]" style={{ opacity: seg(p, 0.9, 0.93) }}>
                {D.map((d, k) => (
                  <button key={d.id} className="postcard relative" aria-label={`Postcard from ${d.name}. ${flipped[d.id] ? d.note : 'Click to flip'}`} onClick={() => setFlipped(f => ({ ...f, [d.id]: !f[d.id] }))}
                    style={{ width: 'min(38vw,210px)', aspectRatio: '16/10', background: '#fbf6ea', padding: 6, border: 'none', cursor: 'pointer', boxShadow: '3px 6px 14px rgba(58,44,38,.25)', transform: `rotate(${(k % 2 ? 1 : -1) * (3 + k)}deg)` }}>
                    {flipped[d.id] ? <div className="font-hand flex h-full flex-col items-center justify-center" style={{ fontSize: 18, color: INK }}>{d.note}<span style={{ fontSize: 14 }}>— us, {d.name}</span></div>
                      : <div className="relative h-full w-full overflow-hidden"><svg viewBox="200 200 1200 700" preserveAspectRatio="xMidYMid slice" className="h-full w-full"><Destination id={d.id} /></svg></div>}
                  </button>
                ))}
              </div>
            )}
            {album && <Caption o={seg(p, 0.92, 0.95)} pos="top">{T.lines[1]}</Caption>}
          </>
        );
      }}
    </Scene>
  );
}

/* ───────────────────────── 12. TIME ───────────────────────── */
export function Time() {
  return (
    <Scene vh={C.time.vh} label="Chapter twelve: time" bg="#e9d8b4">
      {p => {
        const sp = p * 12, si = Math.floor(sp) % 4, sq = sp - Math.floor(sp);
        const S = SEASONS[si], N = SEASONS[(si + 1) % 4];
        const age = lerp(0.62, 1, p);
        const act = Math.min(3, Math.floor(p * 4));
        const words = ['Spring.', 'Summer.', 'Autumn.', 'Winter.'];
        return (
          <>
            <Stage cam={{ x: 800, y: 560, z: lerp(1.1, 1.3, p) }} label={`Seasons pass; Razal and Julian grow old together. ${S.n}.`} defs={<Grad id="tsky" stops={si === 3 ? ['#c9d4dc', '#eef2f4'] : si === 2 ? ['#f0c58a', '#f7e3c0'] : ['#cfe0e6', '#f3ecd8']} />}>
              <Sky fill="url(#tsky)" />
              <Hills y={640} c={S.g} seed={3} />
              <rect x="-2000" y="760" width="7000" height="3000" fill={S.g} />
              <rect x="-2000" y="760" width="7000" height="3000" fill={N.g} opacity={seg(sq, 0.7, 1)} />
              <Tree x={1150} y={780} s={2.2} c={S.c} />
              <g opacity={seg(sq, 0.7, 1)}><Tree x={1150} y={780} s={2.2} c={N.c} /></g>
              {si === 0 && <Particles kind="petal" n={14} seed={1} />}
              {si === 2 && <Particles kind="leaf" n={16} seed={2} />}
              {si === 3 && <Particles kind="snow" n={40} seed={3} />}
              {si === 1 && <Sun x={300} y={200} />}
              {act === 0 && <><Bench x={700} y={800} s={1} /><SeatedPerson x={650} seatY={benchSeatY(800, 1)} floorY={800} s={1.1} kind="razal" age={age} armR={-60} holdR={<Cup x={0} y={8} s={0.9} />} outfit="#7a6a5a" /><SeatedPerson x={750} seatY={benchSeatY(800, 1)} floorY={800} s={1.05} kind="julian" flip age={age} armR={-60} holdR={<Cup x={0} y={8} s={0.9} c="#e8c7b0" />} outfit="#b98a8a" /></>}
              {act === 1 && <g transform={`translate(${lerp(-200, 200, (p * 4) % 1)} 0)`}><Person x={600} y={800} s={1.1} kind="razal" age={age} walk={p * 80} armR={-28} outfit="#7a6a5a" /><Person x={660} y={800} s={1.05} kind="julian" age={age} walk={p * 80 + 3} armL={28} outfit="#b98a8a" /></g>}
              {act === 2 && <><Bench x={700} y={800} s={1} /><SeatedPerson x={650} seatY={benchSeatY(800, 1)} floorY={800} s={1.1} kind="razal" age={age} armR={-70} holdR={<rect x="-14" y="-10" width="28" height="20" fill="#a85a3e" stroke={INK} />} outfit="#7a6a5a" /><SeatedPerson x={750} seatY={benchSeatY(800, 1)} floorY={800} s={1.05} kind="julian" flip age={age} lean={-10} outfit="#b98a8a" /></>}
              {act === 3 && <><Particles kind="rain" n={30} seed={7} /><g transform="translate(700 560)"><path d="M-110 0 Q0 -90 110 0Z" fill="#5d7b8a" stroke={INK} /><line x1="0" y1="-40" x2="0" y2="120" stroke={INK} strokeWidth="3" /></g><Person x={670} y={800} s={1.1} kind="razal" age={age} armR={-40} outfit="#7a6a5a" /><Person x={730} y={800} s={1.05} kind="julian" flip age={age} armR={-40} outfit="#b98a8a" /></>}
            </Stage>
            <p className="season-label font-hand pointer-events-none absolute left-[6%] top-[8%]" style={{ fontSize: 'clamp(28px,4vw,48px)', color: '#5a3a28', opacity: 0.8 }}>{words[si]}{p > 0.34 ? <span style={{ fontSize: '0.6em' }}> again.</span> : null}</p>
            <Caption o={win(p, 0.05, 0.22)} pos="top" size="sm">Morning tea, for the ten-thousandth time.</Caption>
            <Caption o={win(p, 0.3, 0.46)} pos="top" size="sm">Slower walks. Same hand.</Caption>
            <Caption o={win(p, 0.54, 0.7)} pos="top" size="sm">You reading. Me pretending to read, watching you.</Caption>
            <Caption o={win(p, 0.8, 0.96)} pos="top" size="sm">The years passed. We stayed.</Caption>
          </>
        );
      }}
    </Scene>
  );
}

/* ───────────────────────── 13. FINAL SCENE ───────────────────────── */
export function Final() {
  const F = C.final;
  return (
    <Scene vh={F.vh} label="The final scene" bg="#e8b46e">
      {p => {
        const cam = camLerp({ x: 800, y: 470, z: 1 }, { x: 800, y: 660, z: 1.8 }, ease(seg(p, 0.02, 0.7)));
        const squeeze = seg(p, 0.78, 0.82) * (1 - seg(p, 0.84, 0.88));
        const dark = seg(p, 0.9, 1);
        return (
          <>
            <Stage cam={cam} label="Late afternoon in a golden park. Old Razal and old Julian sit on a wooden bench holding hands while leaves fall."
              defs={<Grad id="fsky" stops={['#e9a865', '#f3cd8e', '#f7e2b8']} />}>
              <Sky fill="url(#fsky)" />
              <circle cx="1000" cy="520" r="120" fill="#fbe2a8" filter="url(#wc)" /><circle cx="1000" cy="520" r="620" fill="url(#warmglow)" />
              <Birds y={240} c="#7a4a2a" /><g style={{ animationDelay: '-12s' }} className="birdcross"><Bird x={0} y={320} s={0.7} c="#7a4a2a" /></g>
              <Hills y={600} c="#c99a62" seed={12} amp={36} o={0.8} /><Hills y={660} c="#a8915a" seed={4} amp={30} />
              {[-200, 1700].map(x => <Tree key={x} x={x} y={800} s={3} c={['#c9862f', '#e0b04a', '#a8582a']} />)}
              <Tree x={300} y={760} s={1.9} c={['#d29a3a', '#e8c35a', '#b8682f']} /><Tree x={1330} y={770} s={2.1} c={['#c9862f', '#e0b04a', '#a8582a']} />
              <rect x="-2000" y="780" width="7000" height="3000" fill="#a6a55c" />
              <path d="M-400 900 Q800 800 2000 900" stroke="#c9b07a" strokeWidth="60" fill="none" opacity=".6" />
              {Array.from({ length: 22 }, (_, k) => <Flower key={k} x={300 + k * 48} y={800 + (k % 3) * 16} s={0.9} c={['#e8c35a', '#f0c3b5', '#d9766c', '#fff3e6'][k % 4]} />)}
              {Array.from({ length: 14 }, (_, k) => <Leaf key={k} x={500 + k * 50} y={815 + (k % 2) * 12} s={0.8} r={k * 40} c={['#d08a3a', '#b8582f', '#e0b04a'][k % 3]} />)}
              <Bench x={800} y={800} s={1.15} />
              <SeatedPerson x={748} seatY={benchSeatY(800, 1.15)} floorY={800} s={1.15} kind="razal" age={1} armR={-34 - squeeze * 6} outfit="#7a6a5a" />
              <SeatedPerson x={852} seatY={benchSeatY(800, 1.15)} floorY={800} s={1.1} kind="julian" flip age={1} armR={-34 - squeeze * 6} lean={-6} outfit="#b98a8a" />
              {squeeze > 0 && <Heart x={800} y={640} s={0.6} c="#c9564b" fill o={squeeze} />}
              <Particles kind="leaf" n={20} seed={9} />
              <rect x="-3000" y="-3000" width="9000" height="9000" fill="#1d1712" opacity={dark} />
            </Stage>
            {F.lines.map((l, k) => <Caption key={k} o={win(p, 0.1 + k * 0.11, 0.17 + k * 0.11, 0.03)} pos="top" size="md">{l}</Caption>)}
            <Caption o={win(p, 0.58, 0.88, 0.04)} pos="top" size="lg" serif color="#5a2e20">“{F.message}”</Caption>
          </>
        );
      }}
    </Scene>
  );
}

export function End({ onRestart }: { onRestart: () => void }) {
  const E = story.ending;
  return (
    <Scene vh={360} label="The end" bg="#1d1712">
      {p => (
        <>
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
            <g opacity={seg(p, 0.7, 0.9)}><Stars n={80} h={900} seed={31} c="#f6dfae" /></g>
          </svg>
          <Caption o={win(p, 0.04, 0.22)} pos="center" size="xl" serif color="#f3e4c8" glow="rgba(0,0,0,.6)">{E.end}</Caption>
          <Caption o={win(p, 0.3, 0.48)} pos="upper" size="lg" color="#f3e4c8" glow="rgba(0,0,0,.6)">{E.maybe}</Caption>
          <Caption o={win(p, 0.4, 0.62)} pos="center" size="xl" color="#f3c89a" glow="rgba(0,0,0,.6)">{E.beginning}</Caption>
          {p > 0.7 && <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: seg(p, 0.7, 0.85), color: '#f3e4c8' }}>
            <h2 className="font-hand m-0" style={{ fontSize: 'clamp(50px,9vw,120px)', lineHeight: 1 }}>{story.site.title}</h2>
            <p className="font-serif italic" style={{ fontSize: 'clamp(20px,2.6vw,30px)', maxWidth: 680 }}>“{E.dedication}”</p>
            <p className="font-hand" style={{ fontSize: 40, color: '#f3c89a', marginTop: 10 }}>{story.site.from} <span style={{ color: '#d9766c' }}>❤</span></p>
            <button onClick={onRestart} className="font-hand mt-10 cursor-pointer" style={{ background: 'none', border: 'none', color: '#f3e4c8', opacity: 0.45, fontSize: 18 }}>read our story again ↺</button>
          </div>}
        </>
      )}
    </Scene>
  );
}
