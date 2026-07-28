'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';

const ABOUT_LINKS = [
  { href: '/our-story',                 label: 'Our Story' },
  { href: '/about#our-mission',         label: 'Our Mission' },
  { href: '/about#widgeon-point-today', label: 'Widgeon Point Today' },
  { href: '/about#who-we-support',      label: 'Who We Support' },
];

const CONTACT_LINKS = [
  { href: '/contact#contact', label: 'Contact' },
  { href: '/contact#legal',   label: 'Legal' },
  { href: '/contact#faqs',    label: 'FAQs' },
];

function Dropdown({ links, open, openMenu, closeMenu, onClose }: {
  links: { href: string; label: string }[];
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className={`nav-dropdown${open ? ' open' : ''}`}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      style={{
        position: 'absolute', top: 'calc(100% + 8px)', left: 0,
        background: '#fff', borderRadius: 14,
        boxShadow: '0 12px 40px rgba(13,50,117,0.14)', border: '1px solid rgba(27,81,168,0.08)',
        minWidth: 220, overflow: 'hidden', zIndex: 400,
      }}
    >
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="nav-drop-item"
          onClick={onClose}
          style={{
            display: 'block', padding: '12px 18px',
            fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 700,
            letterSpacing: '0.5px', color: '#334D7A', textDecoration: 'none',
            textTransform: 'uppercase', transition: 'background 0.15s, color 0.15s',
          }}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export default function Nav() {
  const path = usePathname();
  const [aboutOpen,   setAboutOpen]   = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const aboutTimer   = useRef<ReturnType<typeof setTimeout>>();
  const contactTimer = useRef<ReturnType<typeof setTimeout>>();

  const open  = (set: (v: boolean) => void, timer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) =>
    () => { clearTimeout(timer.current); set(true); };
  const close = (set: (v: boolean) => void, timer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) =>
    () => { timer.current = setTimeout(() => set(false), 120); };

  return (
    <>
      <style>{`
        .nav-dropdown { opacity:0; transform:translateY(6px); pointer-events:none; transition:opacity 0.2s,transform 0.2s; }
        .nav-dropdown.open { opacity:1; transform:translateY(0); pointer-events:auto; }
        .nav-drop-item:hover { background:#EBF2FF !important; color:#1B51A8 !important; }
      `}</style>
      <header style={{ position: 'sticky', top: 0, zIndex: 300, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(27,81,168,0.10)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 40px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo/widgeon-point_logo-blue (1).png" alt="Widgeon Point Charitable Foundation" style={{ height: 56, width: 'auto', flexShrink: 0 }} />
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>

            {/* Home */}
            <Link href="/" style={{
              textDecoration: 'none', color: path === '/' ? '#1B51A8' : '#334D7A',
              fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase',
              padding: '9px 16px', borderRadius: 10,
              background: path === '/' ? '#EBF2FF' : 'transparent',
            }}>Home</Link>

            {/* About Us */}
            <div style={{ position: 'relative' }} onMouseEnter={open(setAboutOpen, aboutTimer)} onMouseLeave={close(setAboutOpen, aboutTimer)}>
              <Link href="/about" style={{
                textDecoration: 'none', color: path.startsWith('/about') ? '#1B51A8' : '#334D7A',
                fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase',
                padding: '9px 16px', borderRadius: 10,
                background: path.startsWith('/about') ? '#EBF2FF' : 'transparent',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                About Us
                <svg width="10" height="10" fill="none" viewBox="0 0 10 10" style={{ transition: 'transform 0.2s', transform: aboutOpen ? 'rotate(180deg)' : 'none', opacity: 0.5 }}>
                  <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Dropdown links={ABOUT_LINKS} open={aboutOpen} openMenu={open(setAboutOpen, aboutTimer)} closeMenu={close(setAboutOpen, aboutTimer)} onClose={() => setAboutOpen(false)} />
            </div>

            {/* Grant Recipients */}
            <Link href="/grant-recipients" style={{
              textDecoration: 'none', color: path === '/grant-recipients' ? '#1B51A8' : '#334D7A',
              fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase',
              padding: '9px 16px', borderRadius: 10,
              background: path === '/grant-recipients' ? '#EBF2FF' : 'transparent',
            }}>Grant Recipients</Link>

            {/* Contact Us */}
            <div style={{ position: 'relative' }} onMouseEnter={open(setContactOpen, contactTimer)} onMouseLeave={close(setContactOpen, contactTimer)}>
              <Link href="/contact" style={{
                textDecoration: 'none', color: path.startsWith('/contact') ? '#1B51A8' : '#334D7A',
                fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase',
                padding: '9px 16px', borderRadius: 10,
                background: path.startsWith('/contact') ? '#EBF2FF' : 'transparent',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                Contact Us
                <svg width="10" height="10" fill="none" viewBox="0 0 10 10" style={{ transition: 'transform 0.2s', transform: contactOpen ? 'rotate(180deg)' : 'none', opacity: 0.5 }}>
                  <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Dropdown links={CONTACT_LINKS} open={contactOpen} openMenu={open(setContactOpen, contactTimer)} closeMenu={close(setContactOpen, contactTimer)} onClose={() => setContactOpen(false)} />
            </div>

            {/* Apply */}
            <Link href="/apply" style={{
              textDecoration: 'none',
              fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase',
              padding: '9px 16px', borderRadius: 12, marginLeft: 8,
              background: '#1B51A8', color: '#fff',
            }}>Apply</Link>

          </nav>
        </div>
      </header>
    </>
  );
}
