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

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />

      <div style={{ background: `linear-gradient(140deg,#071A40 0%,${BLUE} 55%,${MID} 100%)`, padding: '80px 40px 70px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/pattern/flower.png)', backgroundSize: '220px 220px', backgroundRepeat: 'repeat', opacity: 0.12, mixBlendMode: 'screen' as const }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: GOLD, display: 'block', marginBottom: 14 }}>Legal</span>
          <h1 style={{ fontFamily: F, fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, color: '#fff', letterSpacing: '-2px', lineHeight: 1, margin: 0 }}>Privacy Policy</h1>
          <p style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>Last updated: January 1, 2025</p>
        </div>
      </div>

      <main style={{ background: '#F4F7FF', padding: '80px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', background: '#fff', borderRadius: 20, padding: '56px 64px', boxShadow: '0 4px 32px rgba(27,81,168,0.07)' }}>

          <P>The Widgeon Point Charitable Foundation ("we," "us," or "our") is committed to protecting the privacy of everyone who visits our website or submits information through our grant application process. This Privacy Policy explains what information we collect, how we use it, and how we protect it.</P>
          <P>By using this website or submitting an application, you agree to the practices described in this policy.</P>

          <Section title="1. Information We Collect">
            <P><strong>Contact form submissions.</strong> When you use the contact form on our website, we collect your name, email address, and the content of your message. This information is used solely to respond to your inquiry.</P>
            <P><strong>Grant applications.</strong> When an organization submits a grant application, we collect organizational information including but not limited to: organization name, address, contact person, EIN (Federal Tax ID), IRS 501(c)(3) determination letter, IRS Form 990, operating budget, and a description of the requested funding. This information is used to evaluate grant eligibility and make funding decisions.</P>
            <P><strong>Photographs and media.</strong> Images displayed on this website may include photographs provided by grantee organizations. These photos are shared with us voluntarily and are used to represent the work of the organizations we support. We do not claim ownership of photographs submitted by third parties.</P>
            <P><strong>Website usage data.</strong> We may collect standard technical information such as browser type and pages visited for the purpose of improving our website. We do not use tracking cookies or sell any user data.</P>
          </Section>

          <Section title="2. How We Use Your Information">
            <P>We use the information we collect for the following purposes:</P>
            <ul style={{ paddingLeft: 24, marginBottom: 14 }}>
              <li style={{ marginBottom: 8 }}>To review and process grant applications</li>
              <li style={{ marginBottom: 8 }}>To communicate with applicants and grantees regarding their applications or funded programs</li>
              <li style={{ marginBottom: 8 }}>To respond to inquiries submitted through our contact form</li>
              <li style={{ marginBottom: 8 }}>To maintain records of our grantmaking history</li>
            </ul>
            <P>We do not sell, rent, or share your personal information with third parties for marketing purposes.</P>
          </Section>

          <Section title="3. Public vs. Private Information">
            <P><strong>What is public.</strong> A list of organizations that have received grants from Widgeon Point is published on our website under Grant Recipients. This list includes organization names, locations, and years of funding. By accepting a grant, organizations consent to being listed publicly on our website.</P>
            <P><strong>What is private.</strong> All information submitted as part of a grant application, including financial documents, organizational budgets, IRS forms, and any supporting materials, is treated as confidential. This information is reviewed only by authorized Foundation staff and board members and is not disclosed to outside parties.</P>
            <P><strong>Photographs submitted by organizations.</strong> Photos provided to us by grantee organizations for use on this website are displayed publicly. Organizations are responsible for ensuring they have the necessary rights and permissions for any images they submit to us, including the consent of any individuals depicted. The Foundation is not liable for any claims arising from photographs submitted by third parties.</P>
          </Section>

          <Section title="4. Data Submitted by Organizations">
            <P>The Widgeon Point Charitable Foundation acts as a recipient of information voluntarily submitted by nonprofit organizations through the grant application process. We are not responsible for the accuracy, completeness, or legality of information submitted by applicant organizations. Organizations are solely responsible for the content they provide and for ensuring that any information shared with us does not violate any applicable law, regulation, or third-party rights.</P>
            <P>We do not independently verify all information submitted in applications beyond what is required for eligibility assessment. The Foundation assumes no liability for errors or omissions in materials submitted by applicants.</P>
          </Section>

          <Section title="5. Data Retention">
            <P>We retain grant application materials and correspondence for a period consistent with our internal recordkeeping policies and applicable legal requirements. Contact form messages are retained only as long as needed to respond to the inquiry.</P>
          </Section>

          <Section title="6. Security">
            <P>We take reasonable steps to protect the information you share with us from unauthorized access or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security of any information transmitted to or stored by us.</P>
          </Section>

          <Section title="7. Children's Privacy">
            <P>This website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has submitted information to us, please contact us and we will promptly delete it.</P>
          </Section>

          <Section title="8. Changes to This Policy">
            <P>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Continued use of our website following any changes constitutes acceptance of the revised policy.</P>
          </Section>

          <Section title="9. Contact Us">
            <P>If you have questions about this Privacy Policy or how we handle your information, please reach out through the contact form on our website or write to us at:</P>
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
