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
  about: string;
  capital: string;
  currency: string;
  language: string;
  processingTime: string;
  visas: CountryVisa[];
  requirements: string[];
  benefits: string[];
  pros: string[];
  cons: string[];
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

const SCHENGEN_PROS = [
  "Single visa covers all 29 Schengen countries",
  "Stay up to 90 days within any 180-day period",
  "Well-defined documentation list with predictable timelines",
  "Multiple-entry visas often issued to frequent travellers",
];

const SCHENGEN_CONS = [
  "Biometric appointment must be booked in person",
  "Strong proof of funds and ties to home country required",
  "Refusal possible if any single document is missing or unclear",
];

export const COUNTRIES: Country[] = [
  {
    slug: "germany",
    name: "Germany",
    code: "de",
    tagline: "Schengen gateway to Europe",
    intro:
      "A Germany Tourist Visa allows you to visit Germany for travel, sightseeing, or visiting family and friends for up to 90 days within a 180-day period. We handle the full TLS appointment and embassy submission process for you.",
    about:
      "Germany is Europe's largest economy and one of the most visited countries in the world. It blends medieval old towns, world-class museums and modern cities like Berlin, Munich and Hamburg with scenic landscapes from the Black Forest to the Bavarian Alps.",
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
    benefits: [
      "Visit famous sites like the Brandenburg Gate, Neuschwanstein Castle and the Black Forest",
      "Enjoy Germany's rich cultural heritage — museums, art galleries and historical monuments",
      "Savor traditional foods like pretzels, sausages and schnitzel, plus world-famous German beer",
      "Free movement across all 29 Schengen countries on a single visa",
    ],
    pros: SCHENGEN_PROS,
    cons: SCHENGEN_CONS,
  },
  {
    slug: "france",
    name: "France",
    code: "fr",
    tagline: "Art, culture and Schengen access",
    intro:
      "France remains one of the most visited Schengen destinations — from Paris to the Riviera. Our consultants prepare a watertight TLS / VFS application tailored to your purpose of visit.",
    about:
      "France is the world's most visited country, famous for Paris, the French Riviera, alpine ski resorts and the vineyards of Bordeaux and Champagne. It pairs world-class art and cuisine with iconic landmarks like the Eiffel Tower, the Louvre and Mont Saint-Michel.",
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
    benefits: [
      "Iconic landmarks: Eiffel Tower, Louvre, Mont Saint-Michel and Versailles",
      "World-renowned cuisine, wine regions and Michelin-starred dining",
      "Easy onward travel by TGV to Belgium, Switzerland and Spain",
      "Schengen visa unlocks 28 additional countries",
    ],
    pros: SCHENGEN_PROS,
    cons: SCHENGEN_CONS,
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    code: "nl",
    tagline: "Business hub of Northern Europe",
    intro:
      "The Netherlands is a top destination for business travellers and tourists alike. Visit Amsterdam's canals and museums, enjoy local cheese and stroopwafels, and travel easily across Europe.",
    about:
      "The Netherlands is famous for its canals, tulip fields, windmills and bicycle-friendly cities. Amsterdam, Rotterdam and The Hague combine world-class museums and modern architecture with a relaxed, multicultural atmosphere.",
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
    benefits: [
      "Visit Amsterdam's canals, museums and historic centre",
      "Enjoy local foods like cheese, stroopwafels and herring",
      "Explore beautiful windmills, tulip fields and coastal towns",
      "Excellent base for short trips across Northern Europe",
    ],
    pros: SCHENGEN_PROS,
    cons: SCHENGEN_CONS,
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    code: "ch",
    tagline: "Alpine luxury and precision",
    intro:
      "Switzerland's Schengen visa lets you explore alpine landscapes, lakeside cities and world-class events. Our team prepares your file to the highest standard.",
    about:
      "Switzerland sits at the heart of the Alps, offering snow-capped peaks, glacier lakes and cities like Zurich, Geneva and Bern. It's known for scenic train journeys, ski resorts, watchmaking and a reputation for safety and precision.",
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
    benefits: [
      "World-class skiing in Zermatt, Verbier and St. Moritz",
      "Scenic rail journeys like the Glacier Express and Bernina Express",
      "Lakeside cities — Geneva, Lucerne and Zurich",
      "Schengen access to all 29 member countries",
    ],
    pros: SCHENGEN_PROS,
    cons: [
      ...SCHENGEN_CONS,
      "Travel costs in Switzerland are notably higher than the EU average",
    ],
  },
  {
    slug: "iceland",
    name: "Iceland",
    code: "is",
    tagline: "Land of fire and ice",
    intro:
      "Iceland's Schengen visa opens up dramatic landscapes, the Northern Lights and unique experiences. We guide every step of the application.",
    about:
      "Iceland is a Nordic island nation famous for volcanoes, glaciers, geothermal hot springs and the Northern Lights. Reykjavík is its compact capital, and the country is one of the safest and most distinctive destinations in Europe.",
    capital: "Reykjavík",
    currency: "Icelandic Króna (ISK)",
    language: "Icelandic",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Schengen short-stay visa for tourism." },
      { type: "Visit Visa", description: "Visit friends or relatives based in Iceland." },
    ],
    requirements: SCHENGEN_CHECKLIST,
    benefits: [
      "See the Northern Lights between September and April",
      "Bathe in geothermal lagoons like the Blue Lagoon",
      "Drive the Golden Circle past geysers, waterfalls and craters",
      "Schengen visa works across all 29 member countries",
    ],
    pros: SCHENGEN_PROS,
    cons: SCHENGEN_CONS,
  },
  {
    slug: "sweden",
    name: "Sweden",
    code: "se",
    tagline: "Scandinavian charm and design",
    intro:
      "Sweden offers Schengen access to stunning archipelagos and modern cities. Our team ensures your tourist or family visit visa is fully documented.",
    about:
      "Sweden is the largest Scandinavian country, known for Stockholm's archipelago, Gothenburg's coast and Lapland's wilderness in the north. It's famous for clean design, high quality of life and outdoor culture.",
    capital: "Stockholm",
    currency: "Swedish Krona (SEK)",
    language: "Swedish",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Schengen visa for short-stay tourism." },
      { type: "Family Visa", description: "Visit family members residing in Sweden." },
    ],
    requirements: SCHENGEN_CHECKLIST,
    benefits: [
      "Explore Stockholm's 14-island archipelago and old town",
      "See the Northern Lights and stay at the Ice Hotel in Lapland",
      "Discover Scandinavian design, food halls and coffee culture",
      "Schengen visa covers all 29 member countries",
    ],
    pros: SCHENGEN_PROS,
    cons: SCHENGEN_CONS,
  },
  {
    slug: "portugal",
    name: "Portugal",
    code: "pt",
    tagline: "Atlantic coast and warm welcome",
    intro:
      "Portugal is a favourite Schengen destination for tourists and family visitors. We prepare your application for a smooth approval.",
    about:
      "Portugal is a sun-soaked country on the Atlantic edge of Europe, famous for Lisbon, Porto, the Algarve coast and historic Madeira. It offers great food, port wine, surf beaches and one of the warmest climates in Europe.",
    capital: "Lisbon",
    currency: "Euro (EUR)",
    language: "Portuguese",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Short-stay Schengen visa for leisure travel." },
      { type: "Visit Visa", description: "Visit relatives or friends in Portugal." },
    ],
    requirements: SCHENGEN_CHECKLIST,
    benefits: [
      "Discover historic Lisbon, Porto and the Douro Valley",
      "Relax on Algarve beaches and cliff-top coastal towns",
      "Affordable food, wine and accommodation compared to most of Europe",
      "Schengen visa unlocks 28 additional countries",
    ],
    pros: SCHENGEN_PROS,
    cons: SCHENGEN_CONS,
  },
  {
    slug: "greece",
    name: "Greece",
    code: "gr",
    tagline: "Islands, history and Schengen access",
    intro:
      "Greece's Schengen visa brings you to ancient ruins, island getaways and Mediterranean coastlines. Explore famous landmarks, experience the culture and local cuisine, and travel with the peace of mind that comes with legal permission to stay.",
    about:
      "Greece is the birthplace of Western civilization, with ancient ruins like the Acropolis alongside more than 200 inhabited islands in the Aegean and Ionian seas. Highlights include Athens, Santorini, Mykonos and Crete.",
    capital: "Athens",
    currency: "Euro (EUR)",
    language: "Greek",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Schengen visa for tourism and leisure." },
      { type: "Family Visa", description: "Visit family residing in Greece." },
    ],
    requirements: SCHENGEN_CHECKLIST,
    benefits: [
      "Explore famous landmarks like the Acropolis and Delphi",
      "Hop between iconic islands — Santorini, Mykonos, Crete",
      "Experience authentic Mediterranean food and culture",
      "Travel freely across all 29 Schengen countries",
    ],
    pros: SCHENGEN_PROS,
    cons: SCHENGEN_CONS,
  },
  {
    slug: "austria",
    name: "Austria",
    code: "at",
    tagline: "Imperial cities and alpine escapes",
    intro:
      "Austria offers Schengen access to Vienna, Salzburg and the Alps. Our consultants make sure your tourist or business file is approval-ready.",
    about:
      "Austria combines imperial grandeur in Vienna and Salzburg with alpine villages, ski resorts and lakes in the Tyrol and Salzkammergut. It's also the cultural home of classical music — Mozart, Strauss and the Vienna Philharmonic.",
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
    benefits: [
      "Walk through imperial Vienna and historic Salzburg",
      "Ski or hike across the Austrian Alps",
      "Enjoy classical music, opera and coffee-house culture",
      "Schengen visa covers all 29 member countries",
    ],
    pros: SCHENGEN_PROS,
    cons: SCHENGEN_CONS,
  },
  {
    slug: "italy",
    name: "Italy",
    code: "it",
    tagline: "Cuisine, art and timeless cities",
    intro:
      "Italy's Schengen visa unlocks Rome, Venice, Florence and beyond. We handle your file end-to-end so your trip starts stress-free.",
    about:
      "Italy is a Mediterranean country shaped by ancient Rome and the Renaissance. Highlights include Rome, Venice, Florence, the Amalfi Coast, the Italian lakes and the islands of Sicily and Sardinia — plus globally loved food and wine.",
    capital: "Rome",
    currency: "Euro (EUR)",
    language: "Italian",
    processingTime: "15 – 30 days",
    visas: [
      { type: "Tourist Visa", description: "Schengen visa for sightseeing and leisure." },
      { type: "Family Visa", description: "Visit family or friends in Italy." },
    ],
    requirements: SCHENGEN_CHECKLIST,
    benefits: [
      "Visit Rome, Venice, Florence and the Amalfi Coast",
      "Experience world-renowned Italian food, wine and gelato",
      "Discover Renaissance art in Florence and ancient ruins in Pompeii",
      "Schengen visa unlocks 28 additional countries",
    ],
    pros: SCHENGEN_PROS,
    cons: SCHENGEN_CONS,
  },
  {
    slug: "usa",
    name: "USA",
    code: "us",
    tagline: "Across the Atlantic",
    intro:
      "United States visit visas (B1/B2) require careful preparation and a confident interview. Explore new places, experience the diverse American culture, and enjoy the legal permission to stay for your trip — our team handles documentation, DS-160 and interview prep.",
    about:
      "The United States spans 50 states across a continent, from the skylines of New York and Los Angeles to the canyons of Arizona, the beaches of Florida and the national parks of the West. It is one of the world's most diverse travel destinations.",
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
    benefits: [
      "Visit New York, Las Vegas, Los Angeles, Miami and Disney",
      "Explore Grand Canyon, Yellowstone and other national parks",
      "B1/B2 typically issued for up to 10 years, multiple-entry",
      "Stay up to 180 days per visit (as granted at the border)",
    ],
    pros: [
      "Long validity — often 10-year multiple-entry visa",
      "Generous stay length per entry",
      "Visa decision usually given at the interview itself",
    ],
    cons: [
      "Mandatory in-person interview at the US Embassy",
      "Stronger proof of home ties and finances required",
      "Refusals under section 214(b) are common without proper prep",
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    code: "ca",
    tagline: "Visit the Great White North",
    intro:
      "A Canada visitor visa lets you explore Canada's beautiful landscapes and iconic attractions, experience the diverse culture and local cuisine, and enjoy sightseeing and outdoor adventures with legal permission to stay.",
    about:
      "Canada is the world's second-largest country, stretching from the Atlantic to the Pacific and into the Arctic. Highlights include Toronto, Vancouver, Montreal, the Rocky Mountains, Niagara Falls and the Northern Lights.",
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
    benefits: [
      "Explore Canada's beautiful landscapes and iconic attractions",
      "See the Rockies, Niagara Falls and the Northern Lights",
      "Multiple-entry visas typically issued for up to 10 years",
      "Stay up to 6 months per entry as decided at the border",
    ],
    pros: [
      "Multiple-entry visas commonly issued for up to 10 years",
      "No interview required for most applicants",
      "Online IRCC application with clear document checklist",
    ],
    cons: [
      "Biometrics enrolment required in person at VFS",
      "Processing times can stretch to 6–8 weeks",
      "Strong proof of funds and home ties required",
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    code: "au",
    tagline: "Iconic landscapes Down Under",
    intro:
      "Explore Australia's famous landmarks, experience its diverse culture and local foods, and enjoy local events and festivals — all with the peace of mind that comes from a properly prepared Subclass 600 visitor visa.",
    about:
      "Australia is both a country and a continent, with iconic cities like Sydney and Melbourne, the Great Barrier Reef, the Outback and Uluru. It's known for beaches, wildlife, wine regions and a relaxed outdoor lifestyle.",
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
    benefits: [
      "Visit Sydney Opera House, Bondi Beach and the Great Barrier Reef",
      "Explore the Outback, Uluru and Australia's national parks",
      "Multi-entry visas often valid for up to 3 years",
      "Stay up to 3, 6 or 12 months per entry depending on grant",
    ],
    pros: [
      "Fully online application via ImmiAccount",
      "Multiple-entry visas with long validity available",
      "No in-person interview for most applicants",
    ],
    cons: [
      "Health checks may be requested, adding time and cost",
      "Strong proof of funds and ties to home country required",
      "Refusals are difficult to appeal once issued",
    ],
  },
  {
    slug: "morocco",
    name: "Morocco",
    code: "ma",
    tagline: "Markets, deserts and ancient cities",
    intro:
      "Morocco welcomes visitors for tourism and business. We assist with documentation, embassy submissions and approvals.",
    about:
      "Morocco sits where Europe, Africa and the Arab world meet, with imperial cities like Marrakech and Fez, Atlantic and Mediterranean coastlines, and the Sahara Desert. Souks, riads and mint tea define the experience.",
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
    benefits: [
      "Explore Marrakech's medina, Fez's old city and Chefchaouen",
      "Camp under the stars in the Sahara Desert",
      "Affordable food, accommodation and travel costs",
      "Short flight times from the UK and Europe",
    ],
    pros: [
      "Relatively quick processing compared to Schengen",
      "Strong tourism infrastructure and English-friendly services",
      "Visa-on-arrival eligibility for many nationalities",
    ],
    cons: [
      "Documentation requirements vary by consulate",
      "Limited appointment slots during peak travel season",
      "Religious and cultural rules apply for travellers",
    ],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    code: "nz",
    tagline: "Adventure and natural beauty",
    intro:
      "New Zealand visitor visas open up dramatic landscapes and unique experiences. We prepare your application with care.",
    about:
      "New Zealand is two main islands in the South Pacific, famous for fjords, glaciers, geothermal areas and rolling green countryside. Auckland, Wellington and Queenstown are its key hubs and the country is a global capital for outdoor adventure.",
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
    benefits: [
      "Experience Milford Sound, Queenstown and the Bay of Islands",
      "Outdoor adventures — hiking, skiing, bungee jumping",
      "Multi-entry visitor visas typically valid for up to 3 years",
      "Visit Lord of the Rings and Hobbiton filming locations",
    ],
    pros: [
      "Fully online application via Immigration New Zealand",
      "Multi-entry visas commonly issued",
      "Visitor visa can include up to 9 months total stay",
    ],
    cons: [
      "Application fee is relatively high",
      "Processing can take 4–6 weeks",
      "Strong evidence of funds and return intent required",
    ],
  },
  {
    slug: "ireland",
    name: "Ireland",
    code: "ie",
    tagline: "Emerald Isle warmth",
    intro:
      "Ireland short-stay visas cover tourism and family visits. We help you assemble a complete, well-presented file.",
    about:
      "Ireland is famous for green countryside, dramatic Atlantic coastlines like the Cliffs of Moher and friendly cities such as Dublin, Galway and Cork. It's the home of Guinness, traditional Irish music and centuries of literary heritage.",
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
    benefits: [
      "Discover Dublin, Galway and the Cliffs of Moher",
      "Drive the Wild Atlantic Way and the Ring of Kerry",
      "Experience Irish pub culture, music and warm hospitality",
      "British-Irish Visa Scheme can allow onward travel to the UK",
    ],
    pros: [
      "Online AVATS application with clear instructions",
      "British-Irish Visa Scheme eligibility for some applicants",
      "English-speaking country with strong tourist infrastructure",
    ],
    cons: [
      "Not part of Schengen — separate visa required",
      "Processing times can stretch to 8 weeks",
      "Detailed financial and employment evidence required",
    ],
  },
  {
    slug: "japan",
    name: "Japan",
    code: "jp",
    tagline: "Tradition meets modernity",
    intro:
      "Japan tourist and business visas need careful documentation. We prepare your file with precision for smooth approval.",
    about:
      "Japan blends ancient temples and tea ceremonies with neon-lit cities like Tokyo and Osaka. Highlights include Kyoto's shrines, Mount Fuji, the cherry blossom season and the world-class bullet train (Shinkansen) network.",
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
    benefits: [
      "Experience Tokyo, Kyoto, Osaka and Mount Fuji",
      "See the cherry blossoms (sakura) or autumn foliage seasons",
      "Travel rapidly across the country on the Shinkansen",
      "Discover Japanese cuisine — sushi, ramen, kaiseki",
    ],
    pros: [
      "Fast processing — often within a week",
      "Single and multi-entry options available",
      "Highly safe, efficient and tourist-friendly destination",
    ],
    cons: [
      "Detailed day-by-day itinerary is mandatory",
      "Language barrier outside major cities",
      "Stay limited to 15, 30 or 90 days depending on grant",
    ],
  },
  {
    slug: "south-africa",
    name: "South Africa",
    code: "za",
    tagline: "Safari and stunning coastlines",
    intro:
      "South Africa visitor visas cover tourism and business. We handle embassy and VFS submissions on your behalf.",
    about:
      "South Africa is famous for safari wildlife, Table Mountain, the Cape Winelands and the Garden Route. Cape Town and Johannesburg are key hubs and Kruger National Park is one of the world's premier safari destinations.",
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
    benefits: [
      "Go on safari in Kruger National Park",
      "Visit Cape Town, Table Mountain and the Cape Winelands",
      "Drive the spectacular Garden Route along the coast",
      "Favourable exchange rate keeps travel costs low",
    ],
    pros: [
      "Fast processing — often under two weeks",
      "Visa-free entry for several nationalities",
      "Strong tourism infrastructure",
    ],
    cons: [
      "Yellow fever certificate required from at-risk countries",
      "Personal safety precautions advised in some cities",
      "Documentation requirements vary by mission",
    ],
  },
  {
    slug: "turkey",
    name: "Turkey",
    code: "tr",
    tagline: "Where continents meet",
    intro:
      "Turkey is a popular destination for tourism and family visits. We assist with eVisa and consular applications.",
    about:
      "Turkey spans Europe and Asia, with Istanbul straddling the Bosphorus, Cappadocia's hot-air balloons, Pamukkale's terraces and the beaches of Antalya. It blends Byzantine, Ottoman and modern influences.",
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
    benefits: [
      "Explore Istanbul, Cappadocia and the Turquoise Coast",
      "Hot-air balloon rides over Cappadocia's fairy chimneys",
      "Affordable luxury hotels, food and shopping",
      "eVisa option for fast online approval",
    ],
    pros: [
      "Fast eVisa approval — often within 24 hours",
      "Inexpensive flights from the UK and Europe",
      "Strong tourism infrastructure across the country",
    ],
    cons: [
      "eVisa not available for all purposes — consular visa needed for longer stays",
      "Exchange rate volatility can affect budgeting",
      "Some regions are not recommended for tourism",
    ],
  },
  {
    slug: "singapore",
    name: "Singapore",
    code: "sg",
    tagline: "Global business gateway",
    intro:
      "Singapore visitor visas cover tourism and business. We prepare your application with full sponsor documentation.",
    about:
      "Singapore is a city-state at the tip of the Malay Peninsula, famous for its skyline, Marina Bay Sands, hawker food and ultra-efficient public transport. It's one of the safest and most-visited business hubs in Asia.",
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
    benefits: [
      "Visit Marina Bay Sands, Gardens by the Bay and Sentosa",
      "Famous hawker food culture and Michelin-starred street food",
      "Ranked among the safest and cleanest cities in the world",
      "Major hub for onward travel across Southeast Asia",
    ],
    pros: [
      "Very fast processing — typically within a week",
      "English widely spoken across all services",
      "Multi-entry visas available for frequent visitors",
    ],
    cons: [
      "Local sponsor (LOI) often required for certain nationalities",
      "Cost of living is one of the highest in Asia",
      "Stays generally limited to 30 days per entry",
    ],
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    code: "my",
    tagline: "Tropical diversity",
    intro:
      "Malaysia offers tourism and business visas with straightforward processing. We handle your application end-to-end.",
    about:
      "Malaysia is a Southeast Asian country split between the Malay Peninsula and Borneo, with Kuala Lumpur's Petronas Towers, the beaches of Langkawi, the rainforests of Borneo and a rich multicultural cuisine.",
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
    benefits: [
      "Explore Kuala Lumpur, Penang, Langkawi and Borneo",
      "Affordable food, accommodation and travel costs",
      "Rich multicultural cuisine — Malay, Chinese, Indian",
      "Visa-free entry for many nationalities",
    ],
    pros: [
      "eVisa available for many countries",
      "Fast processing — typically under a week",
      "English widely spoken across major cities",
    ],
    cons: [
      "Stay typically limited to 30 days per entry",
      "Documentation varies between visa types",
      "Tropical weather and monsoon season planning required",
    ],
  },
  {
    slug: "thailand",
    name: "Thailand",
    code: "th",
    tagline: "Beaches, temples and culture",
    intro:
      "Thailand tourist and family visas are a popular choice. We make the application process smooth from start to finish.",
    about:
      "Thailand is famous for tropical beaches, ornate Buddhist temples and street food. Bangkok, Chiang Mai, Phuket and Koh Samui are the headline destinations, alongside elephant sanctuaries and lush jungles.",
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
    benefits: [
      "Relax on beaches in Phuket, Krabi and Koh Samui",
      "Visit Bangkok's Grand Palace and Chiang Mai's temples",
      "Famous Thai cuisine and street food culture",
      "Affordable luxury hotels and spa experiences",
    ],
    pros: [
      "eVisa available with fast online processing",
      "Long-stay options available for tourism",
      "Low overall travel and accommodation costs",
    ],
    cons: [
      "Proof of funds (~20,000 THB) required at entry",
      "Visa extensions require in-country immigration visits",
      "Monsoon season may affect island travel",
    ],
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return COUNTRIES.find((c) => c.slug === slug);
}
