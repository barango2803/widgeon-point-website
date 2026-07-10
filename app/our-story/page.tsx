'use client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const F    = 'var(--font-montserrat),sans-serif';
const BLUE = '#0D3275';
const MID  = '#1B51A8';
const GOLD = '#C9A84C';

const CHAPTERS = [
  {
    year: '1886',
    title: 'A Builder is Born',
    body: `Edwin John Beinecke was born in New York City on January 6, 1886, and died in Mount Kisco, NY, on January 21, 1970. His father, Bernhard, had immigrated from Germany in 1865 and built a remarkable life in America — first as a butcher and teamster, then as a meat wholesaler, and ultimately as Chairman of the Board of the Plaza Hotel. The Beinecke Meats building still stands at 33 Great Jones Street in New York City.

The Beinecke family consisted of four boys and three girls: Bernhard Jr., Alice, Johanna, Theodora, Edwin, Frederick, and Walter. Edwin and his two younger brothers, Fritz and Walter, attended Phillips Academy in Andover, Massachusetts, and from that point on moved through life as close friends and lifelong business partners.`,
  },
  {
    year: '1905',
    title: 'A Career Begins',
    body: `After briefly attending Yale from 1903 to 1905, Edwin launched his career at the George C. Fuller Company, serving as Timekeeper during the construction of the Plaza Hotel. The Timekeeper position was the top job on any large building site — every tradesman's paycheck required his approval. Upon completion of the hotel, Edwin served as master of ceremonies at a tradesman's banquet, where he called the men "the guts of the hotel."

The Fuller Company quickly recognized his talent. He rose to assistant purchasing agent, then purchasing agent, and was soon entrusted with operations at the United States Realty and Improvement Company, the first Real Estate Investment Trust organized in the country. Through the depths of the Great Depression, from 1936 to 1942, he served as President and Chairman of the Board of both the U.S. Realty Trust and the Plaza Hotel Corporation. During this period, his family briefly occupied the grand penthouse suite atop the Plaza.

When the Trust entered bankruptcy, Edwin spun off the George A. Fuller Company and became its President. He served as Chairman of the Board from that year until 1956. Under the Beinecke brothers' leadership, Fuller became one of the world's most respected construction firms, building skyscrapers, major public works, and iconic monuments — including the Lincoln Memorial in Washington, D.C.`,
  },
  {
    year: '1909',
    title: 'Family Life',
    body: `On April 22, 1909, Edwin married Linda Louise Maurer, daughter of Henry A. and Linda L. (Yuengling) Maurer, in New York City. He spoke fluent German his entire life; the family spoke German at home before the First World War, though not in public after it.

Edwin became the father of Sylvia Levine Beinecke on March 25, 1910, and a son, Edwin John Beinecke Jr., on July 1, 1913. As a proud father, he escorted his daughter down the aisle on June 16, 1934, to her wedding to Dr. John Newbold Robinson, with a reception in the Grand Ballroom of the Plaza Hotel beneath a glade of aspens.`,
  },
  {
    year: '1917',
    title: 'Service in the Great War',
    body: `When the United States entered the First World War, Edwin served as a Captain in the U.S. Army Construction Division, overseeing the construction of two explosive factories in Ohio from 1915 to 1917.

On his return through London, he encountered a new patented tubular scaffolding system. With characteristic entrepreneurial instinct, he secured the exclusive license for its use in North America. After his discharge, he was appointed to the U.S. Senate Commission to assess damage to federal buildings from the 1918 earthquake in Puerto Rico.

His service was not limited to one war. During World War II, Edwin served as Deputy Commissioner of the American Red Cross in Great Britain. When he departed New York in September 1943, his friends presented him with a gold-inscribed Breguet pocket watch. For his work with the American Red Cross, he later received the Medal of Freedom from President Truman, the nation's highest civilian honor.`,
  },
  {
    year: '1923',
    title: 'S&H Green Stamps',
    body: `In 1918, Edwin became affiliated with Sperry and Hutchinson Company of New York, and was elected President in 1923. His brothers Frederick and Walter had each married daughters of Thomas A. Sperry, one of the firm's two founders, making Sperry and Hutchinson effectively a Beinecke family enterprise.

Founded in 1896, the company offered retail customers a simple incentive: pay cash, collect stamps, redeem them for goods. A profit was generated on the difference between the income from the stamp service and the cost of merchandise. Approximately 4% of stamps were never redeemed, allowing the company to provide better quality goods to those who did. The "float" — money held between when stamps were paid for by merchants and when they were redeemed by savers — was invested in profitable enterprises to generate the bulk of the company's income.

Edwin served as President from 1923, Chairman of the Board from 1932 to 1960, and remained a director and majority shareholder until his death. Under his leadership, company sales grew from approximately $5 million in 1923 to $369 million by 1969. By the time of his death in 1970, S&H Green Stamps employed 16,000 people, printed 10 billion stamps distributed through 65,000 retail centers, served 20 million customers across 800 redemption centers, and maintained stockholder equity of $181 million.

Over the decades, Sperry and Hutchinson expanded into a diverse portfolio of companies, including Bigelow-Sanford (carpets), State National Bank of Connecticut, The Gunlocke Company, Lea Industries, American Drew, Daystrom Furniture, Bayly, Martin and Fay (insurance), Hens and Kelly (department stores), and Paragon Design of Waynesboro, Virginia.`,
  },
  {
    year: '1930s',
    title: 'A Life in Business',
    body: `Beyond his principal roles at Fuller and Sperry and Hutchinson, Edwin was an officer in at least 18 other businesses throughout his career. His board memberships included Manufacturers Hanover Trust Co., The Patent Scaffolding Co., Chesebro-Whitman Co., Curtiss-Wright Corp., Savoy Plaza, the Waldorf Astoria Corp., Tiffany and Co., and the Hoving Corp. in New York City; The Rockwood Alabama Stone Co. in Rockwood, AL; Cutler Mail Chute Co. in Rochester, NY; The Wurzburg Co. in Grand Rapids, MI; Hens and Kelly in Buffalo, NY; and the Stover Lock Nut and Machinery Co. in Easton, PA.

From 1921 to 1923, he also served as President of Henry A. Maurer and Son, manufacturers of hollow tile and firebrick in Barber, New Jersey.

He was a member of the Bibliographical Society of America, the Clubmobile Association, several Chambers of Commerce, and the Committee of Twenty-Five of Palm Springs, California. His club memberships included the Yale, Lawyers, Grolier, Whitehall, and Regency Whist Clubs of New York City; the Savile and Portland Clubs of London; the Blind Brook Club of Port Chester, NY; and the Bath and Tennis Club and the Everglades Club of Palm Beach, Florida.`,
  },
  {
    year: '1963',
    title: 'The Beinecke Library at Yale',
    body: `Edwin had a deep and enduring relationship with Yale University. Beginning in 1949, he served as Chairman of the Yale Library Association and received the Yale Alumni Medal in 1953, the same year he transitioned to a role as lifetime trustee of the library associates.

In one of the most significant acts of philanthropy in Yale's history, Edwin and his brothers donated the Beinecke Rare Book and Manuscript Library — including the building itself, designed with translucent panels of Danby Vermont marble set in an innovative steel lattice. The project was completed under Edwin's direction as President of the George A. Fuller Company, with the financing structured by gifting the company's shares to Yale.

The gift also included Edwin's personal rare book collection, centered on the works of Robert Louis Stevenson; 2,400 fragments of papyrus; and, in 1969, a $15.7 million endowment — one of the largest gifts in Yale's history at the time. By 1970, the library held more than 250,000 volumes and one million manuscripts. Edwin and his brothers also donated an endowment fund for the purchase of general scholarly books for the Sterling Memorial Library, and through financial gifts in the 1950s, Yale Library was able to publish works on papyrology, bibliography, and Western exploration and discovery.

The project stood as a monument to the three brothers' love and admiration for one another, created in memory of Walter, the youngest, who was the first to pass away.`,
  },
  {
    year: '1950s',
    title: 'Patron of the Arts',
    body: `Edwin was a man of wide-ranging cultural interests. A collector of German glass and stoneware, he donated his collection of 139 pieces to the Corning Museum of Glass in New York in 1957, along with a collection of research documents on 16th and 17th century enameled glass.

A founding fellow of the Museum of Modern Art in New York City, Edwin was also a life member of the Metropolitan Museum of Art, active in the Friends of Princeton Library and the Friends of Huntington Library in San Marino, California, and served as Chairman of the Council of Fellows for the Pierpont Morgan Library. He received an honorary L.H.D. degree from Bowdoin College in 1950 and was elected an honorary member of the Association Internationale de Papyrologues in Brussels, Belgium, in 1967.

At home, Edwin cultivated a passion for azalea and rhododendron collecting, maintaining an active greenhouse and employing several full-time gardeners. He planted thousands of daffodils at his estate, "Skerryvore," and opened it once a year to the public so that others could enjoy the annual flower spectacular.`,
  },
  {
    year: '1966',
    title: 'A Foundation is Born',
    body: `The Widgeon Point Charitable Foundation is the successor to the Kerry Foundation, established by Edwin in 1966; the Edwin J. Beinecke Trust, established following his passing in 1970; and the Beinecke Foundation, established in 1985.

Edwin's vision was straightforward: structured, purposeful giving to nonprofit organizations doing meaningful work across the United States. He believed that small, committed groups of people could change the world — and he set out to find them and stand behind them.

Now in its fifth generation of family leadership, Widgeon Point continues to be guided by openness to new ideas, practical problem-solving, and a belief that the right support, given consistently, makes all the difference.`,
  },
];

function FlowerPattern() {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'url(/pattern/flower.png)',
      backgroundSize: '220px 220px',
      backgroundRepeat: 'repeat',
      opacity: 0.18,
      mixBlendMode: 'screen',
    }} />
  );
}

export default function OurStoryPage() {
  const photos = [
    '/carousel/compressed_DSC08240-300x200.jpg',
    '/carousel/SQUASH_Spinski_66-300x200.jpg',
    '/carousel/compressed_image0-300x200.jpeg',
    '/carousel/imgage_0000_On-Belay-Photo-3-300x200.jpg',
    '/carousel/compressed_DSC02115-300x200.jpg',
    '/carousel/imgage_0002_On-Belay-Photo-1-300x200.jpg',
    '/carousel/PIC_ForesidePhotography_SailMaine_SundayJVRegatta_092621_8291-300x200.jpg',
  ];

  return (
    <>
      <style>{`
        @keyframes scroll-photos {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .photo-strip { display:flex; animation: scroll-photos 26s linear infinite; width:max-content; }
        .photo-strip:hover { animation-play-state: paused; }
        .chapter-card { transition: box-shadow 0.3s; }
        .chapter-card:hover { box-shadow: 0 12px 40px rgba(27,81,168,0.13) !important; }
      `}</style>

      <Nav />

      {/* Hero */}
      <section style={{ position: 'relative', background: 'linear-gradient(140deg,#071A40 0%,#0D3275 55%,#1B51A8 100%)', padding: '90px 40px 80px', color: '#fff', textAlign: 'center', overflow: 'hidden', fontFamily: F }}>
        <FlowerPattern />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: 16 }}>Our Story</span>
          <h1 style={{ fontFamily: F, fontSize: 'clamp(32px,5vw,60px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1, color: '#fff', margin: 0 }}>
            Widgeon Point Since 1966
          </h1>
        </div>
      </section>

      {/* Photo strip */}
      <div style={{ overflow: 'hidden', background: '#0C1B36' }}>
        <div className="photo-strip">
          {[...Array(2)].map((_, pass) =>
            photos.map((src, i) => (
              <div key={`${pass}-${i}`} style={{ width: 340, height: 230, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.82)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(12,27,54,0.3), transparent, rgba(12,27,54,0.3))' }} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Story chapters */}
      <main style={{ fontFamily: F, background: '#F4F7FF' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '96px 40px 120px' }}>

          {/* Chapters */}
          {CHAPTERS.map((ch, i) => (
            <div key={i} className="chapter-card" style={{ background: '#fff', borderRadius: 20, padding: '40px 44px', marginBottom: 24, boxShadow: '0 4px 24px rgba(27,81,168,0.07)', borderLeft: `4px solid ${i === CHAPTERS.length - 1 ? GOLD : MID}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: '2px', color: MID, background: '#EEF3FA', borderRadius: 8, padding: '4px 12px' }}>{ch.year}</span>
                <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 900, color: BLUE, letterSpacing: '-0.5px', margin: 0 }}>{ch.title}</h2>
              </div>
              {ch.body.split('\n\n').map((para, j) => (
                <p key={j} style={{ fontSize: 15, lineHeight: 1.9, color: '#445566', margin: j < ch.body.split('\n\n').length - 1 ? '0 0 16px' : '0' }}>{para}</p>
              ))}
            </div>
          ))}

          {/* Back to About */}
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <a href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', padding: '16px 34px', borderRadius: 100, background: MID, color: '#fff', textDecoration: 'none' }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M12 7H2M7 2L2 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back to About Us
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
