'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const ANCHOR_LINKS = [
  { href: '#our-story',           label: 'Our Story' },
  { href: '#our-mission',         label: 'Our Mission' },
  { href: '#widgeon-point-today', label: 'Widgeon Point Today' },
  { href: '#who-we-support',      label: 'Who We Support' },
];

const TIMELINE = [
  { year: '1966', title: 'The Foundation is Established', body: 'Edwin J. Beinecke and Linda Louise Beinecke create the Widgeon Point Charitable Foundation, beginning a family tradition of structured, purposeful giving to non-profit organizations across the United States.' },
  { year: '1970s – 1980s', title: 'Roots in New England', body: 'The Foundation deepens its commitment to New England, supporting arts institutions, land conservation efforts, and community organizations throughout Maine, Connecticut, and New York.' },
  { year: '1990s', title: 'Second Generation Leadership', body: 'The second generation takes on leadership roles, broadening the Foundation\'s geographic reach and introducing new focus areas including youth development and environmental access.' },
  { year: '2000s', title: 'A National Scope Emerges', body: 'Grant recipients now span from the Atlantic to the Pacific, reflecting the Foundation\'s commitment to supporting worthy organizations wherever they operate.' },
  { year: '2010s', title: 'A New Generation of Givers', body: 'Fourth and fifth generation family members join the work, bringing fresh perspectives and renewed energy to the Foundation\'s grantmaking across five evolving focus areas.' },
  { year: 'Today', title: 'Five Generations Strong', body: 'With five generations of family leadership, Widgeon Point continues to evolve, guided by the same founding values of joy, relief of suffering, and stewardship of the world we share.' },
];

function FlowerPattern() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'url(/pattern/flower.png)',
      backgroundSize: '220px 220px',
      backgroundRepeat: 'repeat',
      opacity: 0.18,
      mixBlendMode: 'screen',
    }} />
  );
}

function AnchorNav({ active }: { active: string }) {
  return (
    <div style={{ position:'sticky', top:72, zIndex:200, background:'rgba(255,255,255,0.96)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(27,81,168,0.08)', display:'flex', justifyContent:'center', gap:0, padding:'0 40px' }}>
      {ANCHOR_LINKS.map(({ href, label }) => {
        const id = href.replace('#','');
        const isActive = active === id;
        return (
          <a
            key={href}
            href={href}
            style={{
              fontFamily:'var(--font-montserrat)', fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase',
              padding:'16px 20px', textDecoration:'none',
              borderBottom: isActive ? '2px solid #1B51A8' : '2px solid transparent',
              color: isActive ? '#1B51A8' : '#6B80A8',
              transition:'color 0.2s, border-color 0.2s',
              whiteSpace:'nowrap',
            }}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}

function TimelineItem({ item, index, isLast }: { item: typeof TIMELINE[0]; index: number; isLast: boolean }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display:'flex', alignItems:'stretch',
        paddingBottom: isLast ? 0 : 48,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateX(-20px)',
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 90}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 90}ms`,
      }}
    >
      {/* Year */}
      <div style={{ width:140, flexShrink:0, textAlign:'right', paddingRight:20, paddingTop:10 }}>
        <span style={{ fontFamily:'var(--font-montserrat)', fontSize:12, fontWeight:800, color:'#1B51A8', letterSpacing:'0.5px' }}>{item.year}</span>
      </div>

      {/* Spine: dot + line */}
      <div style={{ width:36, flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width:14, height:14, borderRadius:'50%', background:'#fff', border:'3px solid #1B51A8', flexShrink:0, marginTop:8, zIndex:1 }} />
        {!isLast && <div style={{ flex:1, width:2, background:'linear-gradient(to bottom,#1B51A8,rgba(27,81,168,0.2))', marginTop:4, borderRadius:2 }} />}
      </div>

      {/* Content card */}
      <div style={{ flex:1, paddingLeft:20, paddingBottom: isLast ? 0 : 4 }}>
        <div style={{ background:'#fff', borderRadius:18, padding:'26px 30px', boxShadow:'0 4px 24px rgba(27,81,168,0.08)', border:'1px solid rgba(27,81,168,0.06)' }}>
          <div style={{ fontFamily:'var(--font-montserrat)', fontSize:16, fontWeight:800, color:'#0C1B36', marginBottom:10 }}>{item.title}</div>
          <p style={{ fontSize:15, lineHeight:1.8, color:'#6B80A8', margin:0 }}>{item.body}</p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [active, setActive] = useState('our-story');

  useEffect(() => {
    const ids = ANCHOR_LINKS.map(l => l.href.replace('#',''));
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setActive(id);
      }, { rootMargin:'-25% 0px -65% 0px' });
      io.observe(el);
      return io;
    });
    return () => observers.forEach(io => io?.disconnect());
  }, []);

  return (
    <>
      <style>{`
        .val-card { transition:transform 0.3s, box-shadow 0.3s; }
        .val-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(27,81,168,0.13) !important; }
        .apply-btn { transition:transform 0.25s, box-shadow 0.25s; }
        .apply-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(27,81,168,0.3); }
      `}</style>

      <Nav />

      {/* Hero */}
      <div style={{ position:'relative', background:'linear-gradient(140deg,#071A40 0%,#0D3275 55%,#1B51A8 100%)', padding:'110px 40px 90px', color:'#fff', textAlign:'center', overflow:'hidden', fontFamily:'var(--font-montserrat),sans-serif' }}>
        <FlowerPattern />
        <div style={{ position:'relative', zIndex:2 }}>
          <span style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'#F0B429', display:'block', marginBottom:20 }}>About Us</span>
          <h1 style={{ fontFamily:'var(--font-montserrat)', fontSize:'clamp(36px,5vw,64px)', fontWeight:900, letterSpacing:'-2px', lineHeight:1.05, marginBottom:20, color:'#fff' }}>
            A Foundation Built<br/>on Generosity
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.62)', maxWidth:520, margin:'0 auto', lineHeight:1.85 }}>
            Learn about our history, mission, and the values that have guided five generations of purposeful giving.
          </p>
        </div>
      </div>

      <AnchorNav active={active} />

      <main style={{ fontFamily:'var(--font-montserrat),sans-serif' }}>

        {/* Our Story */}
        <section id="our-story" style={{ padding:'100px 40px', background:'#fff' }}>
          <div style={{ maxWidth:1040, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:72 }}>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'#F0B429', display:'block', marginBottom:16 }}>Our Story</span>
              <h2 style={{ fontFamily:'var(--font-montserrat)', fontSize:'clamp(28px,3.5vw,46px)', fontWeight:900, color:'#0C1B36', letterSpacing:'-1.5px', lineHeight:1.05, marginBottom:20 }}>
                From one family's vision<br/>to a national legacy
              </h2>
              <p style={{ fontSize:16, lineHeight:1.85, color:'#6B80A8', maxWidth:580, margin:'0 auto' }}>
                The Widgeon Point Charitable Foundation takes its name from a cherished gathering place on the coast of Maine, a place defined by the sea, by family, and by a deep sense of stewardship toward the natural world and the people who inhabit it.
              </p>
            </div>

            {/* Timeline */}
            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {TIMELINE.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} isLast={i === TIMELINE.length - 1} />
              ))}
            </div>
          </div>
        </section>

        {/* Photo banner */}
        <div style={{ overflow:'hidden', background:'#0C1B36', padding:'0' }}>
          <style>{`
            @keyframes scroll-photos {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .photo-strip { display:flex; animation: scroll-photos 22s linear infinite; width:max-content; }
            .photo-strip:hover { animation-play-state: paused; }
          `}</style>
          <div className="photo-strip">
            {[...Array(2)].map((_, pass) =>
              [
                '/carousel/compressed_DSC08240-300x200.jpg',
                '/carousel/SQUASH_Spinski_66-300x200.jpg',
                '/carousel/compressed_image0-300x200.jpeg',
                '/carousel/imgage_0000_On-Belay-Photo-3-300x200.jpg',
                '/carousel/compressed_DSC02115-300x200.jpg',
                '/carousel/imgage_0002_On-Belay-Photo-1-300x200.jpg',
              ].map((src, i) => (
                <div key={`${pass}-${i}`} style={{ width:320, height:220, flexShrink:0, overflow:'hidden', position:'relative' }}>
                  <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', filter:'brightness(0.85)' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(12,27,54,0.25), transparent, rgba(12,27,54,0.25))' }} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Our Mission */}
        <section id="our-mission" style={{ padding:'100px 40px', background:'#F4F7FF' }}>
          <div style={{ maxWidth:1040, margin:'0 auto' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
              <div>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'#F0B429', display:'block', marginBottom:16 }}>Our Mission</span>
                <h2 style={{ fontFamily:'var(--font-montserrat)', fontSize:'clamp(28px,3.5vw,44px)', fontWeight:900, color:'#0C1B36', letterSpacing:'-1.5px', lineHeight:1.05, marginBottom:24 }}>
                  Spreading Joy.<br/>Relieving Suffering.
                </h2>
                <p style={{ fontSize:16, lineHeight:1.9, color:'#334D7A', marginBottom:20 }}>
                  The Foundation's mission is deceptively simple: to spread joy and relieve suffering in all their forms, in all their places. That breadth is intentional. We believe in the power of diverse organizations doing diverse work to collectively build a better world.
                </p>
                <p style={{ fontSize:16, lineHeight:1.9, color:'#334D7A' }}>
                  We support non-profit, IRS registered 501(c)(3) programs, trusting their leadership to decide how best to deploy resources in service of their communities.
                </p>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {[
                  { title:'We are agnostic about cause', body:'Arts, environment, education, social services — we see value across the full spectrum of human endeavor.' },
                  { title:'We value relationships', body:'Many of our grantees have been partners for decades. We believe in sustained support, not one-time gifts.' },
                  { title:'We trust organizations', body:'We do not impose program requirements. We fund strong organizations and trust their leadership.' },
                ].map((c, i) => (
                  <div key={i} className="val-card" style={{ background:'#fff', borderRadius:16, padding:'22px 26px', boxShadow:'0 4px 20px rgba(27,81,168,0.07)' }}>
                    <div style={{ width:28, height:3, background:'#F0B429', borderRadius:2, marginBottom:12 }} />
                    <div style={{ fontSize:15, fontWeight:800, color:'#0C1B36', marginBottom:8 }}>{c.title}</div>
                    <p style={{ fontSize:14, lineHeight:1.75, color:'#6B80A8', margin:0 }}>{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Widgeon Point Today */}
        <section id="widgeon-point-today" style={{ padding:'100px 40px', background:'#fff' }}>
          <div style={{ maxWidth:1040, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:64 }}>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'#F0B429', display:'block', marginBottom:16 }}>Widgeon Point Today</span>
              <h2 style={{ fontFamily:'var(--font-montserrat)', fontSize:'clamp(28px,3.5vw,44px)', fontWeight:900, color:'#0C1B36', letterSpacing:'-1.5px', lineHeight:1.05, marginBottom:20 }}>
                Still growing, still giving
              </h2>
              <p style={{ fontSize:16, lineHeight:1.85, color:'#6B80A8', maxWidth:540, margin:'0 auto' }}>
                After nearly six decades, Widgeon Point remains an active, engaged foundation, reviewing applications each year and building lasting relationships with organizations that are changing lives.
              </p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22, marginBottom:36 }}>
              {[
                { num:'406', label:'Donations Given', sub:'Since our founding in 1966' },
                { num:'300+', label:'Organizations Supported', sub:'Across the United States' },
                { num:'5', label:'Focus Areas', sub:'Community, Youth, Environment, Arts, Discretionary' },
              ].map((s, i) => (
                <div key={i} style={{ background:'linear-gradient(135deg,#071A40,#1B51A8)', borderRadius:20, padding:'36px 28px', textAlign:'center', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize:'22px 22px' }} />
                  <div style={{ position:'relative', zIndex:1 }}>
                    <div style={{ fontFamily:'var(--font-montserrat)', fontSize:52, fontWeight:900, letterSpacing:'-2px', lineHeight:1, color:'#fff', marginBottom:10 }}>{s.num}</div>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#F0B429', marginBottom:8 }}>{s.label}</div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', lineHeight:1.5 }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:'#F4F7FF', borderRadius:20, padding:'36px 44px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48 }}>
                <div>
                  <div style={{ fontSize:14, fontWeight:800, color:'#0C1B36', marginBottom:10 }}>Application Window</div>
                  <p style={{ fontSize:15, lineHeight:1.8, color:'#6B80A8', margin:0 }}>
                    We accept applications from <strong style={{ color:'#1B51A8' }}>March 1 through September 15</strong> each year. Applications are reviewed on a rolling basis and we encourage early submission.
                  </p>
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:800, color:'#0C1B36', marginBottom:10 }}>Who Can Apply</div>
                  <p style={{ fontSize:15, lineHeight:1.8, color:'#6B80A8', margin:0 }}>
                    Any IRS-registered <strong style={{ color:'#1B51A8' }}>501(c)(3) organization</strong> operating within the United States is welcome to apply. Our board may award the full amount requested or a portion of it. Organizations we have supported before are always encouraged to apply again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Support */}
        <section id="who-we-support" style={{ padding:'100px 40px', background:'#F4F7FF' }}>
          <div style={{ maxWidth:1040, margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:56 }}>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'#F0B429', display:'block', marginBottom:16 }}>Who We Support</span>
              <h2 style={{ fontFamily:'var(--font-montserrat)', fontSize:'clamp(28px,3.5vw,44px)', fontWeight:900, color:'#0C1B36', letterSpacing:'-1.5px', lineHeight:1.05, marginBottom:20 }}>
                Eligibility at a glance
              </h2>
              <p style={{ fontSize:16, lineHeight:1.85, color:'#6B80A8', maxWidth:500, margin:'0 auto' }}>
                We fund a wide range of causes, but there are clear criteria every applicant must meet.
              </p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:48 }}>
              {[
                { ok:true,  text:'IRS-registered 501(c)(3) organizations' },
                { ok:true,  text:'Organizations operating within the United States' },
                { ok:true,  text:'Any organization — new or returning' },
                { ok:true,  text:'Prior recipients encouraged to apply every year' },
                { ok:false, text:'Individuals or for-profit entities' },
                { ok:false, text:'Organizations outside the United States' },
                { ok:false, text:'Political campaigns or lobbying organizations' },
                { ok:false, text:'Organizations not registered with the IRS' },
              ].map((item, i) => (
                <div key={i} style={{ display:'flex', gap:14, alignItems:'center', background:'#fff', borderRadius:14, padding:'16px 22px', boxShadow:'0 2px 10px rgba(27,81,168,0.06)' }}>
                  <span style={{ width:22, height:22, borderRadius:'50%', background: item.ok ? '#1B51A8' : '#FEE2E2', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:11, color: item.ok ? '#fff' : '#EF4444', fontWeight:800 }}>
                    {item.ok ? '✓' : '✕'}
                  </span>
                  <span style={{ fontSize:14, fontWeight:600, color: item.ok ? '#0C1B36' : '#9BA8BF', lineHeight:1.4 }}>{item.text}</span>
                </div>
              ))}
            </div>

            <div style={{ textAlign:'center' }}>
              <p style={{ fontSize:15, color:'#6B80A8', marginBottom:28, lineHeight:1.7 }}>
                Ready to apply? The application window is open March 1 through September 15.
              </p>
              <Link href="/apply" className="apply-btn" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#1B51A8', color:'#fff', fontWeight:800, fontSize:12, letterSpacing:'1px', textTransform:'uppercase', padding:'16px 34px', borderRadius:100, textDecoration:'none' }}>
                Start Your Application
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
