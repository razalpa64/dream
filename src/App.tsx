import { useEffect, useRef, useState } from 'react';
import { story } from './story';
import type { Choice } from './story';
import { GlobalDefs, PaperOverlay } from './engine';
import { Intro, Distance, Airport, Arrival, Dating, Proposal, YesOverlay, NotYetOverlay } from './scenes1';
import { Wedding, Home, Family, Growing, LettingGo, Travel, Time, Final, End } from './scenes2';

function ReadingThread() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const range = document.documentElement.scrollHeight - innerHeight;
        const next = range > 0 ? Math.max(0, Math.min(1, scrollY / range)) : 0;
        setProg(current => Math.abs(current - next) < 0.001 ? current : next);
      });
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => { removeEventListener('scroll', update); removeEventListener('resize', update); cancelAnimationFrame(raf); };
  }, []);
  return <div aria-hidden className="reading-thread pointer-events-none fixed left-0 top-0 z-50" style={{ width: `${prog * 100}%` }} />;
}

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

export default function App() {
  const key = story.site.storageKey;
  const [loaded, setLoaded] = useState(false);
  const [choice, setChoice] = useState<Choice>(() => (localStorage.getItem(key) as Choice) || null);
  const [overlay, setOverlay] = useState<'yes' | 'notyet' | null>(null);
  const [sound, setSound] = useState(story.sound.enabledByDefault);
  const weddingRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const music = musicRef.current;
    if (!music) return;
    music.volume = story.sound.volume;
    if (!sound) { music.pause(); return; }
    void music.play().catch(() => setSound(false));
  }, [sound]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 3400);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { document.body.style.overflow = overlay || !loaded ? 'hidden' : ''; }, [overlay, loaded]);

  const save = (c: Choice) => { setChoice(c); if (c) localStorage.setItem(key, c); else localStorage.removeItem(key); };
  const goNext = () => { setOverlay(null); setTimeout(() => weddingRef.current?.scrollIntoView({ behavior: 'smooth' }), 80); };
  const restart = () => { save(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const unlocked = choice !== null;

  return (
    <main className="relative">
      <audio ref={musicRef} src="./music.m4a" loop preload="metadata" />
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
      {/* a fine gilded thread marks the reader's place without rerendering the story */}
      <ReadingThread />
      <div className="story-controls fixed bottom-3 right-4 z-50 flex items-center gap-2 font-hand">
        <button onClick={() => setSound(s => !s)} aria-pressed={sound} aria-label={sound ? 'Turn music off' : 'Turn music on'} className="sound-toggle">
          <span aria-hidden className="sound-toggle-icon">{sound ? '♫' : '♪'}</span> {sound ? 'music on' : 'music off'}
        </button>
        {choice && <button onClick={restart} className="restart-button" aria-label="Restart the story and reset the proposal">↺</button>}
      </div>
    </main>
  );
}
