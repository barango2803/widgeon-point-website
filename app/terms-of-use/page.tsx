import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function TermsOfUsePage() {
  return (
    <>
      <Nav />
      <main>
        <div style={{background:'linear-gradient(140deg,#071A40 0%,#0D3275 50%,#1B51A8 100%)',padding:'100px 40px 60px',color:'#fff',textAlign:'center'}}>
          <h1 style={{fontSize:'clamp(32px,5vw,56px)',fontWeight:900,letterSpacing:'-2px',lineHeight:1.05}}>Terms Of Use</h1>
        </div>
        <div style={{maxWidth:780,margin:'0 auto',padding:'72px 40px 80px',fontFamily:'var(--font-montserrat),sans-serif'}}>
          <p style={{fontSize:16,lineHeight:1.85,color:'#334D7A',marginBottom:14}}>By accessing and using the Widgeon Point Charitable Foundation website, you accept and agree to be bound by the following terms and conditions.</p>
          {[
            {h:'Use of Site',p:'This website is provided for informational purposes and to facilitate grant applications. You agree to use this site only for lawful purposes and in a manner that does not infringe the rights of others.'},
            {h:'Intellectual Property',p:'All content on this website, including text, graphics, and logos, is the property of Widgeon Point Charitable Foundation and is protected by applicable copyright laws.'},
            {h:'Accuracy of Information',p:'We endeavor to keep information on this site current and accurate. However, we make no warranties regarding the completeness, accuracy, or reliability of any content.'},
            {h:'Limitation of Liability',p:'Widgeon Point Charitable Foundation shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website.'},
            {h:'Grant Applications',p:'Submission of a grant application does not guarantee funding. All grant decisions are made at the sole discretion of the Widgeon Point Charitable Foundation board.'},
            {h:'Governing Law',p:'These terms are governed by the laws of the State of New York, without regard to its conflict of law provisions.'},
            {h:'Contact',p:'For questions about these Terms of Use: Widgeon Point Charitable Foundation, P.O. Box 10779, Portland, ME 04104.'},
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
