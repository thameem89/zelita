import type { ComponentType } from "react";
import {
  Award,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Factory,
  Handshake,
  Hotel,
  LucideProps,
  PackageCheck,
  School,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  Utensils,
  Warehouse,
} from "lucide-react";

type IconComponent = ComponentType<LucideProps>;

export type DivisionCategory = {
  title: string;
  description: string;
  icon: IconComponent;
};

export type FeaturedDivisionProduct = {
  name: string;
  category: string;
  spec: string;
  description: string;
  image: string;
  quoteHref: string;
};

export type DivisionHeroProps = {
  eyebrow: string;
  headline: string;
  copy: string;
  image: string;
  imageAlt: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export function DivisionHero({
  eyebrow,
  headline,
  copy,
  image,
  imageAlt,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: DivisionHeroProps) {
  return (
    <section className="division-hero">
      <div className="page-container division-hero-grid">
        <div className="division-hero-copy">
          <p className="division-eyebrow">{eyebrow}</p>
          <h1>{headline}</h1>
          <p>{copy}</p>
          <div className="division-actions">
            <a className="button primary" href={primaryHref}>{primaryLabel}</a>
            <a className="button secondary-light" href={secondaryHref}>{secondaryLabel}</a>
          </div>
        </div>
        <figure className="division-hero-visual">
          <img src={image} alt={imageAlt} />
        </figure>
      </div>
    </section>
  );
}

export function DivisionCategoryGrid({ title, categories }: { title: string; categories: DivisionCategory[] }) {
  return (
    <section className="division-section">
      <div className="page-container">
        <div className="division-section-head">
          <p className="division-eyebrow">Solutions</p>
          <h2>{title}</h2>
        </div>
        <div className="division-category-grid">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <article className="division-category-card" key={category.title}>
                <span className="division-card-icon"><Icon size={22} aria-hidden="true" /></span>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <a href="/request-quote">Enquire Now</a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProductShowcase({
  title,
  eyebrow = "Featured examples",
  intro,
  brandImage,
  brandAlt,
  products,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  brandImage?: string;
  brandAlt?: string;
  products: FeaturedDivisionProduct[];
}) {
  return (
    <section className="division-section division-featured-section">
      <div className="page-container">
        <div className="division-featured-head">
          <div className="division-section-head">
            <p className="division-eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            {intro ? <p>{intro}</p> : null}
          </div>
          {brandImage ? (
            <img className="division-brand-mark" src={brandImage} alt={brandAlt ?? ""} />
          ) : null}
        </div>
        <div className="division-product-grid">
          {products.map((product) => (
            <article className="division-product-card" key={product.name}>
              <img src={product.image} alt={`${product.name} by Zelita`} />
              <div>
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <dl>
                  <div>
                    <dt>Pack / Spec</dt>
                    <dd>{product.spec}</dd>
                  </div>
                </dl>
                <p>{product.description}</p>
                <a href={product.quoteHref}>Request Quote</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ApplicationsGrid({ title, applications }: { title: string; applications: string[] }) {
  const icons = [Building2, BadgeCheck, Hotel, Store, Factory, School, Utensils, Warehouse, ShoppingBag];

  return (
    <section className="division-section">
      <div className="page-container">
        <div className="division-section-head compact">
          <p className="division-eyebrow">Applications</p>
          <h2>{title}</h2>
        </div>
        <div className="division-application-grid">
          {applications.map((application, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article key={application}>
                <Icon size={20} aria-hidden="true" />
                <span>{application}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DivisionBenefits({ title, benefits }: { title: string; benefits: string[] }) {
  const icons = [Award, PackageCheck, Handshake, Truck];

  return (
    <section className="division-benefits">
      <div className="page-container division-benefits-grid">
        <div>
          <p className="division-eyebrow">Why Zelita</p>
          <h2>{title}</h2>
        </div>
        <div className="division-benefit-list">
          {benefits.map((benefit, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article key={benefit}>
                <Icon size={20} aria-hidden="true" />
                <span>{benefit}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DivisionEnquiryCTA({
  heading,
  copy,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  heading: string;
  copy: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <section className="division-cta">
      <div className="page-container division-cta-inner">
        <div>
          <p className="division-eyebrow">Enquiry</p>
          <h2>{heading}</h2>
          <p>{copy}</p>
        </div>
        <div className="division-actions">
          <a className="button primary" href={primaryHref}>{primaryLabel}</a>
          <a className="button secondary-dark" href={secondaryHref}>{secondaryLabel}</a>
        </div>
      </div>
    </section>
  );
}

export const chemicalApplicationIcon = Sparkles;
export const checkIcon = CheckCircle2;
