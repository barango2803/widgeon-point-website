'use client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const F    = 'var(--font-montserrat),sans-serif';
const BLUE = '#0D3275';
const MID  = '#1B51A8';
const GOLD = '#C9A84C';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: BLUE, marginBottom: 14, letterSpacing: '-0.5px' }}>{title}</h2>
      <div style={{ fontSize: 15, lineHeight: 1.9, color: '#445566' }}>{children}</div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: '0 0 14px' }}>{children}</p>;
}

export default function TermsOfUsePage() {
  return (
    <>
      <Nav />

      <div style={{ background: `linear-gradient(140deg,#071A40 0%,${BLUE} 55%,${MID} 100%)`, padding: '80px 40px 70px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/pattern/flower.png)', backgroundSize: '220px 220px', backgroundRepeat: 'repeat', opacity: 0.12, mixBlendMode: 'screen' as const }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: GOLD, display: 'block', marginBottom: 14 }}>Legal</span>
          <h1 style={{ fontFamily: F, fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, color: '#fff', letterSpacing: '-2px', lineHeight: 1, margin: 0 }}>Terms of Use</h1>
          <p style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>Last updated: January 1, 2025</p>
        </div>
      </div>

      <main style={{ background: '#F4F7FF', padding: '80px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', background: '#fff', borderRadius: 20, padding: '56px 64px', boxShadow: '0 4px 32px rgba(27,81,168,0.07)' }}>

          <P>These Terms of Use govern your access to and use of the Widgeon Point Charitable Foundation website (widgeonpoint.org). By accessing or using this website, you agree to be bound by these terms. If you do not agree, please do not use this website.</P>

          <Section title="1. Use of This Website">
            <P>This website is provided for informational purposes and to facilitate the grant application process of the Widgeon Point Charitable Foundation. You may use this website only for lawful purposes and in accordance with these Terms of Use.</P>
            <P>You agree not to use this website in any way that could damage, disable, or impair the site, interfere with any other party's use, or attempt to gain unauthorized access to any part of the website or its related systems.</P>
          </Section>

          <Section title="2. Grant Applications">
            <P>Submission of a grant application through this website does not guarantee funding. The Foundation reserves the right to approve, decline, or partially fund any application at its sole discretion. Submitting an application creates no contractual obligation on the part of the Foundation.</P>
            <P>Applicants are solely responsible for the accuracy, completeness, and legality of all information submitted. The Foundation is not liable for any consequences arising from inaccurate or incomplete application materials. Any misrepresentation of eligibility or organizational information may result in disqualification and, where applicable, recovery of any funds awarded.</P>
          </Section>

          <Section title="3. Photographs and Third-Party Content">
            <P>This website includes photographs and other media provided voluntarily by grantee organizations. The Widgeon Point Charitable Foundation does not own, control, or independently verify the rights to photographs submitted by third parties. Organizations that provide photographs to the Foundation represent and warrant that they have all necessary rights and consents, including the consent of any individuals depicted.</P>
            <P>The Foundation is not responsible for any claims, disputes, or liability arising from the use of photographs or other content submitted by third-party organizations. Any such claims are the sole responsibility of the submitting organization.</P>
          </Section>

          <Section title="4. Intellectual Property">
            <P>The content created by the Widgeon Point Charitable Foundation on this website, including text, graphics, logos, and page layouts, is the property of the Foundation and may not be reproduced, distributed, or used without prior written permission.</P>
            <P>Photographs and other media submitted by grantee organizations remain the property of the submitting organizations or their respective rights holders.</P>
          </Section>

          <Section title="5. Accuracy of Information">
            <P>The Foundation makes reasonable efforts to ensure that information on this website is accurate and current. However, we make no warranties or representations, express or implied, regarding the completeness, accuracy, or reliability of any content on this website. Information is provided "as is" and may change without notice.</P>
            <P>Grant recipient data displayed on this website reflects historical records to the best of our ability. The Foundation is not liable for any errors or omissions in this data.</P>
          </Section>

          <Section title="6. Limitation of Liability">
            <P>To the fullest extent permitted by law, the Widgeon Point Charitable Foundation, its board members, officers, staff, and agents shall not be liable for any direct, indirect, incidental, or consequential damages arising out of or in connection with your use of this website, the grant application process, or any information submitted to the Foundation.</P>
            <P>This includes, without limitation, damages arising from errors in application materials, reliance on website content, unauthorized access to submitted data, or any act or omission of a third-party organization that has provided content to the Foundation.</P>
          </Section>

          <Section title="7. External Links">
            <P>This website may contain links to third-party websites for reference. The Foundation does not endorse and is not responsible for the content, privacy practices, or accuracy of any external sites. Accessing external links is at your own risk.</P>
          </Section>

          <Section title="8. Changes to These Terms">
            <P>We reserve the right to modify these Terms of Use at any time. Updated terms will be posted on this page with a revised effective date. Continued use of the website after any changes constitutes your acceptance of the revised terms.</P>
          </Section>

          <Section title="9. Governing Law">
            <P>These Terms of Use are governed by the laws of the State of Maine, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in the State of Maine.</P>
          </Section>

          <Section title="10. Contact">
            <P>If you have questions about these Terms of Use, please contact us through the contact form on our website or write to us at:</P>
            <div style={{ background: '#F4F7FF', borderRadius: 12, padding: '20px 24px', display: 'inline-block', marginTop: 4 }}>
              <div style={{ fontFamily: F, fontWeight: 700, color: BLUE, fontSize: 14 }}>Widgeon Point Charitable Foundation</div>
              <div style={{ fontFamily: F, color: '#6B80A8', fontSize: 14, lineHeight: 1.8 }}>P.O. Box 10779<br />Portland, ME 04104</div>
            </div>
          </Section>

        </div>
      </main>

      <Footer />
    </>
  );
}
