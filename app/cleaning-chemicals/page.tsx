import type { Metadata } from "next";
import {
  Beaker,
  Droplets,
  FlameKindling,
  Hand,
  ShieldCheck,
  SprayCan,
  Waves,
} from "lucide-react";
import {
  ApplicationsGrid,
  DivisionBenefits,
  DivisionCategoryGrid,
  DivisionEnquiryCTA,
  DivisionHero,
  FeaturedProductShowcase,
  type DivisionCategory,
  type FeaturedDivisionProduct,
} from "../division-components";
import { SiteFooter } from "../site-footer";
import { SiteNav } from "../site-nav";

export const metadata: Metadata = {
  title: "Cleaning Chemicals Supplier in Saudi Arabia | Zelita",
  description:
    "Explore commercial and industrial cleaning chemicals from Zelita, including disinfectants, degreasers, floor-care chemicals, hand wash and specialised facility solutions.",
  alternates: {
    canonical: "/cleaning-chemicals",
  },
};

const categories: DivisionCategory[] = [
  { title: "Disinfectants", description: "Reliable formulas for routine hygiene and surface disinfection.", icon: ShieldCheck },
  { title: "Degreasers", description: "Heavy-duty cleaning support for oily and stubborn soils.", icon: FlameKindling },
  { title: "Floor Care Chemicals", description: "Chemicals for stripping, cleaning and maintaining facility floors.", icon: Waves },
  { title: "Glass Cleaners", description: "Clear-finish solutions for glass, mirrors and bright surfaces.", icon: SprayCan },
  { title: "Hand Wash and Sanitizers", description: "Washroom-ready hygiene products for daily use.", icon: Hand },
  { title: "Laundry Chemicals", description: "Practical chemical supply for commercial laundry needs.", icon: Droplets },
  { title: "Kitchen Cleaning Chemicals", description: "Cleaning support for food-service and back-of-house areas.", icon: Beaker },
  { title: "Industrial Cleaning Chemicals", description: "Specialised products for demanding site conditions.", icon: ShieldCheck },
];

const featuredProducts: FeaturedDivisionProduct[] = [
  {
    name: "DAC Disinfectant",
    category: "Disinfectants",
    spec: "5 L and 20 L",
    description: "Daily-use disinfectant for commercial surfaces and shared facility areas.",
    image: "/zelox-classic-disinfectant-cleaner.png",
    quoteHref: "/request-quote?division=cleaning-chemicals&product=dac-disinfectant",
  },
  {
    name: "Heavy Duty Degreaser",
    category: "Degreasers",
    spec: "5 L and 25 L",
    description: "Concentrated degreasing support for kitchens, workshops and industrial floors.",
    image: "/zelox-ultra-pro-all-purpose-cleaner.png",
    quoteHref: "/request-quote?division=cleaning-chemicals&product=heavy-duty-degreaser",
  },
  {
    name: "Floor Stripper",
    category: "Floor Care Chemicals",
    spec: "5 L",
    description: "Floor-care chemical for removing old polish layers before maintenance work.",
    image: "/zelox-ultra-pro-floor-stripper.png",
    quoteHref: "/request-quote?division=cleaning-chemicals&product=floor-stripper",
  },
  {
    name: "Liquid Hand Wash",
    category: "Hand Wash and Sanitizers",
    spec: "5 L refill",
    description: "Bulk hand-wash supply for offices, hospitality, schools and washrooms.",
    image: "/zelox-classic-daily-all-purpose-cleaner.png",
    quoteHref: "/request-quote?division=cleaning-chemicals&product=liquid-hand-wash",
  },
];

const applications = [
  "Offices",
  "Healthcare facilities",
  "Hotels and hospitality",
  "Retail and malls",
  "Factories and warehouses",
  "Schools and institutions",
  "Commercial kitchens",
  "Residential facilities",
];

const benefits = [
  "Commercial-grade performance",
  "Bulk supply capability",
  "Product guidance and procurement support",
  "Reliable delivery across Saudi Arabia",
];

export default function CleaningChemicalsPage() {
  return (
    <main className="division-page">
      <SiteNav />
      <DivisionHero
        eyebrow="COMMERCIAL CLEANING CHEMICALS"
        headline="Professional cleaning chemicals for every facility."
        copy="From daily maintenance to heavy-duty industrial cleaning, Zelita supplies reliable chemical solutions for commercial, hospitality, healthcare and industrial environments."
        image="/zelita-catalog-hero-studio.png"
        imageAlt="Commercial cleaning chemical products arranged in a professional studio environment"
        primaryLabel="Request a Quote"
        primaryHref="/request-quote?division=cleaning-chemicals"
        secondaryLabel="Speak to Sales"
        secondaryHref="/contact"
      />
      <DivisionCategoryGrid title="Cleaning chemical solutions" categories={categories} />
      <FeaturedProductShowcase
        title="Featured chemical products"
        intro="Zelox product visuals are included as representative branded chemical examples for the current public division page."
        brandImage="/zelox-logo.png"
        brandAlt="Zelox cleaning chemicals logo"
        products={featuredProducts}
      />
      <ApplicationsGrid title="Applications" applications={applications} />
      <DivisionBenefits title="Why choose Zelita chemicals" benefits={benefits} />
      <DivisionEnquiryCTA
        heading="Need the right chemical for your facility?"
        copy="Share your cleaning requirement and our team will recommend a suitable product and pack size."
        primaryLabel="Request Chemical Quote"
        primaryHref="/request-quote?division=cleaning-chemicals"
        secondaryLabel="Speak to Sales"
        secondaryHref="/contact"
      />
      <SiteFooter />
    </main>
  );
}
