'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FlowerLogo } from '@/components/FlowerLogo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  LayoutDashboard, Table2, PlusCircle, LogOut,
  ChevronDown, Target, CheckCircle2, Clock, TrendingUp,
  BarChart3, Plus, X, ExternalLink, Pencil, Save, Star,
} from 'lucide-react';
import type { Application } from '@/lib/data';

// ── constants ──────────────────────────────────────────────────────────────
const AREA_NAMES: Record<number, string> = {
  1: 'Community-Based', 2: 'Youth Development', 3: 'Environmental',
  4: 'Cultural & Arts', 5: 'Discretionary',
};
const AREA_COLORS: Record<number, string> = {
  1: '#1B4F9B', 2: '#1e8e3e', 3: '#00838f', 4: '#7b1fa2', 5: '#f9ab00',
};
const STATUS_META: Record<string, { label: string; cls: string }> = {
  submitted:    { label: 'Pending',   cls: 'st-submitted' },
  under_review: { label: 'In Review', cls: 'st-under_review' },
  approved:     { label: 'Accepted',  cls: 'st-approved' },
  declined:     { label: 'Denied',    cls: 'st-declined' },
};
const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'];
const S2F: Record<string,number> = {AL:1,AK:2,AZ:4,AR:5,CA:6,CO:8,CT:9,DE:10,FL:12,GA:13,HI:15,ID:16,IL:17,IN:18,IA:19,KS:20,KY:21,LA:22,ME:23,MD:24,MA:25,MI:26,MN:27,MS:28,MO:29,MT:30,NE:31,NV:32,NH:33,NJ:34,NM:35,NY:36,NC:37,ND:38,OH:39,OK:40,OR:41,PA:42,RI:44,SC:45,SD:46,TN:47,TX:48,UT:49,VT:50,VA:51,WA:53,WV:54,WI:55,WY:56,DC:11};
const F2S = Object.fromEntries(Object.entries(S2F).map(([k,v])=>[v,k]));
const PAL = ['#1B4F9B','#1e8e3e','#f9ab00','#7b1fa2','#d93025','#00838f','#c2185b'];
const fmt$ = (n: number) => n >= 1e6 ? '$'+(n/1e6).toFixed(2)+'M' : '$'+Math.round(n).toLocaleString();
const fmtD = (d: string) => { const [y,m,dy]=d.split('T')[0].split('-'); return new Date(+y,+m-1,+dy).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); };
const med = (a: number[]) => { if(!a.length)return 0; const s=[...a].sort((x,y)=>x-y),m=Math.floor(s.length/2); return s.length%2===0?(s[m-1]+s[m])/2:s[m]; };

type View = 'dashboard' | 'applications' | 'new-application';
type MapMode = 'all'|'approved'|'declined'|'pending'|'amount';
type ChartMetric = 'count'|'amount'|'approved_amount'|'avg';
type ChartGroup  = 'month'|'quarter'|'area'|'purpose'|'status'|'year';
type ChartType   = 'bar'|'line'|'pie'|'doughnut';
interface ChartCfg { id: number; metric: ChartMetric; group: ChartGroup; type: ChartType; }

let nextChartId = 4;

function grouped(data: Application[], g: ChartGroup, m: ChartMetric) {
  const sl: Record<string,string> = {submitted:'Pending',under_review:'In Review',approved:'Accepted',declined:'Denied'};
  const map: Record<string,{count:number;amount:number;approved_amount:number}> = {};
  data.forEach(r => {
    const k = g==='month'?r.year+'-'+String(r.month).padStart(2,'0')
            : g==='quarter'?r.year+' Q'+Math.ceil(r.month/3)
            : g==='area'?AREA_NAMES[r.giving_area]
            : g==='purpose'?r.grant_purpose
            : g==='status'?sl[r.status]||r.status
            : String(r.year);
    if(!map[k])map[k]={count:0,amount:0,approved_amount:0};
    map[k].count++; map[k].amount+=r.grant_amount_requested;
    if(r.status==='approved')map[k].approved_amount+=r.grant_amount_requested;
  });
  const keys=Object.keys(map).sort((a,b)=>a.localeCompare(b));
  const vals=keys.map(k=>m==='count'?map[k].count:m==='amount'?Math.round(map[k].amount):m==='approved_amount'?Math.round(map[k].approved_amount):map[k].count>0?Math.round(map[k].amount/map[k].count):0);
  return {keys,vals};
}

// ── Score badge ────────────────────────────────────────────────────────────
function ScoreBadge({ score, size='sm' }: { score: number | null; size?: 'sm'|'lg' }) {
  if (score === null) return <span className="text-gray-300 text-xs italic">—</span>;
  const color = score >= 8 ? '#1e8e3e' : score >= 6 ? '#b45309' : '#d93025';
  const bg    = score >= 8 ? '#e6f4ea'  : score >= 6 ? '#fff3cd'  : '#fce8e6';
  return (
    <span className={`inline-flex items-center gap-0.5 font-bold rounded-full px-2 ${size==='lg'?'text-base py-1':'text-xs py-0.5'}`}
      style={{ background: bg, color }}>
      <Star className={size==='lg'?'w-3.5 h-3.5':'w-2.5 h-2.5'} fill={color} strokeWidth={0}/>
      {score.toFixed(1)}
    </span>
  );
}

// ── Chart card ─────────────────────────────────────────────────────────────
function ChartCard({ cfg, fd, onUpdate, onRemove, canRemove }: {
  cfg: ChartCfg; fd: Application[];
  onUpdate: (id: number, patch: Partial<ChartCfg>) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    if(typeof window==='undefined'||!fd.length)return;
    import('chart.js').then(({Chart,registerables})=>{
      Chart.register(...registerables);
      const canvas=canvasRef.current; if(!canvas)return;
      const {keys,vals}=grouped(fd,cfg.group,cfg.metric);
      const ml={count:'Applications',amount:'Total Requested ($)',approved_amount:'Committed ($)',avg:'Avg Grant ($)'}[cfg.metric];
      const ir=cfg.type==='pie'||cfg.type==='doughnut';
      const areaIdx=cfg.group==='area'?keys.map(k=>Object.values(AREA_NAMES).indexOf(k)+1):null;
      const col=ir
        ? keys.map((_,j)=>areaIdx?((AREA_COLORS[areaIdx[j]]||PAL[j%PAL.length])+'cc'):(PAL[j%PAL.length]+'cc'))
        : PAL[cfg.id%PAL.length];
      if(instanceRef.current){instanceRef.current.destroy();instanceRef.current=null;}
      instanceRef.current=new Chart(canvas,{
        type:cfg.type,
        data:{labels:keys,datasets:[{label:ml,data:vals,
          backgroundColor:ir?col:(col as string)+'22',
          borderColor:ir?col:col,borderWidth:ir?0:2,
          borderRadius:cfg.type==='bar'?4:0,tension:.4,
          pointRadius:cfg.type==='line'?4:0,pointHoverRadius:cfg.type==='line'?6:0}]},
        options:{responsive:true,maintainAspectRatio:false,
          plugins:{
            legend:{display:ir,position:'bottom',labels:{boxWidth:10,font:{size:10},padding:10}},
            tooltip:{backgroundColor:'rgba(28,28,30,.92)',padding:10,cornerRadius:8,
              callbacks:{label:(ctx:any)=>{const v=ctx.parsed?.y!==undefined?ctx.parsed.y:ctx.parsed;return' '+(ml.includes('$')?fmt$(v):v.toLocaleString());}}}},
          scales:ir?{}:{
            x:{grid:{display:false},border:{display:false},ticks:{font:{size:10},color:'#8e8e93',maxTicksLimit:10}},
            y:{grid:{color:'rgba(0,0,0,.05)'},border:{display:false},ticks:{font:{size:10},color:'#8e8e93',
              callback:(v:any)=>ml.includes('$')?(v>=1e6?'$'+(v/1e6).toFixed(1)+'M':v>=1000?'$'+(v/1000).toFixed(0)+'k':'$'+v):v}}}}
      });
    });
    return()=>{if(instanceRef.current){instanceRef.current.destroy();instanceRef.current=null;}};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fd,cfg.metric,cfg.group,cfg.type]);

  const metricOpts: [ChartMetric,string][] = [['count','App count'],['amount','Total $'],['approved_amount','Committed $'],['avg','Avg grant']];
  const groupOpts:  [ChartGroup,string][]  = [['month','By month'],['quarter','By quarter'],['area','By area'],['purpose','By purpose'],['status','By status'],['year','By year']];
  const typeOpts:   [ChartType,string][]   = [['bar','Bar'],['line','Line'],['pie','Pie'],['doughnut','Doughnut']];
  const ml={count:'Applications',amount:'Total $',approved_amount:'Committed $',avg:'Avg grant'}[cfg.metric];
  const gl={month:'month',quarter:'quarter',area:'area',purpose:'purpose',status:'status',year:'year'}[cfg.group];

  return (
    <div className="glass rounded-2xl p-4 flex flex-col">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div className="font-semibold text-sm text-gray-800">{ml} by {gl}</div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {([['metric',metricOpts],['group',groupOpts],['type',typeOpts]] as const).map(([k,opts])=>(
            <div key={k} className="relative">
              <select value={(cfg as any)[k]} onChange={e=>onUpdate(cfg.id,{[k]:e.target.value} as Partial<ChartCfg>)}
                className="h-7 pl-2 pr-6 rounded-lg border border-gray-200 bg-white/80 text-xs appearance-none cursor-pointer outline-none hover:border-[#1B4F9B]/40">
                {(opts as [string,string][]).map(([v,l])=><option key={v} value={v}>{l}</option>)}
              </select>
              <ChevronDown className="absolute right-1.5 top-1.5 w-3 h-3 text-gray-400 pointer-events-none"/>
            </div>
          ))}
          {canRemove && (
            <button onClick={()=>onRemove(cfg.id)} className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 flex items-center justify-center transition-colors">
              <X className="w-3.5 h-3.5"/>
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 min-h-[220px]"><canvas ref={canvasRef}/></div>
    </div>
  );
}

// ── App detail modal ───────────────────────────────────────────────────────
function AppModal({ app, onClose, onStatusChange, onSave }: {
  app: Application;
  onClose: () => void;
  onStatusChange: (id: number, s: string) => void;
  onSave: (id: number, patch: Partial<Application>) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Partial<Application>>({});
  const [scoreInput, setScoreInput] = useState(app.score !== null ? String(app.score) : '');
  const [saving, setSaving] = useState(false);

  function f(key: keyof Application) {
    return editing ? (draft[key] !== undefined ? draft[key] : app[key]) : app[key];
  }
  function set(key: keyof Application, val: unknown) {
    setDraft(prev => ({ ...prev, [key]: val }));
  }

  async function handleSave() {
    setSaving(true);
    const scoreVal = scoreInput.trim() === '' ? null : parseFloat(scoreInput);
    const patch = { ...draft, score: (scoreVal !== null && !isNaN(scoreVal)) ? Math.min(10, Math.max(0, +scoreVal.toFixed(1))) : null };
    await onSave(app.id, patch);
    setSaving(false);
    setEditing(false);
    setDraft({});
  }

  const iCls = "w-full h-9 rounded-lg border border-[#1B4F9B]/30 bg-[#f0f5ff] px-2.5 text-sm outline-none focus:border-[#1B4F9B] focus:ring-1 focus:ring-[#1B4F9B]/20 transition-all";
  const tCls = "w-full rounded-lg border border-[#1B4F9B]/30 bg-[#f0f5ff] px-2.5 py-1.5 text-sm outline-none focus:border-[#1B4F9B] resize-none transition-all";

  function Row({ label, value, editKey, type='text', opts }: {
    label: string; value: React.ReactNode; editKey?: keyof Application;
    type?: string; opts?: string[];
  }) {
    return (
      <div className="py-2.5 border-b border-gray-50 last:border-0">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{label}</div>
        {editing && editKey ? (
          opts ? (
            <select value={String(f(editKey)??'')} onChange={e=>set(editKey,e.target.value)} className={iCls}>
              {opts.map(o=><option key={o} value={o}>{o}</option>)}
            </select>
          ) : type==='textarea' ? (
            <textarea rows={3} value={String(f(editKey)??'')} onChange={e=>set(editKey,e.target.value)} className={tCls}/>
          ) : (
            <input type={type} value={String(f(editKey)??'')} onChange={e=>set(editKey,type==='number'?+e.target.value:e.target.value)} className={iCls}/>
          )
        ) : (
          <div className="text-sm text-gray-800 leading-snug">{value||<span className="text-gray-300 italic text-xs">—</span>}</div>
        )}
      </div>
    );
  }

  const DocLink = ({url,label}:{url:string|null;label:string})=>url
    ? <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[#1B4F9B] hover:underline"><ExternalLink className="w-3 h-3"/>{label}</a>
    : <span className="text-xs text-gray-300 italic">Not uploaded</span>;

  function SecHdr({children}:{children:React.ReactNode}){
    return <div className="text-xs font-bold uppercase tracking-widest text-[#1B4F9B] mt-6 mb-0.5 pb-1.5 border-b-2 border-[#e8f0fe]">{children}</div>;
  }

  return (
    <Dialog open onOpenChange={onClose}>
      {/* 95vw wide, tall scroll */}
      <DialogContent className="w-[95vw] max-w-5xl max-h-[92vh] overflow-hidden flex flex-col p-0 gap-0">

        {/* Sticky header */}
        <div className="shrink-0 bg-white border-b border-gray-100 px-8 py-5">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <DialogTitle className="text-xl font-bold text-[#0d3b6e] leading-snug">{String(f('org_name'))}</DialogTitle>
                <div className="flex flex-wrap items-center gap-2.5 mt-2">
                  <span className={`st-pill ${STATUS_META[app.status].cls}`}>{STATUS_META[app.status].label}</span>
                  <select value={app.status} onChange={e=>onStatusChange(app.id,e.target.value)}
                    className="h-7 pl-2 pr-6 rounded-lg border border-gray-200 bg-white text-xs appearance-none cursor-pointer outline-none hover:border-gray-300">
                    <option value="submitted">Set: Pending</option>
                    <option value="under_review">Set: In Review</option>
                    <option value="approved">Set: Accepted</option>
                    <option value="declined">Set: Denied</option>
                  </select>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400" fill="#f9ab00" strokeWidth={0}/>
                    <span className="text-xs text-gray-500 font-medium">Board Score:</span>
                    {editing ? (
                      <input type="number" min="0" max="10" step="0.1" value={scoreInput}
                        onChange={e=>setScoreInput(e.target.value)}
                        className="w-16 h-7 rounded-lg border border-[#1B4F9B]/30 bg-[#f0f5ff] px-2 text-sm font-bold text-center outline-none focus:border-[#1B4F9B]"
                        placeholder="0–10"/>
                    ) : (
                      <ScoreBadge score={app.score} size="lg"/>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {editing ? (
                  <>
                    <Button size="sm" onClick={handleSave} disabled={saving}
                      className="bg-[#0d3b6e] hover:bg-[#1B4F9B] text-white gap-1.5">
                      <Save className="w-3.5 h-3.5"/>{saving?'Saving…':'Save'}
                    </Button>
                    <Button size="sm" variant="outline" onClick={()=>{setEditing(false);setDraft({});setScoreInput(app.score!==null?String(app.score):'');}}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={()=>setEditing(true)}
                    className="gap-1.5 border-[#1B4F9B]/30 text-[#1B4F9B] hover:bg-[#e8f0fe]">
                    <Pencil className="w-3.5 h-3.5"/>Edit fields
                  </Button>
                )}
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Scrollable body — two equal columns */}
        <div className="overflow-y-auto flex-1 px-8 py-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 pb-6">

            {/* LEFT */}
            <div>
              <SecHdr>Organization Identity</SecHdr>
              <Row label="Organization Name" value={app.org_name} editKey="org_name"/>
              <Row label="501(c)(3)" value={app.is_501c3?'Yes ✓':'No'} editKey="is_501c3" opts={['true','false']}/>
              <Row label="EIN" value={<span className="font-mono">{app.ein}</span>} editKey="ein"/>
              <Row label="Org State" value={app.org_state} editKey="org_state" opts={US_STATES}/>
              <Row label="Website" value={app.website_url?<a href={app.website_url} target="_blank" rel="noreferrer" className="text-[#1B4F9B] hover:underline break-all">{app.website_url}</a>:null} editKey="website_url"/>
              <Row label="Social Media" value={app.social_media_handles} editKey="social_media_handles"/>

              <SecHdr>Grant Request</SecHdr>
              <Row label="Amount Requested" value={<span className="font-bold text-[#0d3b6e] text-base">{fmt$(app.grant_amount_requested)}</span>} editKey="grant_amount_requested" type="number"/>
              <Row label="Grant Purpose" value={app.grant_purpose} editKey="grant_purpose" opts={['Operations','Capital Campaign']}/>
              <Row label="Giving Area" value={`${app.giving_area} — ${AREA_NAMES[app.giving_area]}`} editKey="giving_area" opts={['1','2','3','4','5']}/>

              <SecHdr>Organization Profile</SecHdr>
              <Row label="Mission Statement" value={<span className="line-clamp-4 text-sm">{app.mission_statement}</span>} editKey="mission_statement" type="textarea"/>
              <div className="grid grid-cols-2 gap-x-4">
                <Row label="Years in Operation" value={String(app.years_in_operation)} editKey="years_in_operation" type="number"/>
                <Row label="FT Staff" value={String(app.full_time_staff)} editKey="full_time_staff" type="number"/>
                <Row label="PT Staff" value={String(app.part_time_staff)} editKey="part_time_staff" type="number"/>
                <Row label="Volunteers" value={String(app.volunteers)} editKey="volunteers" type="number"/>
              </div>
              <Row label="Annual Budget" value={fmt$(app.annual_operating_budget)} editKey="annual_operating_budget" type="number"/>
              <Row label="Total Assets" value={fmt$(app.total_assets)} editKey="total_assets" type="number"/>
              <Row label="Outstanding Debts" value={app.outstanding_debts>0?<span className="text-red-500 font-semibold">{fmt$(app.outstanding_debts)}</span>:'$0'} editKey="outstanding_debts" type="number"/>
            </div>

            {/* RIGHT */}
            <div>
              <SecHdr>Contact Information</SecHdr>
              <Row label="Submitter Name" value={app.submitter_name} editKey="submitter_name"/>
              <Row label="Submitter Email" value={app.submitter_email} editKey="submitter_email" type="email"/>
              <Row label="Submitter Phone" value={app.submitter_phone} editKey="submitter_phone" type="tel"/>
              <Row label="Street Address" value={app.submitter_street} editKey="submitter_street"/>
              <div className="grid grid-cols-3 gap-x-3">
                <div className="col-span-2"><Row label="City" value={app.submitter_city} editKey="submitter_city"/></div>
                <Row label="State" value={app.submitter_state} editKey="submitter_state" opts={US_STATES}/>
              </div>
              <Row label="Zip Code" value={app.submitter_zip} editKey="submitter_zip"/>
              <Row label="Availability" value={app.submitter_availability} editKey="submitter_availability"/>
              <Row label="Time Zone" value={app.submitter_timezone} editKey="submitter_timezone" opts={['ET','CT','MT','PT','AKT','HT']}/>

              <SecHdr>Executive Director</SecHdr>
              <Row label="Name" value={app.exec_director_name} editKey="exec_director_name"/>
              <Row label="Email" value={app.exec_director_email} editKey="exec_director_email" type="email"/>
              <Row label="Phone" value={app.exec_director_phone} editKey="exec_director_phone" type="tel"/>

              <SecHdr>Documents</SecHdr>
              <div className="grid grid-cols-2 gap-x-6">
                <Row label="IRS Confirmation" value={<DocLink url={app.doc_irs_confirmation} label="View"/>}/>
                <Row label="Cover Letter" value={<DocLink url={app.doc_cover_letter} label="View"/>}/>
                <Row label="Form 990" value={<DocLink url={app.doc_form_990} label="View"/>}/>
                <Row label="Annual Report" value={<DocLink url={app.doc_annual_report} label="View"/>}/>
                <Row label="Budget — Prev Year" value={<DocLink url={app.doc_budget_prev_year} label="View"/>}/>
                <Row label="Budget — Next Year" value={<DocLink url={app.doc_budget_next_year} label="View"/>}/>
              </div>
              <Row label="Annual Report URL" value={app.doc_annual_report_url?<a href={app.doc_annual_report_url} target="_blank" rel="noreferrer" className="text-[#1B4F9B] hover:underline text-xs break-all">{app.doc_annual_report_url}</a>:null} editKey="doc_annual_report_url"/>

              <SecHdr>Submission</SecHdr>
              <div className="grid grid-cols-2 gap-x-6">
                <Row label="Application ID" value={`#${app.id}`}/>
                <Row label="Submitted" value={fmtD(app.submitted_at)}/>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky save bar */}
        {editing && (
          <div className="shrink-0 bg-white/95 backdrop-blur border-t border-gray-100 px-8 py-3 flex items-center justify-between">
            <span className="text-xs text-gray-400">Changes are saved in-memory until a database is connected.</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={()=>{setEditing(false);setDraft({});setScoreInput(app.score!==null?String(app.score):'');}}>Cancel</Button>
              <Button size="sm" onClick={handleSave} disabled={saving} className="bg-[#0d3b6e] hover:bg-[#1B4F9B] text-white gap-1.5">
                <Save className="w-3.5 h-3.5"/>{saving?'Saving…':'Save changes'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ── New app form helpers ───────────────────────────────────────────────────
const inputCls = "w-full h-10 rounded-lg border border-gray-200 bg-white/60 px-3 text-sm outline-none focus:border-[#1B4F9B] focus:ring-2 focus:ring-[#1B4F9B]/15 transition-all";
const selectCls = inputCls + " cursor-pointer";
const textareaCls = "w-full rounded-lg border border-gray-200 bg-white/60 px-3 py-2 text-sm outline-none focus:border-[#1B4F9B] focus:ring-2 focus:ring-[#1B4F9B]/15 transition-all resize-none";
const docBoxCls = "flex items-center gap-2 h-10 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/60 px-3 text-sm text-gray-400 cursor-pointer hover:border-[#1B4F9B]/40 hover:bg-[#e8f0fe]/30 transition-all";
const sectionHdr = "text-xs font-bold uppercase tracking-widest text-[#1B4F9B] mb-4 mt-2 pb-2 border-b border-[#e8f0fe]";

function Field({label,hint,children,required,col=1}:{label:string;hint?:string;children:React.ReactNode;required?:boolean;col?:number;}) {
  return (
    <div className={col===2?'md:col-span-2':''}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required&&<span className="text-red-500 ml-0.5">*</span>}
      </label>
      {hint&&<p className="text-xs text-gray-400 mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function BoardDashboard() {
  const router = useRouter();
  const [view, setView] = useState<View>('dashboard');
  const [all, setAll] = useState<Application[]>([]);
  const [filterYear, setFilterYear] = useState('2026');
  const [filterArea, setFilterArea] = useState('all');
  const [filterPurpose, setFilterPurpose] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [mapMode, setMapMode] = useState<MapMode>('all');
  const [selState, setSelState] = useState<string|null>(null);
  const [budgetTarget, setBudgetTarget] = useState(1000000);
  const [charts, setCharts] = useState<ChartCfg[]>([
    {id:1, metric:'count',  group:'month',   type:'bar'},
    {id:2, metric:'count',  group:'area',    type:'doughnut'},
    {id:3, metric:'amount', group:'purpose', type:'pie'},
  ]);
  const [appSearch, setAppSearch] = useState('');
  const [sortField, setSortField] = useState<string|null>(null);
  const [sortDir, setSortDir] = useState(1);
  const [selectedApp, setSelectedApp] = useState<Application|null>(null);
  const [toast, setToast] = useState('');
  const [grantPurpose, setGrantPurpose] = useState('Operations');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const mapTtRef = useRef<HTMLDivElement>(null);
  const topoRef = useRef<any>(null);
  const [topoReady, setTopoReady] = useState(false);

  useEffect(()=>{
    fetch('/api/applications').then(r=>{
      if(r.status===401){router.push('/board/login');return null;}
      return r.json();
    }).then(d=>d&&setAll(d));
  },[router]);

  const fd = all.filter(r=>
    (filterYear==='all'||r.year===+filterYear)&&
    (filterArea==='all'||r.giving_area===+filterArea)&&
    (filterPurpose==='all'||r.grant_purpose===filterPurpose)&&
    (filterStatus==='all'||r.status===filterStatus)
  );

  const awarded   = fd.filter(r=>r.status==='approved').reduce((s,r)=>s+r.grant_amount_requested,0);
  const requested = fd.reduce((s,r)=>s+r.grant_amount_requested,0);

  function stateData(st:string){
    const rows=fd.filter(r=>r.org_state===st);
    return{all:rows.length,approved:rows.filter(r=>r.status==='approved').length,declined:rows.filter(r=>r.status==='declined').length,pending:rows.filter(r=>r.status==='submitted'||r.status==='under_review').length,amount:rows.reduce((s,r)=>s+r.grant_amount_requested,0)};
  }

  // Load D3 + topo once; setTopoReady triggers the render effect below with fresh fd
  useEffect(()=>{
    if(typeof window==='undefined')return;
    if(topoRef.current){setTopoReady(t=>!t);return;} // already loaded, just re-trigger
    Promise.all([import('d3'),import('topojson-client')]).then(([d3,topo])=>{
      d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then((t:any)=>{
        topoRef.current={d3,topo,data:t};
        setTopoReady(true); // fires AFTER this render cycle, so fd is current
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[view]);

  // Render map whenever topo is ready OR data/filters/state selection changes
  useEffect(()=>{
    if(!topoRef.current||view!=='dashboard')return;
    const{d3,topo,data}=topoRef.current;
    renderMap(d3,topo,data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[topoReady,fd,mapMode,selState]);

  function renderMap(d3:any,topo:any,topoData:any){
    const cont=mapContainerRef.current,svg=mapRef.current,tt=mapTtRef.current;
    if(!cont||!svg||!tt)return;
    const byS:Record<string,any>={};US_STATES.forEach(s=>{byS[s]=stateData(s);});
    const gV=(s:string)=>(byS[s] as any)?.[mapMode]??0;
    const maxV=Math.max(...US_STATES.map(s=>gV(s)),1);
    const colors:Record<MapMode,readonly[string,string]>={all:['#dce8ff','#0d3b6e'],approved:['#d4f0dc','#1e8e3e'],declined:['#fce4e2','#d93025'],pending:['#fff3d4','#f9ab00'],amount:['#dce8ff','#1B4F9B']};
    const W=cont.clientWidth||780,H=cont.clientHeight||320;
    const sel=d3.select(svg).attr('viewBox',`0 0 ${W} ${H}`);
    sel.selectAll('*').remove();
    const proj=d3.geoAlbersUsa().scale(W*0.95).translate([W/2,H/2]);
    const path=d3.geoPath(proj);
    const cs=d3.scaleSequential([0,maxV],colors[mapMode]);
    const feats=topo.feature(topoData,topoData.objects.states).features;
    sel.selectAll('path').data(feats).join('path')
      .attr('d',path)
      .attr('fill',(d:any)=>{const s=F2S[+d.id];return s&&gV(s)>0?cs(gV(s)):'#eef1f7';})
      .attr('stroke',(d:any)=>F2S[+d.id]===selState?'#1c1c1e':'rgba(255,255,255,.7)')
      .attr('stroke-width',(d:any)=>F2S[+d.id]===selState?2:.7)
      .style('cursor','pointer')
      .on('mouseenter',function(this:any){d3.select(this).attr('opacity',.8);})
      .on('mousemove',function(this:any,ev:any,d:any){
        const st=F2S[+d.id];if(!st)return;
        const b=byS[st]||{all:0,approved:0,declined:0,pending:0,amount:0};
        const[mx,my]=d3.pointer(ev,cont);
        const ttW=168,ttH=110,pad=12;
        tt.style.left=(mx+pad+ttW>W?mx-ttW-pad:mx+pad)+'px';
        tt.style.top=Math.max(0,Math.min(my-ttH/2,H-ttH))+'px';
        tt.style.display='block';
        tt.innerHTML=`<strong>${st}${b.all?' — '+b.all+' app'+(b.all>1?'s':''):' — no apps'}</strong>
          <div class="tt-row"><span><span class="tt-dot" style="background:#1B4F9B"></span>Total</span><span>${b.all}</span></div>
          <div class="tt-row"><span><span class="tt-dot" style="background:#1e8e3e"></span>Accepted</span><span>${b.approved}</span></div>
          <div class="tt-row"><span><span class="tt-dot" style="background:#f9ab00"></span>Pending</span><span>${b.pending}</span></div>
          <div class="tt-row"><span><span class="tt-dot" style="background:#d93025"></span>Denied</span><span>${b.declined}</span></div>
          <div class="tt-row"><span>Requested</span><span>${fmt$(b.amount)}</span></div>`;
      })
      .on('mouseleave',function(this:any){d3.select(this).attr('opacity',1);tt.style.display='none';})
      .on('click',(_:any,d:any)=>{const st=F2S[+d.id];if(!st)return;setSelState(p=>p===st?null:st);});
  }

  const updateChart = useCallback((id:number, patch:Partial<ChartCfg>)=>setCharts(prev=>prev.map(c=>c.id===id?{...c,...patch}:c)),[]);
  const removeChart = useCallback((id:number)=>setCharts(prev=>prev.filter(c=>c.id!==id)),[]);
  const addChart = ()=>setCharts(prev=>[...prev,{id:nextChartId++,metric:'count',group:'month',type:'bar'}]);

  async function chgStatus(id:number,status:string){
    setAll(prev=>prev.map(a=>a.id===id?{...a,status:status as Application['status']}:a));
    if(selectedApp?.id===id)setSelectedApp(prev=>prev?{...prev,status:status as Application['status']}:null);
    await fetch(`/api/applications/${id}/status`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status})});
  }

  async function saveApp(id:number, patch:Partial<Application>){
    const res = await fetch(`/api/applications/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(patch)});
    const updated = await res.json();
    setAll(prev=>prev.map(a=>a.id===id?updated:a));
    setSelectedApp(updated);
    setToast('✓ Changes saved');
    setTimeout(()=>setToast(''),3000);
  }

  async function submitNewApp(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const data=Object.fromEntries(new FormData(e.currentTarget));
    const res=await fetch('/api/applications',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    const newApp=await res.json();
    setAll(prev=>[newApp,...prev]);
    (e.target as HTMLFormElement).reset();
    setGrantPurpose('Operations');
    setView('dashboard');
    setToast('✓ Application submitted');
    setTimeout(()=>setToast(''),3000);
  }

  function setSort(key:string){if(sortField===key)setSortDir(d=>d*-1);else{setSortField(key);setSortDir(1);}}
  const tableRows=(()=>{
    const q=appSearch.toLowerCase();
    let rows=all.filter(r=>!q||(r.org_name+r.submitter_name+r.ein+r.org_state).toLowerCase().includes(q));
    if(sortField)rows=[...rows].sort((a,b)=>{const av=(a as any)[sortField],bv=(b as any)[sortField];
      if(av===null||av===undefined)return 1;if(bv===null||bv===undefined)return -1;
      return typeof av==='string'?sortDir*av.localeCompare(bv):sortDir*(av-bv);});
    return rows;
  })();

  function sidebarContent(){
    if(selState){
      const b=stateData(selState);
      return(
        <div className="space-y-3">
          <div className="glass rounded-xl p-3">
            <div className="text-xs text-gray-500 mb-1">Applications</div>
            <div className="text-2xl font-bold text-[#0d3b6e]">{b.all||'0'}</div>
            <div className="text-xs text-gray-400">{fmt$(b.amount)} total requested</div>
          </div>
          <div className="space-y-1.5">
            {[['#1e8e3e','Accepted',b.approved],['#f9ab00','Pending',b.pending],['#d93025','Denied',b.declined]].map(([c,l,n])=>(
              <div key={String(l)} className="flex items-center justify-between text-sm py-1 border-b border-gray-100">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{background:String(c)}}/>{l}</span>
                <span className="font-semibold">{n}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    const m:Record<string,number>={};fd.forEach(r=>{m[r.org_state]=(m[r.org_state]||0)+1;});
    const top=Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,8);
    const mx=top[0]?.[1]||1;
    return(
      <div className="space-y-3">
        <div className="glass rounded-xl p-3">
          <div className="text-xs text-gray-500 mb-1">States Reached</div>
          <div className="text-2xl font-bold text-[#0d3b6e]">{Object.keys(m).length}</div>
          <div className="text-xs text-gray-400">Leading: {top[0]?.[0]||'—'} ({top[0]?.[1]||0} apps)</div>
        </div>
        <div className="space-y-1.5">
          {top.map(([st,c])=>(
            <button key={st} onClick={()=>setSelState(st)} className="w-full flex items-center gap-2 text-sm hover:text-[#1B4F9B] transition-colors">
              <span className="font-mono font-bold text-[#1B4F9B] w-7 text-left">{st}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#1B4F9B] rounded-full" style={{width:Math.round((c/mx)*100)+'%'}}/>
              </div>
              <span className="w-4 text-right text-gray-500">{c}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const kpis=[
    {icon:<BarChart3 className="w-5 h-5"/>,label:'Total Applications',value:String(fd.length),sub:filterYear==='all'?'all years':filterYear,color:'text-[#1B4F9B]',bg:'bg-[#e8f0fe]'},
    {icon:<Clock className="w-5 h-5"/>,label:'Pending Review',value:String(fd.filter(r=>r.status==='submitted'||r.status==='under_review').length),sub:fd.length?Math.round((fd.filter(r=>r.status==='submitted'||r.status==='under_review').length/fd.length)*100)+'% of total':'—',color:'text-amber-600',bg:'bg-amber-50'},
    {icon:<CheckCircle2 className="w-5 h-5"/>,label:'Committed Funding',value:fmt$(awarded),sub:fd.length?Math.round((fd.filter(r=>r.status==='approved').length/fd.length)*100)+'% approval rate':'—',color:'text-[#1e8e3e]',bg:'bg-[#e6f4ea]'},
    {icon:<TrendingUp className="w-5 h-5"/>,label:'Avg Grant Requested',value:fd.length?fmt$(requested/fd.length):'—',sub:'Median '+fmt$(med(fd.map(r=>r.grant_amount_requested))),color:'text-purple-700',bg:'bg-purple-50'},
  ];

  const navItems:[View,string,React.ReactNode][]=[
    ['dashboard','Dashboard',<LayoutDashboard key="d" className="w-4 h-4"/>],
    ['applications','Applications',<Table2 key="a" className="w-4 h-4"/>],
    ['new-application','New App',<PlusCircle key="n" className="w-4 h-4"/>],
  ];

  const TABLE_COLS:[keyof Application,string][] = [
    ['status','Status'],['score','Score'],['id','#'],['submitted_at','Submitted'],['org_name','Org Name'],
    ['org_state','State'],['is_501c3','501c3'],['ein','EIN'],
    ['grant_amount_requested','Amount'],['grant_purpose','Purpose'],['giving_area','Area'],
    ['submitter_name','Submitter'],['submitter_email','Email'],['submitter_phone','Phone'],
    ['submitter_street','Street'],['submitter_city','City'],['submitter_state','Sub. State'],['submitter_zip','Zip'],
    ['submitter_availability','Availability'],['submitter_timezone','TZ'],
    ['exec_director_name','Exec Dir'],['exec_director_email','ED Email'],['exec_director_phone','ED Phone'],
    ['website_url','Website'],['social_media_handles','Social'],
    ['years_in_operation','Yrs Op'],['full_time_staff','FT'],['part_time_staff','PT'],['volunteers','Vols'],
    ['annual_operating_budget','Ann Budget'],['total_assets','Assets'],['outstanding_debts','Debts'],
    ['mission_statement','Mission'],
    ['doc_irs_confirmation','IRS'],['doc_cover_letter','Cover Ltr'],['doc_form_990','990'],
    ['doc_annual_report','Ann Rpt'],['doc_budget_prev_year','Bud Prev'],['doc_budget_next_year','Bud Next'],
  ];

  return (
    <div className="relative min-h-screen pb-20 overflow-x-hidden"
      style={{background:'linear-gradient(135deg,#f0f4ff 0%,#e8f0fe 50%,#f5f5f7 100%)'}}>

      {/* Subtle background orbs — small and barely visible */}
      <div className="fixed w-72 h-72 rounded-full pointer-events-none -top-36 -left-36 opacity-[0.07]"
        style={{background:'radial-gradient(circle,#4a90d9,transparent)',animation:'float 14s ease-in-out infinite'}}/>
      <div className="fixed w-48 h-48 rounded-full pointer-events-none -bottom-24 -right-24 opacity-[0.06]"
        style={{background:'radial-gradient(circle,#F4B800,transparent)',animation:'float 18s ease-in-out infinite reverse'}}/>

      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-white/60 px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FlowerLogo className="w-9 h-9 cursor-pointer shrink-0" onClick={()=>setView('dashboard')}/>
          <div className="w-px h-6 bg-gray-200"/>
          <div>
            <span className="text-xs text-gray-400 block leading-tight">Widgeon Point</span>
            <span className="text-sm font-semibold text-[#0d3b6e] leading-tight">
              {view==='dashboard'?'Grant Dashboard':view==='applications'?'Applications Pipeline':'New Application'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-[#e8f0fe] text-[#1B4F9B] border-none text-xs font-medium">Board View</Badge>
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#1e8e3e] bg-[#e6f4ea] px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1e8e3e] animate-pulse"/>Live
          </div>
        </div>
      </header>

      {/* ── DASHBOARD ── */}
      {view==='dashboard'&&(
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="glass rounded-2xl p-3 flex flex-wrap gap-2 items-center">
            {[
              {val:filterYear,set:setFilterYear,opts:[['all','All years'],['2026','2026'],['2025','2025'],['2024','2024']]},
              {val:filterArea,set:setFilterArea,opts:[['all','All areas'],['1','Community-Based'],['2','Youth Dev.'],['3','Environmental'],['4','Cultural & Arts'],['5','Discretionary']]},
              {val:filterPurpose,set:setFilterPurpose,opts:[['all','All purposes'],['Operations','Operations'],['Capital Campaign','Capital Campaign']]},
              {val:filterStatus,set:setFilterStatus,opts:[['all','All statuses'],['submitted','Pending'],['under_review','In Review'],['approved','Accepted'],['declined','Denied']]},
            ].map((f,i)=>(
              <div key={i} className="relative">
                <select value={f.val} onChange={e=>f.set(e.target.value)}
                  className={`h-8 pl-3 pr-7 rounded-lg border text-xs font-medium appearance-none cursor-pointer outline-none transition-all ${f.val!=='all'?'bg-[#1B4F9B] text-white border-[#1B4F9B]':'bg-white/80 text-gray-700 border-gray-200 hover:border-[#1B4F9B]/40'}`}>
                  {f.opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}
                </select>
                <ChevronDown className={`absolute right-2 top-2 w-3.5 h-3.5 pointer-events-none ${f.val!=='all'?'text-white':'text-gray-400'}`}/>
              </div>
            ))}
            <span className="ml-auto text-xs text-gray-500"><b className="text-gray-800">{fd.length}</b> applications</span>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#e8f0fe] flex items-center justify-center">
                  <Target className="w-4 h-4 text-[#1B4F9B]"/>
                </div>
                <span className="font-semibold text-sm text-gray-800">Budget Tracker</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Annual target:</span>
                <input type="number" value={budgetTarget} step={50000}
                  onChange={e=>setBudgetTarget(+e.target.value||1e6)}
                  className="w-36 h-8 rounded-lg border border-gray-200 bg-white/60 px-2 text-sm font-semibold text-[#0d3b6e] outline-none focus:border-[#1B4F9B]"/>
              </div>
            </div>
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div className="absolute inset-y-0 left-0 rounded-full bg-[#c8d8f8] transition-all duration-500" style={{width:Math.min((requested/budgetTarget)*100,100)+'%'}}/>
              <div className="absolute inset-y-0 left-0 rounded-full bg-[#1B4F9B] transition-all duration-500" style={{width:Math.min((awarded/budgetTarget)*100,100)+'%'}}/>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[['Target',fmt$(budgetTarget),'text-gray-700'],['Total Requested',fmt$(requested),'text-[#1B4F9B]'],['Awarded',fmt$(awarded),'text-[#1e8e3e]'],['Remaining',fmt$(Math.max(0,budgetTarget-awarded)),'text-gray-700']].map(([l,v,c])=>(
                <div key={String(l)} className="bg-white/50 rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-0.5">{l}</div>
                  <div className={`text-base font-bold ${c}`}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((k,i)=>(
              <div key={i} className="glass rounded-2xl p-4">
                <div className={`w-9 h-9 rounded-xl ${k.bg} ${k.color} flex items-center justify-center mb-3`}>{k.icon}</div>
                <div className="text-xs text-gray-500 mb-1">{k.label}</div>
                <div className={`text-xl font-bold ${k.color}`}>{k.value}</div>
                <div className="text-xs text-gray-400 mt-1">{k.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
            <div className="glass rounded-2xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <div className="font-semibold text-sm text-gray-800">Geographic Distribution</div>
                  <div className="text-xs text-gray-400">Click a state to drill down</div>
                </div>
                <div className="relative">
                  <select value={mapMode} onChange={e=>setMapMode(e.target.value as MapMode)}
                    className="h-7 pl-2 pr-6 rounded-lg border border-gray-200 bg-white/80 text-xs appearance-none cursor-pointer outline-none">
                    <option value="all">All apps</option><option value="approved">Accepted</option>
                    <option value="declined">Denied</option><option value="pending">Pending</option>
                    <option value="amount">$ Amount</option>
                  </select>
                  <ChevronDown className="absolute right-1.5 top-1.5 w-3 h-3 text-gray-400 pointer-events-none"/>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden bg-white/40" ref={mapContainerRef} style={{height:420}}>
                <svg ref={mapRef} className="w-full h-full" role="img" aria-label="US grant map"/>
                <div ref={mapTtRef} className="map-tt"/>
              </div>
            </div>
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-sm text-gray-800">{selState?`${selState} — Detail`:'By State'}</span>
                {selState&&<button onClick={()=>setSelState(null)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4"/></button>}
              </div>
              {sidebarContent()}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-sm text-gray-800">Analytics</span>
              <button onClick={addChart}
                className="flex items-center gap-1.5 h-8 px-3 rounded-xl bg-[#e8f0fe] hover:bg-[#1B4F9B] text-[#1B4F9B] hover:text-white text-xs font-semibold transition-all">
                <Plus className="w-3.5 h-3.5"/>Add chart
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {charts.map(cfg=>(
                <ChartCard key={cfg.id} cfg={cfg} fd={fd}
                  onUpdate={updateChart} onRemove={removeChart} canRemove={charts.length>1}/>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ── APPLICATIONS ── */}
      {view==='applications'&&(
        <main className="max-w-full px-4 sm:px-6 py-6">
          <div className="glass rounded-2xl p-4 mb-4 flex flex-wrap gap-3 items-center">
            <span className="font-semibold text-sm text-gray-800">Applications Pipeline</span>
            <input placeholder="Search org, name, EIN, state…" value={appSearch} onChange={e=>setAppSearch(e.target.value)}
              className="h-8 rounded-lg border border-gray-200 bg-white/70 px-3 text-xs outline-none focus:border-[#1B4F9B] w-64"/>
            <span className="ml-auto text-xs text-gray-500">Showing <b>{tableRows.length}</b> of {all.length} · <span className="text-[#1B4F9B] font-medium">Click any row to open</span></span>
          </div>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs whitespace-nowrap">
                <thead>
                  <tr className="bg-white/70 border-b border-gray-100">
                    {TABLE_COLS.map(([k,l])=>(
                      <th key={k} onClick={()=>setSort(k)}
                        className="text-left font-semibold text-gray-500 px-3 py-2.5 cursor-pointer hover:text-gray-800 select-none">
                        {l}{sortField===k?(sortDir===1?' ↑':' ↓'):''}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map(r=>(
                    <tr key={r.id} onClick={()=>setSelectedApp(r)}
                      className="border-b border-gray-50 hover:bg-white/70 cursor-pointer transition-colors">
                      <td className="px-3 py-2"><span className={`st-pill ${STATUS_META[r.status].cls}`}>{STATUS_META[r.status].label}</span></td>
                      <td className="px-3 py-2"><ScoreBadge score={r.score}/></td>
                      <td className="px-3 py-2 text-gray-400">{r.id}</td>
                      <td className="px-3 py-2 text-gray-500">{fmtD(r.submitted_at)}</td>
                      <td className="px-3 py-2 font-semibold text-gray-800 max-w-[160px] truncate">{r.org_name}</td>
                      <td className="px-3 py-2 font-mono font-bold text-[#1B4F9B]">{r.org_state}</td>
                      <td className="px-3 py-2 text-center">{r.is_501c3?<span className="text-[#1e8e3e]">✓</span>:<span className="text-red-400">✗</span>}</td>
                      <td className="px-3 py-2 font-mono text-gray-500">{r.ein}</td>
                      <td className="px-3 py-2 font-semibold tabular-nums">{fmt$(r.grant_amount_requested)}</td>
                      <td className="px-3 py-2 text-gray-600">{r.grant_purpose}</td>
                      <td className="px-3 py-2 text-gray-500">{AREA_NAMES[r.giving_area]}</td>
                      <td className="px-3 py-2">{r.submitter_name}</td>
                      <td className="px-3 py-2 text-gray-400">{r.submitter_email}</td>
                      <td className="px-3 py-2 text-gray-400">{r.submitter_phone}</td>
                      <td className="px-3 py-2 text-gray-400">{r.submitter_street}</td>
                      <td className="px-3 py-2 text-gray-400">{r.submitter_city}</td>
                      <td className="px-3 py-2 text-gray-400">{r.submitter_state}</td>
                      <td className="px-3 py-2 text-gray-400">{r.submitter_zip}</td>
                      <td className="px-3 py-2 text-gray-400">{r.submitter_availability}</td>
                      <td className="px-3 py-2 text-gray-400">{r.submitter_timezone}</td>
                      <td className="px-3 py-2">{r.exec_director_name}</td>
                      <td className="px-3 py-2 text-gray-400">{r.exec_director_email}</td>
                      <td className="px-3 py-2 text-gray-400">{r.exec_director_phone}</td>
                      <td className="px-3 py-2 text-gray-400 max-w-[120px] truncate">{r.website_url}</td>
                      <td className="px-3 py-2 text-gray-400 max-w-[120px] truncate">{r.social_media_handles}</td>
                      <td className="px-3 py-2 text-center">{r.years_in_operation}</td>
                      <td className="px-3 py-2 text-center">{r.full_time_staff}</td>
                      <td className="px-3 py-2 text-center">{r.part_time_staff}</td>
                      <td className="px-3 py-2 text-center">{r.volunteers}</td>
                      <td className="px-3 py-2 font-mono">{fmt$(r.annual_operating_budget)}</td>
                      <td className="px-3 py-2 font-mono">{fmt$(r.total_assets)}</td>
                      <td className={`px-3 py-2 font-mono ${r.outstanding_debts>0?'text-red-500':''}`}>{r.outstanding_debts>0?fmt$(r.outstanding_debts):'—'}</td>
                      <td className="px-3 py-2 text-gray-400 max-w-[200px] truncate">{r.mission_statement}</td>
                      <td className="px-3 py-2 text-center">{r.doc_irs_confirmation?'✓':'—'}</td>
                      <td className="px-3 py-2 text-center">{r.doc_cover_letter?'✓':'—'}</td>
                      <td className="px-3 py-2 text-center">{r.doc_form_990?'✓':'—'}</td>
                      <td className="px-3 py-2 text-center">{r.doc_annual_report?'✓':'—'}</td>
                      <td className="px-3 py-2 text-center">{r.doc_budget_prev_year?'✓':'—'}</td>
                      <td className="px-3 py-2 text-center">{r.doc_budget_next_year?'✓':'—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* ── NEW APPLICATION ── */}
      {view==='new-application'&&(
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h1 className="text-xl font-bold text-[#0d3b6e] mb-1">New Grant Application</h1>
            <p className="text-sm text-gray-400 mb-8">Fields marked <span className="text-red-500">*</span> are required.</p>
            <form onSubmit={submitNewApp} className="space-y-10">
              <section>
                <p className={sectionHdr}>Section 1 — Organization Identity</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Organization Name" required col={2}><input name="org_name" required className={inputCls} placeholder="Legal organization name"/></Field>
                  <Field label="Is your organization a registered 501(c)(3)?" required><select name="is_501c3" required className={selectCls}><option value="1">Yes</option><option value="0">No</option></select></Field>
                  <Field label="Employer Identification Number (EIN)" required hint="If applying as a pass-through, enter the sponsoring org's EIN."><input name="ein" required className={inputCls} placeholder="XX-XXXXXXX" maxLength={10}/></Field>
                </div>
              </section>
              <section>
                <p className={sectionHdr}>Section 2 — Contact Information</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Submitter Full Name" required hint="Person completing and submitting this application."><input name="submitter_name" required className={inputCls}/></Field>
                  <Field label="Submitter Street Address" required><input name="submitter_street" required className={inputCls} placeholder="123 Main St"/></Field>
                  <Field label="City" required><input name="submitter_city" required className={inputCls}/></Field>
                  <Field label="State" required><select name="submitter_state" required className={selectCls}>{US_STATES.map(s=><option key={s} value={s}>{s}</option>)}</select></Field>
                  <Field label="Zip Code" required><input name="submitter_zip" required className={inputCls} placeholder="12345"/></Field>
                  <Field label="Organization State" required hint="State where your org operates (used for mapping)."><select name="org_state" required className={selectCls}>{US_STATES.map(s=><option key={s} value={s}>{s}</option>)}</select></Field>
                  <Field label="Submitter Email" required><input name="submitter_email" type="email" required className={inputCls}/></Field>
                  <Field label="Submitter Phone" required><input name="submitter_phone" type="tel" required className={inputCls} placeholder="(555) 000-0000"/></Field>
                  <Field label="Best Times to Reach" required><input name="submitter_availability" required className={inputCls} placeholder="M–F 9am–5pm"/></Field>
                  <Field label="Submitter Time Zone" required><select name="submitter_timezone" required className={selectCls}>{['ET','CT','MT','PT','AKT','HT'].map(tz=><option key={tz} value={tz}>{tz}</option>)}</select></Field>
                  <Field label="Executive Director Full Name" required><input name="exec_director_name" required className={inputCls}/></Field>
                  <Field label="Executive Director Email" required><input name="exec_director_email" type="email" required className={inputCls}/></Field>
                  <Field label="Executive Director Phone"><input name="exec_director_phone" type="tel" className={inputCls} placeholder="Optional"/></Field>
                  <Field label="Organization Website"><input name="website_url" type="url" className={inputCls} placeholder="https://"/></Field>
                  <Field label="Social Media Handles" col={2}><input name="social_media_handles" className={inputCls}/></Field>
                </div>
              </section>
              <section>
                <p className={sectionHdr}>Section 3 — Organization Profile</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Mission Statement" required col={2}><textarea name="mission_statement" required rows={4} className={textareaCls} placeholder="Describe your organization's mission…"/></Field>
                  <Field label="Years in Operation" required><input name="years_in_operation" type="number" min="0" required className={inputCls}/></Field>
                  <Field label="Full-Time Staff" required><input name="full_time_staff" type="number" min="0" required className={inputCls}/></Field>
                  <Field label="Part-Time Staff" required><input name="part_time_staff" type="number" min="0" required className={inputCls}/></Field>
                  <Field label="Volunteers" required><input name="volunteers" type="number" min="0" required className={inputCls}/></Field>
                  <Field label="Annual Operating Budget (USD)" required><input name="annual_operating_budget" type="number" min="0" required className={inputCls} placeholder="0.00"/></Field>
                  <Field label="Total Assets (USD)" required><input name="total_assets" type="number" min="0" required className={inputCls} placeholder="0.00"/></Field>
                  <Field label="Outstanding Debts (USD)" required><input name="outstanding_debts" type="number" min="0" required className={inputCls} placeholder="0.00"/></Field>
                </div>
              </section>
              <section>
                <p className={sectionHdr}>Section 4 — Grant Request Details</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Grant Amount Requested (USD)" required><input name="grant_amount_requested" type="number" min="1000" max="9999999" required className={inputCls} placeholder="0.00"/></Field>
                  <Field label="Grant Purpose" required><select name="grant_purpose" required className={selectCls} value={grantPurpose} onChange={e=>setGrantPurpose(e.target.value)}><option value="Operations">Operations</option><option value="Capital Campaign">Capital Campaign</option></select></Field>
                  {grantPurpose==='Capital Campaign'&&<Field label="Capital Campaign Description" col={2}><div className={docBoxCls}>📎 Upload PDF / DOC / DOCX</div></Field>}
                </div>
              </section>
              <section>
                <p className={sectionHdr}>Section 5 — Area of Giving</p>
                <div className="grid grid-cols-1 gap-3">
                  {([
                    [1,'Community-Based Giving','Helping people through direct action. Food kitchens, substance-use programs, reentry, immigrant support, autism services, domestic violence.'],
                    [2,'Youth Development','Fun and joyful learning. Sports, service, self-expression — resilience, confidence, creativity including adaptive sports.'],
                    [3,'Environmental Access and Stewardship','Equitable access to the outdoors. Place-based education, ecological conservation, outdoor adventure programs.'],
                    [4,'Cultural Exchange, Arts & Heritage','Celebrating culture and honoring legacy. Multi-cultural exchange, arts, music, legacy institutions.'],
                    [5,'Discretionary Giving','Innovative, creative, meaningful philanthropy. Organizations overlooked in other categories. Most challenging category.'],
                  ] as [number,string,string][]).map(([v,title,desc])=>(
                    <label key={v} className="flex gap-3 p-4 rounded-xl border-2 border-gray-100 bg-white/40 hover:border-[#1B4F9B]/30 cursor-pointer transition-all has-[:checked]:border-[#1B4F9B] has-[:checked]:bg-[#e8f0fe]/50">
                      <input type="radio" name="giving_area" value={String(v)} required className="mt-1 accent-[#1B4F9B]"/>
                      <div><div className="text-sm font-semibold text-gray-800">{v}. {title}</div><div className="text-xs text-gray-500 mt-0.5">{desc}</div></div>
                    </label>
                  ))}
                </div>
              </section>
              <section>
                <p className={sectionHdr}>Section 6 — Required Document Uploads</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="IRS Confirmation Letter" required><div className={docBoxCls}>📎 Upload PDF / DOC / DOCX</div></Field>
                  <Field label="Cover Letter" required><div className={docBoxCls}>📎 Upload PDF / DOC / DOCX</div></Field>
                  <Field label="IRS Form 990" required><div className={docBoxCls}>📎 Upload PDF / DOC / DOCX</div></Field>
                  <Field label="Most Recent Annual Report"><div className={docBoxCls}>📎 Upload PDF / DOC / DOCX (optional)</div></Field>
                  <Field label="Annual Report URL" col={2}><input name="doc_annual_report_url" type="url" className={inputCls} placeholder="https://"/></Field>
                  <Field label="Previous Year Operating Budget" required><div className={docBoxCls}>📎 Upload PDF / DOC / DOCX</div></Field>
                  <Field label="Next Year Projected Budget"><div className={docBoxCls}>📎 Upload PDF / DOC / DOCX (optional)</div></Field>
                </div>
              </section>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="bg-[#0d3b6e] hover:bg-[#1B4F9B] text-white font-semibold px-6">Submit Application</Button>
                <Button type="button" variant="outline" onClick={()=>setView('dashboard')}>Cancel</Button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 glass border-t border-white/60 px-4 h-16 flex items-center justify-around">
        {navItems.map(([key,label,icon])=>(
          <button key={key} onClick={()=>setView(key)}
            className={`flex flex-col items-center gap-0.5 text-xs font-medium transition-colors px-4 py-1 rounded-xl ${view===key?'text-[#1B4F9B] bg-[#e8f0fe]':'text-gray-400 hover:text-gray-600'}`}>
            {icon}{label}
          </button>
        ))}
        <div className="w-px h-6 bg-gray-200"/>
        <button onClick={async()=>{await fetch('/api/auth',{method:'DELETE'});router.push('/board/login');}}
          className="flex flex-col items-center gap-0.5 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors px-4 py-1 rounded-xl">
          <LogOut className="w-4 h-4"/>Log out
        </button>
      </nav>

      {selectedApp&&(
        <AppModal app={selectedApp} onClose={()=>setSelectedApp(null)} onStatusChange={chgStatus} onSave={saveApp}/>
      )}

      {toast&&(
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#0d3b6e]/90 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-xl backdrop-blur-md">
          {toast}
        </div>
      )}
    </div>
  );
}
