import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main>
        <div style={{background:'linear-gradient(140deg,#071A40 0%,#0D3275 50%,#1B51A8 100%)',padding:'100px 40px 60px',color:'#fff',textAlign:'center'}}>
          <h1 style={{fontSize:'clamp(32px,5vw,56px)',fontWeight:900,letterSpacing:'-2px',lineHeight:1.05}}>Privacy Policy</h1>
        </div>
        <div style={{maxWidth:780,margin:'0 auto',padding:'72px 40px 80px',fontFamily:'var(--font-montserrat),sans-serif'}}>
          <p style={{fontSize:16,lineHeight:1.85,color:'#334D7A',marginBottom:14}}>This Privacy Policy describes how Widgeon Point Charitable Foundation collects, uses, and protects information you provide when using our website.</p>
          {[
            {h:'Information We Collect',p:'We may collect personal information you voluntarily provide when submitting a grant application, including your name, email address, organization name, EIN number, and uploaded documents.'},
            {h:'How We Use Your Information',p:'Information submitted through grant applications is used solely to evaluate grant eligibility and communicate with applicants. We do not sell, trade, or transfer your personal information to outside parties.'},
            {h:'Data Security',p:'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'},
            {h:'Cookies',p:'Our website may use cookies to enhance your browsing experience. You may choose to disable cookies through your browser settings.'},
            {h:'Third-Party Links',p:'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.'},
            {h:'Changes to This Policy',p:'We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page.'},
            {h:'Contact',p:'Questions about this Privacy Policy? Contact us at: Widgeon Point Charitable Foundation, P.O. Box 10779, Portland, ME 04104.'},
          ].map((s,i) => (
            <div key={i}>
              <h2 style={{fontFamily:'var(--font-montserrat)',fontSize:20,fontWeight:900,color:'#0C1B36',margin:'36px 0 12px'}}>{s.h}</h2>
              <p style={{fontSize:16,lineHeight:1.85,color:'#334D7A',marginBottom:14}}>{s.p}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
