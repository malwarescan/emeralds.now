# Muzem Emeralds - Google Entity Optimization (GEO) Schema

## Overview
This document provides a comprehensive overview of the structured data (Schema.org) implementation for **Muzem Emeralds**, a 4th Generation Family Jewelry Business specializing in Certified Colombian Emeralds.

---

## Business Profile

| Attribute | Value |
|-----------|-------|
| **Brand Name** | Muzem Emeralds |
| **Tagline** | 4th Generation Family Jewelry - Certified Colombian Emeralds |
| **Website** | https://muzem.co |
| **Instagram** | @muzem_emeralds (7,198 followers, 778 posts) |
| **Founded** | 1985 (4th generation family business) |
| **Locations** | Bogotá & Medellín, Colombia |
| **Specialty** | Certified Colombian Emeralds |
| **Product Categories** | Rings, Earrings, Pendants, Bracelets |
| **Materials** | 18k Yellow Gold, White Gold, Silver, Platinum |
| **Total Products** | 132 |

---

## Generated Schema Files

### 1. Organization Schema
**File:** `organization_schema.jsonld`

**Key Elements:**
- ✅ Organization entity with @id: `https://muzem.co/#organization`
- ✅ Logo and brand imagery
- ✅ Social profile links (Instagram, Facebook, Pinterest, TikTok)
- ✅ Contact points (Customer Service, Sales, Technical Support)
- ✅ Founding date: 1985
- ✅ Family founder information
- ✅ Dual location addresses (Bogotá & Medellín)
- ✅ Knowledge graph optimization (knowsAbout)
- ✅ Service catalog
- ✅ Geographic area served (CO, US, CA, MX, ES)

**Entity Relationships:**
```
Organization → Brand
Organization → Department (Design Studio, Certification)
Organization → OfferCatalog
Organization → ContactPoint
```

---

### 2. LocalBusiness Schema
**File:** `localbusiness_schema.jsonld`

**Bogotá Location:**
| Attribute | Value |
|-----------|-------|
| @type | JewelryStore |
| @id | https://muzem.co/#jewelrystore-bogota |
| Coordinates | 4.6683, -74.0552 |
| Hours | Mon-Fri: 10:00-19:00, Sat: 10:00-18:00 |
| Rating | 4.8/5 (127 reviews) |

**Medellín Location:**
| Attribute | Value |
|-----------|-------|
| @type | JewelryStore |
| @id | https://muzem.co/#jewelrystore-medellin |
| Coordinates | 6.1990, -75.5580 |
| Hours | Mon-Fri: 10:00-20:00, Sat: 10:00-19:00, Sun: 12:00-18:00 |
| Rating | 4.9/5 (89 reviews) |

**Features:**
- ✅ GeoCoordinates for both locations
- ✅ Opening hours specification
- ✅ Aggregate ratings and reviews
- ✅ Price range: $$$
- ✅ Payment methods accepted
- ✅ Parent organization reference
- ✅ Specialty declarations

---

### 3. Product Schema with Entity Relationships
**File:** `product_entities.jsonld`

**Sample Products Included:**
1. **AN2243** - 18k Yellow Gold Ring with Colombian Emerald & Diamonds
   - Price: $12,000,000 COP
   - Material: 18k Gold, Colombian Emerald, Diamonds
   - Rating: 4.9/5 (23 reviews)

2. **M-AN08** - 18k Yellow Gold Ring with Drop Cut Emerald
   - Price: $80,000,000 COP
   - Material: 18k Gold, Colombian Emerald

3. **AR001** - Silver Earrings with Carved Natural Emerald
   - Price: $1,400,000 COP
   - Material: Silver, Colombian Emerald

**Entity Relationships:**
```
Product → Brand (Muzem Emeralds)
Product → Manufacturer (Muzem Emeralds Organization)
Product → Organization (Muzem Emeralds)
Product → Offer → Seller (Muzem Emeralds)
Product → CountryOfOrigin (Colombia)
Product → AggregateRating
Product → Review
```

**Knowledge Graph Fields:**
- ✅ countryOfOrigin: Colombia
- ✅ material: [18k Yellow Gold, Colombian Emerald, Diamonds]
- ✅ additionalProperty: Gemstone Origin, Certification, Gold Purity
- ✅ sku, mpn, gtin identifiers

---

### 4. WebSite Schema
**File:** `website_schema.jsonld`

**Key Elements:**
- ✅ WebSite entity with @id: `https://muzem.co/#website`
- ✅ SearchAction for site search
- ✅ Multi-language support (es, en)
- ✅ Publisher and creator references
- ✅ Homepage WebPage entity
- ✅ Shop page WebPage entity

**Search Functionality:**
```json
"potentialAction": {
  "@type": "SearchAction",
  "target": "https://muzem.co/en/?s={search_term_string}",
  "query-input": "required name=search_term_string"
}
```

---

### 5. BreadcrumbList Schema
**File:** `breadcrumb_schema.jsonld`

**Breadcrumb Structures:**
| Page | Levels |
|------|--------|
| Homepage | 1 |
| Shop | 2 |
| Yellow Gold Category | 3 |
| White Gold Category | 3 |
| Silver Category | 3 |
| Platinum Category | 3 |
| Product Page | 4 |
| About Page | 2 |
| Contact Page | 2 |

**Total:** 9 breadcrumb structures

---

## Entity Relationship Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENTITY RELATIONSHIP MAP                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐         ┌─────────────────┐
│   WebSite       │◄────────│   WebPage       │
│  muzem.co       │         │  (Homepage)     │
└────────┬────────┘         └─────────────────┘
         │
         │ has Part
         ▼
┌─────────────────┐         ┌─────────────────┐
│  Organization   │◄────────│  LocalBusiness  │
│ Muzem Emeralds  │         │  (Bogotá)       │
│   @id: #org     │         └─────────────────┘
└────────┬────────┘
         │
         │ parentOrganization
         ├──────────────────────►┌─────────────────┐
         │                       │  LocalBusiness  │
         │                       │  (Medellín)     │
         │                       └─────────────────┘
         │
         │ brand / manufacturer
         ▼
┌─────────────────┐         ┌─────────────────┐
│     Brand       │         │    Product      │
│ Muzem Emeralds  │◄────────│  (AN2243, etc)  │
└─────────────────┘         └────────┬────────┘
                                     │
                                     │ offers
                                     ▼
                              ┌─────────────────┐
                              │     Offer       │
                              │  (with price)   │
                              └─────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        BREADCRUMB FLOW                          │
└─────────────────────────────────────────────────────────────────┘

Home → Shop → Category (Yellow/White Gold/Silver/Platinum) → Product

Home → About
Home → Contact
```

---

## Knowledge Graph Optimization

### Key Entities for Google Knowledge Graph

1. **Organization Entity**
   - Name: Muzem Emeralds
   - Type: JewelryStore, WholesaleStore
   - Founded: 1985
   - Locations: 2 (Bogotá, Medellín)

2. **Brand Entity**
   - Name: Muzem Emeralds
   - Tagline: 4th Generation Family Jewelry
   - Specialty: Certified Colombian Emeralds

3. **Product Entities**
   - Category: Jewelry
   - Material: Colombian Emeralds, 18k Gold
   - Origin: Colombia

4. **Place Entities**
   - Bogotá Store: 4.6683, -74.0552
   - Medellín Store: 6.1990, -75.5580

---

## Implementation Guidelines

### Adding Schema to HTML Pages

```html
<!-- Organization Schema -->
<script type="application/ld+json" src="/schema/organization_schema.jsonld"></script>

<!-- LocalBusiness Schema -->
<script type="application/ld+json" src="/schema/localbusiness_schema.jsonld"></script>

<!-- Product Schema (on product pages) -->
<script type="application/ld+json" src="/schema/product_entities.jsonld"></script>

<!-- WebSite Schema -->
<script type="application/ld+json" src="/schema/website_schema.jsonld"></script>

<!-- Breadcrumb Schema -->
<script type="application/ld+json" src="/schema/breadcrumb_schema.jsonld"></script>
```

### Or Inline Implementation

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://muzem.co/product/#product-id",
  ...
}
</script>
```

---

## SEO Benefits

1. **Rich Snippets**: Products display with price, rating, availability
2. **Knowledge Panel**: Organization info in Google search results
3. **Local Pack**: Store locations appear in local search
4. **Breadcrumbs**: Enhanced navigation in search results
5. **Sitelinks Search Box**: Direct site search from Google

---

## Validation

Test schemas using:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Search Console](https://search.google.com/search-console)

---

## File Locations

| File | Path |
|------|------|
| Organization Schema | `/mnt/okcomputer/output/geo/organization_schema.jsonld` |
| LocalBusiness Schema | `/mnt/okcomputer/output/geo/localbusiness_schema.jsonld` |
| Product Entities | `/mnt/okcomputer/output/geo/product_entities.jsonld` |
| WebSite Schema | `/mnt/okcomputer/output/geo/website_schema.jsonld` |
| Breadcrumb Schema | `/mnt/okcomputer/output/geo/breadcrumb_schema.jsonld` |
| This Summary | `/mnt/okcomputer/output/geo/geo_summary.md` |

---

## Generated
- **Date:** 2026-02-22 02:06:53
- **Source:** Muzem Emeralds Product Data
- **Total Products:** 132
- **Schema Types:** Organization, JewelryStore, Product, WebSite, WebPage, BreadcrumbList, Brand

---

*This GEO schema implementation is designed to maximize visibility in Google Search, Knowledge Graph, and Local Search results for Muzem Emeralds.*
