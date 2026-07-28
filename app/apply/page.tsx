'use client';
import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const F = 'var(--font-montserrat),sans-serif';
const inp: React.CSSProperties = {
  width:'100%',padding:'12px 16px',border:'1.5px solid rgba(27,81,168,0.15)',borderRadius:10,
  fontFamily:F,fontSize:14,fontWeight:500,color:'#0C1B36',outline:'none',background:'#fff',boxSizing:'border-box',
};
const lbl: React.CSSProperties = {
  display:'block',fontSize:11,fontWeight:700,letterSpacing:'0.8px',color:'#334D7A',marginBottom:6,textTransform:'uppercase',
};
const hint: React.CSSProperties = {
  fontSize:12,color:'#8899BB',marginTop:5,lineHeight:1.5,
};
const req = <span style={{color:'#ef4444',marginLeft:2}}>*</span>;
const row2: React.CSSProperties = {display:'grid',gridTemplateColumns:'1fr 1fr',gap:16};
const row3: React.CSSProperties = {display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16};

const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'];
const TIMEZONES = ['Eastern (ET)','Central (CT)','Mountain (MT)','Pacific (PT)','Alaska (AKT)','Hawaii (HT)'];

function Section({num,title,children}:{num:number,title:string,children:React.ReactNode}) {
  return (
    <div style={{background:'#fff',borderRadius:16,boxShadow:'0 2px 20px rgba(27,81,168,0.07)',marginBottom:24,overflow:'hidden'}}>
      <div style={{background:'#0D3275',padding:'16px 28px',display:'flex',alignItems:'center',gap:14}}>
        <span style={{width:28,height:28,borderRadius:'50%',background:'rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:800,color:'#fff',flexShrink:0}}>{num}</span>
        <span style={{fontSize:14,fontWeight:800,color:'#fff',letterSpacing:'0.5px'}}>{title}</span>
      </div>
      <div style={{padding:'28px 32px'}}>{children}</div>
    </div>
  );
}

function SubHeading({children}:{children:React.ReactNode}) {
  return <div style={{fontSize:11,fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:'#1B51A8',borderTop:'1px solid rgba(27,81,168,0.10)',paddingTop:20,marginTop:24,marginBottom:16}}>{children}</div>;
}

function Field({label:l,hint:h,required:r=false,children}:{label:string,hint?:string,required?:boolean,children:React.ReactNode}) {
  return (
    <div>
      <label style={lbl}>{l}{r && req}</label>
      {children}
      {h && <p style={hint}>{h}</p>}
    </div>
  );
}

const AREAS = [
  {id:'1',title:'Community-Based Giving',desc:'Organizations rooted in local communities, providing direct services, building social cohesion, and addressing hyper-local needs.'},
  {id:'2',title:'Youth Development',desc:'Programs investing in young people through education, mentorship, athletics, outdoor learning, and the arts.'},
  {id:'3',title:'Environmental Access & Stewardship',desc:'Protecting the natural world and ensuring equitable access to outdoor spaces, clean water, and conservation.'},
  {id:'4',title:'Cultural Exchange, Arts & Heritage',desc:'Organizations fostering understanding through the arts, language, international exchange, and cultural celebration.'},
  {id:'5',title:'Discretionary Giving',desc:'Exceptional organizations that fall outside traditional categories but strongly align with our mission to spread joy and relieve suffering.'},
];

export default function ApplyPage() {
  const [status501, setStatus501] = useState('');
  const [grantPurpose, setGrantPurpose] = useState('');
  const [givingArea, setGivingArea] = useState('');

  return (
    <>
      <Nav />
      <main style={{fontFamily:F}}>

        {/* Hero */}
        <div style={{background:'linear-gradient(140deg,#071A40 0%,#0D3275 50%,#1B51A8 100%)',padding:'80px 40px 60px',color:'#fff',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,backgroundImage:'url(/pattern/flower.png)',backgroundSize:'160px 160px',opacity:0.05,pointerEvents:'none'}} />
          <div style={{position:'relative'}}>
            <span style={{fontSize:10,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'#F0B429',display:'block',marginBottom:14}}>Grant Application</span>
            <h1 style={{fontSize:'clamp(28px,4vw,48px)',fontWeight:800,letterSpacing:'-1px',lineHeight:1.1,marginBottom:16}}>Apply for a Grant</h1>
            <p style={{fontSize:15,color:'rgba(255,255,255,0.65)',maxWidth:520,margin:'0 auto',lineHeight:1.8}}>
              Complete all six sections below. Fields marked with <span style={{color:'#ef4444'}}>*</span> are required. The more detail you share, the better our board can understand your mission.
            </p>
          </div>
        </div>

        <div style={{background:'#F4F7FF',padding:'48px 40px 80px'}}>
          <div style={{maxWidth:1160,margin:'0 auto',display:'grid',gridTemplateColumns:'260px 1fr',gap:56,alignItems:'start'}}>

            {/* Sidebar */}
            <div style={{position:'sticky',top:96}}>
              <div style={{background:'#fff',borderRadius:16,padding:20,boxShadow:'0 2px 16px rgba(27,81,168,0.08)',marginBottom:16,borderLeft:'3px solid #C9A84C'}}>
                <div style={{fontSize:10,fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:'#C9A84C',marginBottom:8}}>Open to Everyone</div>
                <p style={{fontSize:13,lineHeight:1.7,color:'#334D7A',margin:0}}>Any IRS registered 501(c)(3) in the United States is welcome to apply. New and returning organizations alike.</p>
              </div>
              {[
                {lbl:'Application Deadline', val:'March 15 to September 15. If awarded, you will hear from us after December 15.'},
                {lbl:'Award Amount',     val:'Full or partial — board decides based on your application'},
                {lbl:'Sections',         val:'6 sections · 41 fields'},
                {lbl:'Questions?',       val:'P.O. Box 10779\nPortland, ME 04104'},
              ].map((c,i) => (
                <div key={i} style={{background:'#fff',borderRadius:12,padding:'14px 18px',boxShadow:'0 2px 12px rgba(27,81,168,0.06)',marginBottom:10}}>
                  <div style={{fontSize:10,fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:'#1B51A8',marginBottom:4}}>{c.lbl}</div>
                  <div style={{fontSize:13,fontWeight:500,color:'#334D7A',lineHeight:1.6,whiteSpace:'pre-line'}}>{c.val}</div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form method="POST" encType="multipart/form-data" action="/api/apply">

              {/* ── Section 1: Organization Eligibility ── */}
              <Section num={1} title="Organization Eligibility">
                <div style={{display:'flex',flexDirection:'column',gap:20}}>
                  <Field label="Organization Name" required>
                    <input name="org_name" style={inp} required />
                  </Field>

                  <Field label="Is your organization a registered 501(c)(3)?" required hint="Select the option that best describes your organization's status.">
                    <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                      {[
                        {val:'Yes',    desc:'We are a 501(c)(3)'},
                        {val:'No',     desc:'We are not registered'},
                        {val:'Sponsor',desc:'We have a Fiscal Sponsor'},
                      ].map(o => (
                        <label key={o.val} style={{flex:'1 1 140px',display:'flex',flexDirection:'column',gap:2,padding:'12px 16px',borderRadius:10,border:`1.5px solid ${status501===o.val?'#0D3275':'rgba(27,81,168,0.15)'}`,background:status501===o.val?'#EBF2FF':'#fff',cursor:'pointer'}}>
                          <input type="radio" name="is_501c3" value={o.val} checked={status501===o.val} onChange={() => setStatus501(o.val)} style={{display:'none'}} required />
                          <span style={{fontSize:13,fontWeight:800,color:status501===o.val?'#0D3275':'#0C1B36'}}>{o.val === 'Sponsor' ? 'Fiscal Sponsor' : o.val}</span>
                          <span style={{fontSize:11,color:'#8899BB'}}>{o.desc}</span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field label="Employer Identification Number (EIN)" required hint={status501==='Sponsor' ? "Enter your fiscal sponsor's EIN." : "Format: XX-XXXXXXX"}>
                    <input name="ein" placeholder="XX-XXXXXXX" style={{...inp,maxWidth:240}} required />
                  </Field>
                </div>
              </Section>

              {/* ── Section 2: Contact Information ── */}
              <Section num={2} title="Contact Information">

                <SubHeading>Application Submitter</SubHeading>
                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                  <Field label="Full Name" required hint="Name of the person completing and submitting this application.">
                    <input name="submitter_name" style={inp} required />
                  </Field>
                  <div style={row3}>
                    <Field label="Email" required>
                      <input name="submitter_email" type="email" style={inp} required />
                    </Field>
                    <Field label="Phone" required>
                      <input name="submitter_phone" type="tel" style={inp} required />
                    </Field>
                    <Field label="Time Zone" required hint="e.g., Eastern (ET), Pacific (PT)">
                      <select name="submitter_timezone" style={{...inp,cursor:'pointer'}} required>
                        <option value="">Select—</option>
                        {TIMEZONES.map(tz => <option key={tz}>{tz}</option>)}
                      </select>
                    </Field>
                  </div>
                </div>

                <SubHeading>Second Contact</SubHeading>
                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                  <Field label="Full Name">
                    <input name="second_contact_name" style={inp} />
                  </Field>
                  <div style={row2}>
                    <Field label="Email">
                      <input name="second_contact_email" type="email" style={inp} />
                    </Field>
                    <Field label="Phone">
                      <input name="second_contact_phone" type="tel" style={inp} />
                    </Field>
                  </div>
                </div>

                <SubHeading>Executive Director</SubHeading>
                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                  <Field label="Full Name" required>
                    <input name="exec_name" style={inp} required />
                  </Field>
                  <div style={row2}>
                    <Field label="Email" required>
                      <input name="exec_email" type="email" style={inp} required />
                    </Field>
                    <Field label="Phone" required>
                      <input name="exec_phone" type="tel" style={inp} required />
                    </Field>
                  </div>
                </div>

                <SubHeading>Online Presence</SubHeading>
                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                  <Field label="Organization Website URL" hint="Include full URL (e.g., https://www.example.org). Leave blank if not applicable.">
                    <input name="website_url" type="url" placeholder="https://" style={inp} />
                  </Field>
                  <Field label="Social Media Handles" hint="e.g., Instagram: @example, Facebook: /example">
                    <input name="social_media" placeholder="@org on Instagram, /org on Facebook…" style={inp} />
                  </Field>
                </div>
              </Section>

              {/* ── Section 3: Organization Profile ── */}
              <Section num={3} title="Organization Profile">
                <div style={{display:'flex',flexDirection:'column',gap:20}}>

                  <Field label="Street Address" required>
                    <input name="org_address" style={inp} required />
                  </Field>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 120px 120px',gap:16}}>
                    <Field label="City" required>
                      <input name="org_city" style={inp} required />
                    </Field>
                    <Field label="State" required>
                      <select name="org_state" style={{...inp,cursor:'pointer'}} required>
                        <option value="">Select—</option>
                        {STATES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field label="ZIP" required>
                      <input name="org_zip" maxLength={10} style={inp} required />
                    </Field>
                  </div>

                  <Field label="Mission Statement" required hint="Maximum 200 words.">
                    <textarea name="mission_statement" rows={5} style={{...inp,resize:'vertical'}} required />
                  </Field>

                  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
                    <Field label="Years in Operation" required hint="Full years operating.">
                      <input name="years_in_operation" type="number" min="0" style={inp} required />
                    </Field>
                    <Field label="Full-Time Staff" required>
                      <input name="staff_fulltime" type="number" min="0" style={inp} required />
                    </Field>
                    <Field label="Part-Time Staff">
                      <input name="staff_parttime" type="number" min="0" style={inp} />
                    </Field>
                    <Field label="Volunteers">
                      <input name="volunteers" type="number" min="0" style={inp} />
                    </Field>
                  </div>

                  <div style={row3}>
                    <Field label="Annual Operating Budget (USD)" required hint="Current fiscal year.">
                      <input name="annual_budget" placeholder="$0" style={inp} required />
                    </Field>
                    <Field label="Total Assets (USD)" hint="From most recent financial statements.">
                      <input name="total_assets" placeholder="$0" style={inp} />
                    </Field>
                    <Field label="Outstanding Debts (USD)" hint="Total liabilities from most recent statements.">
                      <input name="outstanding_debts" placeholder="$0" style={inp} />
                    </Field>
                  </div>
                </div>
              </Section>

              {/* ── Section 4: Grant Request Details ── */}
              <Section num={4} title="Grant Request Details">
                <div style={{display:'flex',flexDirection:'column',gap:20}}>

                  <Field label="Grant Amount Requested (USD)" required hint="Up to $9,999,999.00.">
                    <input name="grant_amount" placeholder="$0" style={{...inp,maxWidth:260}} required />
                  </Field>

                  <Field label="Grant Purpose" required>
                    <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:4}}>
                      {[
                        {val:'Operations',     desc:'General operating support for the organization'},
                        {val:'Capital Campaign',desc:'Specific capital project or campaign'},
                      ].map(o => (
                        <label key={o.val} style={{flex:'1 1 200px',display:'flex',flexDirection:'column',gap:3,padding:'14px 18px',borderRadius:12,border:`1.5px solid ${grantPurpose===o.val?'#0D3275':'rgba(27,81,168,0.15)'}`,background:grantPurpose===o.val?'#EBF2FF':'#fff',cursor:'pointer'}}>
                          <input type="radio" name="grant_purpose" value={o.val} checked={grantPurpose===o.val} onChange={() => setGrantPurpose(o.val)} style={{display:'none'}} required />
                          <span style={{fontSize:14,fontWeight:800,color:grantPurpose===o.val?'#0D3275':'#0C1B36'}}>{o.val}</span>
                          <span style={{fontSize:12,color:'#8899BB'}}>{o.desc}</span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  {grantPurpose === 'Capital Campaign' && (
                    <div style={{background:'#EBF2FF',borderRadius:12,padding:20,border:'1px solid rgba(27,81,168,0.15)'}}>
                      <Field label="Capital Campaign Description" required hint="Upload a PDF, DOC, or DOCX describing your capital campaign.">
                        <input name="capital_campaign_doc" type="file" accept=".pdf,.doc,.docx" style={{...inp,background:'#fff',border:'1.5px dashed rgba(27,81,168,0.3)',cursor:'pointer'}} required />
                      </Field>
                    </div>
                  )}

                  <Field label="How did you hear about our foundation?" hint="Maximum 100 words.">
                    <textarea name="how_did_you_hear" rows={3} style={{...inp,resize:'vertical'}} maxLength={700} />
                  </Field>

                  <Field label="Anything else we should know about your organization?" hint="Maximum 250 words.">
                    <textarea name="additional_info" rows={5} style={{...inp,resize:'vertical'}} maxLength={1800} />
                  </Field>
                </div>
              </Section>

              {/* ── Section 5: Area of Giving ── */}
              <Section num={5} title="Area of Giving">
                <p style={{fontSize:14,color:'#6B80A8',marginBottom:20,lineHeight:1.7}}>Select the one area that best aligns with your organization&apos;s primary mission:{req}</p>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  {AREAS.map(a => (
                    <label key={a.id} style={{display:'flex',gap:16,padding:'16px 20px',borderRadius:12,border:`1.5px solid ${givingArea===a.id?'#0D3275':'rgba(27,81,168,0.12)'}`,background:givingArea===a.id?'#EBF2FF':'#fff',cursor:'pointer',alignItems:'flex-start'}}>
                      <input type="radio" name="giving_area" value={a.id} checked={givingArea===a.id} onChange={() => setGivingArea(a.id)} style={{display:'none'}} required />
                      <div style={{width:20,height:20,borderRadius:'50%',border:`2px solid ${givingArea===a.id?'#0D3275':'rgba(27,81,168,0.25)'}`,background:givingArea===a.id?'#0D3275':'transparent',flexShrink:0,marginTop:2,display:'flex',alignItems:'center',justifyContent:'center'}}>
                        {givingArea===a.id && <div style={{width:7,height:7,borderRadius:'50%',background:'#fff'}} />}
                      </div>
                      <div>
                        <div style={{fontSize:14,fontWeight:800,color:givingArea===a.id?'#0D3275':'#0C1B36',marginBottom:3}}>{a.title}</div>
                        <div style={{fontSize:12,color:'#6B80A8',lineHeight:1.6}}>{a.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </Section>

              {/* ── Section 6: Document Uploads ── */}
              <Section num={6} title="Required Document Uploads">
                <p style={{fontSize:14,color:'#6B80A8',marginBottom:24,lineHeight:1.7}}>
                  Upload supporting documents below. Files marked {req} are required.
                </p>
                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  {[
                    {name:'doc_irs',       label:'IRS Confirmation Letter (with EIN)',        req:true,  hint:'IRS letter confirming 501(c)(3) status and displaying your EIN.',    accept:'.pdf'},
                    {name:'doc_cover',     label:'Cover Letter',                               req:true,  hint:'Formally requesting the grant, addressed to Widgeon Point Foundation.',accept:'.pdf,.doc,.docx'},
                    {name:'doc_990',       label:'IRS Form 990 — Most Recent Filing',          req:true,  hint:"Your organization's most recently filed annual federal tax return.",  accept:'.pdf'},
                    {name:'doc_annual',    label:'Most Recent Annual Report',                  req:false, hint:'Upload the document or provide a URL below instead.',                accept:'.pdf'},
                    {name:'doc_budget_py', label:'Previous / Current Year Operating Budget',  req:true,  hint:'Finalized operating budget for the most recently completed fiscal year.',accept:'.pdf,.xls,.xlsx'},
                    {name:'doc_budget_ny', label:'Next Year Projected Budget',                 req:false, hint:'Projected operating budget for the current or upcoming fiscal year.',  accept:'.pdf,.xls,.xlsx'},
                  ].map((doc,i) => (
                    <div key={i} style={{background:'#F4F7FF',borderRadius:12,padding:'16px 20px',border:'1px solid rgba(27,81,168,0.08)'}}>
                      <label style={lbl}>
                        {doc.label}
                        {doc.req ? req : <span style={{fontSize:10,color:'#8899BB',marginLeft:6,fontWeight:500,textTransform:'none',letterSpacing:0}}>(optional)</span>}
                      </label>
                      <p style={hint}>{doc.hint}</p>
                      <input name={doc.name} type="file" accept={doc.accept} required={doc.req} style={{...inp,background:'#fff',border:'1.5px dashed rgba(27,81,168,0.2)',cursor:'pointer',marginTop:8}} />
                    </div>
                  ))}

                  <div style={{background:'#F4F7FF',borderRadius:12,padding:'16px 20px',border:'1px solid rgba(27,81,168,0.08)'}}>
                    <Field label="Annual Report URL" hint="Provide a direct link if you prefer not to upload a file.">
                      <input name="annual_report_url" type="url" placeholder="https://" style={inp} />
                    </Field>
                  </div>
                </div>

                <div style={{marginTop:32,paddingTop:24,borderTop:'1px solid rgba(27,81,168,0.10)'}}>
                  <button type="submit" style={{width:'100%',padding:'18px 32px',background:'#0D3275',color:'#fff',fontFamily:F,fontSize:14,fontWeight:800,letterSpacing:'0.5px',border:'none',borderRadius:12,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
                    Submit Application
                    <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M9 3l6 6-6 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <p style={{fontSize:12,color:'#8899BB',textAlign:'center',marginTop:12,lineHeight:1.6}}>
                    By submitting, you confirm all information is accurate. Submission does not guarantee funding.
                  </p>
                </div>
              </Section>

            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
