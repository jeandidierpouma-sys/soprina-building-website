// Contenu repris tel quel du dépliant SOPRINA BUILDING (pdftotext -layout)
// — même texte, aucune reformulation, seulement structuré pour le web.

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "Qui sommes-nous" },
  { href: "/domaines", label: "Domaines d'expertise" },
  { href: "/secteurs", label: "Secteurs" },
  { href: "/methode", label: "Notre méthode" },
  { href: "/contact", label: "Contact" },
] as const;

export const DOMAINS = [
  {
    n: "01",
    title: "Construction & Génie Civil",
    desc: "Des solutions complètes pour des ouvrages solides, durables et conformes aux exigences de qualité.",
    tags: [
      "Terrassement",
      "Gros œuvre",
      "Maçonnerie",
      "Plomberie sanitaire",
      "Étanchéité",
      "Carrelage",
      "Ascenseurs",
    ],
    icon: "/images/p4_c1.png",
    img: "/images/p5_photo_clean.jpg",
  },
  {
    n: "02",
    title: "Aménagement & Rénovation",
    desc: "Nous créons des espaces fonctionnels, esthétiques et cohérents adaptés à vos usages et à vos besoins.",
    tags: [
      "Peinture",
      "Menuiserie",
      "Menuiserie métallique",
      "Climatisation",
      "Revêtements de sols",
      "Mobilier professionnel",
    ],
    icon: "/images/p4_c2.png",
    img: "/images/p6_photos.jpg",
  },
  {
    n: "03",
    title: "Électricité & Énergie",
    desc: "Des installations fiables, sécurisées et performantes pour alimenter et optimiser vos activités.",
    tags: [
      "Installations électriques",
      "Tableaux électriques",
      "Éclairage",
      "Groupes électrogènes",
      "Énergie solaire",
      "Maintenance électrique",
    ],
    icon: "/images/p4_c3.png",
    img: "/images/p7_photos.jpg",
  },
  {
    n: "04",
    title: "Smart Building & Sécurité",
    desc: "Des technologies intelligentes pour sécuriser vos espaces et améliorer la gestion de vos bâtiments.",
    tags: [
      "Vidéosurveillance",
      "Contrôle d'accès & biométrie",
      "Portails automatiques",
      "Automatisation des bâtiments",
      "Réseaux informatiques",
      "Téléphonie IP & serveurs",
      "Alarmes incendie & sécurité",
    ],
    icon: "/images/p4_c4.png",
    img: "/images/p8_photos.jpg",
  },
  {
    n: "05",
    title: "Climatisation & Froid",
    desc: "Des solutions conçues pour le confort thermique et la préservation de vos produits.",
    tags: [
      "Climatisation",
      "Chambres froides",
      "Groupes frigorifiques",
      "Systèmes VRV / VRF",
      "Espaces professionnels",
    ],
    icon: "/images/p4_c5.png",
    img: "/images/p9_hero.jpg",
  },
  {
    n: "06",
    title: "Maintenance & Facility Solutions",
    desc: "Nous assurons la performance et la durabilité de vos installations grâce à des services de maintenance préventive et corrective.",
    tags: [
      "Maintenance préventive",
      "Maintenance corrective",
      "Maintenance industrielle",
      "Groupes électrogènes",
      "Ascenseurs",
      "Installations électriques",
      "Climatisation",
      "Froid",
      "Plomberie",
      "Sécurité",
      "Gestion technique",
    ],
    icon: "/images/p4_c6.png",
    img: "/images/p10_photo.jpg",
  },
  {
    n: "07",
    title: "Fourniture de matériaux et équipements professionnels",
    desc: "Nous sélectionnons et approvisionnons des matériaux et équipements fiables, adaptés aux exigences de chaque projet, avec une attention constante portée à la qualité, à la disponibilité et à la conformité.",
    tags: [
      "Matériaux de construction",
      "Menuiserie",
      "Équipements électriques",
      "HVAC & froid",
      "Outillage",
      "Sécurité",
      "EPI",
      "Mobilier professionnel",
      "Sanitaires",
    ],
    icon: "/images/p4_c7.png",
    img: "/images/p11_photo.jpg",
  },
] as const;

export const SECTORS = [
  { name: "Entreprises", img: "/images/sector_entreprises.jpg" },
  { name: "Banques", img: "/images/sector_banques.jpg" },
  { name: "Hôtels", img: "/images/sector_hotels.jpg" },
  { name: "Industries", img: "/images/sector_industries.jpg" },
  { name: "Écoles & Universités", img: "/images/sector_ecoles.jpg" },
  { name: "Administrations", img: "/images/sector_administrations.jpg" },
  { name: "Institutions", img: "/images/sector_institutions.jpg" },
  { name: "Commerces", img: "/images/sector_commerces.jpg" },
  { name: "Centres médicaux", img: "/images/sector_medical.jpg" },
] as const;

export const METHOD_STEPS = [
  {
    n: "01",
    title: "Écouter",
    desc: "Nous comprenons vos besoins, vos priorités et vos contraintes.",
  },
  {
    n: "02",
    title: "Étudier",
    desc: "Nous analysons le site, les plans et les exigences techniques.",
  },
  {
    n: "03",
    title: "Proposer",
    desc: "Nous construisons une solution claire, adaptée et maîtrisée.",
  },
  {
    n: "04",
    title: "Réaliser",
    desc: "Nous exécutons les travaux avec rigueur et coordination.",
  },
  {
    n: "05",
    title: "Contrôler",
    desc: "Nous vérifions la qualité, la conformité et la performance.",
  },
] as const;

export const ENGAGEMENTS = [
  { n: "01", title: "Qualité" },
  { n: "02", title: "Sécurité" },
  { n: "03", title: "Réactivité" },
  { n: "04", title: "Responsabilité" },
] as const;

export const WHY_US = [
  "Expertise & expérience",
  "Solutions intégrées",
  "Qualité des matériaux",
  "Respect des délais",
  "Accompagnement durable",
] as const;

export const CONTACT = {
  address: "Douala – Bonanjo, situé près de Kenya Airways",
  phones: ["+237 690 140 170", "+237 641 240 115", "+237 677 596 444"],
  email: "info.soprinabuilding@gmail.com",
  whatsapp: "https://wa.me/237677596444",
} as const;

// Réseaux sociaux réels de SOPRINA BUILDING SARL (fournis par le client).
export const SOCIALS = [
  { name: "WhatsApp", href: "https://wa.me/237677596444", icon: "whatsapp" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61592677316511", icon: "facebook" },
  { name: "Instagram", href: "https://www.instagram.com/soprinabuildingsarl/", icon: "instagram" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/soprina-building-sarl/", icon: "linkedin" },
  { name: "X", href: "https://x.com/soprinabuilding", icon: "x" },
  { name: "Threads", href: "https://www.threads.com/@soprinabuildingsarl", icon: "threads" },
] as const;

// --- Contenu page "Qui sommes-nous" (pages 2-3 du dépliant) ---

export const ABOUT_INTRO = {
  paragraphs: [
    "SOPRINA BUILDING accompagne ses clients dans la réalisation de projets de construction performants, de la conception à la livraison.",
    "Nos équipes associent maîtrise technique, rigueur d'exécution et compréhension fine des enjeux de chaque chantier.",
    "Nous intervenons en construction, ingénierie, aménagement, installations techniques et maintenance afin d'apporter une réponse globale et cohérente.",
    "Notre engagement repose sur la qualité, la sécurité et la durabilité, avec un accompagnement fiable à chaque étape du projet.",
  ],
  badges: [
    { title: "Professionnalisme", img: "/images/p2_badge1.png" },
    { title: "Expertise", img: "/images/p2_badge2.png" },
    { title: "Solutions innovantes et durables", img: "/images/p2_badge3.png" },
    { title: "Accompagnement sur le long terme", img: "/images/p2_badge4.png" },
  ],
} as const;

export const AMBITION = {
  title: "Notre ambition",
  text: "Être le partenaire de référence en Afrique centrale pour des solutions complètes et intégrées dans le bâtiment, l'ingénierie et la gestion technique.",
} as const;

// --- FAQ page "Devis" ---
// Statut : IMPLEMENTED. Chaque réponse s'appuie uniquement sur des
// informations déjà présentes ailleurs sur le site (domaines, méthode,
// adresse, canaux de contact) — aucun chiffre ni délai n'est inventé.
export const FAQ_ITEMS = [
  {
    q: "Comment obtenir un devis ?",
    a: "Décrivez votre projet dans le formulaire ci-dessous, ou contactez-nous directement par téléphone, WhatsApp ou e-mail. Nous revenons vers vous pour échanger sur votre besoin avant de vous proposer une solution adaptée.",
  },
  {
    q: "Quelles informations dois-je préparer ?",
    a: "Le type de travaux envisagés, la localisation du site et, si possible, des plans ou photos existants. Cela nous permet d'analyser le site et les exigences techniques avec plus de précision dès l'étape \"Étudier\" de notre méthode.",
  },
  {
    q: "Quels types de projets prenez-vous en charge ?",
    a: "Construction & génie civil, aménagement & rénovation, électricité & énergie, smart building & sécurité, climatisation & froid, maintenance & facility solutions, ainsi que la fourniture de matériaux et équipements — pour les entreprises, banques, hôtels, industries, écoles, administrations et plusieurs autres secteurs.",
  },
  {
    q: "Où intervenez-vous ?",
    a: "Nous sommes basés à Douala – Bonanjo, près de Kenya Airways. Contactez-nous avec la localisation de votre projet pour confirmer notre couverture.",
  },
  {
    q: "Comment se déroule un projet avec SOPRINA BUILDING ?",
    a: "Notre méthode suit 5 étapes claires : écouter vos besoins, étudier le site et les plans, proposer une solution adaptée, réaliser les travaux avec rigueur, puis contrôler la qualité et la conformité.",
  },
] as const;
