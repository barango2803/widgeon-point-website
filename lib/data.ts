// Mock data — field names match the schema exactly.
// Replace with Prisma/Drizzle queries when connecting a real database.

export interface Application {
  // ── Meta ─────────────────────────────────────────────────────
  id: number;
  submitted_at: string;
  year: number;
  month: number;
  status: 'submitted' | 'under_review' | 'approved' | 'declined';
  score: number | null;                                  // Board avg score 1–10

  // ── Section 1 — Org identity ─────────────────────────────────
  org_name: string;
  is_501c3: boolean;                                    // Q1  BOOLEAN
  ein: string;                                          // Q2  VARCHAR(10)

  // ── Section 2 — Contact information ──────────────────────────
  submitter_name: string;                               // Q3  VARCHAR(255)
  submitter_street: string;                             // Q4  VARCHAR(255)
  submitter_city: string;                               // Q5  VARCHAR(255)
  submitter_state: string;                              // Q6  VARCHAR(255)
  submitter_zip: string;                                // Q7
  submitter_email: string;                              // Q8  VARCHAR(255)
  submitter_phone: string;                              // Q9  VARCHAR(30)
  submitter_availability: string;                       // Q10 VARCHAR(255)
  submitter_timezone: string;                           // Q11 VARCHAR(60)
  exec_director_name: string;                           // Q12 VARCHAR(255)
  exec_director_email: string;                          // Q13 VARCHAR(255)
  exec_director_phone: string;                          // Q14 VARCHAR(30) optional
  website_url: string;                                  // Q15 VARCHAR(500) optional
  social_media_handles: string;                         // Q16 VARCHAR(500) optional

  // ── Section 3 — Organization profile ─────────────────────────
  mission_statement: string;                            // Q17 TEXT max 200 words
  years_in_operation: number;                           // Q18 INTEGER
  full_time_staff: number;                              // Q19 INTEGER
  part_time_staff: number;                              // Q20 INTEGER
  volunteers: number;                                   // Q21 INTEGER
  annual_operating_budget: number;                      // Q22 DECIMAL(12,2)
  total_assets: number;                                 // Q23 DECIMAL(12,2)
  outstanding_debts: number;                            // Q24 DECIMAL(12,2)

  // ── Section 4 — Grant request ─────────────────────────────────
  grant_amount_requested: number;                       // Q25 DECIMAL(9,2) max $9,999,999
  grant_purpose: 'Operations' | 'Capital Campaign';    // Q26 ENUM
  capital_campaign_doc: string | null;                  // Q27 FILE conditional on Capital Campaign

  // ── Section 5 — Area of giving ────────────────────────────────
  giving_area: 1 | 2 | 3 | 4 | 5;                     // Q28 TINYINT(1–5)

  // ── Derived ───────────────────────────────────────────────────
  org_state: string;                                    // org's state (used for map, derived from submitter_state or entered separately)

  // ── Section 6 — Document uploads ─────────────────────────────
  doc_irs_confirmation: string | null;                  // Q29 FILE required
  doc_cover_letter: string | null;                      // Q30 FILE required
  doc_form_990: string | null;                          // Q31 FILE required*
  doc_annual_report: string | null;                     // Q32 FILE optional
  doc_annual_report_url: string | null;                 // Q33 VARCHAR(500) optional
  doc_budget_prev_year: string | null;                  // Q34 FILE required*
  doc_budget_next_year: string | null;                  // Q35 FILE optional
}

const stub = (n: number) => ({
  submitter_street: `${n * 10} Main St`, submitter_city: 'Springfield',
  submitter_state: 'MD', submitter_zip: '20001',
});

export const applications: Application[] = [
  {
    id: 1, submitted_at: '2026-01-12', year: 2026, month: 1, status: 'approved', score: 8.4,
    org_name: 'Chesapeake Bay Conservancy', org_state: 'MD', is_501c3: true, ein: '52-1234567',
    submitter_name: 'Sarah Whitfield', ...stub(1), submitter_email: 'sarah@cbconservancy.org',
    submitter_phone: '(410) 555-0102', submitter_availability: 'M–F 9am–5pm', submitter_timezone: 'ET',
    exec_director_name: 'James Okonkwo', exec_director_email: 'james@cbconservancy.org', exec_director_phone: '(410) 555-0103',
    website_url: 'https://example.org', social_media_handles: '@cbconservancy',
    mission_statement: 'Protecting Chesapeake Bay waterways through community engagement.',
    years_in_operation: 18, full_time_staff: 22, part_time_staff: 5, volunteers: 140,
    annual_operating_budget: 980000, total_assets: 2100000, outstanding_debts: 0,
    grant_amount_requested: 120000, grant_purpose: 'Operations', giving_area: 3,
    capital_campaign_doc: null, doc_irs_confirmation: '#irs-1', doc_cover_letter: '#cl-1',
    doc_form_990: '#990-1', doc_annual_report: '#ar-1', doc_annual_report_url: null,
    doc_budget_prev_year: '#bp-1', doc_budget_next_year: '#bn-1',
  },
  {
    id: 2, submitted_at: '2026-01-28', year: 2026, month: 1, status: 'under_review', score: 6.1,
    org_name: 'Blue Ridge Youth Alliance', org_state: 'PA', is_501c3: true, ein: '23-7654321',
    submitter_name: 'Carlos Rivera', ...stub(2), submitter_state: 'PA', submitter_email: 'carlos@brya.org',
    submitter_phone: '(717) 555-0210', submitter_availability: 'M–F 8am–4pm', submitter_timezone: 'ET',
    exec_director_name: 'Patricia Njoku', exec_director_email: 'patricia@brya.org', exec_director_phone: '(717) 555-0211',
    website_url: 'https://example.org', social_media_handles: '@bryaorg',
    mission_statement: 'Empowering under-resourced youth through mentorship and skill-building.',
    years_in_operation: 9, full_time_staff: 8, part_time_staff: 12, volunteers: 85,
    annual_operating_budget: 420000, total_assets: 310000, outstanding_debts: 18000,
    grant_amount_requested: 55000, grant_purpose: 'Operations', giving_area: 2,
    capital_campaign_doc: null, doc_irs_confirmation: '#irs-2', doc_cover_letter: '#cl-2',
    doc_form_990: '#990-2', doc_annual_report: null, doc_annual_report_url: null,
    doc_budget_prev_year: '#bp-2', doc_budget_next_year: null,
  },
  {
    id: 3, submitted_at: '2026-02-05', year: 2026, month: 2, status: 'approved', score: 9.2,
    org_name: 'Metro Arts Collective', org_state: 'NY', is_501c3: true, ein: '13-9876543',
    submitter_name: 'Angela Torres', ...stub(3), submitter_state: 'NY', submitter_email: 'angela@metroarts.org',
    submitter_phone: '(212) 555-0301', submitter_availability: 'T–Th 10am–6pm', submitter_timezone: 'ET',
    exec_director_name: 'Michael Beaumont', exec_director_email: 'michael@metroarts.org', exec_director_phone: '(212) 555-0302',
    website_url: 'https://example.org', social_media_handles: '@metroarts',
    mission_statement: 'Bringing world-class performing arts to underserved New York communities.',
    years_in_operation: 31, full_time_staff: 35, part_time_staff: 8, volunteers: 60,
    annual_operating_budget: 1750000, total_assets: 3200000, outstanding_debts: 0,
    grant_amount_requested: 95000, grant_purpose: 'Operations', giving_area: 4,
    capital_campaign_doc: null, doc_irs_confirmation: '#irs-3', doc_cover_letter: '#cl-3',
    doc_form_990: '#990-3', doc_annual_report: '#ar-3', doc_annual_report_url: null,
    doc_budget_prev_year: '#bp-3', doc_budget_next_year: '#bn-3',
  },
  {
    id: 4, submitted_at: '2026-02-18', year: 2026, month: 2, status: 'declined', score: 3.5,
    org_name: 'Hope Harbor Community Center', org_state: 'CT', is_501c3: true, ein: '06-2345678',
    submitter_name: 'Jennifer Walsh', ...stub(4), submitter_state: 'CT', submitter_email: 'jennifer@hopeharbor.org',
    submitter_phone: '(203) 555-0402', submitter_availability: 'M–F 9am–5pm', submitter_timezone: 'ET',
    exec_director_name: 'Robert Harrington', exec_director_email: 'robert@hopeharbor.org', exec_director_phone: '(203) 555-0403',
    website_url: 'https://example.org', social_media_handles: '@hopeharbor',
    mission_statement: 'Providing transitional housing and job training for homeless individuals.',
    years_in_operation: 14, full_time_staff: 18, part_time_staff: 6, volunteers: 95,
    annual_operating_budget: 620000, total_assets: 890000, outstanding_debts: 42000,
    grant_amount_requested: 75000, grant_purpose: 'Operations', giving_area: 1,
    capital_campaign_doc: null, doc_irs_confirmation: '#irs-4', doc_cover_letter: '#cl-4',
    doc_form_990: '#990-4', doc_annual_report: '#ar-4', doc_annual_report_url: null,
    doc_budget_prev_year: '#bp-4', doc_budget_next_year: null,
  },
  {
    id: 5, submitted_at: '2026-03-03', year: 2026, month: 3, status: 'submitted', score: null,
    org_name: 'Bayou Greens Initiative', org_state: 'LA', is_501c3: true, ein: '22-5678901',
    submitter_name: 'Thomas Adeyemi', ...stub(5), submitter_state: 'LA', submitter_email: 'thomas@bayougreens.org',
    submitter_phone: '(504) 555-0501', submitter_availability: 'M–W 10am–5pm', submitter_timezone: 'CT',
    exec_director_name: 'Nicole Chambers', exec_director_email: 'nicole@bayougreens.org', exec_director_phone: '(504) 555-0502',
    website_url: 'https://example.org', social_media_handles: '@bayougreens',
    mission_statement: 'Building outdoor classrooms and youth nature programs in Louisiana.',
    years_in_operation: 6, full_time_staff: 5, part_time_staff: 3, volunteers: 45,
    annual_operating_budget: 280000, total_assets: 190000, outstanding_debts: 0,
    grant_amount_requested: 42000, grant_purpose: 'Operations', giving_area: 3,
    capital_campaign_doc: null, doc_irs_confirmation: '#irs-5', doc_cover_letter: '#cl-5',
    doc_form_990: null, doc_annual_report: null, doc_annual_report_url: null,
    doc_budget_prev_year: '#bp-5', doc_budget_next_year: null,
  },
  {
    id: 6, submitted_at: '2026-03-14', year: 2026, month: 3, status: 'approved', score: 7.8,
    org_name: 'River Trail Coalition', org_state: 'VT', is_501c3: true, ein: '04-3456789',
    submitter_name: 'Lindsey Park', ...stub(6), submitter_state: 'VT', submitter_email: 'lindsey@rivertrail.org',
    submitter_phone: '(802) 555-0601', submitter_availability: 'M–F 8am–4pm', submitter_timezone: 'ET',
    exec_director_name: 'Steven Liu', exec_director_email: 'steven@rivertrail.org', exec_director_phone: '(802) 555-0602',
    website_url: 'https://example.org', social_media_handles: '@rivertrail',
    mission_statement: 'Connecting Vermont communities to local cultural heritage through arts.',
    years_in_operation: 27, full_time_staff: 12, part_time_staff: 4, volunteers: 210,
    annual_operating_budget: 750000, total_assets: 1800000, outstanding_debts: 85000,
    grant_amount_requested: 180000, grant_purpose: 'Capital Campaign', giving_area: 3,
    capital_campaign_doc: '#cap-6', doc_irs_confirmation: '#irs-6', doc_cover_letter: '#cl-6',
    doc_form_990: '#990-6', doc_annual_report: '#ar-6', doc_annual_report_url: null,
    doc_budget_prev_year: '#bp-6', doc_budget_next_year: '#bn-6',
  },
  {
    id: 7, submitted_at: '2026-04-02', year: 2026, month: 4, status: 'under_review', score: 5.0,
    org_name: 'Heritage Music Society', org_state: 'DC', is_501c3: true, ein: '54-6789012',
    submitter_name: 'Barbara Osei', ...stub(7), submitter_state: 'DC', submitter_email: 'barbara@hmsdc.org',
    submitter_phone: '(202) 555-0701', submitter_availability: 'M–F 9am–6pm', submitter_timezone: 'ET',
    exec_director_name: 'David Chen', exec_director_email: 'david@hmsdc.org', exec_director_phone: '(202) 555-0702',
    website_url: 'https://example.org', social_media_handles: '@hmsdc',
    mission_statement: 'Offering free summer enrichment and college prep for DC youth.',
    years_in_operation: 42, full_time_staff: 28, part_time_staff: 10, volunteers: 75,
    annual_operating_budget: 1200000, total_assets: 4100000, outstanding_debts: 0,
    grant_amount_requested: 65000, grant_purpose: 'Operations', giving_area: 4,
    capital_campaign_doc: null, doc_irs_confirmation: '#irs-7', doc_cover_letter: '#cl-7',
    doc_form_990: '#990-7', doc_annual_report: '#ar-7', doc_annual_report_url: null,
    doc_budget_prev_year: '#bp-7', doc_budget_next_year: '#bn-7',
  },
  {
    id: 8, submitted_at: '2026-04-20', year: 2026, month: 4, status: 'submitted', score: null,
    org_name: 'First Steps Immigrant Services', org_state: 'NJ', is_501c3: true, ein: '34-7890123',
    submitter_name: 'Maria Gonzalez', ...stub(8), submitter_state: 'NJ', submitter_email: 'maria@firststepsnj.org',
    submitter_phone: '(973) 555-0801', submitter_availability: 'M–F 9am–5pm', submitter_timezone: 'ET',
    exec_director_name: 'James Okonkwo', exec_director_email: 'james@firststepsnj.org', exec_director_phone: '(973) 555-0802',
    website_url: 'https://example.org', social_media_handles: '@firststepsnj',
    mission_statement: 'Resettlement services and workforce integration for new Americans in NJ.',
    years_in_operation: 11, full_time_staff: 15, part_time_staff: 7, volunteers: 130,
    annual_operating_budget: 640000, total_assets: 420000, outstanding_debts: 25000,
    grant_amount_requested: 88000, grant_purpose: 'Operations', giving_area: 1,
    capital_campaign_doc: null, doc_irs_confirmation: '#irs-8', doc_cover_letter: '#cl-8',
    doc_form_990: '#990-8', doc_annual_report: null, doc_annual_report_url: null,
    doc_budget_prev_year: '#bp-8', doc_budget_next_year: null,
  },
  {
    id: 9, submitted_at: '2026-05-07', year: 2026, month: 5, status: 'under_review', score: 4.3,
    org_name: 'Adaptive Sports Network', org_state: 'MA', is_501c3: true, ein: '25-8901234',
    submitter_name: 'Sarah Whitfield', ...stub(9), submitter_state: 'MA', submitter_email: 'sarah@adaptivesports.org',
    submitter_phone: '(617) 555-0901', submitter_availability: 'M–F 8am–3pm', submitter_timezone: 'ET',
    exec_director_name: 'Patricia Njoku', exec_director_email: 'patricia@adaptivesports.org', exec_director_phone: '(617) 555-0902',
    website_url: 'https://example.org', social_media_handles: '@adaptivesports',
    mission_statement: 'Adaptive sports programs and inclusive athletics for youth with disabilities.',
    years_in_operation: 8, full_time_staff: 6, part_time_staff: 9, volunteers: 65,
    annual_operating_budget: 320000, total_assets: 275000, outstanding_debts: 12000,
    grant_amount_requested: 38000, grant_purpose: 'Operations', giving_area: 2,
    capital_campaign_doc: null, doc_irs_confirmation: '#irs-9', doc_cover_letter: '#cl-9',
    doc_form_990: '#990-9', doc_annual_report: '#ar-9', doc_annual_report_url: null,
    doc_budget_prev_year: '#bp-9', doc_budget_next_year: null,
  },
  {
    id: 10, submitted_at: '2026-05-22', year: 2026, month: 5, status: 'submitted', score: null,
    org_name: 'Coastal Kids Foundation', org_state: 'WA', is_501c3: true, ein: '51-9012345',
    submitter_name: 'Carlos Rivera', ...stub(10), submitter_state: 'WA', submitter_email: 'carlos@coastalkids.org',
    submitter_phone: '(206) 555-1001', submitter_availability: 'T–F 10am–5pm', submitter_timezone: 'PT',
    exec_director_name: 'Angela Torres', exec_director_email: 'angela@coastalkids.org', exec_director_phone: '(206) 555-1002',
    website_url: 'https://example.org', social_media_handles: '@coastalkids',
    mission_statement: 'Connecting Washington State youth to marine science and ocean careers.',
    years_in_operation: 5, full_time_staff: 9, part_time_staff: 4, volunteers: 50,
    annual_operating_budget: 490000, total_assets: 350000, outstanding_debts: 0,
    grant_amount_requested: 145000, grant_purpose: 'Capital Campaign', giving_area: 2,
    capital_campaign_doc: '#cap-10', doc_irs_confirmation: '#irs-10', doc_cover_letter: '#cl-10',
    doc_form_990: null, doc_annual_report: null, doc_annual_report_url: null,
    doc_budget_prev_year: '#bp-10', doc_budget_next_year: '#bn-10',
  },
];
