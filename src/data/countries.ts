export type CountryVisa = {
  type: string;
  description: string;
};

export type Country = {
  slug: string;
  name: string;
  code: string; // ISO 2-letter, lowercase
  tagline: string;
  intro: string;
  capital: string;
  currency: string;
  language: string;
  processingTime: string;
  visas: CountryVisa[];
  requirements: string[];
};

// Standard Schengen tourist visa checklist (used as base for European destinations).
const SCHENGEN_CHECKLIST = [
  "Valid passport (6+ months validity, 2 blank pages)",
  "Two recent biometric passport-size photos",
  "Completed and signed Schengen visa application form",
  "Travel medical insurance (€30,000 minimum, Schengen-wide cover)",
  "Confirmed return flight reservation",
  "Hotel reservation covering entire stay",
  "Day-by-day travel itinerary",
  "Bank statements (last 3–6 months, £1,000+ recommended)",
  "Employment letter / proof of approved leave",
  "Cover letter explaining purpose of visit",
];

export const COUNTRIES: Country[] = [
  {
    slug: "germany",
    name: "Germany",
    code: "de",
    tagline: "Schengen gateway to Europe",
    intro:
      "A Germany Tourist Visa allows you to visit Germany for travel, sightseeing, or visiting family and friends for up to 90 days within a 180-day period. We handle the full TLS appointment and embassy submission process for you.",
    capital: "Berlin",
    currency: "Euro (EUR)",
    language: "German",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay Schengen visa for sightseeing and leisure travel up to 90 days." },
      { type: "Family Visa", description: "Visit close relatives residing in Germany with sponsorship documentation." },
    ],
    requirements: [
      ...SCHENGEN_CHECKLIST,
      "TLS appointment booking (£28 fee)",
      "Embassy visa fee (£76)",
    ],
  },
  {
    slug: "france",
    name: "France",
    code: "fr",
    tagline: "Art, culture and Schengen access",
    intro:
      "France remains one of the most visited Schengen destinations — from Paris to the Riviera. Our consultants prepare a watertight TLS / VFS application tailored to your purpose of visit.",
    capital: "Paris",
    currency: "Euro (EUR)",
    language: "French",
    processingTime: "15 – 20 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay Schengen visa covering tourism and leisure travel." },
      { type: "Family Visa", description: "Visit relatives in France with valid invitation and sponsorship." },
    ],
    requirements: [
      ...SCHENGEN_CHECKLIST,
      "TLS appointment booking (£35 fee)",
      "Embassy visa fee (£76)",
    ],
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    code: "nl",
    tagline: "Business hub of Northern Europe",
    intro:
      "The Netherlands is a top destination for business travellers and tourists alike. Visit Amsterdam's canals and museums, enjoy local cheese and stroopwafels, and travel easily across Europe.",
    capital: "Amsterdam",
    currency: "Euro (EUR)",
    language: "Dutch",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay Schengen visa for leisure and sightseeing." },
      { type: "Business Visa", description: "Attend meetings, conferences and trade events." },
    ],
    requirements: [
      ...SCHENGEN_CHECKLIST,
      "Invitation letter (for business / family visits)",
      "VFS appointment booking",
    ],
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    code: "ch",
    tagline: "Alpine luxury and precision",
    intro:
      "Switzerland's Schengen visa lets you explore alpine landscapes, lakeside cities and world-class events. Our team prepares your file to the highest standard.",
    capital: "Bern",
    currency: "Swiss Franc (CHF)",
    language: "German, French, Italian",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay Schengen visa for tourism." },
      { type: "Visit Visa", description: "Visit family or friends with valid sponsorship." },
    ],
    requirements: [
      ...SCHENGEN_CHECKLIST,
      "Proof of strong home ties",
      "TLS Contact appointment booking",
    ],
  },
  {
    slug: "iceland",
    name: "Iceland",
    code: "is",
    tagline: "Land of fire and ice",
    intro:
      "Iceland's Schengen visa opens up dramatic landscapes, the Northern Lights and unique experiences. We guide every step of the application.",
    capital: "Reykjavík",
    currency: "Icelandic Króna (ISK)",
    language: "Icelandic",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Schengen short-stay visa for tourism." },
      { type: "Visit Visa", description: "Visit friends or relatives based in Iceland." },
    ],
    requirements: SCHENGEN_CHECKLIST,
  },
  {
    slug: "sweden",
    name: "Sweden",
    code: "se",
    tagline: "Scandinavian charm and design",
    intro:
      "Sweden offers Schengen access to stunning archipelagos and modern cities. Our team ensures your tourist or family visit visa is fully documented.",
    capital: "Stockholm",
    currency: "Swedish Krona (SEK)",
    language: "Swedish",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Schengen visa for short-stay tourism." },
      { type: "Family Visa", description: "Visit family members residing in Sweden." },
    ],
    requirements: SCHENGEN_CHECKLIST,
  },
  {
    slug: "portugal",
    name: "Portugal",
    code: "pt",
    tagline: "Atlantic coast and warm welcome",
    intro:
      "Portugal is a favourite Schengen destination for tourists and family visitors. We prepare your application for a smooth approval.",
    capital: "Lisbon",
    currency: "Euro (EUR)",
    language: "Portuguese",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay Schengen visa for leisure travel." },
      { type: "Visit Visa", description: "Visit relatives or friends in Portugal." },
    ],
    requirements: SCHENGEN_CHECKLIST,
  },
  {
    slug: "greece",
    name: "Greece",
    code: "gr",
    tagline: "Islands, history and Schengen access",
    intro:
      "Greece's Schengen visa brings you to ancient ruins, island getaways and Mediterranean coastlines. Explore famous landmarks, experience the culture and local cuisine, and travel with the peace of mind that comes with legal permission to stay.",
    capital: "Athens",
    currency: "Euro (EUR)",
    language: "Greek",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Schengen visa for tourism and leisure." },
      { type: "Family Visa", description: "Visit family residing in Greece." },
    ],
    requirements: SCHENGEN_CHECKLIST,
  },
  {
    slug: "austria",
    name: "Austria",
    code: "at",
    tagline: "Imperial cities and alpine escapes",
    intro:
      "Austria offers Schengen access to Vienna, Salzburg and the Alps. Our consultants make sure your tourist or business file is approval-ready.",
    capital: "Vienna",
    currency: "Euro (EUR)",
    language: "German",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay Schengen visa for tourism." },
      { type: "Business Visa", description: "Meetings, conferences and trade events in Austria." },
    ],
    requirements: [
      ...SCHENGEN_CHECKLIST,
      "Invitation or business letter (where applicable)",
    ],
  },
  {
    slug: "italy",
    name: "Italy",
    code: "it",
    tagline: "Cuisine, art and timeless cities",
    intro:
      "Italy's Schengen visa unlocks Rome, Venice, Florence and beyond. We handle your file end-to-end so your trip starts stress-free.",
    capital: "Rome",
    currency: "Euro (EUR)",
    language: "Italian",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Schengen visa for sightseeing and leisure." },
      { type: "Family Visa", description: "Visit family or friends in Italy." },
    ],
    requirements: SCHENGEN_CHECKLIST,
  },
  {
    slug: "usa",
    name: "USA",
    code: "us",
    tagline: "Across the Atlantic",
    intro:
      "United States visit visas (B1/B2) require careful preparation and a confident interview. Explore new places, experience the diverse American culture, and enjoy the legal permission to stay for your trip — our team handles documentation, DS-160 and interview prep.",
    capital: "Washington, D.C.",
    currency: "US Dollar (USD)",
    language: "English",
    processingTime: "Interview-based",
    visas: [
      { type: "B2 Tourist Visa", description: "For tourism, leisure and visiting friends or family." },
      { type: "B1 Business Visa", description: "For business meetings, conferences and consultations." },
      { type: "Family Visa", description: "Visit close relatives in the United States." },
    ],
    requirements: [
      "Valid passport (6+ months validity beyond return date)",
      "Recent US-spec passport photo (2x2 inches, white background)",
      "Completed DS-160 confirmation page",
      "MRV visa fee payment receipt",
      "US embassy interview appointment confirmation",
      "Detailed travel itinerary and hotel bookings",
      "Return flight reservation",
      "Bank statements (last 6 months) and proof of funds",
      "Employment letter and proof of approved leave",
      "Strong proof of home ties (property, family, ITR)",
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    code: "ca",
    tagline: "Visit the Great White North",
    intro:
      "A Canada visitor visa lets you explore Canada's beautiful landscapes and iconic attractions, experience the diverse culture and local cuisine, and enjoy sightseeing and outdoor adventures with legal permission to stay.",
    capital: "Ottawa",
    currency: "Canadian Dollar (CAD)",
    language: "English, French",
    processingTime: "4 – 8 weeks",
    visas: [
      { type: "Tourist Visa", description: "Temporary Resident Visa for tourism and leisure travel." },
      { type: "Family Visa", description: "Visit close family in Canada with sponsorship." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Two recent passport-size photos (Canada specification)",
      "Completed IMM 5257 application form",
      "Visa application fee receipt",
      "Biometrics appointment confirmation (VFS)",
      "Detailed travel itinerary and hotel bookings",
      "Return flight reservation",
      "Bank statements (last 6 months) and proof of funds",
      "Employment letter / proof of approved leave",
      "Letter of invitation (if visiting family or friends)",
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    code: "au",
    tagline: "Iconic landscapes Down Under",
    intro:
      "Explore Australia's famous landmarks, experience its diverse culture and local foods, and enjoy local events and festivals — all with the peace of mind that comes from a properly prepared Subclass 600 visitor visa.",
    capital: "Canberra",
    currency: "Australian Dollar (AUD)",
    language: "English",
    processingTime: "4 – 6 weeks",
    visas: [
      { type: "Tourist Visa (600)", description: "Visit Australia for tourism and leisure." },
      { type: "Family Sponsored Visit", description: "Visit family members residing in Australia." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Recent passport-size photos",
      "Completed Subclass 600 online application (ImmiAccount)",
      "Visa application charge (VAC) payment",
      "Health declaration and medical exam (if requested)",
      "Detailed travel itinerary and accommodation bookings",
      "Return flight reservation",
      "Bank statements (last 6 months) and proof of funds",
      "Employment letter / proof of approved leave",
      "Invitation letter from Australian sponsor (if family-sponsored)",
    ],
  },
  {
    slug: "morocco",
    name: "Morocco",
    code: "ma",
    tagline: "Markets, deserts and ancient cities",
    intro:
      "Morocco welcomes visitors for tourism and business. We assist with documentation, embassy submissions and approvals.",
    capital: "Rabat",
    currency: "Moroccan Dirham (MAD)",
    language: "Arabic, French",
    processingTime: "10 – 20 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay visa for tourism and leisure." },
      { type: "Business Visa", description: "Business meetings and trade visits." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Two recent passport-size photos",
      "Completed Moroccan visa application form",
      "Travel medical insurance",
      "Confirmed return flight reservation",
      "Hotel reservation covering entire stay",
      "Bank statements (last 3 months)",
      "Employment letter / proof of leave",
      "Invitation letter (for business visits)",
    ],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    code: "nz",
    tagline: "Adventure and natural beauty",
    intro:
      "New Zealand visitor visas open up dramatic landscapes and unique experiences. We prepare your application with care.",
    capital: "Wellington",
    currency: "New Zealand Dollar (NZD)",
    language: "English",
    processingTime: "4 – 6 weeks",
    visas: [
      { type: "Visitor Visa", description: "Visit New Zealand for tourism and leisure." },
      { type: "Family Visit", description: "Visit relatives based in New Zealand." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Recent passport-size photos",
      "Completed Visitor Visa application (INZ 1017)",
      "Application fee payment",
      "Travel medical insurance",
      "Detailed itinerary and accommodation bookings",
      "Return flight reservation",
      "Bank statements and proof of funds",
      "Employment letter / proof of leave",
      "Invitation letter (if visiting family)",
    ],
  },
  {
    slug: "ireland",
    name: "Ireland",
    code: "ie",
    tagline: "Emerald Isle warmth",
    intro:
      "Ireland short-stay visas cover tourism and family visits. We help you assemble a complete, well-presented file.",
    capital: "Dublin",
    currency: "Euro (EUR)",
    language: "English, Irish",
    processingTime: "4 – 8 weeks",
    visas: [
      { type: "Tourist Visa", description: "Short-stay C-visa for tourism." },
      { type: "Family Visa", description: "Visit family residing in Ireland." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Two recent passport-size photos",
      "Completed AVATS online application form",
      "Visa application fee receipt",
      "Travel medical insurance",
      "Detailed itinerary and accommodation proof",
      "Return flight reservation",
      "Bank statements (last 6 months)",
      "Employment letter / proof of leave",
      "Signed cover letter explaining purpose of visit",
    ],
  },
  {
    slug: "japan",
    name: "Japan",
    code: "jp",
    tagline: "Tradition meets modernity",
    intro:
      "Japan tourist and business visas need careful documentation. We prepare your file with precision for smooth approval.",
    capital: "Tokyo",
    currency: "Japanese Yen (JPY)",
    language: "Japanese",
    processingTime: "5 – 10 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay visa for tourism and sightseeing." },
      { type: "Business Visa", description: "Business meetings and trade events." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Recent passport-size photo (45mm x 45mm)",
      "Completed Japanese visa application form",
      "Day-by-day detailed itinerary (required)",
      "Hotel bookings covering entire stay",
      "Return flight reservation",
      "Bank statements (last 6 months)",
      "Employment letter / proof of leave",
      "Invitation letter (for business visits)",
    ],
  },
  {
    slug: "south-africa",
    name: "South Africa",
    code: "za",
    tagline: "Safari and stunning coastlines",
    intro:
      "South Africa visitor visas cover tourism and business. We handle embassy and VFS submissions on your behalf.",
    capital: "Pretoria",
    currency: "South African Rand (ZAR)",
    language: "English, Afrikaans",
    processingTime: "5 – 10 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay visitor visa for tourism." },
      { type: "Business Visa", description: "Business and trade visits." },
    ],
    requirements: [
      "Valid passport (6+ months validity, 2 blank pages)",
      "Two recent passport-size photos",
      "Completed BI-84 visa application form",
      "Travel medical insurance",
      "Confirmed itinerary and accommodation",
      "Return flight reservation",
      "Bank statements (last 3 months)",
      "Yellow fever certificate (if coming from a risk area)",
      "Invitation letter (for business visits)",
    ],
  },
  {
    slug: "turkey",
    name: "Turkey",
    code: "tr",
    tagline: "Where continents meet",
    intro:
      "Turkey is a popular destination for tourism and family visits. We assist with eVisa and consular applications.",
    capital: "Ankara",
    currency: "Turkish Lira (TRY)",
    language: "Turkish",
    processingTime: "3 – 10 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay tourist visa or eVisa." },
      { type: "Family Visa", description: "Visit relatives based in Turkey." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Recent passport-size photo",
      "Completed Turkish eVisa / consular application",
      "Travel medical insurance",
      "Hotel reservation for entire stay",
      "Return flight reservation",
      "Bank statements (last 3 months)",
      "Invitation letter (if visiting family)",
    ],
  },
  {
    slug: "singapore",
    name: "Singapore",
    code: "sg",
    tagline: "Global business gateway",
    intro:
      "Singapore visitor visas cover tourism and business. We prepare your application with full sponsor documentation.",
    capital: "Singapore",
    currency: "Singapore Dollar (SGD)",
    language: "English, Malay",
    processingTime: "3 – 5 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay visa for tourism." },
      { type: "Business Visa", description: "Meetings, conferences and trade events." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Recent passport-size photo (Singapore specification)",
      "Completed Form 14A",
      "Local sponsor's Letter of Introduction (if required)",
      "Confirmed hotel bookings",
      "Return flight reservation",
      "Bank statements (last 3 months)",
      "Employment letter / proof of leave",
    ],
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    code: "my",
    tagline: "Tropical diversity",
    intro:
      "Malaysia offers tourism and business visas with straightforward processing. We handle your application end-to-end.",
    capital: "Kuala Lumpur",
    currency: "Malaysian Ringgit (MYR)",
    language: "Malay, English",
    processingTime: "3 – 7 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay tourism visa." },
      { type: "Business Visa", description: "Business meetings and trade visits." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Two recent passport-size photos",
      "Completed Malaysian visa application form (IMM.47)",
      "Hotel bookings covering entire stay",
      "Return flight tickets",
      "Bank statements (last 3 months)",
      "Employment letter / proof of leave",
      "Invitation letter (for business visits)",
    ],
  },
  {
    slug: "thailand",
    name: "Thailand",
    code: "th",
    tagline: "Beaches, temples and culture",
    intro:
      "Thailand tourist and family visas are a popular choice. We make the application process smooth from start to finish.",
    capital: "Bangkok",
    currency: "Thai Baht (THB)",
    language: "Thai",
    processingTime: "5 – 10 days",
    visas: [
      { type: "Tourist Visa", description: "Single-entry tourist visa." },
      { type: "Family Visa", description: "Visit family residing in Thailand." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Two recent passport-size photos",
      "Completed TR / e-Visa application form",
      "Travel medical insurance",
      "Hotel bookings covering entire stay",
      "Return flight reservation",
      "Bank statements (last 3 months, minimum £700 / 20,000 THB)",
      "Employment letter / proof of leave",
    ],
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return COUNTRIES.find((c) => c.slug === slug);
}
