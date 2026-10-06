import { useEffect, useRef, useState } from 'react';
import { story } from './story';
import type { Choice } from './story';
import { GlobalDefs, PaperOverlay } from './engine';
import { Intro, Distance, Airport, Arrival, Dating, Proposal, YesOverlay, NotYetOverlay } from './scenes1';
import { Wedding, Home, Family, Growing, LettingGo, Travel, Time, Final, End } from './scenes2';

function Loader({ done }: { done: boolean }) {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center transition-opacity duration-1000" style={{ background: '#f4ead6', opacity: done ? 0 : 1, pointerEvents: done ? 'none' : 'auto' }} aria-live="polite">
      <svg width="220" height="160" viewBox="0 0 220 160" aria-hidden>
        <path className="draw" d="M110 140 Q106 110 110 90 M110 112 Q96 104 92 112 Q100 118 110 112" stroke="#5f7a4c" strokeWidth="2.5" fill="none" />
        <path className="draw" style={{ animationDelay: '.8s' }} d="M110 90 C104 76 84 72 86 88 C88 100 104 106 110 118 C116 106 132 100 134 88 C136 72 116 76 110 90Z" stroke="#c9564b" strokeWidth="2.5" fill="none" />
        <path className="draw" style={{ animationDelay: '1.6s' }} d="M20 40 Q60 10 110 30 T200 30" stroke="#3a2c26" strokeWidth="1.5" fill="none" />
      </svg>
      <p className="font-hand intro-a" style={{ fontSize: 30, color: '#3a2c26', animationDelay: '.6s' }}>Painting your future…</p>
    </div>
  );
}

/** Optional, generated, royalty-free ambient piano-like tones (Web Audio). Never auto-plays. */
function useAmbient(on: boolean) {
  const ctx = useRef<AudioContext | null>(null);
  const timer = useRef<number>(0);
  useEffect(() => {
    if (!on) { if (ctx.current) ctx.current.suspend(); clearInterval(timer.current); return; }
    if (!ctx.current) ctx.current = new AudioContext();
    const ac = ctx.current; ac.resume();
    const master = ac.createGain(); master.gain.value = story.sound.volume; master.connect(ac.destination);
    const scale = [261.6, 293.7, 329.6, 392, 440, 523.3, 587.3, 659.3];
    const note = () => {
      const docH = document.documentElement.scrollHeight - innerHeight;
      const prog = docH > 0 ? scrollY / docH : 0;
      const shift = prog > 0.85 ? 0.75 : 1;
      const f = scale[Math.floor(Math.random() * scale.length)] * shift;
      [1, 2].forEach((h, i) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = i ? 'sine' : 'triangle'; o.frequency.value = f * h;
        g.gain.setValueAtTime(0, ac.currentTime); g.gain.linearRampToValueAtTime(i ? 0.15 : 0.5, ac.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 3.5);
        o.connect(g); g.connect(master); o.start(); o.stop(ac.currentTime + 3.6);
      });
    };
    note();
    timer.current = window.setInterval(() => { if (Math.random() > 0.25) note(); }, 1400);
    return () => { clearInterval(timer.current); master.disconnect(); };
  }, [on]);
}

export default function App() {
  const key = story.site.storageKey;
  const [loaded, setLoaded] = useState(false);
  const [choice, setChoice] = useState<Choice>(() => (localStorage.getItem(key) as Choice) || null);
  const [overlay, setOverlay] = useState<'yes' | 'notyet' | null>(null);
  const [sound, setSound] = useState(story.sound.enabledByDefault);
  const [prog, setProg] = useState(0);
  const weddingRef = useRef<HTMLDivElement>(null);
  useAmbient(sound);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 3400);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const on = () => { const h = document.documentElement.scrollHeight - innerHeight; setProg(h > 0 ? scrollY / h : 0); };
    addEventListener('scroll', on, { passive: true }); return () => removeEventListener('scroll', on);
  }, []);
  useEffect(() => { document.body.style.overflow = overlay || !loaded ? 'hidden' : ''; }, [overlay, loaded]);

  const save = (c: Choice) => { setChoice(c); if (c) localStorage.setItem(key, c); else localStorage.removeItem(key); };
  const goNext = () => { setOverlay(null); setTimeout(() => weddingRef.current?.scrollIntoView({ behavior: 'smooth' }), 80); };
  const restart = () => { save(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const unlocked = choice !== null;

  return (
    <main className="relative">
      <GlobalDefs />
      <Loader done={loaded} />
      <Intro />
      <Distance />
      <Airport />
      <Arrival />
      <Dating />
      <Proposal choice={choice} onYes={() => { save('yes'); setOverlay('yes'); }} onNotYet={() => setOverlay('notyet')} />
      {unlocked && (
        <>
          <div ref={weddingRef} />
          <Wedding />
          <Home />
          <Family />
          <Growing />
          <LettingGo />
          <Travel />
          <Time />
          <Final />
          <End onRestart={restart} />
        </>
      )}
      {overlay === 'yes' && <YesOverlay onDone={goNext} />}
      {overlay === 'notyet' && <NotYetOverlay onContinue={() => { if (choice !== 'yes') save('notyet'); goNext(); }} />}
      <PaperOverlay />
      {/* hand-drawn progress thread */}
      <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-50 h-[3px]" style={{ width: `${prog * 100}%`, background: 'repeating-linear-gradient(90deg,#b04c3f 0 10px,transparent 10px 16px)', opacity: 0.6 }} />
      <div className="fixed bottom-3 right-4 z-50 flex items-center gap-3 font-hand" style={{ fontSize: 18 }}>
        <button onClick={() => setSound(s => !s)} aria-pressed={sound} aria-label={sound ? 'Turn sound off' : 'Turn sound on'}
          className="cursor-pointer" style={{ background: 'rgba(251,243,223,.75)', border: '1px solid #3a2c26', borderRadius: 999, padding: '2px 12px', color: '#3a2c26' }}>
          {sound ? '♪ sound on' : '♪ sound off'}
        </button>
        {choice && <button onClick={restart} className="cursor-pointer" style={{ background: 'none', border: 'none', color: '#f3e4c8', opacity: 0.5, textShadow: '0 0 6px #000' }} aria-label="Restart the story and reset the proposal">↺</button>}
      </div>
    </main>
  );
}
