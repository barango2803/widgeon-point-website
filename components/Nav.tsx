'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

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

const F = 'var(--font-montserrat),sans-serif';
const BLUE = '#0D3275';
const MID  = '#1B51A8';

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
            fontFamily: F, fontSize: 12, fontWeight: 700,
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
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const aboutTimer   = useRef<ReturnType<typeof setTimeout>>();
  const contactTimer = useRef<ReturnType<typeof setTimeout>>();

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [path]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const open  = (set: (v: boolean) => void, timer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) =>
    () => { clearTimeout(timer.current); set(true); };
  const close = (set: (v: boolean) => void, timer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) =>
    () => { timer.current = setTimeout(() => set(false), 120); };

  const linkStyle = (active: boolean): React.CSSProperties => ({
    textDecoration: 'none', color: active ? MID : '#334D7A',
    fontFamily: F, fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase',
    padding: '9px 16px', borderRadius: 10,
    background: active ? '#EBF2FF' : 'transparent',
  });

  return (
    <>
      <style>{`
        .nav-dropdown { opacity:0; transform:translateY(6px); pointer-events:none; transition:opacity 0.2s,transform 0.2s; }
        .nav-dropdown.open { opacity:1; transform:translateY(0); pointer-events:auto; }
        .nav-drop-item:hover { background:#EBF2FF !important; color:#1B51A8 !important; }

        .nav-desk { display:flex; align-items:center; gap:4px; }
        .nav-burger { display:none; align-items:center; justify-content:center; width:44px; height:44px; background:none; border:1.5px solid rgba(27,81,168,0.18); cursor:pointer; padding:0; border-radius:10px; flex-shrink:0; color:#0D3275; }
        .mob-menu { position:fixed; inset:0; background:#fff; z-index:500; transform:translateX(100%); transition:transform 0.32s cubic-bezier(0.16,1,0.3,1); overflow-y:auto; -webkit-overflow-scrolling:touch; }
        .mob-menu.open { transform:translateX(0); }
        .mob-link { display:block; font-family:${F}; font-size:17px; font-weight:700; color:${BLUE}; text-decoration:none; padding:16px 0; border-bottom:1px solid rgba(27,81,168,0.07); letter-spacing:0.2px; }
        .mob-link:active { color:${MID}; }
        .mob-sub-link { display:block; font-family:${F}; font-size:13px; font-weight:700; color:#6B80A8; text-decoration:none; padding:11px 0 11px 16px; letter-spacing:0.5px; text-transform:uppercase; border-bottom:1px solid rgba(27,81,168,0.05); }
        .mob-sub-link:active { color:${MID}; }
        @media (max-width: 768px) {
          .nav-desk { display:none; }
          .nav-burger { display:flex; }
          .nav-inner-pad { padding:0 20px !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 300, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(27,81,168,0.10)' }}>
        <div className="nav-inner-pad" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 40px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo/widgeon-point_logo-blue (1).png" alt="Widgeon Point Charitable Foundation" style={{ height: 56, width: 'auto', flexShrink: 0 }} />
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desk">
            <Link href="/" style={linkStyle(path === '/')}>Home</Link>

            <div style={{ position: 'relative' }} onMouseEnter={open(setAboutOpen, aboutTimer)} onMouseLeave={close(setAboutOpen, aboutTimer)}>
              <Link href="/about" style={{ ...linkStyle(path.startsWith('/about') || path === '/our-story'), display: 'flex', alignItems: 'center', gap: 6 }}>
                About Us
                <svg width="10" height="10" fill="none" viewBox="0 0 10 10" style={{ transition: 'transform 0.2s', transform: aboutOpen ? 'rotate(180deg)' : 'none', opacity: 0.5 }}>
                  <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Dropdown links={ABOUT_LINKS} open={aboutOpen} openMenu={open(setAboutOpen, aboutTimer)} closeMenu={close(setAboutOpen, aboutTimer)} onClose={() => setAboutOpen(false)} />
            </div>

            <Link href="/grant-recipients" style={linkStyle(path === '/grant-recipients')}>Grant Recipients</Link>

            <div style={{ position: 'relative' }} onMouseEnter={open(setContactOpen, contactTimer)} onMouseLeave={close(setContactOpen, contactTimer)}>
              <Link href="/contact" style={{ ...linkStyle(path.startsWith('/contact')), display: 'flex', alignItems: 'center', gap: 6 }}>
                Contact Us
                <svg width="10" height="10" fill="none" viewBox="0 0 10 10" style={{ transition: 'transform 0.2s', transform: contactOpen ? 'rotate(180deg)' : 'none', opacity: 0.5 }}>
                  <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Dropdown links={CONTACT_LINKS} open={contactOpen} openMenu={open(setContactOpen, contactTimer)} closeMenu={close(setContactOpen, contactTimer)} onClose={() => setContactOpen(false)} />
            </div>

            <Link href="/apply" style={{
              textDecoration: 'none',
              fontFamily: F, fontSize: 12, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase',
              padding: '9px 16px', borderRadius: 12, marginLeft: 8,
              background: MID, color: '#fff',
            }}>Apply</Link>
          </nav>

          {/* Hamburger button */}
          <button
            className="nav-burger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mob-menu${mobileOpen ? ' open' : ''}`} aria-modal="true" role="dialog">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 72, borderBottom: '1px solid rgba(27,81,168,0.10)', background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(18px)', position: 'sticky', top: 0, zIndex: 1 }}>
          <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo/widgeon-point_logo-blue (1).png" alt="Widgeon Point Charitable Foundation" style={{ height: 48, width: 'auto' }} />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F7FF', border: 'none', cursor: 'pointer', borderRadius: 10, color: BLUE }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Links */}
        <div style={{ padding: '8px 24px 40px' }}>
          <Link href="/" className="mob-link" onClick={() => setMobileOpen(false)}>Home</Link>

          {/* About Us group */}
          <div>
            <Link href="/about" className="mob-link" onClick={() => setMobileOpen(false)}>About Us</Link>
            {ABOUT_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="mob-sub-link" onClick={() => setMobileOpen(false)}>{label}</Link>
            ))}
          </div>

          <Link href="/grant-recipients" className="mob-link" onClick={() => setMobileOpen(false)}>Grant Recipients</Link>

          {/* Contact group */}
          <div>
            <Link href="/contact" className="mob-link" onClick={() => setMobileOpen(false)}>Contact Us</Link>
            {CONTACT_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="mob-sub-link" onClick={() => setMobileOpen(false)}>{label}</Link>
            ))}
          </div>

          {/* Apply CTA */}
          <div style={{ marginTop: 32 }}>
            <Link
              href="/apply"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', textAlign: 'center',
                fontFamily: F, fontSize: 14, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase',
                padding: '18px 24px', borderRadius: 14, background: MID, color: '#fff', textDecoration: 'none',
              }}
            >
              Apply for a Grant
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
