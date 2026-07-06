'use client';
import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { GRANT_DATA } from '@/lib/grant-data';

const F    = 'var(--font-montserrat),sans-serif';
const BLUE = '#0D3275';
const MID  = '#1B5AAD';
const GOLD = '#C9A84C';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const STATE_NAMES: Record<string, string> = {
  AK:'Alaska',AL:'Alabama',AR:'Arkansas',AZ:'Arizona',CA:'California',
  CO:'Colorado',CT:'Connecticut',DC:'Washington D.C.',DE:'Delaware',FL:'Florida',
  GA:'Georgia',HI:'Hawaii',IA:'Iowa',ID:'Idaho',IL:'Illinois',IN:'Indiana',
  KS:'Kansas',KY:'Kentucky',LA:'Louisiana',MA:'Massachusetts',MD:'Maryland',
  ME:'Maine',MI:'Michigan',MN:'Minnesota',MO:'Missouri',MS:'Mississippi',
  MT:'Montana',NC:'North Carolina',ND:'North Dakota',NE:'Nebraska',
  NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NV:'Nevada',NY:'New York',
  OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',
  SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',
  VA:'Virginia',VT:'Vermont',WA:'Washington',WI:'Wisconsin',WV:'West Virginia',
  WY:'Wyoming',
};

const FIPS: Record<string, string> = {
  '01':'AL','02':'AK','04':'AZ','05':'AR','06':'CA','08':'CO','09':'CT',
  '10':'DE','11':'DC','12':'FL','13':'GA','15':'HI','16':'ID','17':'IL',
  '18':'IN','19':'IA','20':'KS','21':'KY','22':'LA','23':'ME','24':'MD',
  '25':'MA','26':'MI','27':'MN','28':'MS','29':'MO','30':'MT','31':'NE',
  '32':'NV','33':'NH','34':'NJ','35':'NM','36':'NY','37':'NC','38':'ND',
  '39':'OH','40':'OK','41':'OR','42':'PA','44':'RI','45':'SC','46':'SD',
  '47':'TN','48':'TX','49':'UT','50':'VT','51':'VA','53':'WA','54':'WV',
  '55':'WI','56':'WY',
};

const MIN_YEAR = 1971;
const MAX_YEAR = 2025;

const ALL_STATES = [...new Set(GRANT_DATA.filter(e => e.s).map(e => e.s))].sort();

function buildStateCounts(yMin: number, yMax: number): Record<string, number> {
  const map: Record<string, Set<string>> = {};
  for (const e of GRANT_DATA) {
    if (!e.s || !e.y.some(y => y >= yMin && y <= yMax)) continue;
    (map[e.s] ||= new Set()).add(e.o);
  }
  return Object.fromEntries(Object.entries(map).map(([s, set]) => [s, set.size]));
}

function heatColor(count: number, max: number): string {
  if (!count) return '#EBF0F8';
  const t = Math.sqrt(count / max);
  if (t < 0.5) {
    const r = Math.round(200 - 173 * (t / 0.5));
    const g = Math.round(220 - 130 * (t / 0.5));
    const b = Math.round(239 - 66 * (t / 0.5));
    return `rgb(${r},${g},${b})`;
  }
  const p = (t - 0.5) / 0.5;
  return `rgb(${Math.round(27 - 14 * p)},${Math.round(90 - 40 * p)},${Math.round(173 - 56 * p)})`;
}

export default function GrantRecipients() {
  const [yearMin, setYearMin] = useState(MIN_YEAR);
  const [yearMax, setYearMax] = useState(MAX_YEAR);
  const [selectedState, setSelectedState] = useState('');
  const [hoveredState, setHoveredState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [tooltip, setTooltip] = useState<{ x: number; y: number; state: string; count: number } | null>(null);

  const stateCounts  = useMemo(() => buildStateCounts(yearMin, yearMax), [yearMin, yearMax]);
  const maxCount     = useMemo(() => Math.max(...Object.values(stateCounts), 1), [stateCounts]);

  const totalOrgs = useMemo(() => {
    const seen = new Set<string>();
    GRANT_DATA.forEach(e => {
      if (e.y.some(y => y >= yearMin && y <= yearMax) && (!selectedState || e.s === selectedState))
        seen.add(e.o);
    });
    return seen.size;
  }, [yearMin, yearMax, selectedState]);

  const statesInRange = useMemo(() => Object.keys(stateCounts).length, [stateCounts]);

  const displayedOrgs = useMemo(() => {
    const base = GRANT_DATA
      .filter(e => e.y.some(y => y >= yearMin && y <= yearMax) && (!selectedState || e.s === selectedState))
      .map(e => ({ org: e.o, state: e.s, years: e.y.filter(y => y >= yearMin && y <= yearMax) }))
      .sort((a, b) => a.org.localeCompare(b.org));
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();
    return base.filter(o => o.org.toLowerCase().includes(q));
  }, [yearMin, yearMax, selectedState, searchQuery]);

  const handleStateClick = useCallback((abbrev: string) => {
    setSelectedState(prev => prev === abbrev ? '' : abbrev);
    setSearchQuery('');
  }, []);

  const handleStateDropdown = (val: string) => {
    setSelectedState(val);
    setSearchQuery('');
  };

  const clearAll = () => {
    setSelectedState('');
    setYearMin(MIN_YEAR);
    setYearMax(MAX_YEAR);
    setSearchQuery('');
  };

  const hasFilters = selectedState || yearMin !== MIN_YEAR || yearMax !== MAX_YEAR;

  return (
    <div style={{ fontFamily: F, background: '#F7F8FA', minHeight: '100vh' }}>
      <Nav />

      {/* ── Hero — compact ── */}
      <section style={{
        background: `linear-gradient(150deg, ${BLUE} 0%, ${MID} 100%)`,
        padding: '36px 40px 32px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(/pattern/flower.png)', backgroundSize:'160px 160px', opacity:0.05, pointerEvents:'none' }} />
        <div style={{ position:'relative', maxWidth:1240, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:24 }}>
          {/* Left: title */}
          <div>
            <p style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:GOLD, margin:'0 0 6px' }}>Our Impact</p>
            <h1 style={{ fontFamily:F, fontSize:'clamp(22px,3vw,32px)', fontWeight:800, color:'#fff', margin:0, lineHeight:1.2, letterSpacing:'-0.3px' }}>
              Grant Recipients
            </h1>
            <p style={{ fontFamily:F, fontSize:13, fontWeight:400, color:'rgba(255,255,255,0.6)', margin:'6px 0 0', lineHeight:1.6 }}>
              54 years of giving · use the filters below to explore
            </p>
          </div>
          {/* Right: live stats */}
          <div style={{ display:'flex', gap:'clamp(20px,4vw,56px)', flexWrap:'wrap' }}>
            {[
              { val: totalOrgs.toLocaleString(), lbl: 'Organizations' },
              { val: statesInRange.toString(),   lbl: 'States' },
              { val: `${yearMin}–${yearMax}`,    lbl: 'Year Range' },
            ].map(s => (
              <div key={s.lbl} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:F, fontSize:'clamp(20px,2.5vw,28px)', fontWeight:800, color:GOLD, lineHeight:1 }}>{s.val}</div>
                <div style={{ fontFamily:F, fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', marginTop:5 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map + Controls side by side ── */}
      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 32px 0' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:24, alignItems:'start' }}>

          {/* Map */}
          <div style={{ background:'#fff', borderRadius:20, padding:'24px 20px 16px', boxShadow:'0 2px 24px rgba(13,50,117,0.08)', position:'relative' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16, flexWrap:'wrap', gap:8 }}>
              <div>
                <div style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'#8899BB' }}>Geographic Distribution</div>
                <p style={{ fontFamily:F, fontSize:12, color:'#AAB8CC', margin:'4px 0 0' }}>Hover to see count · Click to filter</p>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ fontFamily:F, fontSize:10, color:'#AAB8CC' }}>Fewer</span>
                {['#EBF0F8','#93BBDA','#5490C4','#1B5AAD','#0D3275'].map(c => (
                  <div key={c} style={{ width:20, height:10, background:c, borderRadius:2 }} />
                ))}
                <span style={{ fontFamily:F, fontSize:10, color:'#AAB8CC' }}>More</span>
              </div>
            </div>

            {/* Tooltip */}
            {tooltip && (
              <div style={{
                position:'absolute', left:tooltip.x, top:tooltip.y,
                background:BLUE, color:'#fff', borderRadius:10, padding:'8px 14px',
                fontFamily:F, fontSize:12, fontWeight:600, pointerEvents:'none',
                zIndex:100, whiteSpace:'nowrap', boxShadow:'0 4px 18px rgba(0,0,0,0.22)',
                transform:'translate(-50%, -115%)',
              }}>
                <div style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:GOLD, marginBottom:3 }}>
                  {STATE_NAMES[tooltip.state] || tooltip.state}
                </div>
                {tooltip.count} organization{tooltip.count !== 1 ? 's' : ''}
              </div>
            )}

            <ComposableMap projection="geoAlbersUsa" style={{ width:'100%', height:'auto' }}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const fips   = String(geo.id).padStart(2,'0');
                    const abbrev = FIPS[fips];
                    if (!abbrev) return null;
                    const count      = stateCounts[abbrev] || 0;
                    const isSelected = selectedState === abbrev;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => count > 0 && handleStateClick(abbrev)}
                        onMouseEnter={e => {
                          if (!count) return;
                          const rect = (e.currentTarget as SVGElement).closest('svg')!.parentElement!.getBoundingClientRect();
                          setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, state: abbrev, count });
                          setHoveredState(abbrev);
                        }}
                        onMouseMove={e => {
                          if (!count) return;
                          const rect = (e.currentTarget as SVGElement).closest('svg')!.parentElement!.getBoundingClientRect();
                          setTooltip(prev => prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : prev);
                        }}
                        onMouseLeave={() => { setHoveredState(''); setTooltip(null); }}
                        style={{
                          default: {
                            fill: isSelected ? GOLD : heatColor(count, maxCount),
                            stroke: '#fff', strokeWidth: 0.8, outline: 'none',
                            cursor: count > 0 ? 'pointer' : 'default',
                          },
                          hover: {
                            fill: isSelected ? '#D4A83C' : count > 0 ? '#4A8FD4' : '#EBF0F8',
                            stroke: '#fff', strokeWidth: 0.8, outline: 'none',
                            cursor: count > 0 ? 'pointer' : 'default',
                          },
                          pressed: { fill: GOLD, stroke: '#fff', strokeWidth: 0.8, outline: 'none' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>

          {/* Controls panel */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* Year filter card */}
            <div style={{ background:'#fff', borderRadius:20, padding:'24px 24px 28px', boxShadow:'0 2px 24px rgba(13,50,117,0.08)' }}>
              <div style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'#8899BB', marginBottom:12 }}>Year Range</div>
              <YearInputs yearMin={yearMin} yearMax={yearMax} setYearMin={setYearMin} setYearMax={setYearMax} />
              <DualRangeSlider
                min={MIN_YEAR} max={MAX_YEAR}
                valueMin={yearMin} valueMax={yearMax}
                onMinChange={setYearMin} onMaxChange={setYearMax}
              />
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:10, fontFamily:F, fontSize:11, color:'#AAB8CC' }}>
                <span>{MIN_YEAR}</span><span>{MAX_YEAR}</span>
              </div>
            </div>

            {/* State filter card */}
            <div style={{ background:'#fff', borderRadius:20, padding:'24px', boxShadow:'0 2px 24px rgba(13,50,117,0.08)' }}>
              <div style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'#8899BB', marginBottom:10 }}>State</div>
              <select
                value={selectedState}
                onChange={e => handleStateDropdown(e.target.value)}
                style={{ fontFamily:F, fontSize:13, fontWeight:600, color:BLUE, background:'#F0F4FA', border:'1.5px solid #D0DDEF', borderRadius:10, padding:'11px 14px', width:'100%', cursor:'pointer', outline:'none' }}
              >
                <option value="">All States</option>
                {ALL_STATES.map(s => (
                  <option key={s} value={s}>{STATE_NAMES[s] || s}</option>
                ))}
              </select>
            </div>

            {/* Active filters */}
            {hasFilters && (
              <div style={{ background:'#EEF3FA', borderRadius:16, padding:'16px 20px' }}>
                <div style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#8899BB', marginBottom:10 }}>Active Filters</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {selectedState && (
                    <FilterPill label={STATE_NAMES[selectedState] || selectedState} onRemove={() => setSelectedState('')} />
                  )}
                  {(yearMin !== MIN_YEAR || yearMax !== MAX_YEAR) && (
                    <FilterPill label={`${yearMin} – ${yearMax}`} onRemove={() => { setYearMin(MIN_YEAR); setYearMax(MAX_YEAR); }} />
                  )}
                  <button onClick={clearAll} style={{ fontFamily:F, fontSize:11, fontWeight:700, color:'#8899BB', background:'none', border:'none', cursor:'pointer', letterSpacing:'1px', textTransform:'uppercase', textAlign:'left', padding:0, marginTop:4 }}>
                    Clear All ×
                  </button>
                </div>
              </div>
            )}

            {/* Mini legend */}
            <div style={{ background:'#fff', borderRadius:16, padding:'18px 20px', boxShadow:'0 2px 24px rgba(13,50,117,0.08)' }}>
              <div style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'#8899BB', marginBottom:12 }}>Results</div>
              <div style={{ fontFamily:F, fontSize:13, color:'#555', lineHeight:2 }}>
                <div><span style={{ fontWeight:700, color:BLUE }}>{totalOrgs.toLocaleString()}</span> organizations</div>
                <div><span style={{ fontWeight:700, color:BLUE }}>{statesInRange}</span> states</div>
                {selectedState && <div><span style={{ fontWeight:700, color:GOLD }}>↑</span> filtered by {STATE_NAMES[selectedState]}</div>}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Org list ── */}
      <section style={{ maxWidth:1240, margin:'0 auto', padding:'32px 32px 80px' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:16 }}>
          <div>
            <div style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'#8899BB', marginBottom:6 }}>
              {selectedState ? `${STATE_NAMES[selectedState] || selectedState} · ` : ''}Organizations
            </div>
            <div style={{ fontFamily:F, fontSize:24, fontWeight:800, color:BLUE }}>
              {totalOrgs.toLocaleString()} {totalOrgs === 1 ? 'organization' : 'organizations'}
            </div>
          </div>
          <div style={{ position:'relative' }}>
            <input
              type="text"
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ fontFamily:F, fontSize:13, fontWeight:500, color:'#333', padding:'11px 18px 11px 40px', borderRadius:12, border:'1.5px solid #D0DDEF', outline:'none', width:260, background:'#fff' }}
            />
            <svg style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', opacity:0.35 }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:10 }}>
          {displayedOrgs.slice(0, 600).map((item, i) => (
            <div key={i} style={{
              background:'#fff', borderRadius:12, padding:'15px 18px',
              boxShadow:'0 1px 8px rgba(13,50,117,0.07)',
              borderLeft:`3px solid ${MID}`,
              display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12,
            }}>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:F, fontSize:13, fontWeight:600, color:'#1a2a4a', lineHeight:1.4 }}>{item.org}</div>
                {item.state && (
                  <div style={{ fontFamily:F, fontSize:11, fontWeight:500, color:'#8899BB', marginTop:4 }}>
                    {STATE_NAMES[item.state] || item.state}
                  </div>
                )}
              </div>
              <div style={{ flexShrink:0, paddingTop:2 }}>
                {item.years.length === 1
                  ? <span style={{ fontFamily:F, fontSize:12, fontWeight:700, color:GOLD }}>{item.years[0]}</span>
                  : <span style={{ fontFamily:F, fontSize:11, fontWeight:600, color:'#AAB8CC' }}>{item.years[0]}&thinsp;&ndash;&thinsp;{item.years[item.years.length-1]}</span>
                }
              </div>
            </div>
          ))}
        </div>

        {displayedOrgs.length > 600 && (
          <p style={{ fontFamily:F, fontSize:13, color:'#AAB8CC', textAlign:'center', marginTop:24, fontStyle:'italic' }}>
            Showing 600 of {displayedOrgs.length.toLocaleString()} — refine filters to narrow results.
          </p>
        )}
        {displayedOrgs.length === 0 && (
          <div style={{ textAlign:'center', padding:'64px 0', color:'#AAB8CC', fontFamily:F, fontSize:14 }}>
            No organizations found for the selected filters.
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff', borderRadius:10, padding:'8px 12px' }}>
      <span style={{ fontFamily:F, fontSize:12, fontWeight:600, color:BLUE }}>{label}</span>
      <button onClick={onRemove} style={{ background:'none', border:'none', cursor:'pointer', color:'#8899BB', fontWeight:700, fontSize:16, lineHeight:1, padding:'0 0 0 8px' }}>×</button>
    </div>
  );
}

function YearInputs({ yearMin, yearMax, setYearMin, setYearMax }: {
  yearMin: number; yearMax: number;
  setYearMin: (v: number) => void; setYearMax: (v: number) => void;
}) {
  const [minStr, setMinStr] = useState(String(yearMin));
  const [maxStr, setMaxStr] = useState(String(yearMax));

  // Keep display in sync when slider moves
  useEffect(() => { setMinStr(String(yearMin)); }, [yearMin]);
  useEffect(() => { setMaxStr(String(yearMax)); }, [yearMax]);

  function handleMinChange(raw: string) {
    setMinStr(raw);
    const v = parseInt(raw, 10);
    if (raw.length === 4 && !isNaN(v) && v >= MIN_YEAR && v < yearMax) setYearMin(v);
  }
  function handleMaxChange(raw: string) {
    setMaxStr(raw);
    const v = parseInt(raw, 10);
    if (raw.length === 4 && !isNaN(v) && v > yearMin && v <= MAX_YEAR) setYearMax(v);
  }
  function blurMin() {
    const v = parseInt(minStr, 10);
    if (!isNaN(v) && v >= MIN_YEAR && v < yearMax) setYearMin(v);
    else setMinStr(String(yearMin));
  }
  function blurMax() {
    const v = parseInt(maxStr, 10);
    if (!isNaN(v) && v > yearMin && v <= MAX_YEAR) setYearMax(v);
    else setMaxStr(String(yearMax));
  }

  const inputStyle = { fontFamily:F, fontSize:20, fontWeight:800, color:BLUE, border:'1.5px solid #D0DDEF', borderRadius:10, padding:'6px 10px', width:82, textAlign:'center' as const, outline:'none', background:'#F0F4FA' };

  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20 }}>
      <input
        type="text" inputMode="numeric" value={minStr}
        onChange={e => handleMinChange(e.target.value)}
        onBlur={blurMin}
        style={inputStyle}
      />
      <span style={{ fontFamily:F, fontSize:16, fontWeight:700, color:'#AAB8CC' }}>to</span>
      <input
        type="text" inputMode="numeric" value={maxStr}
        onChange={e => handleMaxChange(e.target.value)}
        onBlur={blurMax}
        style={inputStyle}
      />
    </div>
  );
}

// ── Proper dual-range slider using pointer events ──
function DualRangeSlider({
  min, max, valueMin, valueMax, onMinChange, onMaxChange,
}: {
  min: number; max: number; valueMin: number; valueMax: number;
  onMinChange: (v: number) => void; onMaxChange: (v: number) => void;
}) {
  const trackRef  = useRef<HTMLDivElement>(null);
  const dragging  = useRef<'min' | 'max' | null>(null);
  const range     = max - min;
  const leftPct   = ((valueMin - min) / range) * 100;
  const rightPct  = ((valueMax - min) / range) * 100;

  const pxToValue = useCallback((clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(min + pct * range);
  }, [min, range]);

  const onPointerDown = useCallback((e: React.PointerEvent, thumb: 'min' | 'max') => {
    e.preventDefault();
    dragging.current = thumb;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const v = pxToValue(e.clientX);
    if (dragging.current === 'min') onMinChange(Math.min(v, valueMax - 1));
    else                            onMaxChange(Math.max(v, valueMin + 1));
  }, [pxToValue, valueMin, valueMax, onMinChange, onMaxChange]);

  const onPointerUp = useCallback(() => { dragging.current = null; }, []);

  return (
    <div
      ref={trackRef}
      style={{ position:'relative', height:28, cursor:'pointer', userSelect:'none' }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Track background */}
      <div style={{ position:'absolute', top:'50%', left:0, right:0, height:4, background:'#D8E4F2', borderRadius:2, transform:'translateY(-50%)' }} />
      {/* Active fill */}
      <div style={{ position:'absolute', top:'50%', left:`${leftPct}%`, width:`${rightPct - leftPct}%`, height:4, background:MID, borderRadius:2, transform:'translateY(-50%)' }} />
      {/* Min thumb */}
      <div
        onPointerDown={e => onPointerDown(e, 'min')}
        style={{ position:'absolute', top:'50%', left:`${leftPct}%`, width:20, height:20, borderRadius:'50%', background:BLUE, border:'3px solid #fff', boxShadow:'0 2px 8px rgba(13,50,117,0.3)', transform:'translate(-50%,-50%)', cursor:'grab', zIndex:5, touchAction:'none' }}
      />
      {/* Max thumb */}
      <div
        onPointerDown={e => onPointerDown(e, 'max')}
        style={{ position:'absolute', top:'50%', left:`${rightPct}%`, width:20, height:20, borderRadius:'50%', background:BLUE, border:'3px solid #fff', boxShadow:'0 2px 8px rgba(13,50,117,0.3)', transform:'translate(-50%,-50%)', cursor:'grab', zIndex:5, touchAction:'none' }}
      />
    </div>
  );
}
