import { story } from './story';
import type { Choice } from './story';
import { Scene, Stage, Caption, Grad, seg, lerp, ease, win, camLerp } from './engine';
import { Person, SeatedPerson, Chair, benchSeatY, Bouquet, Cup, Tree, PalmTree, Cloud, Flower, Heart, Stars, Birds, Plane, Moon, Bench, Ring, House, Particles, Hills, Sky, Lamp, Suitcase, INK } from './art';

const C = story.chapters;

/* ───────────────────────── OPENING ───────────────────────── */
export function Intro() {
  const s = story.site;
  return (
    <section className="opening-scene relative h-screen overflow-hidden" aria-label="Opening" style={{ background: '#16203a' }}>
      <Stage label="A night sky full of hand-drawn stars over distant hills" defs={<Grad id="isky" stops={['#10162d', '#293454', '#59536d']} />}>
        <Sky fill="url(#isky)" />
        <Stars n={110} w={2400} h={1100} x0={-400} y0={-500} seed={3} />
        <Particles kind="petal" n={12} seed={17} />
        <Moon x={1240} y={190} r={58} />
        <g className="drift"><Cloud x={300} y={300} s={1.2} o={0.12} /><Cloud x={1300} y={420} s={1} o={0.1} /></g>
        <Hills y={760} c="#343653" amp={70} seed={2} />
        <Hills y={830} c="#20263f" amp={50} seed={5} />
        <Tree x={250} y={850} s={1.2} c={['#30364f', '#4c4a5e', '#252c45']} o={0.72} />
        <Tree x={1410} y={860} s={1.35} c={['#30364f', '#4c4a5e', '#252c45']} o={0.68} />
        <House x={520} y={830} s={0.5} lit={1} wall="#404667" roof="#2b3352" />
        <House x={800} y={850} s={0.28} lit={0.65} wall="#363f60" roof="#252e4d" />
        <House x={1130} y={845} s={0.4} lit={1} wall="#404667" roof="#2b3352" />
      </Stage>
      <div aria-hidden className="opening-vellum" />
      <div aria-hidden className="opening-frame" />
      <div className="opening-copy absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ color: '#f6ead2' }}>
        <p className="opening-eyebrow font-serif intro-a" style={{ animationDelay: '.4s' }}>A LOVE STORY, IN THE MAKING</p>
        <h1 className="opening-title font-serif intro-a" style={{ animationDelay: '.8s' }}>{s.openingTitle}</h1>
        <div className="opening-rule intro-a" aria-hidden style={{ animationDelay: '1.7s' }}><span /><i>✦</i><span /></div>
        <p className="opening-subtitle font-serif intro-a" style={{ animationDelay: '2.2s' }}>{s.subtitle}</p>
        <p className="opening-byline font-serif intro-a" style={{ animationDelay: '3.1s' }}>FOR {s.to.toUpperCase()} <span aria-hidden>·</span> FROM {s.from.toUpperCase()}</p>
        <div className="opening-scroll font-hand intro-a absolute bottom-8 flex flex-col items-center" style={{ animationDelay: '4.4s' }}>
          <span>scroll to begin</span>
          <svg width="30" height="42" viewBox="0 0 30 46" className="bob" aria-hidden><path d="M15 2 Q10 20 15 40 M6 30 L15 42 L24 30" stroke="#f6ead2" strokeWidth="1.8" fill="none" strokeLinecap="round" /></svg>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 1. THE DISTANCE ───────────────────────── */
export function Distance() {
  const L = C.distance.lines;
  return (
    <Scene vh={C.distance.vh} label="Chapter one: the distance" bg="#16203a">
      {p => {
        const tp = lerp(0.35, 1, seg(p, 0.7, 1));
        const bz = (t: number) => ({ x: (1 - t) ** 2 * 550 + 2 * t * (1 - t) * 1250 + t * t * 1950, y: (1 - t) ** 2 * 520 + 2 * t * (1 - t) * 120 + t * t * 520 });
        const pl = bz(tp), pl2 = bz(Math.min(1, tp + 0.01));
        const cam = p < 0.7 ? { x: lerp(500, 1040, ease(seg(p, 0, 0.7))), y: lerp(520, 440, p), z: lerp(1.3, 1.05, seg(p, 0, 0.7)) } : { x: pl.x, y: lerp(440, 380, seg(p, 0.7, 1)), z: lerp(1.05, 1.5, seg(p, 0.8, 1)) };
        const line = seg(p, 0.18, 0.68);
        return (
          <>
            <Stage cam={cam} label="India and the Philippines at night, an ocean between them, a thin line connecting two lit windows"
              defs={<><Grad id="dsky" stops={['#0d1530', '#1f2b52', '#34406a']} /><Grad id="sea" stops={['#24345e', '#162443']} /></>}>
              <Sky fill="url(#dsky)" />
              <g transform={`translate(${cam.x * 0.4} 0)`}><Stars n={140} w={3200} h={900} x0={-1200} y0={-400} seed={11} /><Moon x={800} y={140} r={52} /></g>
              <rect x="-2000" y="560" width="7000" height="3000" fill="url(#sea)" />
              {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${-400 + (i % 10) * 330} ${600 + Math.floor(i / 10) * 70} q20 -8 40 0 t40 0`} stroke="#5c6f9a" strokeWidth="2" fill="none" opacity=".5" />)}
              <path d="M-1500 3000 L-1500 560 Q-200 480 300 530 Q650 500 820 580 L900 3000Z" fill="#26324f" filter="url(#wc)" />
              <path d="M1680 3000 L1700 590 Q1820 520 1960 540 Q2150 520 2300 580 L2320 3000Z M2380 3000 L2400 600 Q2500 560 2700 600 L2720 3000Z" fill="#26324f" filter="url(#wc)" />
              <Tree x={300} y={545} s={0.5} c={['#2f3d5e', '#3a4a6e', '#27344f']} /><Tree x={2250} y={580} s={0.45} c={['#2f3d5e', '#3a4a6e', '#27344f']} />
              <House x={550} y={540} s={0.7} lit={1} wall="#3d4868" roof="#2b3454" />
              <House x={1950} y={545} s={0.7} lit={1} wall="#3d4868" roof="#2b3454" />
              <text x={550} y={620} textAnchor="middle" className="font-hand" fontSize="34" fill="#f2e3c4">{C.distance.places[0]}</text>
              <text x={1950} y={625} textAnchor="middle" className="font-hand" fontSize="34" fill="#f2e3c4">{C.distance.places[1]}</text>
              <path d="M550 520 Q1250 120 1950 520" stroke="#f2d9a8" strokeWidth="2.5" fill="none" strokeDasharray="8 10" opacity=".9" pathLength={1} style={{ strokeDasharray: `${line} 1` }} />
              <Heart x={1250} y={300} s={1.2} c="#e7a59a" o={seg(p, 0.45, 0.6)} />
              <g opacity={seg(p, 0.3, 0.4)}><path d="M1120 400 l40 0 l0 26 l-40 0z M1120 400 l20 14 l20 -14" fill="#f4e7cc" stroke={INK} transform="rotate(-10 1140 410)" /></g>
              <g opacity={seg(p, 0.64, 0.7)}><Plane x={pl.x} y={pl.y} s={0.55} r={(Math.atan2(pl2.y - pl.y, pl2.x - pl.x) * 180) / Math.PI} /></g>
              <g className="drift"><Cloud x={900} y={380} o={0.12} /><Cloud x={1700} y={300} o={0.1} s={1.3} /></g>
            </Stage>
            <Caption o={win(p, 0.08, 0.28)} color="#f6ead2" glow="rgba(20,30,60,.9)" pos="top">{L[0]}</Caption>
            <Caption o={win(p, 0.36, 0.56)} color="#f6ead2" glow="rgba(20,30,60,.9)" pos="top">{L[1]}</Caption>
            <Caption o={win(p, 0.63, 0.88)} color="#f6ead2" glow="rgba(20,30,60,.9)" pos="bottom" size="sm">{L[2]}</Caption>
          </>
        );
      }}
    </Scene>
  );
}

/* ───────────────────────── 2. THE TICKET ───────────────────────── */
export function Airport() {
  const T = C.ticket;
  return (
    <Scene vh={T.vh} label="Chapter two: the ticket" bg="#2a2420">
      {p => {
        const rx = lerp(260, 1200, ease(seg(p, 0.3, 0.62)));
        const walking = p > 0.3 && p < 0.62;
        const cam = p < 0.12 ? { x: 800, y: lerp(-400, 450, ease(seg(p, 0, 0.12))), z: 1 } : p < 0.62 ? { x: lerp(700, 1050, seg(p, 0.25, 0.62)), y: lerp(450, 520, seg(p, 0.12, 0.3)), z: lerp(1, 1.35, seg(p, 0.12, 0.3)) } : { x: lerp(1050, 1150, seg(p, 0.62, 0.8)), y: lerp(520, 330, seg(p, 0.62, 0.85)), z: lerp(1.35, 1.1, seg(p, 0.62, 0.8)) };
        const tk = seg(p, 0.65, 0.88);
        const plx = lerp(1150, 1750, ease(tk)), ply = lerp(470, 120, tk * tk);
        const clouds = seg(p, 0.84, 1);
        const lights = 0.6 + 0.4 * Math.sin(p * 20);
        return (
          <>
            <Stage cam={cam} label="A warm illustrated airport; Razal walks with a suitcase and flowers while a plane waits outside"
              defs={<><Grad id="asky" stops={['#f2c98a', '#f6e1b8', '#bcd2d8']} /><Grad id="afloor" stops={['#c9a27a', '#8a6a4f']} /></>}
              onTop={clouds > 0 ? <g opacity={clouds}><rect width="1600" height="900" fill="#f7efe3" opacity={clouds * 0.9} />{[0, 1, 2, 3, 4, 5].map(i => <Cloud key={i} x={200 + i * 260} y={450 + (i % 2) * 120 - clouds * 60} s={2.5 * clouds + 0.5} o={1} />)}</g> : null}>
              <Sky fill="url(#asky)" />
              <Cloud x={300} y={-300} s={2} o={0.8} /><Cloud x={1200} y={-150} s={1.6} o={0.7} /><Cloud x={700} y={-500} s={1.8} o={0.6} />
              <rect x="-1500" y="80" width="5000" height="700" fill="#e7cfa6" filter="url(#wc)" />
              <rect x="-1500" y="60" width="5000" height="40" fill="#8a6447" />
              {[-300, 100, 500, 900, 1300, 1700].map(x => (
                <g key={x}>
                  <rect x={x} y="140" width="360" height="430" fill="url(#asky)" stroke="#6b4c37" strokeWidth="10" />
                  <line x1={x + 180} y1="140" x2={x + 180} y2="570" stroke="#6b4c37" strokeWidth="5" />
                </g>
              ))}
              <rect x="-300" y="500" width="2360" height="70" fill="#9aa48f" opacity=".7" />
              <rect x="-300" y="530" width="2360" height="8" fill="#e8e0c8" opacity=".6" />
              <Plane x={plx} y={ply} s={1.6} r={-14 * seg(p, 0.7, 0.8)} />
              <Plane x={-100} y={330} s={0.4} r={-8} />
              <g transform="translate(330 170)"><rect x="-150" y="0" width="300" height="110" rx="6" fill="#2d2622" stroke={INK} strokeWidth="3" />
                <text x="0" y="36" textAnchor="middle" fill="#f3b54a" fontFamily="monospace" fontSize="20" opacity={lights}>MNL  MANILA</text>
                <text x="0" y="66" textAnchor="middle" fill="#f3b54a" fontFamily="monospace" fontSize="17">GATE ♥ BOARDING</text>
                <text x="0" y="94" textAnchor="middle" fill="#9fc3a0" fontFamily="monospace" fontSize="15">ON TIME — FINALLY</text></g>
              {[0, 1, 2, 3].map(i => <circle key={i} cx={-100 + i * 600} cy="110" r="90" fill="url(#warmglow)" opacity={0.4 * lights} />)}
              <rect x="-1500" y="780" width="5000" height="2000" fill="url(#afloor)" />
              {Array.from({ length: 14 }, (_, i) => <line key={i} x1={-500 + i * 200} y1="780" x2={-700 + i * 240} y2="1200" stroke="#7a5c45" opacity=".4" />)}
              <g opacity=".45">{[-200, 120, 1500, 1800].map((x, i) => <Person key={x} x={x} y={790} s={0.62} kind={i % 2 ? 'julian' : 'razal'} outfit="#8b7a6c" walk={p * 60 + i} flip={i % 2 === 1} />)}</g>
              {[0, 1, 2, 3, 4].map(i => <g key={i} transform={`translate(${-60 + i * 70} 800)`}><rect x="-28" y="-46" width="56" height="10" rx="4" fill="#5e6e78" /><rect x="-28" y="-80" width="10" height="44" fill="#5e6e78" /><line x1="-20" y1="-36" x2="-20" y2="0" stroke={INK} strokeWidth="3" /><line x1="20" y1="-36" x2="20" y2="0" stroke={INK} strokeWidth="3" /></g>)}
              {p < 0.25 && <g transform="translate(200 754)"><Bouquet s={1.2} /></g>}
              {[620, 1560].map(x => <g key={x} transform={`translate(${x} 800)`}><path d="M-22 0 L22 0 L18 -36 L-18 -36Z" fill="#a85a3e" /><g className="sway"><path d="M0 -36 Q-30 -80 -40 -120 M0 -36 Q10 -100 4 -140 M0 -36 Q30 -80 44 -110" stroke="#5f7f50" strokeWidth="10" fill="none" strokeLinecap="round" /></g></g>)}
              <Suitcase x={rx - 52} y={800} s={1.4} />
              <Person x={rx} y={800} s={1.25} kind="razal" walk={walking ? p * 140 : undefined} armL={walking ? 30 : 20} armR={p < 0.25 ? -6 : -50} holdR={p >= 0.25 ? <Bouquet s={1.1} /> : undefined} label="Razal" />
              <Lamp x={-300} y={800} on={lights} />
            </Stage>
            {(() => { const o = win(p, 0.13, 0.3); if (o <= 0) return null; return (
              <div className="group pointer-events-auto absolute left-1/2 top-[14%] z-10 cursor-default" style={{ opacity: o, transform: `translateX(-50%) rotate(${lerp(-12, -4, o)}deg) translateY(${(1 - o) * 40}px)` }} tabIndex={0} aria-label={`Ticket: ${story.site.from}, ${T.from} to ${T.to}, destination ${T.destination}`}>
                <div className="relative flex" style={{ background: '#f6ecd6', border: `2px solid ${INK}`, borderRadius: 6, boxShadow: '6px 8px 0 rgba(58,44,38,.18)', width: 'min(86vw,520px)' }}>
                  <div className="flex-1 p-5" style={{ borderRight: `2px dashed ${INK}` }}>
                    <p className="font-serif m-0 tracking-[.3em]" style={{ fontSize: 12 }}>BOARDING PASS · ONE WAY</p>
                    <p className="font-serif m-0 mt-2" style={{ fontSize: 28, fontWeight: 600 }}>{story.site.from.toUpperCase()}</p>
                    <p className="font-serif m-0" style={{ fontSize: 20 }}>{T.from} <span className="font-hand">→</span> {T.to}</p>
                    <p className="font-serif m-0 mt-2 tracking-[.2em]" style={{ fontSize: 12 }}>DESTINATION</p>
                    <p className="font-hand m-0" style={{ fontSize: 40, color: '#b04c3f', lineHeight: 1 }}>{T.destination}</p>
                    <p className="font-hand m-0 mt-1 max-h-0 overflow-hidden opacity-0 transition-all duration-700 group-hover:max-h-20 group-hover:opacity-100 group-focus:max-h-20 group-focus:opacity-100" style={{ fontSize: 18 }}>{T.note}</p>
                  </div>
                  <div className="flex w-24 flex-col items-center justify-center p-2">
                    <svg width="60" height="60" viewBox="-30 -30 60 60"><circle r="26" fill="none" stroke="#b04c3f" strokeWidth="2" strokeDasharray="4 3" /><Heart x={0} y={-12} s={0.9} c="#b04c3f" fill /></svg>
                    <span className="font-hand" style={{ fontSize: 15 }}>seat 1A ♥</span>
                  </div>
                </div>
              </div>); })()}
          </>
        );
      }}
    </Scene>
  );
}

/* ───────────────────────── 3. FINALLY ───────────────────────── */
export function Arrival() {
  const L = C.arrival.lines;
  return (
    <Scene vh={C.arrival.vh} label="Chapter three: finally" bg="#f3e2c2">
      {p => {
        const reveal = seg(p, 0.08, 0.3);
        let cam = p < 0.3 ? camLerp({ x: 1100, y: 860, z: 3.4 }, { x: 1000, y: 560, z: 1.3 }, ease(reveal)) : camLerp({ x: 1000, y: 560, z: 1.3 }, { x: 800, y: 540, z: 1.05 }, ease(seg(p, 0.3, 0.42)));
        if (p > 0.58) cam = camLerp(cam, { x: 800, y: 660, z: 2.1, r: Math.sin(seg(p, 0.6, 0.85) * Math.PI) * 4 }, ease(seg(p, 0.58, 0.72)));
        const run = ease(seg(p, 0.48, 0.6));
        const rx = p < 0.48 ? lerp(-120, 430, ease(seg(p, 0.3, 0.42))) : lerp(430, 772, run);
        const jx = lerp(1100, 830, run);
        const hug = seg(p, 0.58, 0.64);
        const kiss = seg(p, 0.7, 0.76);
        const clouds = 1 - seg(p, 0, 0.1);
        const jy = 780;
        return (
          <>
            <Stage cam={cam} label="A sunlit arrival hall in the Philippines; Julian waits, Razal arrives, they run to each other and hug"
              defs={<Grad id="arsky" stops={['#fbe4b4', '#f9efd6', '#cfe3d6']} />}
              onTop={clouds > 0 ? <g opacity={clouds}><rect width="1600" height="900" fill="#f7efe3" />{[0, 1, 2, 3, 4].map(i => <Cloud key={i} x={i * 400 + (i % 2 ? -1 : 1) * (1 - clouds) * 600} y={300 + i * 90} s={3} />)}</g> : null}>
              <Sky fill="url(#arsky)" />
              <rect x="-1500" y="90" width="5000" height="700" fill="#f1dcb5" filter="url(#wc)" />
              {[-200, 300, 800, 1300, 1800].map(x => <g key={x}><rect x={x} y="160" width="400" height="430" fill="url(#arsky)" stroke="#8c6a4c" strokeWidth="9" />
                <Tree x={x + 120} y={590} s={0.7} c={['#8fb07a', '#b6c98b', '#6f945f']} />
                <g transform={`translate(${x + 300} 590)`}><path d="M0 0 Q-4 -80 6 -150" stroke="#8a6447" strokeWidth="8" fill="none" /><g className="sway">{[-60, -20, 20, 60, 100].map(a => <path key={a} d={`M6 -150 q${a} -10 ${a * 1.3} 30`} stroke="#6f9a5c" strokeWidth="7" fill="none" strokeLinecap="round" />)}</g></g></g>)}
              <circle cx="1500" cy="200" r="260" fill="url(#glow)" opacity=".7" />
              <g transform="translate(800 120)"><rect x="-260" y="-36" width="520" height="62" rx="4" fill="#5f7a5c" stroke={INK} strokeWidth="2" /><text textAnchor="middle" y="6" className="font-serif" fill="#f6ecd6" fontSize="26" letterSpacing="5">ARRIVALS · MALIGAYANG PAGDATING</text></g>
              <rect x="-1500" y="780" width="5000" height="2000" fill="#d8bb92" />
              {Array.from({ length: 12 }, (_, i) => <line key={i} x1={-400 + i * 220} y1="780" x2={-700 + i * 280} y2="1300" stroke="#b39672" opacity=".5" />)}
              <g opacity=".4">{[60, 240, 1400, 1520].map((x, i) => <Person key={x} x={x} y={780} s={0.8} kind={i % 2 ? 'julian' : 'razal'} outfit="#9a8a78" flip={i > 1} />)}</g>
              <Suitcase x={p < 0.48 ? rx - 56 : 380} y={780} s={1.2} />
              <Person x={rx} y={jy} s={1.2} kind="razal" walk={(p > 0.3 && p < 0.42) || (p > 0.48 && p < 0.6) ? p * 160 : undefined}
                armL={lerp(10, -110, hug)} armR={lerp(-30, -95, hug)} holdR={hug < 0.5 ? <Bouquet /> : undefined} lean={kiss * 6} label="Razal" />
              <Person x={jx} y={jy} s={1.12} kind="julian" flip outfit="#e7b8a8" walk={p > 0.48 && p < 0.6 ? p * 240 : undefined}
                armL={lerp(0, -120, hug)} armR={lerp(-10, -100, hug)} lean={kiss * 6} label="Julian" />
              {hug > 0.5 && <g transform="translate(760 700) rotate(-20)"><Bouquet s={1.2} /></g>}
              {kiss > 0 && <g opacity={kiss}><Heart x={800} y={lerp(560, 470, seg(p, 0.72, 0.9))} s={1.1} c="#d9766c" fill /><Heart x={830} y={lerp(590, 440, seg(p, 0.74, 0.95))} s={0.6} c="#e7a59a" /></g>}
            </Stage>
            <Caption o={win(p, 0.8, 0.86, 0.03)} pos="top">{L[0]}</Caption>
            <Caption o={win(p, 0.87, 0.92, 0.03)} pos="top">{L[1]}</Caption>
            <Caption o={win(p, 0.94, 1.2, 0.03)} pos="bottom" size="sm">{L[2]}</Caption>
          </>
        );
      }}
    </Scene>
  );
}

/* ───────────────────────── 4. THE LITTLE LIFE ───────────────────────── */
function Couple({ x, y, s = 1, walk, sit, hold = true, age = 0, oR, oJ }: { x: number; y: number; s?: number; walk?: number; sit?: boolean; hold?: boolean; age?: number; oR?: string; oJ?: string }) {
  return (
    <g>
      <Person x={x - 26 * s} y={y} s={s} kind="razal" walk={walk} sit={sit} armR={hold ? -28 : -6} age={age} outfit={oR} />
      <Person x={x + 26 * s} y={y} s={s * 0.94} kind="julian" walk={walk !== undefined ? walk + 3 : undefined} sit={sit} armL={hold ? 28 : 6} age={age} outfit={oJ} />
    </g>
  );
}
function DateScene({ i, q }: { i: number; q: number }) {
  const pan = (q - 0.5) * 120;
  switch (i) {
    case 0: return (<g>
      <rect x="-2000" y="-2000" width="6000" height="5000" fill="#e9cfa8" />
      <rect x="250" y="120" width="500" height="380" fill="#f6e3bd" stroke="#7a5838" strokeWidth="10" /><Tree x={420} y={500} s={0.9} c={['#9db57d', '#c3cf93', '#82a06c']} />
      <circle cx="1150" cy="200" r="70" fill="url(#warmglow)" /><path d="M1150 110 L1150 170 M1120 170 L1180 170 L1165 200 L1135 200Z" stroke={INK} fill="#e5b36a" />
      <rect x="-2000" y="700" width="6000" height="3000" fill="#a77a55" />
      <Chair x={600} y={700} s={1.15} floorY={760} /><Chair x={1000} y={700} s={1.1} floorY={760} />
      <ellipse cx="800" cy="640" rx="190" ry="20" fill="#7b5236" /><line x1="800" y1="640" x2="800" y2="760" stroke={INK} strokeWidth="8" />
      <SeatedPerson x={600} seatY={700} floorY={760} s={1.25} kind="razal" armR={-70} />
      <SeatedPerson x={1000} seatY={700} floorY={760} s={1.2} kind="julian" flip armR={-60} />
      <Cup x={740} y={636} s={1.6} /><Cup x={860} y={636} s={1.6} c="#e8c7b0" />
      <g opacity={seg(q, 0.7, 1)}><Cloud x={760} y={lerp(560, 300, q)} s={lerp(.2, 1.4, seg(q, .7, 1))} o={.8} /></g>
    </g>);
    case 1: return (<g>
      <rect x="-2000" y="-2000" width="6000" height="5000" fill="#cfe0d4" />
      <g transform={`translate(${-pan * 0.3} 0)`}><Cloud x={300} y={160} o={.9} /><Cloud x={1300} y={220} s={1.2} /></g>
      <g transform={`translate(${-pan} 0)`}>{[-200, 200, 600, 1000, 1400, 1800].map(x => <Tree key={x} x={x} y={700} s={1.1} />)}
        {[0, 400, 800, 1200, 1600].map(x => <Lamp key={x} x={x + 100} y={720} on={0} />)}</g>
      <rect x="-2000" y="700" width="6000" height="3000" fill="#c9b08a" /><path d="M-2000 760 L4000 760" stroke="#f1e4c9" strokeWidth="6" strokeDasharray="40 30" />
      {[200, 500, 1100, 1400].map(x => <Flower key={x} x={x - pan * 1.4} y={705} c={x % 3 ? '#d9766c' : '#e8c35a'} />)}
      <Couple x={800} y={800} s={1.3} walk={q * 50} oJ="#c27d8a" />
    </g>);
    case 2: return (<g>
      <rect x="-2000" y="-2000" width="6000" height="5000" fill="#9fb1bf" />
      {[100, 450, 1150, 1450].map((x, k) => <g key={x}><rect x={x - 120} y={200 + k % 2 * 60} width="240" height="600" fill={['#7e8fa0', '#8a9aa6', '#748698', '#8796a3'][k]} filter="url(#wc)" />{[0, 1, 2].map(r => <rect key={r} x={x - 70} y={260 + r * 120 + k % 2 * 60} width="50" height="60" fill="#f2d79a" opacity=".7" />)}</g>)}
      <rect x="-2000" y="760" width="6000" height="3000" fill="#6f7f8c" /><ellipse cx="800" cy="840" rx="300" ry="20" fill="#9fb1bf" opacity=".6" />
      <Particles kind="rain" n={46} seed={4} />
      <Couple x={800} y={820} s={1.3} walk={q * 40} hold oR="#4f6b78" oJ="#b9655b" />
      <g transform="translate(800 560)" filter="url(#wob)"><path d="M-130 0 Q0 -110 130 0 Q100 -12 65 0 Q32 -14 0 0 Q-32 -14 -65 0 Q-100 -12 -130 0Z" fill="#c9564b" stroke={INK} strokeWidth="2" /><line x1="0" y1="-60" x2="-30" y2="120" stroke={INK} strokeWidth="3" /></g>
      <g opacity={seg(q, .75, 1)}><Stars n={40} h={400} seed={2} /></g>
    </g>);
    case 3: return (<g>
      <rect x="-2000" y="-2000" width="6000" height="5000" fill="#1f2a4a" /><Stars n={120} w={1800} h={600} x0={-100} y0={-100} seed={7} /><Moon x={1250} y={170} r={46} />
      <rect x="-2000" y="740" width="6000" height="3000" fill="#2f3a55" />
      {[200, 600, 1000, 1400].map(x => <Lamp key={x} x={x - pan} y={760} />)}
      <Couple x={800} y={820} s={1.3} walk={q * 40} oR="#3e5664" oJ="#7d5a78" />
      <Heart x={830} y={540} s={0.7} c="#f2c6b8" o={seg(q, .3, .6)} />
    </g>);
    case 4: return (<g>
      <rect x="-2000" y="-2000" width="6000" height="5000" fill="#f2b077" /><circle cx="800" cy={lerp(520, 600, q)} r="130" fill="#f8d68f" filter="url(#wc)" /><circle cx="800" cy="560" r="400" fill="url(#warmglow)" />
      <rect x="-2000" y="600" width="6000" height="3000" fill="#c87d68" /><path d="M-2000 650 L4000 650" stroke="#f5c48a" strokeWidth="4" opacity=".6" /><path d="M500 680 L1100 680" stroke="#f8d68f" strokeWidth="10" opacity=".4" />
      <path d="M-1600 700 Q800 666 3200 700 M-1200 725 Q800 690 2800 725" stroke="#f0cb94" strokeWidth="3" fill="none" opacity=".35" />
      <rect x="-2000" y="760" width="6000" height="3000" fill="#e3c08f" />
      <PalmTree x={255} y={860} s={1.05} c="#687751" o={.72} />
      <PalmTree x={1360} y={860} s={1.18} c="#596f4d" o={.66} />
      <Couple x={800} y={830} s={1.3} oR="#4d5e6a" oJ="#e6c8a8" /><Birds y={240} c="#7a4a3a" />
    </g>);
    case 5: return (<g>
      <rect x="-2000" y="-2000" width="6000" height="5000" fill="#d8e6cf" /><Cloud x={400} y={180} /><Cloud x={1250} y={140} s={0.9} />
      <Hills y={620} c="#a9c08a" seed={3} /><Tree x={250} y={720} s={1.4} /><Tree x={1380} y={730} s={1.2} />
      <rect x="-2000" y="740" width="6000" height="3000" fill="#9fb67c" />
      {[300, 520, 1060, 1250].map(x => <Flower key={x} x={x} y={760} c="#f0c3b5" />)}
      <Bench x={800} y={800} s={1.2} />
      <SeatedPerson x={740} seatY={benchSeatY(800, 1.2)} floorY={800} s={1.25} kind="razal" lean={-6 + Math.sin(q * 30) * 4} armR={-40} />
      <SeatedPerson x={860} seatY={benchSeatY(800, 1.2)} floorY={800} s={1.2} kind="julian" flip lean={-6 + Math.cos(q * 30) * 4} armR={-40} />
      {[0, 1, 2].map(k => <text key={k} x={790 + k * 30} y={500 - k * 20 - q * 40} className="font-hand" fontSize="30" fill="#b45f50" opacity={seg(q, .2 + k * .1, .4 + k * .1)}>ha</text>)}
    </g>);
    case 6: return (<g>
      <rect x="-2000" y="-2000" width="6000" height="5000" fill="#182240" /><Stars n={100} w={1800} h={700} seed={9} /><Moon x={400} y={200} r={40} />
      <rect x="900" y="-200" width="1500" height="1400" fill="#d9b88a" /><rect x="1000" y="250" width="240" height="320" fill="#ffd68a" opacity=".85" /><circle cx="1120" cy="420" r="200" fill="url(#warmglow)" />
      <rect x="-2000" y="780" width="6000" height="3000" fill="#6b4a38" /><path d="M300 640 L900 640 M300 640 L300 780 M450 640 L450 780 M600 640 L600 780 M750 640 L750 780" stroke={INK} strokeWidth="5" />
      <Person x={640} y={780} s={1.25} kind="razal" lean={4} armL={-60} />
      <Person x={720} y={780} s={1.2} kind="julian" flip armR={-50} />
      <Cup x={540} y={636} s={1.3} /><Cup x={820} y={636} s={1.3} />
    </g>);
    default: return (<g>
      <rect x="-2000" y="-2000" width="6000" height="5000" fill="#f1d3a3" />
      <path d="M300 300 L1300 300 L1360 380 L240 380Z" fill="#c9564b" stroke={INK} strokeWidth="3" />{[0, 1, 2, 3, 4, 5].map(k => <path key={k} d={`M${300 + k * 200} 380 q50 40 100 0 q50 40 100 0`} fill="#f4e7cc" stroke={INK} />)}
      {[0, 1, 2, 3, 4].map(k => <circle key={k} cx={360 + k * 220} cy="280" r="14" fill="#f3b54a" opacity={.8} />)}
      <rect x="-2000" y="760" width="6000" height="3000" fill="#b88a63" /><rect x="560" y="620" width="480" height="20" fill="#7b5236" />
      <Person x={700} y={800} s={1.25} kind="razal" armR={-80} holdR={<path d="M0 0 L40 -6" stroke="#8a5c3c" strokeWidth="3" />} />
      <Person x={900} y={800} s={1.2} kind="julian" flip armR={-70} />
      <ellipse cx="800" cy="612" rx="40" ry="10" fill="#f4e7cc" stroke={INK} /><circle cx="800" cy="600" r="12" fill="#d08a3a" />
    </g>);
  }
}
export function Dating() {
  const caps = C.dating.captions, N = caps.length;
  return (
    <Scene vh={C.dating.vh} label="Chapter four: the little life" bg="#e9cfa8">
      {p => {
        const f = p * N, i = Math.min(N - 1, Math.floor(f)), q = f - i;
        const nextO = i < N - 1 ? seg(q, 0.82, 1) : 0;
        const z = lerp(1.0, 1.12, q);
        return (
          <>
            <Stage cam={{ x: 800, y: 560, z }} label={`A little moment: ${caps[i]}`}>
              <DateScene i={i} q={q} />
              {nextO > 0 && <g opacity={nextO}><DateScene i={i + 1} q={0} /></g>}
            </Stage>
            <Caption o={win(q, 0.15, 0.75, 0.1)} pos="top" color={i === 3 || i === 6 ? '#f6ead2' : '#3a2c26'} glow={i === 3 || i === 6 ? 'rgba(20,30,60,.9)' : undefined}>{caps[i]}</Caption>
          </>
        );
      }}
    </Scene>
  );
}

/* ───────────────────────── 5. THE PROPOSAL ───────────────────────── */
export function Proposal({ choice, onYes, onNotYet }: { choice: Choice; onYes: () => void; onNotYet: () => void }) {
  const P = story.proposal;
  return (
    <Scene vh={C.proposal.vh} label="Chapter five: the proposal" bg="#e9a774">
      {p => {
        const cam = camLerp({ x: 800, y: 480, z: 1 }, { x: 800, y: 620, z: 2 }, ease(seg(p, 0.05, 0.5)));
        const reach = seg(p, 0.3, 0.44), ring = seg(p, 0.44, 0.54);
        const haze = seg(p, 0.5, 0.65) * 0.45;
        const showChoice = p > 0.9;
        return (
          <>
            <Stage cam={cam} label="A sunset park; Razal holds out a ring to Julian on a bench" defs={<Grad id="psky" stops={['#f0a46c', '#f6c98a', '#f3dcb0']} />}>
              <Sky fill="url(#psky)" />
              <circle cx="800" cy="520" r="150" fill="#fbe0a0" filter="url(#wc)" /><circle cx="800" cy="520" r="520" fill="url(#warmglow)" />
              <Birds y={260} c="#7a4a3a" />
              <Hills y={600} c="#c98a6a" seed={8} amp={50} /><Hills y={660} c="#9c7a52" seed={2} amp={40} />
              <Tree x={260} y={780} s={1.8} c={['#7d8a4c', '#a8a65c', '#5f6f42']} /><Tree x={1360} y={790} s={1.6} c={['#7d8a4c', '#a8a65c', '#5f6f42']} />
              <g opacity={0.34} filter="url(#wc)">
                <path d="M420 770 L420 600 Q420 430 800 405 Q1180 430 1180 600 L1180 770" fill="none" stroke="#785940" strokeWidth="13" />
                <path d="M460 770 L460 620 Q460 480 800 450 Q1140 480 1140 620 L1140 770" fill="none" stroke="#b18a60" strokeWidth="4" />
                <path d="M420 650 L1180 650 M420 700 L1180 700" fill="none" stroke="#785940" strokeWidth="4" opacity=".65" />
              </g>
              <g opacity={0.62}>{Array.from({ length: 11 }, (_, k) => {
                const x = 440 + k * 72, t = (x - 800) / 360, y = 420 + 180 * t * t;
                return <Flower key={k} x={x} y={y + 38} s={0.82} c={k % 2 ? '#e9a7a2' : '#f0c3b5'} stem={false} />;
              })}</g>
              <rect x="-2000" y="760" width="6000" height="3000" fill="#8f9a56" />
              <path d="M520 980 Q650 835 800 788 Q950 835 1080 980" fill="none" stroke="#d7bd89" strokeWidth="38" opacity=".32" />
              {Array.from({ length: 16 }, (_, k) => <Flower key={k} x={400 + k * 52} y={770 + (k % 3) * 14} s={0.9} c={['#d9766c', '#f0c3b5', '#e8c35a'][k % 3]} />)}
              <Bench x={800} y={790} s={1.1} />
              <SeatedPerson x={745} seatY={benchSeatY(790, 1.1)} floorY={790} s={1.15} kind="razal" armR={lerp(-10, -75, reach)} holdR={ring > 0 ? <Ring x={0} y={-6} s={0.5 + ring * 0.4} glow={ring} /> : undefined} outfit="#4f6573" />
              <SeatedPerson x={860} seatY={benchSeatY(790, 1.1)} floorY={790} s={1.1} kind="julian" flip armR={lerp(-5, -40, seg(p, 0.6, 0.8))} outfit="#e9d2b8" />
              <rect x="-2000" y="-2000" width="6000" height="6000" fill="#f6dcb0" opacity={haze} />
              <g opacity={haze * 2}><SeatedPerson x={745} seatY={benchSeatY(790, 1.1)} floorY={790} s={1.15} kind="razal" armR={-75} holdR={<Ring x={0} y={-6} s={0.9} glow={1} />} outfit="#4f6573" /><SeatedPerson x={860} seatY={benchSeatY(790, 1.1)} floorY={790} s={1.1} kind="julian" flip armR={lerp(-5, -40, seg(p, 0.6, 0.8))} outfit="#e9d2b8" /></g>
              <Particles kind="petal" n={12} seed={5} />
            </Stage>
            <Caption o={win(p, 0.56, 1.2)} pos="top" size="lg" serif color="#7a2f28">{story.site.to.toUpperCase()}…</Caption>
            <Caption o={win(p, 0.64, 1.2)} pos="upper" size="lg" serif color="#7a2f28" style={{ top: '19%' }}>{P.question}</Caption>
            <div className="proposal-vow pointer-events-none absolute left-1/2 top-[32%] z-10 flex -translate-x-1/2 flex-col items-center gap-1 px-6 text-center font-hand" style={{ color: '#3a2c26', fontSize: 'clamp(19px,2.2vw,28px)', textShadow: '0 0 14px rgba(255,240,215,.95)' }}>
              {P.lines.map((l, k) => <span key={k} style={{ opacity: seg(p, 0.72 + k * 0.05, 0.76 + k * 0.05) }}>{l}</span>)}
            </div>
            {showChoice && (
              <div className="proposal-choices absolute bottom-[5%] left-0 right-0 z-20 flex items-center justify-center gap-10" style={{ opacity: seg(p, 0.9, 0.95) }} role="group" aria-label="Your answer">
                {choice === 'yes' ? (
                  <p className="font-hand" style={{ fontSize: 'clamp(28px,4vw,46px)', color: '#7a2f28', textShadow: '0 0 14px #fff2dc' }}>{P.yesText} <span aria-hidden>❤</span></p>
                ) : (<>
                  <button className="choice choice--proposal choice--yes" style={{ fontSize: 'clamp(34px,5vw,58px)', color: '#9b3e3d' }} onClick={onYes}>{P.yesLabel}</button>
                  <button className="choice choice--proposal choice--quiet" style={{ fontSize: 'clamp(24px,3vw,36px)', color: '#58463b' }} onClick={onNotYet}>{P.notYetLabel}</button>
                </>)}
              </div>
            )}
          </>
        );
      }}
    </Scene>
  );
}

export function YesOverlay({ onDone }: { onDone: () => void }) {
  const P = story.proposal;
  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-label={P.yesText} style={{ background: 'linear-gradient(#f2b27a,#f7d9a6 60%,#a9b46a 60%)', animation: 'fadeIn 1.5s ease both' }}>
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="800" cy="460" r="600" fill="url(#warmglow)" />
        <Birds y={200} c="#7a4a3a" />
        {Array.from({ length: 46 }, (_, k) => (
          <g key={k} className="bloom" style={{ animationDelay: `${1 + k * 0.12}s` }}>
            <Flower x={(k * 137) % 1600} y={560 + ((k * 53) % 320)} s={1 + (k % 4) * 0.4} c={['#d9766c', '#f0c3b5', '#e8c35a', '#fff3e6', '#c9564b'][k % 5]} />
          </g>
        ))}
        <g className="bloom" style={{ animationDelay: '.4s' }}><Bench x={800} y={720} s={0.8} /><SeatedPerson x={760} seatY={benchSeatY(720, 0.8)} floorY={720} s={0.8} kind="razal" armR={-30} outfit="#4f6573" /><SeatedPerson x={840} seatY={benchSeatY(720, 0.8)} floorY={720} s={0.78} kind="julian" flip armR={-30} outfit="#e9d2b8" /></g>
      </svg>
      {Array.from({ length: 14 }, (_, k) => (
        <svg key={k} className="rise absolute" style={{ left: `${(k * 71) % 100}%`, bottom: -40, animationDelay: `${2 + k * 0.5}s` }} width="40" height="40" viewBox="-20 -6 40 34" aria-hidden><Heart x={0} y={0} s={1} c="#c9564b" fill /></svg>
      ))}
      <div className="absolute inset-x-0 top-[14%] flex flex-col items-center px-6 text-center">
        <h2 className="font-serif intro-a" style={{ fontSize: 'clamp(44px,8vw,110px)', color: '#7a2f28', animationDelay: '2.6s', letterSpacing: '.06em', margin: 0, textShadow: '0 0 30px #fff3dc' }}>{P.yesText}</h2>
        <p className="font-hand intro-a" style={{ fontSize: 'clamp(22px,3vw,36px)', animationDelay: '4.2s', textShadow: '0 0 14px #fff3dc' }}>{P.yesLine}</p>
        <button className="choice intro-a mt-4" style={{ fontSize: 30, color: '#3a2c26', animationDelay: '6s' }} onClick={onDone}>turn the page →</button>
      </div>
    </div>
  );
}

export function NotYetOverlay({ onContinue }: { onContinue: () => void }) {
  const P = story.proposal;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label={P.notYetText} style={{ background: 'linear-gradient(#3b4a6b,#7d8aa6 70%,#c9b79a)', animation: 'fadeIn 1.5s ease both' }}>
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <Stars n={70} h={420} seed={21} /><Moon x={1200} y={180} r={44} />
        <g className="drift"><Cloud x={400} y={300} o={0.25} /><Cloud x={1100} y={380} o={0.2} /></g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ color: '#f6ead2' }}>
        <h2 className="font-hand intro-a" style={{ fontSize: 'clamp(44px,7vw,90px)', margin: 0, animationDelay: '.8s' }}>{P.notYetText}</h2>
        <p className="font-serif intro-a italic" style={{ fontSize: 'clamp(20px,2.6vw,30px)', animationDelay: '2.4s' }}>{P.notYetLine}</p>
        <button className="choice intro-a mt-6" style={{ fontSize: 30, color: '#f6ead2', animationDelay: '3.8s' }} onClick={onContinue}>continue dreaming →</button>
      </div>
    </div>
  );
}
