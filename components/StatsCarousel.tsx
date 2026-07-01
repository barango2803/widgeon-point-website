'use client';
import { useEffect, useRef, useState } from 'react';
import { carouselImages } from '@/lib/carousel-images';

export default function StatsCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const go = (next: number) => {
    if (fading) return;
    setPrev(current);
    setFading(true);
    setTimeout(() => {
      setCurrent(next);
      setPrev(null);
      setFading(false);
    }, 900);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      go((current + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, fading]);

  const stats = [
    { num: 1966, suffix: '',  lbl: 'Year Founded' },
    { num: 5,    suffix: '',  lbl: 'Generations of Leadership' },
    { num: 287,  suffix: '+', lbl: 'Organizations Supported' },
    { num: 58,   suffix: '+', lbl: 'Years of Giving' },
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: 220 }}>
      {/* Carousel BG layers */}
      {carouselImages.map((img, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${img.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.9s ease',
            zIndex: 0,
          }}
        />
      ))}

      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,26,64,0.72)', zIndex: 1 }} />

      {/* Org label */}
      <div style={{
        position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        zIndex: 3, display: 'flex', alignItems: 'center', gap: 12,
      }}>
        {carouselImages.map((img, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={img.label || `Slide ${i + 1}`}
            style={{
              width: i === current ? 28 : 8,
              height: 8, borderRadius: 4, border: 'none', padding: 0, cursor: 'pointer',
              background: i === current ? '#F0B429' : 'rgba(255,255,255,0.35)',
              transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s',
            }}
          />
        ))}
      </div>

      {/* Org name badge */}
      {carouselImages[current].label && (
        <div style={{
          position: 'absolute', bottom: 38, left: '50%', transform: 'translateX(-50%)',
          zIndex: 3, background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100,
          padding: '5px 16px', whiteSpace: 'nowrap',
          fontFamily: 'var(--font-montserrat),sans-serif',
          fontSize: 11, fontWeight: 700, letterSpacing: '1.5px',
          color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase',
          transition: 'opacity 0.4s',
        }}>
          {carouselImages[current].label}
        </div>
      )}

      {/* Stats */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        paddingBottom: 48,
      }}>
        {stats.map((s, i) => (
          <StatItem key={i} num={s.num} suffix={s.suffix} lbl={s.lbl} index={i} />
        ))}
      </div>
    </div>
  );
}

function StatItem({ num, suffix, lbl, index }: { num: number; suffix: string; lbl: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || counted) return;
      setCounted(true);
      const dur = 1800, start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * num) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = num + suffix;
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [num, suffix, counted]);

  return (
    <div style={{
      padding: '44px 0', textAlign: 'center', flex: '1 1 180px',
      borderRight: '1px solid rgba(255,255,255,0.10)',
      opacity: 0, animation: `fadeUpStat 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 100 + 200}ms forwards`,
    }}>
      <style>{`@keyframes fadeUpStat { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }`}</style>
      <div
        ref={ref}
        style={{
          fontFamily: 'var(--font-montserrat),sans-serif',
          fontSize: 48, fontWeight: 900, color: '#fff',
          letterSpacing: '-2px', lineHeight: 1,
        }}
      >0{suffix}</div>
      <div style={{
        fontFamily: 'var(--font-montserrat),sans-serif',
        fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)',
        letterSpacing: '2px', textTransform: 'uppercase', marginTop: 10,
      }}>{lbl}</div>
    </div>
  );
}
