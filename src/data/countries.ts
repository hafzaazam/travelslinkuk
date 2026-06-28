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

export const COUNTRIES: Country[] = [
  {
    slug: "germany",
    name: "Germany",
    code: "de",
    tagline: "Schengen gateway to Europe",
    intro:
      "Germany welcomes millions of visitors each year for tourism, family reunions and business travel. We help you navigate the Schengen visa process end-to-end.",
    capital: "Berlin",
    currency: "Euro (EUR)",
    language: "German",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay Schengen visa for sightseeing and leisure travel up to 90 days." },
      { type: "Family Visa", description: "Visit close relatives residing in Germany with sponsorship documentation." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Travel insurance (€30,000 minimum)",
      "Proof of accommodation and itinerary",
      "Bank statements (last 3 months)",
    ],
  },
  {
    slug: "france",
    name: "France",
    code: "fr",
    tagline: "Art, culture and Schengen access",
    intro:
      "From Paris to the Riviera, France is one of the most visited Schengen destinations. Our consultants prepare a watertight application tailored to your purpose of visit.",
    capital: "Paris",
    currency: "Euro (EUR)",
    language: "French",
    processingTime: "15 – 20 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay Schengen visa covering tourism and leisure travel." },
      { type: "Family Visa", description: "Visit relatives in France with valid invitation and sponsorship." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Schengen-compliant travel insurance",
      "Confirmed flights and hotel bookings",
      "Proof of sufficient funds",
    ],
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    code: "nl",
    tagline: "Business hub of Northern Europe",
    intro:
      "The Netherlands is a top destination for business travellers and tourists alike. We handle Schengen applications through the VFS and Dutch consulate with full prep.",
    capital: "Amsterdam",
    currency: "Euro (EUR)",
    language: "Dutch",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay Schengen visa for leisure and sightseeing." },
      { type: "Business Visa", description: "Attend meetings, conferences and trade events." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Travel insurance (€30,000 minimum)",
      "Invitation letter (for business)",
      "Bank statements and ITR",
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
      "Valid passport (6+ months validity)",
      "Travel insurance (€30,000 minimum)",
      "Confirmed accommodation and itinerary",
      "Proof of strong home ties",
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
    requirements: [
      "Valid passport (6+ months validity)",
      "Travel insurance (€30,000 minimum)",
      "Hotel bookings and tour itinerary",
      "Sufficient funds for stay",
    ],
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
    requirements: [
      "Valid passport (6+ months validity)",
      "Travel insurance",
      "Accommodation proof",
      "Financial documents",
    ],
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
    requirements: [
      "Valid passport (6+ months validity)",
      "Travel insurance (€30,000 minimum)",
      "Flights and accommodation bookings",
      "Bank statements",
    ],
  },
  {
    slug: "greece",
    name: "Greece",
    code: "gr",
    tagline: "Islands, history and Schengen access",
    intro:
      "Greece's Schengen visa brings you to ancient ruins, island getaways and Mediterranean coastlines. We handle the paperwork from start to finish.",
    capital: "Athens",
    currency: "Euro (EUR)",
    language: "Greek",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Schengen visa for tourism and leisure." },
      { type: "Family Visa", description: "Visit family residing in Greece." },
    ],
    requirements: [
      "Valid passport (6+ months validity)",
      "Travel insurance",
      "Hotel bookings and itinerary",
      "Proof of funds",
    ],
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
      "Valid passport (6+ months validity)",
      "Travel insurance (€30,000 minimum)",
      "Invitation or business letter",
      "Financial documents",
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
    requirements: [
      "Valid passport (6+ months validity)",
      "Travel insurance",
      "Accommodation and itinerary proof",
      "Bank statements",
    ],
  },
  {
    slug: "usa",
    name: "USA",
    code: "us",
    tagline: "Across the Atlantic",
    intro:
      "United States visit visas (B1/B2) require careful preparation and a confident interview. Our team handles documentation, DS-160 and interview prep.",
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
      "Valid passport (6+ months validity)",
      "DS-160 confirmation",
      "Strong proof of home ties",
      "Financial documents and ITR",
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    code: "ca",
    tagline: "Visit the Great White North",
    intro:
      "Canada visitor visas need detailed preparation. We build a clear, compelling case so your tourist or family visit application stands out.",
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
      "Travel insurance",
      "Invitation letter (if family)",
      "Proof of funds and home ties",
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    code: "au",
    tagline: "Iconic landscapes Down Under",
    intro:
      "Australia visitor visas (subclass 600) require strong documentation. Our team prepares your application with the highest approval standards.",
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
      "Travel insurance",
      "Itinerary and accommodation bookings",
      "Financial documents",
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
      "Travel insurance",
      "Hotel bookings",
      "Bank statements",
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
      "Travel insurance",
      "Itinerary and accommodation",
      "Proof of funds",
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
      "Travel insurance",
      "Accommodation proof",
      "Bank statements",
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
      "Detailed itinerary",
      "Hotel bookings",
      "Financial documents",
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
      "Valid passport (6+ months validity)",
      "Travel insurance",
      "Itinerary and accommodation",
      "Yellow fever certificate (if applicable)",
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
      "Travel insurance",
      "Hotel bookings",
      "Proof of funds",
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
      "Local sponsor (if required)",
      "Confirmed bookings",
      "Financial documents",
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
      "Hotel bookings",
      "Return flight tickets",
      "Bank statements",
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
      "Travel insurance",
      "Hotel bookings",
      "Proof of funds",
    ],
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return COUNTRIES.find((c) => c.slug === slug);
}
