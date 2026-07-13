# Zelita Website Project Report

Date: 2026-07-13  
Project folder: `zelita-main`

## Executive summary

This project is a business website for **Zelita Ventures Co. LLC**, focused on facility-care supplies, cleaning products, waste-management materials, industrial chemicals, and professional cleaning services in Saudi Arabia.

The site is more than a landing page. It currently includes:

- A branded homepage with hero, product categories, company overview, services, quote/contact call-to-action, and footer.
- A searchable/filterable product catalog page.
- A simple admin page for adding and removing catalog products.
- Shared catalog logic using browser `localStorage`.
- Brand assets, facility/product imagery, favicon, and Open Graph image.
- A modern Next/React/vinext setup intended for Cloudflare-style hosting.

## What we are building

We are building a polished corporate and procurement website for Zelita. The main goal appears to be presenting Zelita as a trusted Saudi Arabia-based supplier and service partner for commercial, industrial, and facility-care customers.

The current website supports three core user journeys:

1. **Prospective customer discovery**
   - Visitors land on the homepage.
   - They see Zelita's value proposition, product categories, service areas, and company positioning.
   - They are guided toward product exploration or quote/contact actions.

2. **Product browsing**
   - Visitors can open the product catalog.
   - They can search by product name, category, or pack size.
   - They can filter by category.
   - Each product displays name, category, pack size, and availability/status.

3. **Light catalog management**
   - A user can open the admin page.
   - They can add new products with name, category, pack size, and status.
   - They can remove products from the local catalog.
   - Changes are stored in the browser using `localStorage`.

## Brand and business positioning

The project positions Zelita as:

- A Saudi Arabia-based facility-care and supply partner.
- A provider of cleaning chemicals, janitorial products, waste-management products, aerosol products, packaging materials, food-care products, health and safety supplies, laundry supplies, dispensers, tissues, and industrial chemicals.
- A professional cleaning-services provider for industrial, commercial, glass/facade, supply, and replenishment needs.
- A company with an origin story tied to Zelita Global Ventures in India and expansion into Saudi Arabia.

The tone is corporate, procurement-friendly, and premium. The visual identity uses navy, blue, red, ivory/white, strong typography, and industrial/facility imagery.

## Main pages

### Homepage

File: `app/page.tsx`

The homepage contains:

- Sticky top navigation.
- Zelita logo branding.
- Hero section with the headline: "Complete cleaning, industrial & facility supply solutions."
- Calls to action:
  - Explore Products
  - Request a Quote
- Capability bar:
  - Saudi Arabia based
  - 50+ product solutions
  - Bulk & custom supply
  - Professional services
- Product category showcase.
- About/company section.
- Services showcase.
- Contact/partnership call-to-action.
- Shared site footer.

### Products page

File: `app/products/page.tsx`

The products page provides a procurement-style catalog with:

- Product search.
- Category filtering.
- Matching item count.
- Product list with pack sizes and status labels.
- Procurement support band.

This page reads catalog data from `app/catalog.ts` and uses client-side state.

### Admin page

File: `app/admin/page.tsx`

The admin page provides a simple interface to:

- Add new products.
- Select product category.
- Enter pack size.
- Enter availability/status.
- Search existing products.
- Remove products.

Important limitation: this admin area is not protected by authentication and does not save to a real database. It stores product changes only in the current browser's `localStorage`.

## Product catalog data

File: `app/catalog.ts`

The catalog defines:

- Product type:
  - `id`
  - `name`
  - `category`
  - `pack`
  - `status`
- Storage key: `zelita-product-catalog`
- Product categories.
- Four initial starter products:
  - DAC Disinfectant
  - Outdoor Trash Can with Wheels
  - Liquid Hand Wash
  - Floor Stripper

Current persistence is browser-local. This is useful for a prototype or demo, but not enough for production inventory management because each visitor/browser gets its own copy.

## Shared layout and footer

### Layout

File: `app/layout.tsx`

The layout configures:

- Next metadata title and description.
- Open Graph image.
- Favicon.
- Montserrat font via `next/font/google`.
- Global CSS.

### Footer

File: `app/site-footer.tsx`

The footer includes:

- Zelita logo and short company description.
- Website, WhatsApp, and email links.
- Navigation links.
- Phone and email contact details.
- Dammam, Saudi Arabia address.
- Embedded Google Map.

## Styling and design system

File: `app/globals.css`

The site uses a custom CSS-heavy design on top of Tailwind CSS import support.

Design characteristics:

- Navy/blue/red brand palette.
- Sticky navigation.
- Responsive layouts for desktop, tablet, and mobile.
- Hero overlays and facility imagery.
- Card-based product and service sections.
- Smooth hover states.
- Accessibility-friendly focus states.
- Reduced-motion support.

The styling is substantial and already tailored to the Zelita brand rather than being a generic starter template.

## Technology stack

Based on `package.json`, the project uses:

- Next.js `16.2.6`
- React `19.2.6`
- TypeScript `5.9.3`
- Tailwind CSS `4.2.1`
- vinext `0.0.50`
- Vite `8.0.13`
- Cloudflare Vite plugin
- Wrangler
- Drizzle ORM and Drizzle Kit, currently present but not actively used by the main app schema

Scripts:

- `npm run dev` starts local development through vinext.
- `npm run build` builds the app.
- `npm run start` starts the built app.
- `npm test` builds and runs the rendered HTML test.
- `npm run lint` runs ESLint.
- `npm run db:generate` generates Drizzle migrations.

## Hosting and backend readiness

The project is prepared for Cloudflare/vinext-style deployment.

Relevant files:

- `vite.config.ts`
- `worker/index.ts`
- `.openai/hosting.json`
- `build/sites-vite-plugin.ts`

Current `.openai/hosting.json`:

```json
{
  "d1": null,
  "r2": null
}
```

This means D1 and R2 bindings are not currently enabled. The codebase includes scaffolding for D1/Drizzle, but the live app currently does not use a database for catalog storage.

## Assets

The `public/` folder includes:

- Zelita logo.
- Favicon.
- Open Graph image.
- Facility hero image.
- Cleaning products image.
- Waste products image.
- Premium hero/cover images.
- Default starter SVG assets.

These assets support the current visual direction and marketing presentation.

## Current strengths

- Clear brand identity and business positioning.
- Strong homepage structure for a B2B supplier/service company.
- Product catalog already has useful filtering and search.
- Admin page gives a simple path for product entry during prototyping.
- Responsive CSS is already implemented.
- Contact details and WhatsApp/email flows are present.
- Project is set up with modern React, Next, TypeScript, and Cloudflare-oriented tooling.

## Current gaps and risks

1. **Admin page is public**
   - Anyone who visits `/admin` can access the add/remove interface.
   - For production, this should be protected.

2. **Product data is not centralized**
   - Products added in admin are stored in browser `localStorage`.
   - Other users will not see those changes.
   - Clearing browser data removes custom products.

3. **No real backend database yet**
   - Drizzle and D1 scaffolding exist, but the main catalog is not connected to them.

4. **No form submission workflow**
   - "Request a Quote" and "Contact Zelita" mostly route to anchors or email.
   - There is no quote request form, CRM capture, or server-side lead storage.

5. **Limited product detail depth**
   - Products currently show basic procurement info only.
   - No product detail pages, images per product, specifications, PDFs, safety sheets, MOQ, pricing, or inquiry buttons.

6. **Some starter files remain**
   - README still describes a vinext starter.
   - Some default public SVG assets remain.

## Recommended next steps

### Short-term

- Update `README.md` so it describes the Zelita website rather than the starter.
- Add authentication or at least remove/hide `/admin` before public launch.
- Replace placeholder/repeated imagery where needed with category-specific assets.
- Add a real quote request/contact form.
- Confirm all business copy, contact details, address, and service claims.

### Medium-term

- Move product catalog persistence from `localStorage` to a backend database.
- Use Cloudflare D1 with Drizzle, since the scaffolding is already present.
- Add product image, SKU/code, description, category, pack size, status, and inquiry fields.
- Add product detail pages.
- Add admin validation and protected access.

### Production-readiness

- Run lint/build/test before deployment.
- Configure real hosting bindings if using D1/R2.
- Add analytics or conversion tracking.
- Add SEO metadata for products and services.
- Add sitemap and robots configuration if needed.
- Review accessibility and mobile behavior in browser.

## Overall assessment

This is a strong first version of a Zelita corporate/product website. It already communicates the business clearly and includes a usable catalog experience. The largest remaining step is turning the prototype catalog/admin flow into a production-backed system with authentication and centralized storage.

In simple terms: the front-facing website is well underway; the backend/admin side is still prototype-level.
