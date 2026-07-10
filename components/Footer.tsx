import Link from 'next/link';

const F = 'var(--font-montserrat),sans-serif';

export default function Footer() {
  return (
    <footer style={{ background: '#0D3275', color: '#fff', paddingTop: 64, fontFamily: F }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>

          {/* Logo + mission */}
          <div>
            <div style={{ display: 'inline-block', background: '#fff', borderRadius: 12, padding: '8px 14px', marginBottom: 20 }}>
              <img
                src="/logo/widgeon-point_logo-blue (1).png"
                alt="Widgeon Point Charitable Foundation"
                style={{ height: 40, width: 'auto', display: 'block' }}
              />
            </div>
            <p style={{ fontFamily: F, fontSize: 13, lineHeight: 1.85, color: 'rgba(255,255,255,0.55)', maxWidth: 300 }}>
              We aim to spread joy and relieve suffering by supporting nonprofit organizations across the United States.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 18 }}>Navigate</h4>
            {[
              { href: '/',                 label: 'Home' },
              { href: '/about',            label: 'About Us' },
              { href: '/grant-recipients', label: 'Grant Recipients' },
              { href: '/contact',          label: 'Contact Us' },
              { href: '/apply',            label: 'Apply' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ display: 'block', fontFamily: F, color: 'rgba(255,255,255,0.62)', textDecoration: 'none', fontSize: 13, fontWeight: 600, marginBottom: 10, letterSpacing: '0.2px' }}>{label}</Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 18 }}>Legal</h4>
            <Link href="/privacy-policy" style={{ display: 'block', fontFamily: F, color: 'rgba(255,255,255,0.62)', textDecoration: 'none', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Privacy Policy</Link>
            <Link href="/terms-of-use"   style={{ display: 'block', fontFamily: F, color: 'rgba(255,255,255,0.62)', textDecoration: 'none', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Terms of Use</Link>
            <div style={{ fontFamily: F, color: 'rgba(255,255,255,0.38)', fontSize: 12, fontWeight: 600, marginTop: 16 }}>EIN: 13-6201175</div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 18 }}>Contact</h4>
            <a
              href="https://maps.google.com/?q=PO+Box+10779+Portland+ME+04104"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', fontFamily: F, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 13, fontWeight: 500, lineHeight: 1.7, marginBottom: 12 }}
            >
              P.O. Box 10779<br />Portland, ME 04104
            </a>
            <Link href="/contact" style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none' }}>
              See all addresses →
            </Link>
          </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.32)', letterSpacing: '0.2px' }}>
          <span>© {new Date().getFullYear()} Widgeon Point Charitable Foundation. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
