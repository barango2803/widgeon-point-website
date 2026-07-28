'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { carouselImages } from '@/lib/carousel-images';

const CATEGORY_PHOTOS: Record<string, string> = {
  'Community-Based Giving':              'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80',
  'Youth Development':                   '/carousel/wp-006.jpg',
  'Environmental Access & Stewardship':  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80',
  'Cultural Exchange, Arts & Heritage':  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=80',
  'Discretionary Giving':                'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800&auto=format&fit=crop&q=80',
};

const CATEGORIES = [
  {
    title: 'Community-Based Giving',
    color: '#1B51A8',
    brief: 'Providing direct services, building social resilience, and making connections.',
    subs: [
      { name: 'Food & Basic Needs Security', desc: 'Food kitchens, food banks, meal programs, and clothing/shelter assistance for individuals and families.' },
      { name: 'Substance-Use & Harm Reduction', desc: 'Substance-use disorder treatment, recovery support, and harm-reduction programs.' },
      { name: 'Reentry & Rehabilitation Support', desc: 'Social reentry from incarceration or rehabilitation; transitional housing and employment services.' },
      { name: 'Immigrant & Newcomer Services', desc: 'Support for first-generation immigrants including legal aid, language access, and integration services.' },
      { name: 'Disability & Autism Services', desc: 'Autism services and broader disability support rooted in local community leadership.' },
      { name: 'Domestic Violence & Safety', desc: 'Domestic violence shelters, crisis intervention, and survivor support programs.' },
    ],
  },
  {
    title: 'Youth Development',
    color: '#0D3275',
    brief: 'Investing in young people through programs that build resilience, creativity, leadership, and a sense of possibility.',
    subs: [
      { name: 'Sports & Physical Activity', desc: 'Team and individual sports that build resilience, confidence, and teamwork.' },
      { name: 'Adaptive & Inclusive Sports', desc: 'Adaptive sports and recreation for youth of all abilities.' },
      { name: 'Arts & Self-Expression', desc: 'Visual, performing, and creative arts programs that foster self-expression and creativity.' },
      { name: 'Service & Leadership', desc: 'Youth service, mentorship, and leadership development opportunities.' },
      { name: 'Experiential & Innovative Learning', desc: 'Innovative programs that open participants to new ways of thinking or experiencing life.' },
    ],
  },
  {
    title: 'Environmental Access & Stewardship',
    color: '#1a6e3e',
    brief: 'Clean water, clean air, and access to the outdoors.',
    subs: [
      { name: 'Outdoor Access & Equity', desc: 'Creating and preserving equitable access to the outdoors for underserved communities.' },
      { name: 'Ecological Conservation', desc: 'Land, water, and habitat conservation and restoration initiatives.' },
      { name: 'Place-Based Environmental Education', desc: 'Hands-on, place-based education connecting people with local ecosystems.' },
      { name: 'Outdoor Adventure Programs', desc: 'Outdoor adventure and exploration programs that connect people with nature.' },
      { name: 'Environmental Leadership Development', desc: 'Developing the next generation of environmental leaders and stewards.' },
    ],
  },
  {
    title: 'Cultural Exchange, Arts & Heritage',
    color: '#7B3FA0',
    brief: 'Fostering art, music, travel, and grass roots programs that celebrate culture.',
    subs: [
      { name: 'International Exchange & Travel', desc: 'Multi-national exchange and travel programs for students and professionals.' },
      { name: 'Urban–Rural Exchange', desc: 'Programs fostering connection and exchange between urban and rural communities.' },
      { name: 'Music & Performing Arts', desc: 'Music in all its forms and established performing-arts organizations.' },
      { name: 'Established Arts Institutions', desc: 'Established artistic and cultural organizations and initiatives.' },
      { name: 'Cultural Preservation & Heritage', desc: 'Promotion and preservation of culture, including legacy institutions tied to the foundation\'s roots.' },
    ],
  },
  {
    title: 'Discretionary Giving',
    color: '#B85C00',
    brief: 'Reserved for exceptional organizations that fall outside traditional categories, or represent bold, experimental philanthropy.',
    subs: [
      { name: 'Overlooked / Unique Organizations', desc: 'Organizations that might be overlooked under the other focus areas.' },
      { name: 'Relationship-Building Grants', desc: 'Grants that establish new relationships with organizations not funded elsewhere.' },
      { name: 'Innovative & Experimental Philanthropy', desc: 'Creative, meaningful, and experimental initiatives. Note: the most challenging category to receive funding under.' },
    ],
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(entries =>
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      }), { threshold: 0.08 }
    );
    els.forEach(el => {
      const delay = (el as HTMLElement).dataset.delay || '0';
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(32px)';
      (el as HTMLElement).style.transition = `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${+delay * 110}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${+delay * 110}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

function CategoryCard({ cat, index }: { cat: typeof CATEGORIES[0]; index: number }) {
  const photo = CATEGORY_PHOTOS[cat.title];
  return (
    <div
      data-reveal
      data-delay={String((index % 3) + 1)}
      className="area-card-hover"
      style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 32px rgba(27,81,168,0.09)', display: 'flex', flexDirection: 'column' }}
    >
      {/* Photo */}
      <div style={{ height: 168, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        <img src={photo} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${cat.color}dd 0%, transparent 55%)` }} />
        <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20 }}>
          <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: 15, fontWeight: 900, color: '#fff', lineHeight: 1.15 }}>{cat.title}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 22px 22px', flex: 1 }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#334D7A', lineHeight: 1.68, margin: 0 }}>{cat.brief}</p>
      </div>
    </div>
  );
}

function HeroCarousel() {
  const [cur, setCur] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() => carouselImages.map(() => false));

  useEffect(() => {
    carouselImages.forEach((img, i) => {
      const el = new Image();
      el.onload = () => setLoaded(prev => { const next = [...prev]; next[i] = true; return next; });
      el.src = img.src;
    });
  }, []);

  useEffect(() => {
    if (!loaded[cur]) return;
    const t = setInterval(() => {
      setCur(c => {
        let next = (c + 1) % carouselImages.length;
        // skip any not-yet-loaded slides
        let tries = 0;
        while (!loaded[next] && tries < carouselImages.length) { next = (next + 1) % carouselImages.length; tries++; }
        return next;
      });
    }, 5000);
    return () => clearInterval(t);
  }, [loaded, cur]);

  return (
    <>
      {carouselImages.map((img, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${img.src})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: i === cur && loaded[i] ? 1 : 0,
          transition: 'opacity 1.2s ease',
          zIndex: 0,
        }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,rgba(7,26,64,0.65) 0%,rgba(13,50,117,0.55) 48%,rgba(27,81,168,0.35) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '40px 40px', zIndex: 1 }} />
    </>
  );
}

function StatCounter({ num, suffix, label, delay }: { num: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done) return;
      setDone(true);
      const dur = 1800, start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * num) + suffix;
        if (p < 1) requestAnimationFrame(tick); else el.textContent = num + suffix;
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [num, suffix, done]);

  return (
    <div style={{ padding: '44px 0', textAlign: 'center', flex: '1 1 180px', borderRight: '1px solid rgba(255,255,255,0.10)', opacity: 0, animation: `fadeUpS 0.7s cubic-bezier(0.16,1,0.3,1) ${delay * 100 + 200}ms forwards` }}>
      <div ref={ref} style={{ fontFamily: 'var(--font-montserrat)', fontSize: 52, fontWeight: 900, color: '#fff', letterSpacing: '-2px', lineHeight: 1 }}>0{suffix}</div>
      <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: 10 }}>{label}</div>
    </div>
  );
}

export default function HomePage() {
  useReveal();

  return (
    <>
      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes growX   { from { transform-origin:left; transform:scaleX(0); } to { transform:scaleX(1); } }
        @keyframes bob     { 0%,100% { transform:translateY(0); } 50% { transform:translateY(8px); } }
        @keyframes fadeUpS { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        .area-card-hover { transition:transform 0.4s cubic-bezier(0.16,1,0.3,1),box-shadow 0.4s; }
        .area-card-hover:hover { transform:translateY(-6px); box-shadow:0 24px 56px rgba(27,81,168,0.18); }
        .area-card-hover:hover img { transform:scale(1.06); }
        .cta-btn { transition:transform 0.25s,box-shadow 0.25s,background 0.2s; }
        .cta-btn:hover { transform:translateY(-2px); box-shadow:0 14px 36px rgba(27,81,168,0.35); }
        .ghost-btn { transition:transform 0.25s,background 0.2s; }
        .ghost-btn:hover { transform:translateY(-2px); background:rgba(255,255,255,0.18) !important; }
        .vis-card { transition:transform 0.45s cubic-bezier(0.16,1,0.3,1),box-shadow 0.45s; }
        .vis-card:hover { transform:scale(1.04); box-shadow:0 24px 64px rgba(7,26,64,0.45); }
        .vis-card:hover .vimg { transform:scale(1.07); }
        .vimg { transition:transform 0.6s cubic-bezier(0.16,1,0.3,1); }
      `}</style>

      <Nav />
      <main style={{ fontFamily: 'var(--font-montserrat),sans-serif' }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <HeroCarousel />

          {[{ w: 600, t: -160, r: -140 }, { w: 420, t: 40, r: 40 }, { w: 260, t: 130, r: 150 }].map((r, i) => (
            <div key={i} style={{ position: 'absolute', width: r.w, height: r.w, top: r.t, right: r.r, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', zIndex: 2 }} />
          ))}

          <div style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 60px' }}>
            <div style={{ maxWidth: 580 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.80)', fontSize: 10, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', padding: '8px 18px', borderRadius: 100, marginBottom: 36, animation: 'fadeIn 0.8s ease 0.2s both' }}>
                <span style={{ width: 6, height: 6, background: '#F0B429', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #F0B429' }} />
                Established 1966 &nbsp;&nbsp;<em style={{ fontStyle: 'italic', letterSpacing: '2px' }}>WE GIVE</em>
              </div>

              <div style={{ width: 44, height: 2, background: 'linear-gradient(90deg,#F0B429,rgba(240,180,41,0.3))', borderRadius: 2, marginBottom: 24, transformOrigin: 'left', animation: 'growX 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both' }} />

              <h1 style={{ fontFamily: 'var(--font-montserrat),sans-serif', lineHeight: 1.08, letterSpacing: '-1.5px', color: '#fff', marginBottom: 24 }}>
                <span style={{ display: 'block', whiteSpace: 'nowrap', animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both' }}>
                  <span style={{ background: '#F0B429', color: '#fff', padding: '0 6px', borderRadius: 4, fontSize: 'clamp(22px,3.2vw,48px)', fontWeight: 900 }}>We aim to spread joy</span>
                </span>
                <span style={{ display: 'block', fontSize: 'clamp(22px,3.2vw,48px)', fontWeight: 400, animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both' }}>and relieve suffering.</span>
              </h1>

              <p style={{ fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,0.60)', lineHeight: 1.9, maxWidth: 480, marginBottom: 40, animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.9s both' }}>
                The Widgeon Point Charitable Foundation has supported thousands of local non-profit organizations across the United States for more than fifty years.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 1.05s both' }}>
                <Link href="/grant-recipients" className="cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#1B51A8', fontWeight: 800, fontSize: 11, letterSpacing: '1.2px', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 100, textDecoration: 'none' }}>View Grant Recipients</Link>
              </div>
            </div>
          </div>

          {/* Float cards */}
          <div style={{ position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 12, zIndex: 3, animation: 'fadeIn 1s ease 1.3s both' }}>
            {[
              { label: 'Organizations Supported', value: '1,783', sub: 'Across the United States', bar: 92 },
              { label: 'States Reached', value: '32', sub: 'Across the country' },
              { label: 'Years of Giving', value: '54+', sub: 'And counting' },
            ].map((c, i) => (
              <div key={i} style={{ background: 'rgba(10,25,70,0.55)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 18, padding: '16px 20px', width: 200, transform: i === 1 ? 'translateX(20px)' : i === 2 ? 'translateX(8px)' : 'none' }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', color: '#F0B429', marginBottom: 5 }}>{c.label}</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1 }}>{c.value}</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.40)', marginTop: 5 }}>{c.sub}</div>
                {c.bar && <div style={{ marginTop: 10, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}><div style={{ width: `${c.bar}%`, height: '100%', background: 'linear-gradient(90deg,#F0B429,rgba(240,180,41,0.4))', borderRadius: 2 }} /></div>}
              </div>
            ))}
          </div>

          <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 3, animation: 'fadeIn 1s ease 1.8s both' }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Scroll</span>
            <div style={{ width: '1px', height: 40, background: 'linear-gradient(to bottom,rgba(255,255,255,0.5),transparent)', animation: 'bob 2.2s ease-in-out infinite' }} />
          </div>
        </section>

        {/* ── Stats band ── */}
        <div style={{ background: 'linear-gradient(135deg,#0D3275 0%,#1B51A8 60%,#2A69CC 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
          <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap' }}>
            <StatCounter num={1966} suffix=""  label="Year Founded"   delay={0} />
            <StatCounter num={32}   suffix=""  label="States Reached" delay={1} />
            <StatCounter num={5}    suffix=""  label="Focus Areas"    delay={2} />
          </div>
        </div>

        {/* ── Mission quote ── */}
        <div style={{ background: '#fff', padding: '90px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', fontSize: 400, fontWeight: 900, color: 'rgba(27,81,168,0.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', fontFamily: 'Georgia,serif' }}>&ldquo;</div>
          <div data-reveal data-delay="0">
            <blockquote style={{ fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 800, color: '#0C1B36', maxWidth: 860, margin: '0 auto 24px', lineHeight: 1.3, letterSpacing: '-0.5px' }}>We support local organizations, nationwide.</blockquote>
            <div style={{ width: 48, height: 2, background: '#F0B429', margin: '0 auto 20px', borderRadius: 2 }} />
            <cite style={{ fontStyle: 'normal', fontSize: 11, fontWeight: 700, color: '#2A69CC', letterSpacing: '2px', textTransform: 'uppercase' }}>Widgeon Point Charitable Foundation</cite>
          </div>
        </div>

        {/* ── Story section ── */}
        <section style={{ padding: '100px 40px', background: '#F4F7FF' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 88, alignItems: 'center' }}>
            <div data-reveal data-delay="0">
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1B51A8', display: 'block', marginBottom: 20 }}>Our Mission</span>
              <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 900, color: '#0C1B36', letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: 28 }}>We aim to spread joy and relieve suffering.</h2>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: '#334D7A', marginBottom: 40 }}>Widgeon Point Charitable Foundation actively supports a variety of local nonprofit organizations across the United States.</p>
              <Link href="/about" className="cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#1B51A8', color: '#fff', fontWeight: 800, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', padding: '15px 30px', borderRadius: 100, textDecoration: 'none' }}>
                Learn More
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>

            <div data-reveal data-delay="2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '210px 210px', gap: 14 }}>
              {[
                { src: '/carousel/wp-002.jpg', span: true,  num: '54+',   lbl: 'Years of Giving' },
                { src: '/carousel/wp-007.jpg', span: false, num: '1,783', lbl: 'Organizations' },
                { src: '/carousel/wp-004.jpg', span: false, num: '32',    lbl: 'States Reached' },
              ].map((c, i) => (
                <div key={i} className="vis-card" style={{ gridRow: c.span ? 'span 2' : 'auto', borderRadius: 20, overflow: 'hidden', position: 'relative', cursor: 'default' }}>
                  <img className="vimg" src={c.src} alt={c.lbl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(7,26,64,0.72) 0%,transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-1px', lineHeight: 1 }}>{c.num}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{c.lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Areas / Categories ── */}
        <section style={{ padding: '100px 40px', background: '#EBF2FF' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }} data-reveal data-delay="0">
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1B51A8', display: 'block', marginBottom: 20 }}>Areas We Support</span>
              <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 900, color: '#0C1B36', letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: 0 }}>Five Focus Areas</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
              {CATEGORIES.slice(0, 3).map((cat, i) => <CategoryCard key={i} cat={cat} index={i} />)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, marginTop: 22, maxWidth: 820, margin: '22px auto 0' }}>
              {CATEGORIES.slice(3).map((cat, i) => <CategoryCard key={i} cat={cat} index={i + 3} />)}
            </div>
          </div>
        </section>

        {/* ── CTA band ── */}
        <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(140deg,#0D3275 0%,#1B51A8 60%,#2A69CC 100%)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 700px 400px at 50% 120%,rgba(240,180,41,0.12) 0%,transparent 55%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 2, padding: '120px 40px', textAlign: 'center', color: '#fff' }} data-reveal data-delay="0">
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#F0B429', display: 'block', marginBottom: 20 }}>Get to Know Us</span>
            <h2 style={{ fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 900, marginBottom: 22, letterSpacing: '-1.5px', lineHeight: 1.05 }}>Widgeon Point<br/><span style={{ fontWeight: 300 }}>Charitable Foundation.</span></h2>
            <p style={{ fontSize: 18, opacity: 0.82, maxWidth: 520, margin: '0 auto 16px', lineHeight: 1.85 }}>
              Learn who we are, what we believe in, and the kinds of organizations we support.
            </p>
            <p style={{ fontSize: 15, opacity: 0.60, maxWidth: 480, margin: '0 auto 44px', lineHeight: 1.9 }}>
              We support local organizations that are personally known to the Grant Committee, a member of the board, or a friend of the foundation. We do not encourage applications from unknown organizations.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/about#widgeon-point-today" className="cta-btn" style={{ display: 'inline-flex', alignItems: 'center', background: '#fff', color: '#1B51A8', fontWeight: 800, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', padding: '17px 36px', borderRadius: 100, textDecoration: 'none' }}>Who We Are Today</Link>
              <Link href="/about#who-we-support" className="ghost-btn" style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.88)', fontWeight: 800, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', padding: '17px 36px', borderRadius: 100, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.28)', backdropFilter: 'blur(8px)' }}>Who We Support</Link>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
