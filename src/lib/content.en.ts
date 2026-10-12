// English content — mirrors src/lib/content.ts (shape, images, ordering).
// Statut : PARTIAL/TESTED, pas AUDITED. Traduction fidèle du contenu FR
// déjà validé (même structure, même sens), réalisée le 2026-10-10. Les
// pages mentions-legales/confidentialite en anglais restent à faire
// relire par un professionnel avant publication officielle : certains
// termes juridiques camerounais (RCCM, NIU, SARL) n'ont pas d'équivalent
// anglais strict et sont ici transcrits/expliqués plutôt que traduits.
// CONTACT, SOCIALS et toutes les images restent partagés avec content.ts
// (non dupliqués ici) : seul le texte change entre les deux langues.

export const NAV_LINKS_EN = [
  { href: "/en", label: "Home" },
  { href: "/en/a-propos", label: "About us" },
  { href: "/en/domaines", label: "Expertise" },
  { href: "/en/realisations", label: "Projects" },
  { href: "/en/actualites", label: "News" },
  { href: "/en/secteurs", label: "Sectors" },
  { href: "/en/methode", label: "Our method" },
  { href: "/en/contact", label: "Contact" },
] as const;

export const DOMAINS_EN = [
  {
    n: "01",
    title: "Construction & Civil Engineering",
    desc: "Complete solutions for solid, durable structures that meet quality requirements.",
    tags: [
      "Earthworks",
      "Shell & structure",
      "Masonry",
      "Plumbing",
      "Waterproofing",
      "Tiling",
      "Elevators",
    ],
    icon: "/images/p4_c1.png",
    img: "/images/p5_photo_clean.jpg",
  },
  {
    n: "02",
    title: "Fit-Out & Renovation",
    desc: "We create functional, attractive, coherent spaces tailored to your needs and how you use them.",
    tags: [
      "Painting",
      "Carpentry",
      "Metal joinery",
      "Air conditioning",
      "Flooring",
      "Professional furniture",
    ],
    icon: "/images/p4_c2.png",
    img: "/images/p6_photos.jpg",
  },
  {
    n: "03",
    title: "Electricity & Power",
    desc: "Reliable, secure, high-performance installations to power and optimize your operations.",
    tags: [
      "Electrical installations",
      "Switchboards",
      "Lighting",
      "Generators",
      "Solar power",
      "Electrical maintenance",
    ],
    icon: "/images/p4_c3.png",
    img: "/images/p7_photos.jpg",
  },
  {
    n: "04",
    title: "Smart Building & Security",
    desc: "Smart technologies to secure your spaces and improve how your buildings are managed.",
    tags: [
      "CCTV",
      "Access control & biometrics",
      "Automatic gates",
      "Building automation",
      "IT networks",
      "IP telephony & servers",
      "Fire & security alarms",
    ],
    icon: "/images/p4_c4.png",
    img: "/images/p8_photos.jpg",
  },
  {
    n: "05",
    title: "Air Conditioning & Cold Rooms",
    desc: "Solutions designed for thermal comfort and for preserving your goods.",
    tags: [
      "Air conditioning",
      "Cold rooms",
      "Refrigeration units",
      "VRV / VRF systems",
      "Commercial spaces",
    ],
    icon: "/images/p4_c5.png",
    img: "/images/p9_hero.jpg",
  },
  {
    n: "06",
    title: "Maintenance & Facility Solutions",
    desc: "We ensure the performance and longevity of your installations through preventive and corrective maintenance.",
    tags: [
      "Preventive maintenance",
      "Corrective maintenance",
      "Industrial maintenance",
      "Generators",
      "Elevators",
      "Electrical installations",
      "Air conditioning",
      "Cold rooms",
      "Plumbing",
      "Security",
      "Technical management",
    ],
    icon: "/images/p4_c6.png",
    img: "/images/p10_photo.jpg",
  },
  {
    n: "07",
    title: "Professional Materials & Equipment Supply",
    desc: "We select and supply reliable materials and equipment suited to each project's requirements, with constant attention to quality, availability and compliance.",
    tags: [
      "Construction materials",
      "Carpentry",
      "Electrical equipment",
      "HVAC & refrigeration",
      "Tools",
      "Security",
      "PPE",
      "Professional furniture",
      "Sanitary ware",
    ],
    icon: "/images/p4_c7.png",
    img: "/images/p11_photo.jpg",
  },
] as const;

export const SUPPLY_CHAIN_EN = {
  title: "Our international sourcing network",
  text: "Through our international network, we give you access to materials, equipment and solutions that meet international standards.",
  badges: ["Quality control", "Certified products", "Best prices", "Secure delivery"],
  img: "/images/p12_photo_clean.jpg",
} as const;

// Vidéo : voir le commentaire au-dessus de REALISATIONS dans content.ts
// (même logique `video`/`videoUrl`, synchronisée manuellement ici tant que
// cette liste reste codée en dur).
export const REALISATIONS_EN = [
  {
    slug: "villa-contemporaine",
    title: "Contemporary villa",
    category: "Construction & Civil Engineering",
    img: "/images/realisations/projet-01-villa-contemporaine.jpg",
    gallery: undefined as string[] | undefined,
    video: undefined as string | undefined,
    videoUrl: undefined as string | undefined,
  },
  {
    slug: "amenagement-cuisine",
    title: "Interior fit-out — kitchen & living room",
    category: "Fit-Out & Renovation",
    img: "/images/realisations/projet-02-amenagement-cuisine.jpg",
    gallery: undefined as string[] | undefined,
    video: undefined as string | undefined,
    videoUrl: undefined as string | undefined,
  },
  {
    slug: "villa-piscine",
    title: "Villa with pool",
    category: "Construction & Civil Engineering",
    img: "/images/realisations/projet-03-villa-piscine.jpg",
    gallery: undefined as string[] | undefined,
    video: undefined as string | undefined,
    videoUrl: undefined as string | undefined,
  },
  {
    slug: "chantier-genie-civil",
    title: "Site in progress",
    category: "Construction & Civil Engineering",
    img: "/images/realisations/projet-04-chantier-genie-civil.jpg",
    gallery: undefined as string[] | undefined,
    video: undefined as string | undefined,
    videoUrl: undefined as string | undefined,
  },
] as const;

export const SECTORS_EN = [
  { name: "Businesses", img: "/images/sector_entreprises.jpg" },
  { name: "Banks", img: "/images/sector_banques.jpg" },
  { name: "Hotels", img: "/images/sector_hotels.jpg" },
  { name: "Industries", img: "/images/sector_industries.jpg" },
  { name: "Schools & universities", img: "/images/sector_ecoles.jpg" },
  { name: "Government offices", img: "/images/sector_administrations.jpg" },
  { name: "Institutions", img: "/images/sector_institutions.jpg" },
  { name: "Retail", img: "/images/sector_commerces.jpg" },
  { name: "Medical centers", img: "/images/sector_medical.jpg" },
] as const;

export const METHOD_STEPS_EN = [
  {
    n: "01",
    title: "Listen",
    desc: "We understand your needs, priorities and constraints.",
  },
  {
    n: "02",
    title: "Assess",
    desc: "We analyze the site, the plans and the technical requirements.",
  },
  {
    n: "03",
    title: "Propose",
    desc: "We build a clear, tailored, well-controlled solution.",
  },
  {
    n: "04",
    title: "Execute",
    desc: "We carry out the work with rigor and coordination.",
  },
  {
    n: "05",
    title: "Check",
    desc: "We verify quality, compliance and performance.",
  },
] as const;

export const ENGAGEMENTS_EN = [
  { n: "01", title: "Quality" },
  { n: "02", title: "Safety" },
  { n: "03", title: "Responsiveness" },
  { n: "04", title: "Accountability" },
] as const;

export const WHY_US_EN = [
  "Expertise & experience",
  "Integrated solutions",
  "Quality materials",
  "On-time delivery",
  "Long-term support",
] as const;

export const ABOUT_INTRO_EN = {
  paragraphs: [
    "SOPRINA BUILDING supports its clients in delivering high-performing construction projects, from design through to handover.",
    "Our teams combine technical mastery, rigorous execution and a precise understanding of each project's challenges.",
    "We work across construction, engineering, fit-out, technical installations and maintenance to provide a comprehensive, coherent response.",
    "Our commitment is built on quality, safety and durability, with reliable support at every stage of the project.",
  ],
  badges: [
    { title: "Professionalism", img: "/images/p2_badge1.png" },
    { title: "Expertise", img: "/images/p2_badge2.png" },
    { title: "Innovative, sustainable solutions", img: "/images/p2_badge3.png" },
    { title: "Long-term support", img: "/images/p2_badge4.png" },
  ],
} as const;

export const AMBITION_EN = {
  title: "Our ambition",
  text: "To be the reference partner in Central Africa for complete, integrated solutions in construction, engineering and technical management.",
} as const;

export const FAQ_ITEMS_EN = [
  {
    q: "How do I get a quote?",
    a: "Describe your project in the form below, or contact us directly by phone, WhatsApp or e-mail. We'll get back to you to discuss your needs before proposing a tailored solution.",
  },
  {
    q: "What information should I prepare?",
    a: "The type of work you're planning, the site location and, if possible, existing plans or photos. This lets us analyze the site and technical requirements more precisely from the \"Assess\" step of our method onward.",
  },
  {
    q: "What types of projects do you handle?",
    a: "Construction & civil engineering, fit-out & renovation, electricity & power, smart building & security, air conditioning & cold rooms, maintenance & facility solutions, as well as materials and equipment supply — for businesses, banks, hotels, industries, schools, government offices and several other sectors.",
  },
  {
    q: "Where do you operate?",
    a: "We are based in Douala – Bonanjo, near Kenya Airways. Contact us with your project location to confirm coverage.",
  },
  {
    q: "How does a project with SOPRINA BUILDING unfold?",
    a: "Our method follows 5 clear steps: listening to your needs, assessing the site and plans, proposing a tailored solution, executing the work with rigor, then checking quality and compliance.",
  },
] as const;
