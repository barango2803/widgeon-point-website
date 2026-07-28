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
    title: 'The Life of Edwin John Beinecke',
    body: `Edwin John Beinecke, master builder and business executive, was born New York City, January 6, 1886. Son of Bernhard and Johanna Elizabeth (Weigle) Beinecke. Bernhard came to the United States from Germany in 1865 and settled in New York City, where he was a successful butcher, teamster, meat wholesaler, and Chairman of the Board of the Plaza Hotel. The Beinecke Meats building is still standing at 33 Great Jones St, NY, NY. The Beinecke family consisted of four boys and three girls. (Bernhard Jr. (b.1876), Alice (b.1881), Johanna (b.1882), Theodora (b.1883) Edwin (b.1886), Frederick (b.1887), Walter (b.1888).

Edwin received his preliminary education at Phillips Academy, Andover, Massachusetts, with his two younger brothers (Fritz and Walter), and from that time forward they moved together through life as close friends and business partners. From 1903-1905, Edwin attended Yale University but was rumored to have been removed from his studies for leaving a cow in the dean's office. His business career began in the fall of 1905 when he was employed by the George C. Fuller Company, as the Timekeeper during the construction of the Plaza Hotel.`,
  },
  {
    year: '1905',
    title: 'A Builder is made, not born',
    body: `The Timekeeper position is the top job on any large building site, as every tradesman's paycheck must be approved by the timekeeper, and the job could only have been obtained by the direct influence of his father, a major investor in the new hotel. Upon the completion of the Plaza Hotel, Edwin served as the master of ceremonies for a tradesman's banquet, in which he called the men, "The guts of the hotel."

The Fuller Company subsequently hired him as assistant purchasing agent and then purchasing agent. Shortly thereafter he was made responsible for operations at the United States Realty and Improvement Company, the first REIT (Real Estate Investment Trust) organized in this country. In the depths of the Great Depression from 1936 to 1942, he was President and Chairman of the Board of the U.S. Realty Trust and Chairman of the Board of the Plaza Hotel Corporation. For a short while during this period, his family occupied the grand penthouse suite atop the Plaza Hotel.

Before the Trust entered bankruptcy, he spun the George A. Fuller Company out of the holding company, became the President, and from that year until 1956 he was the Chairman of the Board. As a result of the spin-off, the three Beinecke brothers controlled the marquee building company as a private family business. The George A Fuller Company operated throughout the world constructing skyscrapers, large public works projects, and was known for the use of specialty marble in iconic monuments such as Lincoln Memorial in Washington D.C.`,
  },
  {
    year: '1909',
    title: 'Family Life',
    body: `Edwin married Linda Louise, daughter of Henry A. and Linda L. (Yuengling) Maurer on April 22, 1909 in New York City. In religion he was a Universalist and in politics a Republican. He spoke fluent German his entire life. The family spoke German in the house before the Great War, but not in public after it. Upon the occasion of their 50th wedding anniversary, Edwin gave Linda Louise a three-carat green diamond.

Edwin became the father of Sylvia Levine Beinecke on March 25, 1910, and a son Edwin John Beinecke Jr on July 1, 1913. As a proud father, he escorted his daughter down the aisle on June 16th, 1934 to her wedding to Dr. John Newbold Robinson, with a reception in the Grand Ballroom of the Plaza Hotel under a glade of aspens. His son, Edwin John Beinecke Jr. was married three times (1) Margaret Haggarty (2) Rosemary O'Neall (3) Helen Bryce.`,
  },
  {
    year: '1917',
    title: '1917 to 1945: Army Service and Medal of Freedom',
    body: `Edwin was celebrated for his service to the country. In the Great War, he served as a Captain, U.S. Army, Construction Division. From 1915 to 1917 he supervised the construction of two explosive factories in Ohio. At some point he was in Europe, and on his way back home through London, he spotted a new type of patented tubular scaffolding and immediately procured a license for its exclusive use in North America. After his discharge, he was appointed a member of the U.S. Senate Commission to study and report on the damage done to federal buildings as the result of the 1918 earthquake in Puerto Rico.

During World War II, he served as a Deputy Commissioner of the American Red Cross in Great Britain. The timing of this service is uncertain, but he received a gold inscribed Bréguet pocket watch from his friends when he parted in NYC in September 1943. For his work with the American Red Cross in Great Britain, he later received the Medal of Freedom from President Truman, the nation's highest civilian honor.`,
  },
  {
    year: '1923',
    title: 'Business Interests',
    body: `Beinecke also had many other major business interests. From 1921-23 he was President of the Henry A. Maurer & Son, manufacturers of hollow tile and firebrick in Barber, NJ. (This must have been his father-in-law's company.) In 1918 he became associated with the Sperry and Hutchinson Company of NY, and was elected President in 1923, Chairman of the Board from 1932 to 1960, and he remained a director and later a majority shareholder until his death. His two brothers Frederick and Walter Beinecke married daughters of Thomas A Sperry, one of the two founders of the firm, and thus Sperry and Hutchinson essentially became a Beinecke family business.

The firm was organized in 1896 by Sperry and Shelly B. Hutchinson as a stamp plan which provided a discount to retail customers who paid cash instead of using credit to make purchases. Distributed through participating merchants, the stamps were later redeemed for goods. A profit was generated on the difference between the income from the stamp service and the cost of the merchandise. About 4% of the stamps were not redeemed, allowing the company to provide better quality merchandise to those who did redeem them. "Float," the money held by the company between the time the stamps were paid for by the merchants and the time they were redeemed by the savers was invested in many profitable enterprises to generate the bulk of the company's income.

In decades of business, Sperry & Hutchinson acquired Bigelow-Sanford, Inc, a carpet maker; State National Bank of Connecticut; The Gunlocke Co, Inc, Wayland, N.Y.; Lea Industries, Inc., Richmond, VA; American Drew, N. Wilkesboro, N.C.; Daystrom Furniture, Inc., South Boston, VA; Bayly, Martin & Fay, an insurance business; Hens and Kelly, department store; and Paragon Design, Waynesboro, Va. Under the Beineckes direction, the company sales increased from approximately $5 Million in 1923 to $369 Million in 1969. By 1970, the S&H Green Stamps employed 16,000 people, printed 10 billion stamps that were distributed at 65,000 retail centers, had 20 million customers visit its 800 redemption centers, and maintained stockholder equity of $181 Million dollars.

In addition, at various times, Beinecke was an officer in at least 18 other businesses, and he served on the boards of directors of Manufacturers Hanover Trust Co., The Patent Scaffolding Co.,Inc., Cheseboro Whitman Co., Curtiss-Wright Corp., Savoy Plaza,Inc., Waldorf Astoria Corp., Tiffany & Co., and the Hoving Corp., all in NYC; The Rockwood Alabama Stone Co., Rockwood AL; Cutler Mail Chute Co., Rochester, N.Y., The Wurzburg Co., Grand Rapids, MI; Hens and Kelly, Buffalo, NY, and the Stover Lock Nut & Machinery Co., Easton, PA.`,
  },
  {
    year: '1963',
    title: 'The Beinecke Library at Yale, Collecting, and Social Honors',
    body: `Beinecke was a generous patron of Yale University. Starting in 1949, Edwin became the Chairman of the Yale Library Association. He received the Yale Alumni Medal in 1953, the same year he transitioned into a role as a lifetime trustee of the library associates. He and his brothers donated the Beinecke Rare Book and Manuscript Library to Yale. The gift included the building in which the library operates. It is made of translucent Danby Vermont marble panels set in an innovative steel lattice. The project was completed under the direction of Edwin as President of the George A. Fuller Company, and financed by gifting the company's shares to Yale, who then sold the company to a pre-selected buyer without the need to pay capital gains taxes, netting the university $4 Million dollars required to purchase construction materials.

The gift also included Edwin's collection of rare books, centered on the works of Robert Louis Stevenson; 2,400 fragments of papyri, and, in 1969, one of largest gifts in Yale history, $15.7 Million dollars, to create a permanent endowment. By 1970, the library had more than 250,000 volumes and one million manuscripts. In addition, Beinecke and his two brothers donated an endowment fund for the purchase of general scholarly books for the Sterling Memorial Library at Yale. Through his financial gifts in the 1950s, Yale Library was able to publish works on papyrology, bibliography, Western exploration and discovery. The project was a monument to the three Beinecke brothers love and admiration for each other, in memory of Walter, who was the youngest, but first to pass away.

A collector of German glass and stoneware, Beinecke donated his collection of 139 pieces to Corning Museum of Glass, NY, in 1957. An additional part of the gift was a collection of research documents on the subject 16th and 17th century enameled glass. A founding fellow of the Museum of Modern Art, NYC, Beinecke was also a life member of the Metropolitan Museum of Art, NYC, active in the Friends of Princeton Library and the Friends of Huntington Library, San Marino CA, and one time Chairman of the Council of Fellows for the Pierpont Morgan Library, NYC. In 1950, he received an honorary L.H.D. degree from Bowdoin College. He was elected an honorary member in 1967 of the Association Internationale de Papyrologues, Brussels, Belgium.

Beinecke was also a member of the Bibliographical Society of America, Clubmobile Association, several Chambers of Commerce, Committee of Twenty-Five of Palm Springs, CA, The Savile and Portland Clubs of London, England, The Whitehall, Yale, Lawyers, Grolier, and Regency Whist Clubs of New York City, The Blind Brook club of Port Chester, NY, and the Bath and Tennis Club and the Everglades clubs of Palm Beach, FL.`,
  },
  {
    year: '1970',
    title: 'Hobbies and Philanthropy',
    body: `In addition to his ever-present curiosity in new subjects, Edwin enjoyed azalea and rhododendron collecting, keeping an active greenhouse and employing several full-time gardeners. He planted thousands of daffodils and opened his estate named "Skerryvore" once a year to the public so that others could enjoy the annual flower spectacular.

He believed in helping charitable organizations where he could actually make a difference. He did not think it wise to send blank checks to organizations he had never heard of, engaged in dubious enterprises. He passed away January 21, 1970.`,
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
    '/carousel/wp-001.jpg',
    '/carousel/wp-002.jpg',
    '/carousel/wp-003.jpg',
    '/carousel/wp-004.jpg',
    '/carousel/wp-005.jpg',
    '/carousel/wp-006.jpg',
    '/carousel/wp-007.jpg',
    '/carousel/wp-008.jpg',
    '/carousel/wp-009.jpg',
    '/carousel/wp-010.jpg',
    '/carousel/wp-011.jpg',
    '/carousel/wp-012.jpg',
    '/carousel/wp-013.jpg',
    '/carousel/wp-014.jpg',
    '/carousel/wp-015.jpg',
    '/carousel/wp-016.jpg',
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
