import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { zeloxProducts } from "./zelox-products";
import { SHOW_CLEANING_CHEMICALS_PUBLICLY } from "../../lib/site-visibility";

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

const featuredProducts: FeaturedDivisionProduct[] = zeloxProducts.map((product) => ({
  name: product.name,
  category: product.category,
  spec: product.packSizes.join(", "),
  description: product.shortDescription,
  image: product.image,
  quoteHref: `/request-quote?division=cleaning-chemicals&product=${product.slug}`,
  detailHref: `/cleaning-chemicals/${product.slug}`,
  rangeName: product.rangeName,
  safetyLevel: product.safetyLevel,
  hasSds: Boolean(product.documents?.length),
}));

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
  if (!SHOW_CLEANING_CHEMICALS_PUBLICLY) notFound();

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
