// Contenu repris tel quel du dépliant SOPRINA BUILDING (pdftotext -layout)
// — même texte, aucune reformulation, seulement structuré pour le web.

// "Actualités" ajouté le 2026-10-10 avec le CMS Sanity (Lot 3) — géré par
// SiteHeader/SiteFooter comme les autres entrées, aucun code supplémentaire.
export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "Qui sommes-nous" },
  { href: "/domaines", label: "Domaines d'expertise" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/actualites", label: "Actualités" },
  { href: "/secteurs", label: "Secteurs" },
  { href: "/methode", label: "Notre méthode" },
  { href: "/contact", label: "Contact" },
] as const;

// --- Galerie "Réalisations" ---
// Statut : PARTIAL. Chantiers réels (confirmé par le client le 2026-10-10),
// pas des visuels stock. Champs volontairement absents (lieu précis,
// surface, délais, budget) : non fournis/non validés à ce stade — à
// compléter projet par projet plutôt qu'à inventer.
// Images : fichiers HD fournis par le client le 2026-10-10 (≈1600×660px),
// remplacent le recadrage basse résolution utilisé en premier jet depuis
// le flyer marketing. Mêmes noms de fichiers (projet-0X-...), donc aucun
// changement de structure nécessaire ailleurs dans le code.
//
// Vidéo (ajoutée le 2026-10-12, MISSING tant qu'aucun fichier/lien n'est
// fourni) : deux champs optionnels, un seul doit être rempli par projet.
// - `video` : chemin local vers un clip auto-hébergé, ex.
//   "/videos/projet-01-villa-contemporaine.mp4". Réservé aux clips COURTS
//   et COMPRESSÉS (≲20-30 Mo, h264/mp4) — un fichier plus lourd alourdit le
//   dépôt git et la bande passante Vercel. Le fichier doit être déposé
//   directement dans public/videos/ (jamais envoyé via patch git : les
//   patches ne sont pas faits pour du binaire volumineux).
// - `videoUrl` : identifiant de vidéo YouTube (ex. "dQw4w9WgXcQ", pas l'URL
//   complète) pour un clip plus long — nécessite une chaîne YouTube pour
//   l'entreprise. Chargée en lazy (facade cliquable), jamais au chargement
//   de la page.
// Si les deux sont absents (`undefined`), la carte affiche la photo
// principale comme avant — aucune régression pour les projets sans vidéo.
//
// Galerie défilante (ajoutée le 2026-10-12) : `gallery` est un tableau
// optionnel de photos supplémentaires (chemins locaux), affichées à la
// suite de la photo principale dans une bande qui défile horizontalement
// (swipe mobile, flèches au survol sur desktop). La vidéo, si présente,
// vient toujours en dernier dans la bande. Avec un seul média (cas actuel
// des 4 projets ci-dessous), aucune flèche ni défilement n'apparaît —
// rendu identique à avant.
export const REALISATIONS = [
  {
    slug: "villa-contemporaine",
    title: "Villa contemporaine",
    category: "Construction & Génie Civil",
    img: "/images/realisations/projet-01-villa-contemporaine.jpg",
    gallery: undefined as string[] | undefined,
    video: undefined as string | undefined,
    videoUrl: undefined as string | undefined,
    // Slider avant/après (ajouté le 2026-10-12, MISSING tant qu'aucune
    // paire n'est fournie) : les deux champs doivent être renseignés
    // ensemble pour que le slider s'affiche (voir before-after-slider.tsx).
    // Nécessite l'accord du client avant toute publication de photos
    // "avant travaux" d'un chantier.
    beforeImg: undefined as string | undefined,
    afterImg: undefined as string | undefined,
  },
  {
    slug: "amenagement-cuisine",
    title: "Aménagement intérieur — cuisine & séjour",
    category: "Aménagement & Rénovation",
    img: "/images/realisations/projet-02-amenagement-cuisine.jpg",
    gallery: undefined as string[] | undefined,
    video: undefined as string | undefined,
    videoUrl: undefined as string | undefined,
    // Slider avant/après (ajouté le 2026-10-12, MISSING tant qu'aucune
    // paire n'est fournie) : les deux champs doivent être renseignés
    // ensemble pour que le slider s'affiche (voir before-after-slider.tsx).
    // Nécessite l'accord du client avant toute publication de photos
    // "avant travaux" d'un chantier.
    beforeImg: undefined as string | undefined,
    afterImg: undefined as string | undefined,
  },
  {
    slug: "villa-piscine",
    title: "Villa avec piscine",
    category: "Construction & Génie Civil",
    img: "/images/realisations/projet-03-villa-piscine.jpg",
    gallery: undefined as string[] | undefined,
    video: undefined as string | undefined,
    videoUrl: undefined as string | undefined,
    // Slider avant/après (ajouté le 2026-10-12, MISSING tant qu'aucune
    // paire n'est fournie) : les deux champs doivent être renseignés
    // ensemble pour que le slider s'affiche (voir before-after-slider.tsx).
    // Nécessite l'accord du client avant toute publication de photos
    // "avant travaux" d'un chantier.
    beforeImg: undefined as string | undefined,
    afterImg: undefined as string | undefined,
  },
  {
    slug: "chantier-genie-civil",
    title: "Chantier en cours",
    category: "Construction & Génie Civil",
    img: "/images/realisations/projet-04-chantier-genie-civil.jpg",
    gallery: undefined as string[] | undefined,
    video: undefined as string | undefined,
    videoUrl: undefined as string | undefined,
    // Slider avant/après (ajouté le 2026-10-12, MISSING tant qu'aucune
    // paire n'est fournie) : les deux champs doivent être renseignés
    // ensemble pour que le slider s'affiche (voir before-after-slider.tsx).
    // Nécessite l'accord du client avant toute publication de photos
    // "avant travaux" d'un chantier.
    beforeImg: undefined as string | undefined,
    afterImg: undefined as string | undefined,
  },
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

// --- Bloc "Notre approvisionnement international" (page 12 du catalogue) ---
// Statut : NOUVEAU — absent du premier catalogue fourni, présent dans la
// version la plus récente (audit du 2026-10-10). Rattaché au domaine 07
// (Fourniture de matériaux et équipements professionnels). Visuel existant
// (p12_photo.jpg) déjà présent dans /public/images mais jamais utilisé
// jusqu'ici dans le code.
export const SUPPLY_CHAIN = {
  title: "Notre approvisionnement international",
  text: "Grâce à notre réseau international, nous facilitons l'accès à des matériaux, équipements et solutions conformes aux normes internationales.",
  badges: [
    "Contrôle qualité",
    "Produits certifiés",
    "Meilleurs prix",
    "Livraison sécurisée",
  ],
  // Recadrage "_clean" (même convention que p3_photo_clean.jpg etc.) : le
  // fichier brut p12_photo.jpg contient un reste de texte du catalogue
  // ("...NNEMENT") sur le bord gauche, repéré visuellement lors du test de
  // rendu de ce lot — rogné ici avant mise en ligne.
  img: "/images/p12_photo_clean.jpg",
} as const;

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
  email: "contact@soprinabuilding.com",
  whatsapp: "https://wa.me/237677596444",
} as const;

// Réseaux sociaux réels de SOPRINA BUILDING SARL (fournis par le client).
// TikTok ajouté le 2026-10-10 (URL fournie par le client, paramètres de
// tracking "_r"/"_t" retirés pour ne garder que le lien de profil canonique).
export const SOCIALS = [
  { name: "WhatsApp", href: "https://wa.me/237677596444", icon: "whatsapp" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61592677316511", icon: "facebook" },
  { name: "Instagram", href: "https://www.instagram.com/soprinabuildingsarl/", icon: "instagram" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/soprina-building-sarl/", icon: "linkedin" },
  { name: "X", href: "https://x.com/soprinabuilding", icon: "x" },
  { name: "Threads", href: "https://www.threads.com/@soprinabuildingsarl", icon: "threads" },
  { name: "TikTok", href: "https://www.tiktok.com/@soprina.building", icon: "tiktok" },
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
