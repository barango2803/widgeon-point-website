'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const F = 'var(--font-montserrat),sans-serif';
const BLUE = '#0D3275';
const MID  = '#1B51A8';
const GOLD = '#C9A84C';

const ANCHOR_LINKS = [
  { href: '#contact',  label: 'Contact' },
  { href: '#legal',    label: 'Legal' },
  { href: '#faqs',     label: 'FAQs' },
];

const FAQS = [
  {
    q: 'Who is eligible to apply?',
    a: 'Any IRS-registered 501(c)(3) non-profit organization operating within the United States is welcome to apply. This includes new organizations applying for the first time as well as organizations we have previously funded — returning recipients are always encouraged to apply again each year.',
  },
  {
    q: 'How much can we request, and will we receive the full amount?',
    a: 'While there is no minimum or maximum grant size, the average grant awarded during the current grant cycle was $1,500 dollars.',
  },
  {
    q: 'What documents are required with the application?',
    a: 'Required documents include: your IRS 501(c)(3) Determination Letter (with EIN), a Cover Letter addressed to the Widgeon Point Charitable Foundation, your most recent IRS Form 990, and your previous year\'s operating budget. An annual report and projected budget for the coming year are also requested but optional. If your application is for a Capital Campaign, a descriptive document for that campaign is also required.',
  },
  {
    q: 'When will we hear back after submitting?',
    a: 'Our board reviews all applications and decisions are communicated after December 15. Applications submitted before that date will be considered in the current cycle. We will follow up with the primary contact listed on your application. We appreciate your patience and are grateful for the work your organization is doing.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(27,81,168,0.10)' }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '22px 0', textAlign: 'left', gap: 16 }}
      >
        <span style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: open ? MID : BLUE, lineHeight: 1.4 }}>{q}</span>
        <span style={{ width: 28, height: 28, borderRadius: '50%', background: open ? MID : '#EEF3FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
          <svg width="12" height="12" fill="none" viewBox="0 0 12 12" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>
            <path d="M2 4l4 4 4-4" stroke={open ? '#fff' : MID} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <p style={{ fontFamily: F, fontSize: 15, color: '#556680', lineHeight: 1.85, margin: '0 0 22px', maxWidth: 700 }}>{a}</p>
      )}
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setName(''); setEmail(''); setMessage('');
    } catch {
      setStatus('error');
    }
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: F, fontSize: 14, color: BLUE, background: '#F4F7FF',
    border: '1.5px solid #D0DDEF', borderRadius: 10, padding: '13px 16px',
    width: '100%', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ background: '#fff', borderRadius: 18, padding: '36px 32px', boxShadow: '0 2px 20px rgba(13,50,117,0.07)', borderTop: `3px solid ${GOLD}` }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EEF3FA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={MID} strokeWidth="2">
          <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
      </div>
      <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#8899BB', marginBottom: 6 }}>Send Us a Message</div>
      <p style={{ fontFamily: F, fontSize: 13, color: '#8899BB', marginBottom: 24, lineHeight: 1.6 }}>We read every message and will get back to you.</p>

      {status === 'sent' ? (
        <div style={{ background: '#EEF8F0', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>✓</div>
          <div style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: '#1A7A3C', marginBottom: 6 }}>Message sent!</div>
          <div style={{ fontFamily: F, fontSize: 13, color: '#4A8A62' }}>Thank you. We will be in touch soon.</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input
            type="text" placeholder="Your name" required value={name}
            onChange={e => setName(e.target.value)} style={inputStyle}
          />
          <input
            type="email" placeholder="Your email address" required value={email}
            onChange={e => setEmail(e.target.value)} style={inputStyle}
          />
          <textarea
            placeholder="Your message…" required rows={5} value={message}
            onChange={e => setMessage(e.target.value)}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
          />
          {status === 'error' && (
            <div style={{ fontFamily: F, fontSize: 13, color: '#C0392B' }}>Something went wrong. Please try again.</div>
          )}
          <button
            type="submit" disabled={status === 'sending'}
            style={{ fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 100, background: status === 'sending' ? '#8899BB' : MID, color: '#fff', border: 'none', cursor: status === 'sending' ? 'default' : 'pointer', transition: 'background 0.2s', alignSelf: 'flex-start' }}
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [activeSection, setActiveSection] = useState('contact');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = ['contact', 'legal', 'faqs'];
    const entries: Record<string, number> = {};

    observerRef.current = new IntersectionObserver(
      (obs) => {
        obs.forEach(e => { entries[e.target.id] = e.intersectionRatio; });
        const top = sections.reduce((best, id) => (entries[id] ?? 0) > (entries[best] ?? 0) ? id : best, sections[0]);
        setActiveSection(top);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-72px 0px -30% 0px' }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: F, background: '#F7F8FA', minHeight: '100vh' }}>
      <Nav />

      {/* Hero */}
      <section style={{ background: `linear-gradient(150deg, ${BLUE} 0%, ${MID} 100%)`, padding: '88px 40px 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/pattern/flower.png)', backgroundSize: '220px 220px', backgroundRepeat: 'repeat', opacity: 0.18, mixBlendMode: 'screen', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, marginBottom: 14 }}>Get in Touch</p>
          <h1 style={{ fontFamily: F, fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, color: '#fff', margin: '0 0 20px', lineHeight: 1.1, letterSpacing: '-0.5px' }}>
            Contact Us
          </h1>
          <p style={{ fontFamily: F, fontSize: 15, color: 'rgba(255,255,255,0.68)', maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
            We&apos;re here to help. Send us a message, find our addresses, and get answers to common questions below.
          </p>
        </div>
      </section>

      {/* Anchor nav */}
      <div style={{ position: 'sticky', top: 72, zIndex: 200, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(27,81,168,0.08)', display: 'flex', justifyContent: 'center' }}>
        {ANCHOR_LINKS.map(({ href, label }) => {
          const id = href.replace('#', '');
          const active = activeSection === id;
          return (
            <a key={href} href={href} style={{
              fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
              padding: '16px 28px', textDecoration: 'none',
              color: active ? MID : '#8899BB',
              borderBottom: active ? `2px solid ${MID}` : '2px solid transparent',
              transition: 'color 0.2s, border-color 0.2s',
            }}>
              {label}
            </a>
          );
        })}
      </div>

      {/* ── Contact ── */}
      <section id="contact" style={{ maxWidth: 1040, margin: '0 auto', padding: '72px 40px 64px' }}>
        <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>Reach Us</p>
        <h2 style={{ fontFamily: F, fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: BLUE, margin: '0 0 48px', letterSpacing: '-0.5px' }}>Contact Information</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
          {/* Left: Message form */}
          <ContactForm />

          {/* Right: Mailing + EIN stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: '#fff', borderRadius: 18, padding: '32px 28px', boxShadow: '0 2px 20px rgba(13,50,117,0.07)', borderTop: `3px solid ${MID}` }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EEF3FA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={MID} strokeWidth="2"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#8899BB', marginBottom: 8 }}>Mailing Address</div>
              <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: BLUE, marginBottom: 4 }}>Widgeon Point Charitable Foundation</div>
              <a href="https://maps.google.com/?q=PO+Box+10779+Portland+ME+04104" target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 14, color: '#556680', lineHeight: 1.7, textDecoration: 'none' }}>
                P.O. Box 10779<br />Portland, ME 04104
              </a>
            </div>

            <div style={{ background: '#fff', borderRadius: 18, padding: '32px 28px', boxShadow: '0 2px 20px rgba(13,50,117,0.07)', borderTop: `3px solid ${BLUE}` }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EEF3FA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={MID} strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#8899BB', marginBottom: 8 }}>EIN / Federal Tax ID</div>
              <div style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: BLUE, letterSpacing: '1px' }}>13-6201175</div>
              <div style={{ fontFamily: F, fontSize: 12, color: '#8899BB', marginTop: 6 }}>IRS-registered 501(c)(3)</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: `linear-gradient(135deg, ${BLUE} 0%, ${MID} 100%)`, borderRadius: 20, padding: '40px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>Ready to Apply?</div>
            <div style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>We want to be part of your impact.</div>
            <div style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>Learn more about our giving areas and eligibility before you apply.</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/about#who-we-support" style={{ fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 100, background: 'rgba(255,255,255,0.12)', color: '#fff', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.25)' }}>
              Learn More
            </Link>
            <Link href="/apply" style={{ fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 100, background: '#fff', color: MID, textDecoration: 'none' }}>
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── Legal ── */}
      <section id="legal" style={{ background: '#fff', padding: '72px 40px' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>Legal</p>
          <h2 style={{ fontFamily: F, fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: BLUE, margin: '0 0 12px', letterSpacing: '-0.5px' }}>Legal Information</h2>
          <p style={{ fontFamily: F, fontSize: 15, color: '#8899BB', marginBottom: 48, lineHeight: 1.7 }}>
            EIN&nbsp;13-6201175 (also called a Federal Tax ID)
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {/* Mailing */}
            <div style={{ background: '#F7F8FA', borderRadius: 16, padding: '28px 28px', border: '1px solid rgba(27,81,168,0.08)' }}>
              <div style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: BLUE, marginBottom: 4 }}>Mailing Address</div>
              <div style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: GOLD, marginBottom: 16, letterSpacing: '0.3px' }}>For all correspondence</div>
              <div style={{ fontFamily: F, fontSize: 14, color: '#556680', lineHeight: 1.9, fontWeight: 600 }}>Widgeon Point Charitable Foundation</div>
              <div style={{ fontFamily: F, fontSize: 14, color: '#556680', lineHeight: 1.9 }}>P.O. Box 10779</div>
              <div style={{ fontFamily: F, fontSize: 14, color: '#556680', lineHeight: 1.9 }}>Portland, ME 04104</div>
            </div>

            {/* Legal */}
            <div style={{ background: '#F7F8FA', borderRadius: 16, padding: '28px 28px', border: '1px solid rgba(27,81,168,0.08)' }}>
              <div style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: BLUE, marginBottom: 4 }}>Legal Address</div>
              <div style={{ display: 'inline-block', background: '#EEF3FA', borderRadius: 6, padding: '3px 10px', marginBottom: 16 }}>
                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: MID, letterSpacing: '0.3px' }}>Legal Counsel — Fox Rothschild LLP</span>
              </div>
              <div style={{ fontFamily: F, fontSize: 14, color: '#556680', lineHeight: 1.9 }}>101 Park Avenue</div>
              <div style={{ fontFamily: F, fontSize: 14, color: '#556680', lineHeight: 1.9 }}>17th Floor</div>
              <div style={{ fontFamily: F, fontSize: 14, color: '#556680', lineHeight: 1.9 }}>New York, NY 10178</div>
            </div>

            {/* Books & Records */}
            <div style={{ background: '#F7F8FA', borderRadius: 16, padding: '28px 28px', border: '1px solid rgba(27,81,168,0.08)' }}>
              <div style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: BLUE, marginBottom: 4 }}>Books &amp; Records</div>
              <div style={{ display: 'inline-block', background: '#EEF3FA', borderRadius: 6, padding: '3px 10px', marginBottom: 16 }}>
                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: MID, letterSpacing: '0.3px' }}>Accounting Firm — Bernstein Shur Sawyer &amp; Nelson, P.A.</span>
              </div>
              <div style={{ fontFamily: F, fontSize: 14, color: '#556680', lineHeight: 1.9, fontWeight: 600 }}>Widgeon Point Charitable Foundation</div>
              <div style={{ fontFamily: F, fontSize: 14, color: '#556680', lineHeight: 1.9 }}>100 Middle Street, PO Box 9729</div>
              <div style={{ fontFamily: F, fontSize: 14, color: '#556680', lineHeight: 1.9 }}>Portland, ME 04104-5029</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section id="faqs" style={{ maxWidth: 1040, margin: '0 auto', padding: '72px 40px 96px' }}>
        <p style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>Common Questions</p>
        <h2 style={{ fontFamily: F, fontSize: 'clamp(24px,3vw,38px)', fontWeight: 800, color: BLUE, margin: '0 0 48px', letterSpacing: '-0.5px' }}>
          Frequently Asked Questions
        </h2>
        <div>
          {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
        </div>

        <div style={{ marginTop: 48, background: `linear-gradient(135deg, ${BLUE} 0%, ${MID} 100%)`, borderRadius: 20, padding: '40px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>Ready to Take the Next Step?</div>
            <div style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>We want to be part of your impact.</div>
            <div style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>Learn about who we support and fill out the application.</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/about#who-we-support" style={{ fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 100, background: 'rgba(255,255,255,0.12)', color: '#fff', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.25)' }}>
              Learn More
            </Link>
            <Link href="/apply" style={{ fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 100, background: '#fff', color: MID, textDecoration: 'none' }}>
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
