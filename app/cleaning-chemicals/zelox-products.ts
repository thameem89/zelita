export type ProductDocument = {
  title: string;
  type: "PDF";
  url: string;
  reference?: string;
  version?: string;
  date?: string;
};

export type ZeloxProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  range: "ultra-pro" | "classic";
  rangeName: string;
  rangeLabel: string;
  shortDescription: string;
  image: string;
  packSizes: string[];
  keyAdvantages: string[];
  dilutionGuide: string;
  application: string;
  safetyLevel?: "Caution" | "Warning" | "Danger";
  safetySummary?: string;
  documents?: ProductDocument[];
};

const acidicCleanerSlug = "zelox-ultra-pro-premium-acidic-toilet-urinal-cleaner";

export const zeloxProducts: ZeloxProduct[] = [
  {
    id: "dac-disinfectant",
    slug: "dac-disinfectant",
    name: "DAC Disinfectant",
    category: "Disinfectants",
    range: "classic",
    rangeName: "ZELOX Classic",
    rangeLabel: "Daily Maintenance & High-Volume Choice",
    shortDescription: "Daily-use disinfectant for commercial surfaces and shared facility areas.",
    image: "/zelox-classic-disinfectant-cleaner.png",
    packSizes: ["5 L", "20 L"],
    keyAdvantages: [
      "Supports routine hygiene in high-traffic areas.",
      "Suitable for commercial floor and surface sanitation programs.",
      "Practical bulk supply for facility teams.",
    ],
    dilutionGuide: "Use according to site hygiene requirements and product guidance from Zelita.",
    application: "Apply to floors or common contact surfaces as part of routine maintenance cleaning.",
  },
  {
    id: "heavy-duty-degreaser",
    slug: "heavy-duty-degreaser",
    name: "Heavy Duty Degreaser",
    category: "Degreasers",
    range: "ultra-pro",
    rangeName: "ZELOX Ultra Pro",
    rangeLabel: "Professional Premium Maintenance Tier",
    shortDescription: "Concentrated degreasing support for kitchens, workshops and industrial floors.",
    image: "/zelox-ultra-pro-all-purpose-cleaner.png",
    packSizes: ["5 L", "25 L"],
    keyAdvantages: [
      "Cuts heavy grease, dirt and daily maintenance soils.",
      "Useful for kitchens, workshops and industrial floor areas.",
      "Designed for professional cleaning teams.",
    ],
    dilutionGuide: "Dilute based on soil level and cleaning method. Confirm final usage guidance with the Zelita team.",
    application: "Apply by mop, cloth, spray bottle or automatic scrubber depending on the site requirement.",
  },
  {
    id: "floor-stripper",
    slug: "floor-stripper",
    name: "Floor Stripper",
    category: "Floor Care Chemicals",
    range: "ultra-pro",
    rangeName: "ZELOX Ultra Pro",
    rangeLabel: "Professional Premium Maintenance Tier",
    shortDescription: "Floor-care chemical for removing old polish layers before maintenance work.",
    image: "/zelox-ultra-pro-floor-stripper.png",
    packSizes: ["5 L"],
    keyAdvantages: [
      "Helps remove built-up polish and old floor finishes.",
      "Supports planned floor restoration and maintenance cycles.",
      "Suitable for professional facility-care teams.",
    ],
    dilutionGuide: "Use according to floor condition, buildup level and site cleaning plan.",
    application: "Apply to prepared floor areas, allow suitable dwell time, then scrub and recover slurry.",
  },
  {
    id: "liquid-hand-wash",
    slug: "liquid-hand-wash",
    name: "Liquid Hand Wash",
    category: "Hand Wash and Sanitizers",
    range: "classic",
    rangeName: "ZELOX Classic",
    rangeLabel: "Daily Maintenance & High-Volume Choice",
    shortDescription: "Bulk hand-wash supply for offices, hospitality, schools and washrooms.",
    image: "/zelox-classic-daily-all-purpose-cleaner.png",
    packSizes: ["5 L refill"],
    keyAdvantages: [
      "Practical hygiene product for daily washroom operations.",
      "Bulk refill format for commercial sites.",
      "Suitable for offices, hospitality and institutions.",
    ],
    dilutionGuide: "Ready-to-use format. Use with compatible dispensers where applicable.",
    application: "Refill washroom dispensers or use as directed for commercial hand hygiene programs.",
  },
  {
    id: acidicCleanerSlug,
    slug: acidicCleanerSlug,
    name: "ZELOX Ultra Pro Premium Acidic Toilet & Urinal Cleaner",
    category: "Toilet and Urinal Cleaners",
    range: "ultra-pro",
    rangeName: "ZELOX Ultra Pro",
    rangeLabel: "Professional Premium Maintenance Tier",
    shortDescription:
      "A high-viscosity acidic cleaner for descaling, rust removal and heavy-duty sanitation of commercial toilet bowls and urinals.",
    image: "/zelox-ultra-pro-all-purpose-cleaner.png",
    packSizes: ["1 L", "5 L"],
    keyAdvantages: [
      "High-viscosity acidic formula for vertical toilet and urinal surfaces.",
      "Supports descaling, rust removal and heavy-duty sanitation.",
      "Professional-use product for commercial washroom maintenance.",
    ],
    dilutionGuide: "Use as directed for toilet bowls and urinals. Follow the full Safety Data Sheet before use.",
    application: "Apply to commercial toilet bowls and urinals where acidic descaling and sanitation support is required.",
    safetyLevel: "Danger",
    safetySummary:
      "Professional-use acidic cleaning product. Wear suitable protective gloves and eye protection. Do not mix with bleach or other chemicals. Always follow the complete Safety Data Sheet before use.",
    documents: [
      {
        title: "Safety Data Sheet",
        type: "PDF",
        url: "/documents/sds-premium-acidic-toilet-urinal-cleaner.pdf",
        reference: "ZV-SDS-TC-094",
        version: "1.0",
        date: "July 14, 2026",
      },
    ],
  },
];

export function getZeloxProductBySlug(slug: string) {
  return zeloxProducts.find((product) => product.slug === slug);
}

