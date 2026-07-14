import type { Metadata } from "next";
import {
  Brush,
  CircleAlert,
  Droplets,
  HandPlatter,
  Package,
  Search,
  Trash2,
  WashingMachine,
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
  title: "Professional Cleaning Equipment in Saudi Arabia | Zelita",
  description:
    "Explore professional cleaning equipment, janitorial tools, waste bins, dispensers and facility-care solutions supplied by Zelita in Saudi Arabia.",
  alternates: {
    canonical: "/cleaning-equipment",
  },
};

const categories: DivisionCategory[] = [
  { title: "Floor Cleaning Machines", description: "Practical machines for daily floor maintenance programs.", icon: WashingMachine },
  { title: "Janitorial Trolleys", description: "Organised trolley systems for professional cleaning teams.", icon: Package },
  { title: "Mops and Buckets", description: "Reliable floor-care tools for routine facility cleaning.", icon: Droplets },
  { title: "Waste Bins and Containers", description: "Waste handling products for indoor and outdoor sites.", icon: Trash2 },
  { title: "Soap and Tissue Dispensers", description: "Washroom dispensers for commercial environments.", icon: HandPlatter },
  { title: "Brushes and Cleaning Tools", description: "Everyday tools for detailed cleaning and maintenance.", icon: Brush },
  { title: "Vacuum Cleaners", description: "Commercial vacuum options for dry and wet cleaning needs.", icon: Search },
  { title: "Safety and Warning Equipment", description: "Site safety essentials for active cleaning operations.", icon: CircleAlert },
];

const featuredProducts: FeaturedDivisionProduct[] = [
  {
    name: "Outdoor Trash Can with Wheels",
    category: "Waste Bins and Containers",
    spec: "120 L / 240 L",
    description: "Mobile outdoor waste bin for facilities, compounds and commercial sites.",
    image: "/zelita-waste-bins.png",
    quoteHref: "/request-quote?division=cleaning-equipment&product=outdoor-trash-can-with-wheels",
  },
  {
    name: "Automatic Soap Dispenser",
    category: "Soap and Tissue Dispensers",
    spec: "Touch-free wall mount",
    description: "Washroom dispenser option for hygiene-focused commercial spaces.",
    image: "/zelita-supplies-set.png",
    quoteHref: "/request-quote?division=cleaning-equipment&product=automatic-soap-dispenser",
  },
  {
    name: "Janitorial Cleaning Trolley",
    category: "Janitorial Trolleys",
    spec: "Multi-compartment",
    description: "Organised trolley for cleaning tools, waste collection and daily rounds.",
    image: "/zelita-janitorial-cart.png",
    quoteHref: "/request-quote?division=cleaning-equipment&product=janitorial-cleaning-trolley",
  },
  {
    name: "Commercial Wet and Dry Vacuum",
    category: "Vacuum Cleaners",
    spec: "Commercial-use unit",
    description: "Practical vacuum support for mixed floor and spill-cleaning needs.",
    image: "/zelita-facility-cleaning.png",
    quoteHref: "/request-quote?division=cleaning-equipment&product=commercial-wet-and-dry-vacuum",
  },
];

const applications = [
  "Offices and commercial buildings",
  "Shopping centres",
  "Hotels",
  "Hospitals",
  "Factories",
  "Warehouses",
  "Schools",
  "Residential compounds",
];

const benefits = [
  "Commercial-use products",
  "Practical procurement support",
  "Bulk and project supply",
  "Reliable after-sales assistance where applicable",
];

export default function CleaningEquipmentPage() {
  return (
    <main className="division-page">
      <SiteNav />
      <DivisionHero
        eyebrow="PROFESSIONAL CLEANING EQUIPMENT"
        headline="Reliable equipment for cleaner, safer facilities."
        copy="Explore practical cleaning equipment for daily maintenance, washrooms, waste handling and professional facility operations."
        image="/zelita-facility-cleaning.png"
        imageAlt="Professional cleaning equipment used in a modern facility environment"
        primaryLabel="Request Equipment Quote"
        primaryHref="/request-quote?division=cleaning-equipment"
        secondaryLabel="Speak to Sales"
        secondaryHref="/contact"
      />
      <DivisionCategoryGrid title="Cleaning equipment solutions" categories={categories} />
      <FeaturedProductShowcase title="Featured equipment" products={featuredProducts} />
      <ApplicationsGrid title="Equipment applications" applications={applications} />
      <DivisionBenefits title="Why choose Zelita equipment" benefits={benefits} />
      <DivisionEnquiryCTA
        heading="Planning a cleaning equipment requirement?"
        copy="Send us your site or project needs and our team will help prepare a suitable equipment proposal."
        primaryLabel="Request Equipment Quote"
        primaryHref="/request-quote?division=cleaning-equipment"
        secondaryLabel="Speak to Sales"
        secondaryHref="/contact"
      />
      <SiteFooter />
    </main>
  );
}
